---
aula: 10
titulo: Gerenciamento de memória
fonte: "../slides/10 - Gerencia de memória.pdf"
topicos: [hierarquia de memória, monoprogramação, multiprogramação, relocação, proteção, base e limite, fragmentação interna e externa, partições fixas, partições variáveis, mapa de bits, lista encadeada, first fit, next fit, best fit, worst fit, quick fit, buddy, swapping, compactação]
prerequisitos: [2, 3, 4]
---

# Aula 10: Gerenciamento de memória

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
O gerenciador de memória decide onde cada processo fica na RAM, resolve relocação e proteção e controla o espaço livre, equilibrando velocidade de alocação e fragmentação.

## Contexto
- Adaptação da lei de Parkinson: **programas tendem a se expandir até ocupar toda a memória disponível**.

| Nível | Volátil | Velocidade | Quantidade | Custo | Gerido por |
|---|---|---|---|---|---|
| Cache | Sim | Muito rápida | Poucos MB | Alto | Hardware |
| Principal (RAM) | Sim | Média | Alguns GB | Razoável | SO |
| Secundária | Não | Baixa | TB | Baixo | SO |

- **Gerenciador de memória**: parte do SO que concede memória aos processos.
- Dois grupos de sistemas: os que **não usam** memória secundária e os que **usam** (para contornar a falta de RAM).

## Monoprogramação
- Memória dividida só entre o SO e **um** processo. Sem abstração: o programa acessa qualquer endereço. Raro hoje.

| Variação | Layout | Uso |
|---|---|---|
| (a) | SO em RAM + programa | Primeiros computadores de grande porte |
| (b) | SO em ROM + programa | Embarcados |
| (c) | SO em RAM + programa + drivers em ROM (BIOS) | Primeiros PCs |

## Multiprogramação: relocação e proteção

### Relocação
- Endereços do programa passam a ser **relativos**: um desvio para a posição 100 precisa ser recalculado conforme o endereço inicial do processo.
- Solução por software: somar o endereço base **na carga**. O ligador deve marcar no executável quais palavras são endereços. **Não resolve proteção.**

### Proteção
- Blocos de memória com **bits de proteção**, comparados com a chave no **PSW**; acesso inválido gera interrupção. **[+]** Esquema do IBM 360.

### Registradores base e limite
- Resolvem **os dois** problemas com ajuda do hardware. Carregados a cada troca de processo.
- Todo endereço é **somado à base** e verificado contra o **limite**.

> **[+]**
> ```
> endereço lógico ──▶ (< limite?) ──sim──▶ (+ base) ──▶ endereço físico
>                          └──não──▶ exceção
> ```
> Aqui "limite" é o tamanho da partição. Alterar base e limite é instrução privilegiada.

## Fragmentação
- **Interna**: memória **concedida** ao processo e não usada.
- **Externa**: memória **não alocada** a ninguém, espalhada entre áreas alocadas.

## Partições fixas
- Memória dividida em partições de tamanho imutável (podem diferir entre si). O processo fica na partição, em geral, até terminar. A sobra é perdida (**fragmentação interna**).

| Estratégia | Funcionamento | Problema |
|---|---|---|
| **Filas separadas** | Processo entra na fila da menor partição que o comporta | Partição livre com fila vazia enquanto outros esperam em filas cheias |
| **Fila única**, próximo que cabe | Libera partição → primeiro da fila que caiba | Processos pequenos em partições grandes (muito desperdício) |
| **Fila única**, maior que cabe | Escolhe o maior que caiba | Pequenos podem nunca executar (inanição) |
| Com **contador** | Quem foi preterido k vezes passa a ser o próximo | Remedia a inanição |

## Partições variáveis: controle do espaço livre

### Mapa de bits
- Memória dividida em **unidades** de tamanho fixo; um bit por unidade (0 livre, 1 ocupada).
- Unidade maior → mapa menor, porém mais desperdício na última unidade.
- ❌ Alocar k unidades exige achar **k bits zero consecutivos**: caro.
- **[+]** Fração da memória gasta com o mapa, com unidade de u bits: 1/(u+1). Para u = 32 bits (4 bytes), ≈ 3%.

### Lista encadeada
- Cada nó: alocado (P) ou livre/buraco (H), endereço inicial, tamanho.
- Exemplo da figura: `P0,5 → H5,3 → P8,6 → P14,4 → H18,2 → P20,6 → P26,3 → H29,3`.
- Manter **ordenada por endereço** facilita a liberação, pois permite fundir vizinhos. Quatro casos ao liberar X:

| Antecessor | Sucessor | Ação |
|---|---|---|
| Ocupado | Ocupado | Apenas marca X como livre |
| Ocupado | Livre | Funde X com o sucessor |
| Livre | Ocupado | Funde X com o antecessor |
| Livre | Livre | Funde os três |

## Algoritmos de alocação
Usados quando um processo é criado ou volta do disco.

| Algoritmo | Escolha | Prós | Contras |
|---|---|---|---|
| **First fit** | Primeiro buraco que cabe; divide o resto | Simples e rápido | **[+]** Acumula fragmentos no início |
| **Next fit** | Como first fit, mas retoma de onde parou | | Um pouco pior que first fit |
| **Best fit** | Menor buraco que cabe | Preserva buracos grandes | Percorre toda a lista; gera sobras minúsculas inúteis e desperdiça mais |
| **Worst fit** | Maior buraco | Sobras reaproveitáveis | Percorre a lista; simulações mostram que é ruim |
| **Quick fit** | Listas separadas por tamanhos comuns | Busca extremamente rápida | Devolução cara: sem fundir blocos há muita fragmentação |

- No quick fit, um buraco fora dos tamanhos exatos (ex.: 21 KB) pode ir para a lista do maior tamanho menor que ele (20 KB) ou para uma lista de tamanhos especiais.

**[+] Exemplo resolvido.** Buracos (em ordem): 100, 500, 200, 300, 600 KB. Pedidos: 212, 417, 112, 426.

| Pedido | First fit | Best fit | Worst fit |
|---|---|---|---|
| 212 | 500 (sobra 288) | 300 (sobra 88) | 600 (sobra 388) |
| 417 | 600 (sobra 183) | 500 (sobra 83) | 500 (sobra 83) |
| 112 | 288 (sobra 176) | 200 (sobra 88) | 388 (sobra 276) |
| 426 | **espera** | 600 (sobra 174) | **espera** |

Um único exemplo não define o melhor algoritmo em geral.

## Algoritmo buddy
- Usado no **Linux**. Divide blocos em n partes (geralmente **n = 2**) até achar o menor que comporta o pedido.
- Mantém listas de blocos livres em potências de n.

**Alocação**
1. No início há um único bloco.
2. Arredonda o pedido para a menor potência de n **maior ou igual** a ele (P).
3. Se há bloco livre de tamanho P, entrega.
4. Senão, pega um dos menores blocos maiores e divide até obter P.

**Liberação**: se os **companheiros** (gerados pela mesma divisão, mesmo tamanho) estão livres, funde, repetindo para cima. Vizinhos de **origens diferentes não** são fundidos, mesmo que adjacentes.

### Exemplo dos slides (1 GB = 1024 MB)
| Operação | Estado (endereço crescente) |
|---|---|
| Início | `[1024]` |
| A pede 70 → 128 | `A128 · 128 · 256 · 512` |
| B pede 35 → 64 | `A128 · B64 · 64 · 256 · 512` |
| C pede 80 → 128 | `A128 · B64 · 64 · C128 · 128 · 512` |
| Libera A | `128 · B64 · 64 · C128 · 128 · 512` |
| D pede 60 → 64 | `128 · B64 · D64 · C128 · 128 · 512` |
| Libera B | `128 · 64 · D64 · C128 · 128 · 512` |
| Libera D | 64+64 → 128; 128+128 → 256: `256 · C128 · 128 · 512` |
| Libera C | 128+128 → 256 → 512 → `[1024]` |

> **[+]** Com A, B, C e D arredondados, a fragmentação interna é 58 (A), 29 (B), 48 (C) e 4 MB (D).

- Gera fragmentação **interna e externa**, mas é **rápido**.
- Um **vetor de cabeças de lista**, uma por tamanho (1 KB, 2 KB, 4 KB...), facilita achar blocos.
- **[+]** Truque (n = 2): endereço do companheiro = `endereço XOR tamanho`. No Linux o buddy aloca páginas físicas; o *slab allocator* fica por cima para objetos pequenos.

## Troca de processos
- **[+]** *Swapping*: mover processos inteiros entre RAM e disco quando não cabem todos.
- Entradas e saídas sucessivas geram **fragmentação externa**. **Compactação** junta os buracos, mas é **cara**. **[+]** Exige relocação em tempo de execução (base/limite).
- **Processos que crescem**:
  - Se há memória livre adjacente, é alocada ao processo.
  - Senão, o processo é movido, ou vizinhos vão para o disco.
  - Se nada for possível, ele espera ou é encerrado.
- Pode-se reservar folga para expansão. Com duas áreas que crescem, **pilha** (em geral para baixo) e **heap** (para cima) compartilham o espaço livre entre elas.

## Pontos de atenção para prova
- Distinguir fragmentação interna e externa e dizer qual cada técnica gera (fixas → interna; variáveis → externa; buddy → ambas).
- Simular first/best/worst fit e buddy.
- Base e limite resolvem relocação **e** proteção.

## [+] Perguntas de revisão
1. Pedido de 129 KB no buddy: quanto é reservado? *256 KB; 127 KB de fragmentação interna.*
2. Por que o best fit pode desperdiçar mais que o first fit? *Cria muitas sobras pequenas demais para serem usadas.*
3. O que o mapa de bits economiza e o que encarece? *Espaço de controle previsível; busca por sequências livres.*

## Ver também
[Memória virtual](11-memoria-virtual.md) · [Segmentação](14-segmentacao.md)

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 4) e 3ª ed. (cap. 3).
