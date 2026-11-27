---
aula: 8
titulo: Escalonamento de processos
fonte: "../slides/8 - Escalonamento.pdf"
topicos: [escalonador, troca de contexto, preemptivo, não preemptivo, FCFS, SJF, SRTN, três níveis, round-robin, quantum, prioridades, filas múltiplas, aging, garantido, loteria, fração justa, tempo real, RMS, EDF, escalonamento de threads]
prerequisitos: [4, 5]
trabalho_relacionado: "../trabalho/Especificação Trabalho.pdf"
---

# Aula 8: Escalonamento

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
O escalonador escolhe qual processo pronto usa a CPU; o algoritmo certo depende do ambiente (lote, interativo, tempo real) e das métricas que se quer otimizar.

## Fundamentos
- Vários processos **prontos** competem pela CPU; o **escalonador** decide usando um **algoritmo de escalonamento**.
- A escolha afeta a percepção de velocidade (o usuário tolera um envio de e-mail lento, mas não uma janela que demora a fechar).
- **Troca de contexto é cara**: entrar em modo núcleo, salvar registradores e mapa de memória, escolher o processo, recarregar o mapa na MMU e os registradores, voltar ao modo usuário.

### CPU-bound × I/O-bound
- CPU-bound: surtos longos de CPU, poucas esperas. I/O-bound: surtos curtos, muitas esperas.
- O que define um processo I/O-bound é o **surto curto de CPU**, não a duração da E/S.
- Entre os dois, convém escolher o **I/O-bound**: ele logo emite um pedido e mantém o disco ocupado.

### Quando escalonar
| Situação | Decisão possível |
|---|---|
| Processo criado | Executar o pai ou o filho |
| Processo termina | Escolher outro; sem prontos, rodar o processo ocioso |
| Processo bloqueia | Escolher outro; se ele esperava um recurso preso por B, pode ser útil rodar B |
| Interrupção de E/S | Pode dar a CPU a quem acabou de ficar pronto |
| Interrupção de relógio | Pode retirar o processo em execução |

### Preemptivo × não preemptivo
- **Preemptivo**: o escalonador **pode retirar** o processo da CPU (tipicamente na interrupção de relógio, ao fim do quantum).
- **Não preemptivo**: ignora a interrupção para esse fim; o processo roda até bloquear, terminar ou ceder a CPU.

> ⚠️ **Erro no slide "Quando escalonar":** os rótulos estão **trocados** ("pode optar por retirar" aparece como não preemptivo). Vale a definição acima, coerente com o restante da aula.

- **Quantum**: tempo concedido a um processo. **Tick**: interrupção de um relógio do hardware.

## Ambientes e objetivos
| Ambiente | Preempção | Objetivos específicos |
|---|---|---|
| Lote | Não preemptivo ou quantum longo (minimiza trocas) | Vazão, tempo de retorno, utilização da CPU |
| Interativo | Necessária | Tempo de resposta, proporcionalidade |
| Tempo real | Nem sempre necessária (processos cooperam e bloqueiam rápido) | Cumprir prazos, previsibilidade |

**Objetivos comuns a todos**
- **Justiça**: processos semelhantes têm tratamento semelhante.
- **Aplicação da política**: o algoritmo respeita a política definida.
- **Equilíbrio**: manter os recursos ocupados (só CPU-bound em memória deixa o disco ocioso; só I/O-bound deixa a CPU ociosa).

**Métricas**
- **Vazão (throughput)**: tarefas concluídas por unidade de tempo.
- **Tempo de retorno (turnaround)**: da submissão à conclusão.
- **Utilização da CPU**: fração do tempo ocupada (não é a melhor métrica).
- **Tempo de resposta**: espera do usuário pela resposta. **[+]** Em simuladores costuma-se medir do pedido até a primeira vez em execução.
- **[+] Tempo de espera**: total na fila de prontos. Sem E/S: espera = retorno − tempo de CPU.
- **Proporcionalidade**: atender a expectativa (tarefas complexas podem demorar, simples não).
- Maximizar vazão **não** minimiza necessariamente o retorno: priorizando tarefas curtas que chegam sem parar, as longas nunca terminam.

## Algoritmos para lote

### FCFS (primeiro a chegar, primeiro a ser servido), não preemptivo
- Fila única; quem bloqueia sai da CPU e, ao voltar a pronto, vai para o **fim**.
- ✅ Simples de entender e implementar.
- ❌ Prejudica I/O-bound. Exemplo: um processo CPU-bound que roda 1 s por vez antes de fazer E/S, junto a 5 processos I/O-bound que precisam de 1000 operações cada: cada um destes leva cerca de 1000 s. **[+]** É o **efeito comboio**.

### SJF (job mais curto primeiro), não preemptivo
- Supõe tempo de execução **conhecido**. Escolhe o menor entre os prontos de mesma prioridade.
- Jobs A, B, C, D com 8, 4, 3, 2 min:

| Ordem | Conclusões | Média |
|---|---|---|
| A B C D | 8, 12, 15, 17 | **13** |
| D C B A | 2, 5, 9, 17 | **8,25** |

> Os slides chamam esses valores de "tempo de resposta"; formalmente são tempos de **retorno**.

- ❌ Se chegar um job menor, não há como interromper o atual.
- **[+]** É ótimo para tempo médio de retorno **quando todos os jobs estão disponíveis ao mesmo tempo**.

### SRTN (próximo de menor tempo restante), preemptivo
- Versão preemptiva do SJF: se o job que chega precisa de **menos tempo que o restante** do atual, assume a CPU.
- Figura: C em execução (parte já feita), fila B, A. Chega D, menor que o restante de C: D executa e C volta para a frente da fila.
- **[+]** Pode causar inanição de jobs longos.

### Escalonamento em três níveis
| Escalonador | Decide |
|---|---|
| **Admissão** | Quais jobs entram no sistema e quais ficam na fila de entrada |
| **Memória** | Quais admitidos ficam na memória e quais em disco (faz trocas). Ex.: 5 jobs que usam ~20% de CPU cada ocupam bem a CPU |
| **CPU** | Qual processo pronto em memória executa (qualquer algoritmo) |

## Algoritmos para sistemas interativos
Usados em PCs, servidores e outros.

### Round-robin (circular), preemptivo
- Lista de prontos; cada um recebe um **quantum**; ao esgotá-lo, ou ao voltar de um bloqueio, vai para o **fim**.
- Figura: lista B, F, D, G, A; após o quantum de B: F, D, G, A, B.
- Simples, justo, muito usado.
- **Tamanho do quantum**: pequeno → troca de contexto proporcionalmente cara; grande → demora para obter a CPU.
- **[+]** Com troca de 1 ms e quantum de 4 ms, 20% se perde. Quantum muito grande degenera em FCFS. Faixa usualmente recomendada: 20 a 50 ms.

### Por prioridades
- Executa o de maior prioridade.
- Para evitar monopólio: reduzir a prioridade a cada tick; quando cair abaixo do próximo, preemptar.
- Alternativa dinâmica: **prioridade = 1/f**, onde f é a fração usada do último quantum (usou 1/50 → prioridade 50), favorecendo I/O-bound.
- **Classes de prioridade** com round-robin dentro de cada uma; só se desce de classe quando as superiores estão vazias.
- É preciso **reajustar prioridades** para evitar inanição.

### Filas múltiplas
- Classes com quanta 1, 2, 4, 8...
- Todos começam na **classe mais alta**; quem usa todo o quantum **desce** (menos prioridade, mais tempo por vez).
- Penaliza CPU-bound e reduz trocas de contexto para eles.
- **[+]** Um processo de 100 quanta recebe 1, 2, 4, 8, 16, 32 e 64 (usa 37 deste último): **7** trocas em vez de 100. Criado no sistema CTSS.

### Próximo processo mais curto
- SJF aplicado a processos interativos (cada comando é um "job").
- Estima pelo passado: técnica de **envelhecimento (aging)**. Média ponderada `a·T0 + (1−a)·T1`, repetida a cada nova medida.
- Com a = ½: `T0`; `T0/2 + T1/2`; `T0/4 + T1/4 + T2/2`; `T0/8 + T1/8 + T2/4 + T3/2`; `T0/16 + T1/16 + T2/8 + T3/4 + T4/2`.
- A constante `a` controla a rapidez com que medidas antigas são esquecidas.
- **[+]** Forma geral: `S(n+1) = a·S(n) + (1−a)·T(n)`, onde S é a estimativa e T a medida. Quanto menor `a` nesta forma, mais rápido o esquecimento.

### Garantido
- Divide a CPU igualmente entre usuários (ou processos).
- Mantém o tempo de CPU usado e o tempo desde a criação.
- **Razão = TP / (TS / n)**: TP = tempo usado pelo processo; TS = tempo de CPU usado por todos os existentes; n = número de processos. Executa quem tem a **menor** razão até se aproximar dos demais.

### Loteria
- Processos recebem bilhetes; a cada decisão sorteia-se um.
- Fração `f` dos bilhetes ≈ fração `f` da CPU. Mais bilhetes = mais prioridade.
- **[+]** Processos cooperantes podem transferir bilhetes. Qualquer processo com ≥ 1 bilhete acaba sorteado (probabilisticamente sem inanição).

### Fração justa
- Problema: A tem 1 processo e B tem 9; B ficaria com 90% da CPU (vale também para processos com mais threads).
- Solução: cota **por usuário**.
- U com A, B, C, D e V com E:
  - 50/50: `A E B E C E D E A E B E ...`
  - 2/3 para U e 1/3 para V: `A B E C D E A B E C D E ...`

## Tempo real
- Resposta fora do prazo é indesejável ou inadmissível. Ex.: áudio/vídeo, monitor de pacientes, piloto automático, reator nuclear.
- **Críticos (hard)**: atraso inadmissível. **Não críticos (soft)**: tolerável, mas indesejável.
- Eventos **periódicos** ou **aperiódicos**.

### Teste de escalonabilidade
Para m eventos periódicos, com C_i = tempo de CPU para tratar o evento i e P_i = período:

```
C1/P1 + C2/P2 + ... + Cm/Pm  ≤  1
```

Exemplo: períodos 100, 200, 500 ms e custos 50, 30, 100 ms → 0,50 + 0,15 + 0,20 = **0,85 ≤ 1**, escalonável. **[+]** Sobra folga para um 4º evento com C/P ≤ 0,15 (ignorando o custo das trocas).

### RMS (taxa monotônica): prioridade estática
Condições:
1. Cada processo periódico termina dentro do período.
2. Processos independentes.
3. Mesmo tempo de CPU em todas as ocorrências.
4. Processos não periódicos não têm prazos.
5. Preempção instantânea e sem custo.

Prioridade = **frequência** do evento (menor período, maior prioridade). Há preempção quando fica pronto um de prioridade maior.

### EDF (prazo mais curto primeiro): prioridade dinâmica
- Processos anunciam presença e **deadline**; executa o de prazo mais próximo; há preempção se surgir prazo mais curto.

### Exemplos das figuras (RMS × EDF)
| Caso | A (C/P) | B (C/P) | C (C/P) | Utilização | RMS | EDF |
|---|---|---|---|---|---|---|
| 1 | 10/30 | 15/40 | 5/50 | 0,808 | ✅ | ✅ |
| 2 | 15/30 | 15/40 | 5/50 | 0,975 | ❌ | ✅ |

Caso 2:
- RMS: A1 0–15, B1 15–30, A2 30–45, B2 45–60; **C1 perde o prazo em t = 50**.
- EDF: A1 0–15, B1 15–30, C1 30–35, A2 35–50, B2 50–65, A3 65–80, C2 80–85, B3 85–100, A4 100–115, C3 115–120, A5 120–135, B4 135–150.

> **[+]** Limite suficiente do RMS (Liu e Layland): garantido se `U ≤ m(2^(1/m) − 1)`: m = 2 → 0,828; m = 3 → 0,780; m → ∞ → ln 2 ≈ 0,693. Não é necessário: o caso 1 excede 0,780 e funciona. EDF (preemptivo, uma CPU, prazo = período) é garantido se `U ≤ 1`.

## Escalonamento de threads
| | Nível de usuário | No núcleo |
|---|---|---|
| Quem o SO escalona | Processos | Threads |
| Quem escolhe a thread | Escalonador interno do processo | SO |
| Preempção entre threads | Não há | Há |
| Thread que não libera a CPU | Prejudica só o próprio processo; continua de onde parou no próximo quantum | SO pode preemptar |
| Conhecimento da aplicação | Pode saber o que cada thread faz e escolher melhor | No máximo dá prioridades; pode considerar o custo e preferir thread do mesmo processo |

## [+] Exemplo resolvido para estudo
| Processo | Chegada | CPU |
|---|---|---|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 2 |

Convenção do RR: quem chega entra na fila antes do processo preemptado no mesmo instante.

| Algoritmo | Linha do tempo | Retorno médio | Espera média |
|---|---|---|---|
| FCFS | P1 0–8, P2 8–12, P3 12–14 | 10,33 | 5,67 |
| SJF | P1 0–8, P3 8–10, P2 10–14 | 9,67 | 5,00 |
| SRTN | P1 0–1, P2 1–2, P3 2–4, P2 4–7, P1 7–14 | 7,33 | 2,67 |
| RR (q=3) | P1 0–3, P2 3–6, P3 6–8, P1 8–11, P2 11–12, P1 12–14 | 10,33 | 5,67 |

Tempo de resposta médio (até a 1ª execução): SRTN = 0; RR = 2. RR melhora a resposta em relação ao FCFS, não o retorno.

## [+] Tabela-síntese
| Algoritmo | Preemptivo | Inanição possível | Precisa saber tempos |
|---|---|---|---|
| FCFS | Não | Não (se todo surto termina) | Não |
| SJF | Não | Sim | Sim |
| SRTN | Sim | Sim | Sim |
| RR | Sim | Não | Não |
| Prioridades | Em geral | Sim, sem reajuste | Não |
| Filas múltiplas | Sim | Sim, para classes baixas | Não |
| Loteria | Sim | Improvável | Não |
| RMS / EDF | Sim | Perde prazos em sobrecarga | Sim (C e P ou prazo) |

> **[+]** Na prática: Linux usou o CFS (fração proporcional por tempo virtual) e, desde o kernel 6.6, o EEVDF; há ainda as classes `SCHED_FIFO`, `SCHED_RR` e `SCHED_DEADLINE`. Windows usa prioridades preemptivas com round-robin por nível.

## [+] Ligação com o trabalho da disciplina
O trabalho (2ª avaliação periódica) pede um **simulador de escalonador**: uma CPU, entrada `<chegada>: <CPU1>, <E/S1>, ..., <CPUn>`, pelo menos 2 algoritmos (1 preemptivo), quantum em ciclos, sem custo de troca de contexto, e relatório SBC de até 6 páginas comparando vazão e tempo de resposta. Detalhes na [especificação](../trabalho/Especificação%20Trabalho.pdf).
- Cuidado conceitual: como a troca de contexto é ignorada, o simulador não penaliza quantum pequeno; vale citar isso na análise.

## Exercícios dos slides
1. (F) Não há objetivos comuns entre tipos de SO. *Justiça, aplicação da política e equilíbrio valem para todos.*
2. (F) É melhor dar a CPU a um CPU-bound que a um I/O-bound. *O I/O-bound usa pouco a CPU e logo mantém o disco ocupado.*
3. (F) Todos os algoritmos de lote são não preemptivos. *O SRTN é preemptivo.*
4. (F) No round-robin um processo pode nunca ser escalonado. *A fila circular garante a vez de todos os processos prontos.*
5. (V) Filas múltiplas penalizam quem usa muita CPU.
6. (F) Na loteria é impossível priorizar. *Basta dar mais bilhetes ao processo.*
7. (F) A principal diferença entre RMS e EDF é que RMS não faz preempção. *Ambos fazem preempção; a diferença é a prioridade estática (RMS) ou dinâmica (EDF).*
8. (F) EDF tem prioridades estáticas. *No EDF a prioridade muda conforme o prazo mais próximo.*
9. (V) No RMS a prioridade se relaciona à frequência do evento.

## [+] Perguntas de revisão
1. O que acontece com o round-robin quando o quantum é maior que todos os surtos de CPU? *Nenhum processo é preemptado: ele se comporta como FCFS.*
2. Um sistema tem eventos com C/P iguais a 20/50 e 35/80 ms. É escalonável? *0,40 + 0,4375 = 0,8375 ≤ 1: sim. O RMS não tem garantia pelo limite de 0,828, então é preciso simular; o EDF garante.*
3. Qual algoritmo minimiza o tempo médio de retorno quando todos os jobs chegam juntos? *Job mais curto primeiro (SJF).*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (2003) e 3ª ed. (2010), seção 2.5.
- **[+]** Liu, C. L.; Layland, J. W. *Scheduling algorithms for multiprogramming in a hard-real-time environment*. JACM, 1973.
