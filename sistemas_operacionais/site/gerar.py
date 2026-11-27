"""Gera conteudo.js a partir dos resumos em ../resumos e das listas em ../exercicios.

Formato de cada questão em exercicios/lista-N.md:

    ### 3 ★                       (★ = recomendada para a prova)
    Enunciado em Markdown.

    Por que cai: motivo curto.     (opcional)

    Material: arquivo#ancora; outro-arquivo#ancora

    #### Resposta
    Resposta sugerida em Markdown.

Uso (de qualquer pasta):  python gerar.py
"""
import json
import re
import unicodedata
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RESUMOS = AQUI.parent / "resumos"
EXERCICIOS = AQUI.parent / "exercicios"


def ler(caminho):
    texto = caminho.read_text(encoding="utf-8")
    meta = {}
    m = re.match(r"---\r?\n(.*?)\r?\n---\r?\n", texto, re.S)
    if m:
        for linha in m.group(1).splitlines():
            chave, _, valor = linha.partition(":")
            meta[chave.strip()] = valor.strip().strip('"')
        texto = texto[m.end():]
    return {
        "id": caminho.stem,
        "aula": meta.get("aula", ""),
        "titulo": meta.get("titulo", caminho.stem),
        "fonte": meta.get("fonte", ""),
        "texto": texto,
    }


def slug(titulo):
    """Mesma regra de âncora usada em app.js."""
    t = unicodedata.normalize("NFD", titulo.replace("`", "").replace("*", ""))
    t = "".join(c for c in t if not unicodedata.combining(c)).lower().replace("[+]", "")
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-") or "secao"


def ancoras(pagina):
    saida, usados, em_codigo = {}, {}, False
    for linha in pagina["texto"].splitlines():
        if linha.startswith("```"):
            em_codigo = not em_codigo
        m = re.match(r"#{2,4} (.*)", linha)
        if m and not em_codigo:
            base = slug(m.group(1))
            usados[base] = usados.get(base, 0) + 1
            chave = base if usados[base] == 1 else f"{base}-{usados[base]}"
            saida[chave] = m.group(1).replace("[+]", "").replace("`", "").replace("*", "").strip()
    return saida


def ler_lista(caminho, paginas):
    numero = int(caminho.stem.split("-")[1])
    texto = caminho.read_text(encoding="utf-8")
    cabecalho, *partes = re.split(r"(?m)^### (\d+)( ★)?[ \t]*$", texto)
    questoes = []
    for n, estrela, corpo in zip(partes[::3], partes[1::3], partes[2::3]):
        onde = f"{caminho.name}, questão {n}"
        antes, separador, resposta = corpo.partition("\n#### Resposta\n")
        assert separador, f"{onde}: falta '#### Resposta'"
        motivo = re.search(r"(?m)^Por que cai: (.*)$", antes)
        material = re.search(r"(?m)^Material: (.*)$", antes)
        assert material, f"{onde}: falta 'Material:'"
        links = []
        for ref in material.group(1).split(";"):
            pagina_id, _, ancora = ref.strip().partition("#")
            assert pagina_id in paginas, f"{onde}: página inexistente {pagina_id}"
            pagina = paginas[pagina_id]
            titulos = ancoras(pagina)
            assert ancora in titulos, f"{onde}: âncora inexistente {ref}"
            links.append({"href": f"#/{pagina_id}/{ancora}",
                          "rotulo": f"Aula {pagina['aula']} › {titulos[ancora]}"})
        enunciado = re.sub(r"(?m)^(Por que cai|Material): .*$", "", antes).strip()
        questoes.append({"n": int(n), "recomendada": bool(estrela),
                         "motivo": motivo.group(1) if motivo else "",
                         "enunciado": enunciado, "resposta": resposta.strip(), "material": links})
    assert [q["n"] for q in questoes] == list(range(1, len(questoes) + 1)), f"{caminho.name}: numeração"
    return {"numero": numero, "questoes": questoes}


paginas = [ler(p) for p in sorted(RESUMOS.glob("*.md"))]
por_id = {p["id"]: p for p in paginas}
listas = sorted((ler_lista(p, por_id) for p in EXERCICIOS.glob("lista-*.md")), key=lambda l: l["numero"])
saida = "// Arquivo gerado por gerar.py. Não edite à mão.\n"
saida += "window.PAGINAS = " + json.dumps(paginas, ensure_ascii=False, indent=1) + ";\n"
saida += "window.LISTAS = " + json.dumps(listas, ensure_ascii=False, indent=1) + ";\n"
(AQUI / "conteudo.js").write_text(saida, encoding="utf-8", newline="\n")
todas = [q for l in listas for q in l["questoes"]]
print(f"conteudo.js gerado: {len(paginas)} páginas, {len(listas)} listas, "
      f"{len(todas)} questões ({sum(q['recomendada'] for q in todas)} recomendadas)")
