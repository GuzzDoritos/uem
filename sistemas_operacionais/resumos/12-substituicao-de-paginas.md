---
aula: 12
titulo: Substituição de páginas
fonte: "../slides/12 - Substituição de páginas.pdf"
topicos: [page replacement, ótimo, NRU, FIFO, segunda chance, relógio, LRU, envelhecimento, conjunto de trabalho, localidade, paginação por demanda, pré-paginação, WSClock, anomalia de Belady]
prerequisitos: [11]
---

# Aula 12: Substituição de páginas

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
Quando há falta de página e não há moldura livre, o SO escolhe uma vítima tentando minimizar faltas futuras; os algoritmos práticos aproximam o ótimo usando os bits R e M.

## Contexto
- Há moldura livre → basta carregar. Memória cheia → substituir; se a vítima foi **modificada**, gravá-la antes.
- Trazer página do disco é caro: o objetivo é **minimizar trocas**.

## 1. Ótimo
- Remove a página que **demorará mais** a ser usada novamente.
- **Impossível** de implementar (exige conhecer o futuro).
- Serve de **referência**: executa-se o programa, registra-se o log de referências e, numa segunda execução, aplica-se o ótimo para comparar com algoritmos reais.

## 2. NRU (não usada recentemente)
- Bits **R** (leitura ou escrita) e **M** (escrita); em hardware ou simulados pelo SO.
- R é limpo periodicamente (ex.: a cada tick). M não é limpo.

| Classe | R | M |
|---|---|---|
| 0 | 0 | 0 |
| 1 | 0 | 1 |
| 2 | 1 | 0 |
| 3 | 1 | 1 |

- Remove **página aleatória da classe mais baixa** não vazia.
- ✅ Simples, desempenho aceitável.
- **[+]** A classe 1 existe porque o tick zera R, mas preserva M.

## 3. FIFO
- Fila por ordem de chegada; remove a mais antiga.
- ❌ Pode remover páginas muito usadas.

## 4. Segunda chance
- FIFO que consulta R na cabeça: **R = 1** → vai para o fim com R = 0; **R = 0** → é removida.
- Busca a página **mais antiga não referenciada recentemente**. Se todas têm R = 1, degenera em FIFO.

Exemplo (cabeça à esquerda, formato R/M):

| Passo | Fila |
|---|---|
| Falta | P1(1/0) P2(1/1) P3(0/0) P4(0/0) P5(1/1) |
| P1 tem R=1 | P2(1/1) P3 P4 P5(1/1) P1(0/0) |
| P2 tem R=1 | P3(0/0) P4 P5(1/1) P1(0/0) P2(0/1) |
| P3 tem R=0: sai (M=0, sem escrita) | P4 P5 P1 P2 PX(1/0) |

## 5. Relógio
- Mesma política, com **lista circular e ponteiro** (sem remover e inserir na fila).
- Apontada com R = 1 → zera e avança. R = 0 → substitui e avança.
- Exemplo: P1(1) → zera; P2(1) → zera; P3(0) → substituída por PX; ponteiro vai a P4.

## 6. LRU (menos recentemente usada)
- Desempenho próximo do ótimo; supõe que o usado recentemente será usado em breve.

> ⚠️ Os slides abreviam como "MRU". Em inglês **MRU = *most* recently used**, o oposto. Aqui trata-se de **LRU**.

- Implementação completa: lista ordenada atualizada **a cada referência** (cara).

### Hardware: matriz N×N
- N molduras, matriz zerada. A cada referência à página i: **linha i ← 1**, depois **coluna i ← 0**.
- A vítima é a linha de **menor valor binário**.
- Exemplo com 4 páginas e acessos `0,1,2,3,2,1,0,3,2,3`. Estado final:

| Página | Linha | Valor |
|---|---|---|
| 0 | 0100 | 4 |
| 1 | 0000 | **0 → vítima** |
| 2 | 1100 | 12 |
| 3 | 1110 | 14 |

### Software: envelhecimento (*aging*)
- Contador de bits por página. A cada tick: desloca à direita e insere **R no bit mais significativo** (e zera R).
- Vítima = menor contador (empate: escolhe uma).

Exemplo da figura (6 páginas, 8 bits, 5 ticks):

| Pág. | R nos ticks 0→4 | Contador final |
|---|---|---|
| 0 | 1 1 1 1 0 | 01111000 |
| 1 | 0 1 1 0 1 | 10110000 |
| 2 | 1 0 0 0 1 | 10001000 |
| 3 | 0 0 1 0 0 | **00100000 → vítima** |
| 4 | 1 1 0 1 0 | 01011000 |
| 5 | 1 0 1 0 0 | 00101000 |

> **[+]** Diferenças para o LRU real: não distingue a ordem dentro de um mesmo tick e o histórico é limitado ao número de bits.

## 7. Conjunto de trabalho
- **Paginação por demanda**: o processo começa sem páginas e as traz conforme as faltas.
- **Princípio da localidade**: em cada fase usa-se pequena fração das páginas; esse é o **conjunto de trabalho**.
- **Pré-paginação** (modelo de conjunto de trabalho): garantir que o conjunto esteja na memória antes de o processo executar.
- No instante t, é o conjunto das páginas nas **últimas k referências**; tamanho **w(k, t)**.
- w é **não decrescente em k** e limitado pelo total de páginas; cresce bem menos que proporcionalmente.
- Falta de página → remover página **fora** do conjunto.
- Guardar as últimas k referências é caro; usa-se **tempo**: páginas acessadas nos últimos τ (ex.: 100 ms) de **tempo virtual** (CPU usada pelo próprio processo).

**Implementação** (entrada com instante do último uso, R, M etc.). Em cada falta, percorrem-se todas as páginas:
1. R = 1 → atualiza o instante com o tempo virtual atual.
2. R = 0 → `idade = tempo atual − último uso`; se idade > τ, **substitui**.
3. Se nenhuma passa de τ, remove a de **maior idade** entre as de R = 0.
4. Se todas têm R = 1, escolhe uma ao acaso (**[+]** preferindo limpa).

## 8. WSClock
- Une conjunto de trabalho e relógio, evitando varrer a tabela inteira. Procura página **fora do conjunto e não modificada**.
- Lista circular de molduras com R, M e instante do último acesso.
- Em cada posição:

| Condição | Ação |
|---|---|
| R = 1 | Zera R (**[+]** atualiza o instante) e avança |
| R = 0, idade > τ, M = 0 | **Substitui** |
| R = 0, idade > τ, M = 1 | **Agenda escrita** e continua |
| R = 0, idade ≤ τ | Avança |

- Se o ponteiro der a volta:
  - **Houve escrita agendada**: continua até achar a primeira página já gravada (a primeira agendada nem sempre é a primeira concluída).
  - **Nenhuma escrita**: pega a primeira com M = 0; se não houver, grava a página atual e usa sua moldura.

## [+] Comparação (classificação de Tanenbaum)
| Algoritmo | Avaliação |
|---|---|
| Ótimo | Impossível; referência |
| NRU | Aproximação grosseira |
| FIFO | Pode jogar fora páginas importantes |
| Segunda chance | Grande melhora sobre FIFO |
| Relógio | Realista |
| LRU | Excelente, difícil de implementar |
| Aging | Boa aproximação eficiente do LRU |
| Conjunto de trabalho | Bom, caro |
| WSClock | Bom e eficiente |

## [+] Exemplo resolvido (3 molduras)
Referências: `7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1` (inclui as faltas iniciais)

| Algoritmo | Faltas |
|---|---|
| Ótimo | 9 |
| LRU | 12 |
| FIFO | 15 |

**Anomalia de Belady**: com `1 2 3 4 1 2 5 1 2 3 4 5`, FIFO tem **9** faltas com 3 molduras e **10** com 4. Algoritmos de pilha (LRU, ótimo) não sofrem dela.

## Pontos de atenção para prova
- Simular FIFO, ótimo, LRU, relógio e aging.
- Dizer que bits cada algoritmo usa.
- Explicar por que preferir vítima não modificada.

## [+] Perguntas de revisão
1. Duas páginas com contadores `00110000` e `01000000`: qual sai? *A primeira (menor), pois a outra teve uso mais recente.*
2. Por que usar tempo virtual no conjunto de trabalho? *Para que a idade não cresça enquanto o processo nem está executando.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 4) e 3ª ed. (cap. 3).
- **[+]** Silberschatz et al., capítulo de memória virtual (exemplos de referências).
