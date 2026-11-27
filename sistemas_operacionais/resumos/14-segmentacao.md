---
aula: 14
titulo: Segmentação
fonte: "../slides/14 - Segmentação.pdf"
topicos: [segmentação, endereçamento bidimensional, fragmentação externa, compactação, segmentação paginada, MULTICS, x86, GDT, LDT, seletor, descritor, endereço linear]
prerequisitos: [10, 11]
---

# Aula 14: Segmentação

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
Segmentação oferece vários espaços de endereçamento lógicos e independentes, facilitando crescimento, proteção e compartilhamento; combinada à paginação, evita exigir segmentos inteiros na memória.

## Motivação
- A paginação vista é **unidimensional**: endereços de 0 a um máximo.
- Um compilador mantém: **texto fonte**, **tabela de símbolos**, **tabela de constantes**, **árvore sintática** e **pilha**. As quatro primeiras crescem continuamente; a pilha cresce e encolhe.
- Num espaço único, cada área ganha uma margem; se uma estoura (muitas variáveis → tabela de símbolos), falta espaço mesmo havendo memória livre.
- Redistribuir manualmente é trabalhoso; melhor gerenciar automaticamente.

## Segmentação
- **Segmentos**: sequências lineares de endereços, de 0 a um máximo; tamanho **variável** em execução; **independentes** (qualquer lugar da memória; crescer um não afeta outros).
- Endereço em **duas partes**: `(segmento, deslocamento)`.
- São entidades **lógicas**, conhecidas pelo programador (um procedimento, um vetor etc.).

### Vantagens
- Todo segmento começa em 0: um procedimento no segmento n é chamado em `(n, 0)`.
- **Ligação simplificada**: alterar um procedimento não obriga a mudar os outros.
- **Proteção por segmento**: código só execução; dados leitura/escrita.
- **Compartilhamento** (bibliotecas).

> **[+] Tradução**: tabela de segmentos com (base, limite). Se `deslocamento ≥ limite` → exceção; senão `físico = base + deslocamento`.
> Ex.: segmento 2 com base 4300 e limite 400: (2, 53) → 4353; (2, 500) → erro.

## Paginação × segmentação
| Consideração | Paginação | Segmentação |
|---|---|---|
| Programador precisa saber? | Não | Sim |
| Quantos espaços lineares? | Um | Muitos |
| Espaço total pode exceder a memória física? | Sim | Sim |
| Procedimentos e dados distinguidos e protegidos separadamente? | Não | Sim |
| Tabelas de tamanho variável acomodadas facilmente? | Não | Sim |
| Compartilhamento de procedimentos facilitado? | Não | Sim |

- **Finalidade da paginação**: grande espaço linear sem precisar de mais memória física.
- **Finalidade da segmentação**: separar programas e dados em espaços lógicos independentes, ajudando compartilhamento e proteção.
- Conteúdo de uma página: relação **acidental**. De um segmento: relação **lógica**.

## Segmentação pura
- Segmentos têm **tamanho variável** e ocupam qualquer área que os comporte; podem ser trocados com o disco.
- Trocas geram **fragmentação externa**; solução: **compactação** (cara).

Figura (evolução):
| Estado | Mudança | Buracos |
|---|---|---|
| a | S0(4K) S1(8K) S2(5K) S3(8K) S4(7K) | nenhum |
| b | S1 sai, entra S7(5K) | 3K |
| c | S4 sai, entra S5(4K) | 3K + 3K |
| d | S3 sai, entra S6(4K) | 3K + 4K + 3K |
| e | Compactação | um único de 10K |

> **[+]** Também chamada de *checkerboarding*. Aplicam-se first fit, best fit etc. ([aula 10](10-gerencia-de-memoria.md)).

## Segmentação com paginação
- Segmentos grandes são inconvenientes ou impossíveis de manter inteiros → **paginar os segmentos**.
- Combina o endereçamento de alto nível da segmentação com o gerenciamento automático da paginação.
- Pioneiro: **MULTICS**; também o **x86 de 32 bits**.

## MULTICS
- **2¹⁸ segmentos** por programa, cada um com até **65.536 palavras** (os slides mostram "218" por perda do expoente no texto extraído).
- Cada segmento é uma memória virtual paginada. Cada programa tem uma **tabela de segmentos** (que é ela própria um segmento paginado) com um descritor por segmento.
- O descritor indica presença e aponta para a tabela de páginas. Se **qualquer parte** do segmento está na memória, ele é considerado presente, assim como sua tabela de páginas.
- Páginas de **1024 palavras**; alguns segmentos pequenos não são paginados ou usam páginas de **64**.

### Descritor (36 bits)
| Bits | Campo |
|---|---|
| 18 | Endereço em memória principal da tabela de páginas |
| 9 | Tamanho do segmento em páginas |
| 1 | Tamanho de página: 0 = 1024, 1 = 64 palavras |
| 1 | 0 = paginado, 1 = não paginado |
| 1 | (reservado) |
| 3 | Diversos |
| 3 | Proteção |

> ⚠️ A figura do slide traz "1014 palavras"; o correto é **1024**.

### Endereço virtual (34 bits)
```
┌───────────────┬──────────┬─────────────────┐
│ segmento (18) │ pág. (6) │ deslocamento(10)│
└───────────────┴──────────┴─────────────────┘
```

### Tradução
1. Número do segmento → descritor.
2. Localiza a tabela de páginas; ausente → **falta de segmento**; violação de proteção → interrupção.
3. Consulta a entrada da página; ausente → **falta de página**; senão obtém o início da moldura.
4. Soma o deslocamento.
5. Faz o acesso.

- Como é caro, há uma **TLB de 16 entradas**, comparando **em paralelo** (segmento, página). Cada entrada: segmento, página, moldura, proteção, idade, bit de uso.

## x86 de 32 bits
- Parecido com o MULTICS, com até **2¹⁴ segmentos** (16.384), cada um com até **1 bilhão de palavras** de 32 bits (**[+]** 4 GB).
- **LDT** (tabela local): uma por processo, para seus segmentos. **GDT** (tabela global): única, para segmentos do sistema, incluindo o SO.
- Para acessar um segmento, carrega-se um **seletor** em um registrador: **CS** (código), **DS** (dados), **SS** (pilha).

```
Seletor (16 bits)
┌──────────────┬─────────────┬─────────┐
│ índice (13)  │ 0=GDT,1=LDT │ RPL (2) │
└──────────────┴─────────────┴─────────┘
```
*(o campo de privilégio RPL é [+])*

- Ao carregar o seletor, o descritor é buscado na LDT/GDT.
- **Descritor: 8 bytes**: base (32 bits, dividida em 3 pedaços), limite (20 bits, dividido em 2), **G** (limite em bytes ou páginas), **D** (segmento de 16 ou 32 bits), **P** (presente), **DPL** (privilégio 0–3), **S** (sistema ou aplicação), tipo e proteção.

### Tradução (seletor, deslocamento)
1. Obter o descritor (interrupção se o segmento não existe ou está em disco).
2. Verificar se o deslocamento ultrapassa o limite (interrupção). **[+]** Com G = 1 o limite é contado em páginas de 4 KB: 2²⁰ × 4 KB = 4 GB.
3. `endereço linear = base + deslocamento`.
4. Paginação desabilitada → linear = físico. Habilitada → o linear é virtual e passa pela paginação.

> **[+]** Paginação do x86-32: linear `10 | 10 | 12` (diretório, tabela, deslocamento). Há uma pequena TLB.

```
(seletor, desloc.) ─segmentação─▶ linear ─paginação─▶ físico
```

## x86-64
- Segundo os slides, não dá suporte à segmentação: como Windows e Unix/Linux praticamente não a usavam, o recurso foi abandonado.

> **[+]** Precisamente: no modo de 64 bits a segmentação é **quase** desativada (base 0, sem verificação de limite em CS, DS, ES, SS); FS e GS ainda têm base e são usados para dados por thread e por CPU. O modo de compatibilidade mantém o esquema antigo.

## Pontos de atenção para prova
- Reproduzir a tabela comparativa.
- Segmentação pura → fragmentação externa; paginada → interna.
- Passos de tradução no MULTICS e no x86.

## [+] Perguntas de revisão
1. Por que paginar segmentos elimina a fragmentação externa? *A alocação física passa a ser em molduras de tamanho fixo.*
2. Qual tabela guarda o segmento de código do kernel no x86? *A GDT.*

## Referências
- Tanenbaum, A. S.; Bos, H. *Modern Operating Systems*, 4ª ed., 2014, cap. 3.
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed.
