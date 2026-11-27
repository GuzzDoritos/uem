# Lista 4

> Fonte: `../listas/lista 4.pdf`. As respostas são **sugestões**, não são gabarito do professor. `★` = recomendada para a prova (critério sugerido, não do professor).

### 1
Qual a função do gerenciador de memória?

Material: 10-gerencia-de-memoria#contexto

#### Resposta
É a parte do SO que gerencia a memória principal: controla o que está livre e ocupado, **concede memória** aos processos quando precisam, libera quando terminam, garante proteção e faz as trocas com o disco quando necessário.

### 2
Explique o gerenciamento de memória em sistemas monoprogramados.

Material: 10-gerencia-de-memoria#monoprogramacao

#### Resposta
A memória é dividida apenas entre o SO e **um** processo, sem abstração: o programa usa endereços físicos e pode acessar qualquer região. Variações: SO em RAM; SO em ROM (embarcados); SO em RAM com drivers em ROM/BIOS (primeiros PCs).

### 3 ★
Explique os problemas de relocação e proteção. Como podem ser resolvidos?

Por que cai: motiva base/limite e a memória virtual.

Material: 10-gerencia-de-memoria#multiprogramacao-relocacao-e-protecao; 10-gerencia-de-memoria#registradores-base-e-limite

#### Resposta
**Relocação**: o programa pode ser carregado em posições diferentes, então seus endereços precisam ser ajustados. **Proteção**: um processo não pode acessar memória de outro ou do SO.
- Somar a base aos endereços **na carga** resolve só a relocação.
- Bits de proteção por bloco, comparados com o PSW, tratam a proteção.
- **Registradores base e limite** resolvem os dois: cada endereço é verificado contra o limite e somado à base em tempo de execução; os registradores mudam a cada troca de processo.

### 4
Explique a gerência com partições de tamanho fixo em sistemas multiprogramados. Que problemas surgem?

Material: 10-gerencia-de-memoria#particoes-fixas

#### Resposta
A memória é dividida em partições imutáveis (podem ter tamanhos diferentes) e cada processo ocupa uma. Há **filas separadas** (menor partição que comporta) ou **fila única**. Problemas: **fragmentação interna**; com filas separadas, partições ociosas enquanto há processos em outras filas; com fila única, pequenos desperdiçam partições grandes ou, priorizando o maior que cabe, sofrem inanição (mitigada com contador de preterições). Também limita o tamanho e o número de processos.

### 5
Explique o mapa de bits e as listas encadeadas no gerenciamento de partições variáveis.

Material: 10-gerencia-de-memoria#mapa-de-bits; 10-gerencia-de-memoria#lista-encadeada

#### Resposta
**Mapa de bits**: memória dividida em unidades; um bit por unidade (0 livre, 1 ocupada). Unidade grande diminui o mapa e aumenta o desperdício. Alocar exige achar k zeros consecutivos, o que é lento.

**Lista encadeada**: cada nó descreve um segmento (processo ou buraco), com início e tamanho. Ordenada por endereço, facilita fundir buracos vizinhos na liberação.

### 6 ★
Explique os principais algoritmos de alocação de memória, com vantagens e desvantagens.

Por que cai: permite pedir simulação.

Material: 10-gerencia-de-memoria#algoritmos-de-alocacao; 10-gerencia-de-memoria#algoritmo-buddy

#### Resposta
| Algoritmo | Como escolhe | Vantagem | Desvantagem |
|---|---|---|---|
| First fit | Primeiro que cabe | Simples e rápido | Fragmenta o início |
| Next fit | Como o first, a partir de onde parou | Distribui a busca | Um pouco pior que first fit |
| Best fit | Menor que cabe | Preserva buracos grandes | Percorre tudo; gera sobras inúteis |
| Worst fit | Maior buraco | Sobras aproveitáveis | Percorre tudo; desempenho ruim em simulações |
| Quick fit | Listas por tamanho | Busca muito rápida | Devolução e fusão custosas |
| Buddy | Divide blocos em potências de 2 | Rápido; fusão simples | Fragmentação interna e externa |

### 7
O que é memória virtual?

Material: 11-memoria-virtual#ideia

#### Resposta
Técnica que permite a processos ocuparem **mais espaço que a memória física**: o SO mantém as partes ativas na RAM e as demais no disco, trazendo-as quando necessário, de forma transparente ao programador.

### 8
Qual a ideia básica da paginação? Qual a diferença entre página virtual e moldura?

Material: 11-memoria-virtual#paginacao

#### Resposta
Dividir o espaço de endereçamento virtual em blocos de tamanho fixo e mapeá-los na memória física. A **página** é o bloco do espaço **virtual**; a **moldura** é o bloco de mesmo tamanho na memória **física** que pode abrigar uma página. Transferências com o disco são em páginas.

### 9
O que é a MMU e como funciona?

Material: 11-memoria-virtual#enderecamento; 11-memoria-virtual#traducao

#### Resposta
Unidade de gerenciamento de memória (*Memory Management Unit*): hardware que converte endereços virtuais em físicos. Usa os bits mais significativos (número da página) para consultar a tabela de páginas (ou a TLB), obtém a moldura e concatena o deslocamento. Se a página está ausente, gera uma **falta de página**; se o acesso viola a proteção, uma exceção.

### 10 ★
O que é a tabela de páginas, como funciona e como pode ser implementada?

Por que cai: junta tradução, bits da entrada e multinível.

Material: 11-memoria-virtual#tabela-de-paginas; 11-memoria-virtual#multinivel; 11-memoria-virtual#tabela-de-paginas-invertida

#### Resposta
Estrutura, uma por processo, que mapeia cada página para uma moldura; é indexada pelo número da página. Cada entrada tem moldura, presente/ausente, proteção, referenciada, modificada e cache desabilitada.

Implementações: **registradores** em hardware (rápida, troca de contexto cara); **em memória** com registrador de base (troca barata, acessos extras); **multinível** (só mantém as partes usadas); **invertida** (uma entrada por moldura, com busca por hash).

### 11 ★
Por que a paginação pode prejudicar o desempenho de um processo? Como mitigar?

Por que cai: leva à TLB e ao cálculo de tempo de acesso.

Material: 11-memoria-virtual#tlb-translation-lookaside-buffer; 11-memoria-virtual#desempenho

#### Resposta
Com a tabela em memória, **cada referência exige acessos extras** para traduzir: um nível dobra os acessos (desempenho cai à metade); dois níveis triplicam. Faltas de página custam ainda mais, pois envolvem o disco. Mitigação: a **TLB**, cache associativo de traduções que aproveita a localidade; para as faltas, bons algoritmos de substituição, memória suficiente para o conjunto de trabalho e pré-paginação.
