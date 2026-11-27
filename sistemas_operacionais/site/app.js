(function () {
  "use strict";

  const BLOCOS = [
    ["Fundamentos", ["2", "3"]],
    ["Processos e concorrência", ["4", "5", "6", "7", "7.1", "8", "9"]],
    ["Memória", ["10", "11", "12", "13", "14"]],
    ["Arquivos e E/S", ["16", "17", "18", "19"]],
  ];

  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));
  const conteudo = $("#conteudo");
  const lista = $("#lista");
  const sumario = $("#sumario");
  const rodape = $("#rodape");
  const busca = $("#busca");
  const menu = $("#menu");
  const botaoMenu = $("#abrir-menu");

  if (!window.marked || !window.PAGINAS) {
    conteudo.innerHTML = "<h1>Não foi possível carregar</h1><p>Verifique a conexão com a internet " +
      "(a biblioteca <code>marked</code> vem de um CDN) e se <code>conteudo.js</code> foi gerado " +
      "com <code>python gerar.py</code>.</p>";
    return;
  }

  const paginas = window.PAGINAS;
  const porId = new Map(paginas.map((p) => [p.id, p]));
  const aulas = paginas.filter((p) => p.aula);
  const listas = window.LISTAS || [];
  const questoes = listas.flatMap((l) => l.questoes);
  const totalRecomendadas = questoes.filter((q) => q.recomendada).length;

  const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const slug = (s) => semAcento(s).replace(/\[\+\]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  function el(tag, props = {}, ...filhos) {
    const e = Object.assign(document.createElement(tag), props);
    e.append(...filhos);
    return e;
  }

  // ---------- renderização ----------

  function renderizar(pagina) {
    const caixa = el("div");
    caixa.innerHTML = window.marked.parse(pagina.texto);

    // âncoras dos títulos
    const usados = new Map();
    $$("h2, h3, h4", caixa).forEach((h) => {
      const base = slug(h.textContent) || "secao";
      const n = (usados.get(base) || 0) + 1;
      usados.set(base, n);
      h.id = n > 1 ? `${base}-${n}` : base;
    });

    esconderRespostas(caixa);
    ajustarLinks(caixa, pagina);
    marcar(caixa);

    $$("table", caixa).forEach((t) => {
      const rolagem = el("div", { className: "tabela" });
      t.replaceWith(rolagem);
      rolagem.append(t);
    });

    $$("blockquote", caixa).forEach((b) => {
      const inicio = b.textContent.trim();
      if (inicio.startsWith("Erro") || inicio.startsWith("Atenção") || b.querySelector(".alerta")) {
        b.classList.add("aviso");
      } else if (b.querySelector(".extra")) {
        b.classList.add("complemento");
      }
    });

    return caixa;
  }

  // Transforma as respostas das perguntas e dos exercícios em blocos "ver resposta".
  function esconderRespostas(caixa) {
    $$("h2", caixa).forEach((h2) => {
      const revisao = /Perguntas de revisão/.test(h2.textContent);
      const exercicios = /Exercícios dos slides/.test(h2.textContent);
      if (!revisao && !exercicios) return;

      const itens = [];
      for (let n = h2.nextElementSibling; n && n.tagName !== "H2"; n = n.nextElementSibling) {
        if (n.tagName === "OL") itens.push(...Array.from(n.children));
      }

      let total = 0;
      itens.forEach((li) => {
        const alvo = li.querySelector(":scope > p") || li;
        const ultimo = alvo.lastElementChild;
        const emFinal = ultimo && ultimo.tagName === "EM" &&
          !(ultimo.nextSibling && ultimo.nextSibling.textContent.trim());
        const resposta = el("div", { className: "resposta" });

        if (exercicios) {
          const primeiro = alvo.firstChild;
          const vf = primeiro && primeiro.nodeType === 3 && primeiro.textContent.match(/^\s*\(([VF])\)\s*/);
          if (!vf) return;
          primeiro.textContent = primeiro.textContent.slice(vf[0].length);
          resposta.append(el("strong", { textContent: vf[1] === "V" ? "Verdadeiro." : "Falso." }));
          if (emFinal) resposta.append(" ", ...ultimo.childNodes);
          if (emFinal) ultimo.remove();
          alvo.prepend(el("span", { className: "lacuna", textContent: "V ou F? " }));
        } else {
          if (!emFinal) return;
          resposta.append(...ultimo.childNodes);
          ultimo.remove();
        }
        li.append(el("details", {}, el("summary", { textContent: "Ver resposta" }), resposta));
        total++;
      });

      if (total > 1) {
        const botao = el("button", { type: "button", className: "revelar", textContent: "Mostrar todas as respostas" });
        let aberto = false;
        botao.addEventListener("click", () => {
          aberto = !aberto;
          itens.forEach((li) => $$("details", li).forEach((d) => { d.open = aberto; }));
          botao.textContent = aberto ? "Ocultar todas as respostas" : "Mostrar todas as respostas";
        });
        h2.after(botao);
      }
    });
  }

  // Destaca os marcadores [+] e ⚠️ fora dos blocos de código.
  function marcar(caixa) {
    const andador = document.createTreeWalker(caixa, NodeFilter.SHOW_TEXT);
    const textos = [];
    while (andador.nextNode()) {
      const t = andador.currentNode;
      if (/\[\+\]|⚠/.test(t.textContent) && !t.parentElement.closest("pre, code")) textos.push(t);
    }
    textos.forEach((t) => {
      const partes = t.textContent.split(/(\[\+\]|⚠️?)/);
      t.replaceWith(...partes.map((p) => {
        if (p === "[+]") {
          return el("span", { className: "extra", textContent: "extra", title: "Complemento que não está nos slides" });
        }
        if (p.startsWith("⚠")) {
          return el("span", { className: "alerta", textContent: "⚠️", title: "Divergência em relação ao slide" });
        }
        return p;
      }));
    });
  }

  // Converte links entre arquivos .md em rotas do site.
  function ajustarLinks(caixa, pagina) {
    $$("a[href]", caixa).forEach((a) => {
      const href = a.getAttribute("href");
      const md = href.match(/^([^/:#]+)\.md$/);
      if (md) {
        const id = decodeURIComponent(md[1]);
        a.setAttribute("href", id.startsWith("00-") ? "#/" : `#/${id}`);
      } else if (/^https?:/.test(href)) {
        a.target = "_blank";
        a.rel = "noopener";
      } else if (href.startsWith("../")) {
        a.target = "_blank";
      }
    });
  }

  // ---------- exercícios ----------

  function formatar(markdown) {
    const caixa = el("div");
    caixa.innerHTML = window.marked.parse(markdown);
    ajustarLinks(caixa);
    marcar(caixa);
    $$("table", caixa).forEach((t) => {
      const rolagem = el("div", { className: "tabela" });
      t.replaceWith(rolagem);
      rolagem.append(t);
    });
    return caixa;
  }

  let paginaExercicios = null; // montada uma vez, para manter respostas abertas ao voltar
  let soRecomendadas = false;
  try { soRecomendadas = localStorage.getItem("so-recomendadas") === "1"; } catch (e) { /* sem armazenamento */ }

  function montarQuestao(numeroLista, q) {
    const cabeca = el("div", { className: "q-cabeca" }, el("span", { className: "q-num", textContent: `${q.n})` }));
    if (q.recomendada) {
      cabeca.append(el("span", { className: "selo", textContent: "★ Recomendada" }),
        el("small", { textContent: q.motivo }));
    }
    const resposta = formatar(q.resposta);
    resposta.className = "resposta";
    return el("div", {
      id: `q-${numeroLista}-${q.n}`,
      className: q.recomendada ? "questao recomendada" : "questao",
    },
    cabeca,
    formatar(q.enunciado),
    el("details", {}, el("summary", { textContent: "Mostrar resposta sugerida" }), resposta),
    el("p", { className: "material" }, "Ver no material: ",
      ...q.material.flatMap((m, i) => [i ? " · " : "", el("a", { href: m.href, textContent: m.rotulo })])));
  }

  function montarExercicios() {
    const filtro = (texto, valor) => {
      const b = el("button", { type: "button", textContent: texto });
      b.dataset.valor = valor;
      b.addEventListener("click", () => filtrar(valor === "1"));
      return b;
    };
    const revelar = el("button", { type: "button", className: "revelar", textContent: "Mostrar todas as respostas" });
    revelar.addEventListener("click", () => {
      const visiveis = $$("details", paginaExercicios).filter((d) => !d.closest(".questao").hidden);
      const abrir = visiveis.some((d) => !d.open);
      visiveis.forEach((d) => { d.open = abrir; });
      revelar.textContent = abrir ? "Ocultar todas as respostas" : "Mostrar todas as respostas";
    });

    paginaExercicios = el("div", {},
      el("h1", { textContent: "Exercícios das listas" }),
      el("p", { textContent: "As respostas são sugestões, não gabarito do professor. As recomendadas para a " +
        "prova foram escolhidas por critério próprio (temas centrais, comparações e questões de cálculo ou " +
        "simulação); não é uma indicação do professor." }),
      el("div", { className: "filtros" },
        el("div", { className: "alternar", role: "group", ariaLabel: "Filtro de questões" },
          filtro(`Todas (${questoes.length})`, "0"),
          filtro(`★ Recomendadas (${totalRecomendadas})`, "1")),
        revelar),
      ...listas.map((l) => el("section", { id: `lista-${l.numero}` },
        el("h2", { textContent: `Lista ${l.numero}` }),
        ...l.questoes.map((q) => montarQuestao(l.numero, q)),
        el("p", { className: "sem-recomendada", textContent: "Nenhuma questão recomendada nesta lista.", hidden: true })))
    );
  }

  function filtrar(recomendadas) {
    soRecomendadas = recomendadas;
    try { localStorage.setItem("so-recomendadas", recomendadas ? "1" : "0"); } catch (e) { /* sem armazenamento */ }
    $$(".alternar button", paginaExercicios).forEach((b) => {
      b.setAttribute("aria-pressed", String((b.dataset.valor === "1") === recomendadas));
    });
    $$("section", paginaExercicios).forEach((s) => {
      const itens = $$(".questao", s);
      itens.forEach((q) => { q.hidden = recomendadas && !q.classList.contains("recomendada"); });
      $(".sem-recomendada", s).hidden = itens.some((q) => !q.hidden);
    });
  }

  function mostrarExercicios() {
    document.title = "Exercícios · Sistemas Operacionais";
    if (!paginaExercicios) montarExercicios();
    conteudo.replaceChildren(paginaExercicios);
    filtrar(soRecomendadas);
    sumario.replaceChildren(el("p", { textContent: "Listas" }),
      ...listas.map((l) => el("a", { href: `#/exercicios/lista-${l.numero}`, textContent: `Lista ${l.numero}` })));
    rodape.replaceChildren();
  }

  // ---------- navegação ----------

  const rotulo = (p) => p.titulo.replace(/^"|"$/g, "");

  function montarMenu(atual) {
    lista.replaceChildren(
      el("a", { href: "#/", className: atual ? "" : "ativo", textContent: "Início" }),
      el("a", { href: "#/exercicios", className: atual === "exercicios" ? "ativo" : "", textContent: "Exercícios das listas" }),
      ...BLOCOS.flatMap(([nome, numeros]) => [
        el("h2", { textContent: nome }),
        ...numeros.map((n) => aulas.find((p) => p.aula === n)).filter(Boolean).map((p) =>
          el("a", { href: `#/${p.id}`, className: p.id === atual ? "ativo" : "" },
            el("span", { className: "num", textContent: p.aula }), rotulo(p))),
      ])
    );
  }

  function mostrarInicio() {
    document.title = "Resumos de Sistemas Operacionais";
    const indice = paginas.find((p) => p.id.startsWith("00-"));
    const blocos = BLOCOS.map(([nome, numeros]) => el("section", {},
      el("h2", { textContent: nome }),
      el("div", { className: "cartoes" }, ...numeros.map((n) => aulas.find((p) => p.aula === n)).filter(Boolean)
        .map((p) => el("a", { href: `#/${p.id}`, className: "cartao" },
          el("span", { className: "num", textContent: `Aula ${p.aula}` }),
          el("strong", { textContent: rotulo(p) }))))));

    conteudo.replaceChildren(
      el("h1", { textContent: "Sistemas Operacionais" }),
      el("p", { textContent: "Resumos das aulas. Escolha um assunto abaixo ou use a busca." }),
      legenda(),
      el("div", { className: "cartoes destaque" }, el("a", { href: "#/exercicios", className: "cartao" },
        el("span", { className: "num", textContent: `${listas.length} listas` }),
        el("strong", { textContent: "Exercícios com respostas sugeridas" }),
        el("span", { className: "num", textContent: `${questoes.length} questões, ${totalRecomendadas} recomendadas` }))),
      ...blocos
    );

    if (indice) {
      // aproveita do índice só o que serve para quem está estudando
      const caixa = renderizar(indice);
      ["fórmulas", "divergências encontradas"].forEach((nome) => {
        const h = $$("h2", caixa).find((x) => x.textContent.toLowerCase().startsWith(nome));
        if (!h) return;
        const corpo = [];
        for (let n = h.nextElementSibling; n && n.tagName !== "H2"; n = n.nextElementSibling) corpo.push(n);
        conteudo.append(el("details", { className: "painel" },
          el("summary", { textContent: h.textContent }), ...corpo));
      });
    }
    sumario.replaceChildren();
    rodape.replaceChildren();
  }

  function legenda() {
    return el("div", { className: "legenda" },
      el("span", {}, el("span", { className: "extra", textContent: "extra" }), " não está nos slides"),
      el("span", {}, "⚠️ o slide tem erro ou ambiguidade"));
  }

  function mostrarAula(pagina) {
    document.title = `${rotulo(pagina)} · Sistemas Operacionais`;
    const caixa = renderizar(pagina);
    const h1 = $("h1", caixa);
    const barra = el("div", { className: "barra" }, legenda());
    if (pagina.fonte) {
      barra.append(el("a", {
        href: encodeURI(pagina.fonte), target: "_blank", textContent: "Abrir slide original (PDF)",
      }));
    }
    // a nota de convenção do arquivo é substituída pela legenda
    const nota = h1 && h1.nextElementSibling;
    if (nota && nota.tagName === "BLOCKQUOTE" && /slides/.test(nota.textContent)) nota.remove();
    if (h1) h1.after(barra);
    conteudo.replaceChildren(...caixa.childNodes);

    sumario.replaceChildren(
      el("p", { textContent: "Nesta página" }),
      ...$$("h2", conteudo).map((h) => {
        const a = el("a", { href: `#/${pagina.id}/${h.id}`, textContent: h.textContent.replace(/^extra\s*/, "") });
        a.dataset.alvo = h.id;
        return a;
      })
    );

    const i = aulas.slice().sort((a, b) => Number(a.aula) - Number(b.aula));
    const pos = i.findIndex((p) => p.id === pagina.id);
    const vizinho = (p, texto, classe) => p
      ? el("a", { href: `#/${p.id}`, className: classe },
        el("small", { textContent: texto }), el("span", { textContent: rotulo(p) }))
      : el("span");
    rodape.replaceChildren(vizinho(i[pos - 1], "← Anterior", "ant"), vizinho(i[pos + 1], "Próxima →", "prox"));
  }

  // ---------- busca ----------

  // índice por seção (título de nível 2)
  const secoes = aulas.flatMap((p) => {
    const caixa = el("div");
    caixa.innerHTML = window.marked.parse(p.texto);
    const saida = [{ pagina: p, titulo: rotulo(p), id: "", texto: "" }];
    const usados = new Map();
    Array.from(caixa.children).forEach((n) => {
      let id = "";
      if (/^H[234]$/.test(n.tagName)) {
        const base = slug(n.textContent) || "secao";
        const k = (usados.get(base) || 0) + 1;
        usados.set(base, k);
        id = k > 1 ? `${base}-${k}` : base;
        saida.push({ pagina: p, titulo: n.textContent.replace("[+]", "").trim(), id, texto: "" });
      }
      saida[saida.length - 1].texto += " " + n.textContent;
    });
    return saida.map((s) => {
      s.texto = s.texto.replace(/\[\+\]/g, "").replace(/\s+/g, " ").trim().normalize("NFC");
      s.chave = semAcento(`${s.titulo} ${s.texto}`);
      return s;
    });
  });

  // as questões também entram na busca
  listas.forEach((l) => l.questoes.forEach((q) => {
    const texto = `${q.enunciado} ${q.resposta}`.replace(/[*`|#]|-{3,}/g, "").replace(/\s+/g, " ").normalize("NFC");
    const titulo = `Lista ${l.numero}, questão ${q.n}`;
    secoes.push({ titulo, texto, chave: semAcento(`${titulo} ${texto}`), origem: "Exercícios",
      href: `#/exercicios/q-${l.numero}-${q.n}` });
  }));

  function pesquisar(consulta) {
    const termos = semAcento(consulta).split(/\s+/).filter(Boolean);
    const achados = secoes
      .filter((s) => termos.every((t) => s.chave.includes(t)))
      .map((s) => ({ s, peso: termos.filter((t) => semAcento(s.titulo).includes(t)).length }))
      .sort((a, b) => b.peso - a.peso)
      .slice(0, 30);

    lista.replaceChildren(
      el("p", { className: "vazio", textContent: achados.length ? `${achados.length} resultado(s)` : "Nada encontrado." }),
      ...achados.map(({ s }) => {
        const pos = Math.max(0, semAcento(s.texto).indexOf(termos[0]) - 30);
        const href = s.href || `#/${s.pagina.id}${s.id ? "/" + s.id : ""}`;
        const origem = s.origem || `Aula ${s.pagina.aula}`;
        return el("a", { href, className: "resultado" },
          el("strong", { textContent: s.titulo }),
          el("small", { textContent: `${origem} · …${s.texto.slice(pos, pos + 90)}…` }));
      })
    );
  }

  // ---------- rotas ----------

  let atual = null;
  let rolagemExercicios = 0;

  function rota() {
    const [id, secao] = decodeURIComponent(location.hash.replace(/^#\/?/, "")).split("/");
    const pagina = porId.get(id);
    const chave = id === "exercicios" ? id : pagina ? pagina.id : "";
    if (chave !== atual) {
      if (atual === "exercicios") rolagemExercicios = window.scrollY;
      atual = chave;
      if (chave === "exercicios") mostrarExercicios();
      else if (pagina) mostrarAula(pagina);
      else mostrarInicio();
      if (!busca.value.trim()) montarMenu(chave);
    }
    const alvo = secao && document.getElementById(secao);
    // uma questão pedida pela busca aparece mesmo com o filtro ligado
    if (alvo && alvo.hidden) filtrar(false);
    if (alvo) alvo.scrollIntoView();
    else window.scrollTo(0, chave === "exercicios" ? rolagemExercicios : 0);
    fecharMenu();
  }

  function fecharMenu() {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  }

  botaoMenu.addEventListener("click", () => {
    botaoMenu.setAttribute("aria-expanded", String(menu.classList.toggle("aberto")));
  });

  busca.addEventListener("input", () => {
    if (busca.value.trim()) pesquisar(busca.value); else montarMenu(atual);
  });

  menu.addEventListener("click", (e) => { if (e.target.closest("a")) fecharMenu(); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== busca) {
      e.preventDefault();
      menu.classList.add("aberto");
      busca.focus();
    } else if (e.key === "Escape") {
      busca.value = "";
      montarMenu(atual);
      busca.blur();
      fecharMenu();
    }
  });

  window.addEventListener("hashchange", rota);
  rota();
})();
