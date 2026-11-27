---
aula: 13
titulo: Questões de projeto para sistemas de paginação
fonte: "../slides/13 - Questoes de projeto para paginação.pdf"
topicos: [anomalia de Belady, algoritmos de pilha, thrashing, alocação local e global, PFF, controle de carga, tamanho de página, espaços I e D, compartilhamento, copy-on-write, daemon de paginação, interface de memória virtual]
prerequisitos: [11, 12]
---

# Aula 13: Questões de projeto para paginação

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
Além do algoritmo de substituição, o desempenho da paginação depende de como se distribuem molduras, controla-se a carga, escolhe-se o tamanho de página, compartilha-se e limpa-se a memória.

## Anomalia de Belady
**Mais molduras sempre significam menos faltas? Não.**

FIFO, páginas 0–4, sequência `0 1 2 3 0 1 4 0 1 2 3 4`. Colunas = estado após cada referência (topo = entrada mais recente); `*` = falta.

**3 molduras → 9 faltas**
```
ref   0  1  2  3  0  1  4  0  1  2  3  4
novo  0  1  2  3  0  1  4  4  4  2  3  3
         0  1  2  3  0  1  1  1  4  2  2
velho       0  1  2  3  0  0  0  1  4  4
falta *  *  *  *  *  *  *        *  *
```
**4 molduras → 10 faltas**
```
ref   0  1  2  3  0  1  4  0  1  2  3  4
novo  0  1  2  3  3  3  4  0  1  2  3  4
         0  1  2  2  2  3  4  0  1  2  3
            0  1  1  1  2  3  4  0  1  2
velho          0  0  0  1  2  3  4  0  1
falta *  *  *  *        *  *  *  *  *  *
```
- Não ocorre com **algoritmos de pilha** (LRU, ótimo): o conjunto de páginas em memória com m molduras está **contido** no conjunto com m+1.

> ⚠️ O slide cita "MRU", querendo dizer menos recentemente usada (**LRU**).

## Thrashing
Programa que gera faltas continuamente e passa a maior parte do tempo esperando por páginas.

## 1. Política de alocação: local × global
Na falta, a vítima vem **só do processo que faltou** (local) ou de **qualquer processo** (global)?

| | Local | Global |
|---|---|---|
| Molduras por processo | Fração fixa | Variam no tempo |
| Quando o conjunto de trabalho cresce | Pode haver thrashing **mesmo com molduras sobrando** | Se adapta |
| Em geral | | **Melhor** |

- Figura: ao faltar A6, a local substitui a página de menor idade **de A** (A5, idade 3); a global, a de menor idade **de todos** (B3, idade 2).
- **[+]** Desvantagem da global: um processo pode tomar molduras dos outros, tornando o desempenho imprevisível. Na local, se o conjunto de trabalho encolhe, há desperdício.

### Dividindo molduras (global)
Conjuntos de trabalho mudam rápido, então a divisão é revista continuamente:
- **Igual**: fatias iguais; as sobras formam um *pool* comum.
- **Proporcional ao tamanho**: um processo de 300 KB recebe 30× mais que um de 10 KB. Convém garantir um **mínimo** a todos.
- **PFF** (*page fault frequency*): aumenta ou reduz as molduras conforme a taxa de faltas. **Não** diz qual página remover.

```
taxa de faltas
  │\
  │ \_______ limite superior A → dar mais molduras
  │   \____
  │ ........ limite inferior B → retirar molduras
  │        \_____
  └──────────────── nº de molduras
```
*(diagrama [+])*

- **Conjunto de trabalho e WSClock** não fazem sentido como globais: não existe conjunto de trabalho da máquina; unir todos perde a localidade.

## 2. Controle de carga
- Se a **soma dos conjuntos de trabalho** excede a memória → thrashing.
- Solução: levar alguns processos para o **disco** (**escalonamento de dois níveis**), considerando tamanho, tipo (CPU/IO-bound) etc.

> ⚠️ O slide diz "levar para a memória"; o correto é para o **disco**.

## 3. Tamanho de página
O SO pode adotar um tamanho mesmo diferente do hardware (**[+]** agrupando páginas físicas).

| A favor de páginas **pequenas** | A favor de páginas **grandes** |
|---|---|
| Menos fragmentação interna (em média meia última página; n segmentos → n·p/2 bytes) | Tabela de páginas menor |
| Partes não usadas não ocupam memória | Transferência mais eficiente: o tempo de disco é dominado por posicionamento e rotação |

> ⚠️ O slide escreve "segmentação interna"; é **fragmentação** interna.

### Tamanho ótimo
s = tamanho médio do processo; e = tamanho da entrada da tabela; p = tamanho da página.

```
custo(p) = s·e/p + p/2
```

```
derivada:  −s·e/p² + 1/2 = 0   ⇒   p = √(2·s·e)
```

> ⚠️ Os slides mostram `se/p + 1/2` e `−se/p + 1/2 = 0`. O correto é **p/2** no custo e **p²** na derivada; o resultado final `p = √(2se)` está certo.

> **[+]** s = 1 MB, e = 8 B → p = √(2²⁴) = **4 KB**.

## 4. Espaços separados de instruções e dados
- A maioria usa um espaço único; alguns têm **espaço I** e **espaço D**, cada um com sua tabela de páginas, dobrando o espaço endereçável (**[+]**).

## 5. Compartilhamento de páginas
- Páginas somente leitura (ex.: código) podem ser compartilhadas.
- Com I e D separados é simples: processos usam a **mesma tabela de instruções**.
- Com espaço único é mais complexo:
  - controlar quais são compartilhadas, para não descartá-las na troca;
  - ao terminar um processo, verificar o que outros ainda usam.
- **Dados (Unix, `fork`)**: pai e filho têm tabelas próprias apontando para as mesmas páginas, **somente leitura**. Na primeira escrita cria-se uma cópia e ambas passam a leitura/escrita (**[+]** ***copy-on-write***).

## 6. Política de limpeza
- Gravar páginas modificadas no momento da falta atrasa; é melhor **manter molduras livres** de antemão.
- **Daemon de paginação**: dorme e acorda periodicamente; com poucas molduras livres, escolhe vítimas pelo algoritmo de substituição, gravando as modificadas.

## 7. Interface da memória virtual
- Alguns sistemas dão controle ao programador sobre o mapa de memória:
  - compartilhar regiões **nomeadas** entre processos (ver [prática 7.1](07.1-ipc-pratica-python.md));
  - troca de mensagens de alto desempenho.
- **[+]** `mmap`, `shm_open`, `mprotect`, `madvise`.

## Pontos de atenção para prova
- Reproduzir Belady.
- Local × global e o papel do PFF.
- Derivar p = √(2se).

## [+] Perguntas de revisão
1. Como combater thrashing? *Reduzir o grau de multiprogramação (suspender processos) ou dar mais memória.*
2. Por que baixa utilização de CPU pode enganar o escalonador? *Em thrashing a CPU fica ociosa; admitir mais processos piora.*
3. s = 4 MB, e = 8 B: p ótimo? *√(2·2²²·8) = 2¹³ = 8 KB.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., cap. 4.
- **[+]** Belady, L. A. et al. *An anomaly in space-time characteristics...* CACM, 1969.
