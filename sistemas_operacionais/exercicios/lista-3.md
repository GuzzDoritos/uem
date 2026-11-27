# Lista 3

> Fonte: `../listas/lista 3.pdf`. As respostas são **sugestões**, não são gabarito do professor. `★` = recomendada para a prova (critério sugerido, não do professor).

### 1
O que são deadlocks? Como podem ocorrer? Cite uma situação.

Material: 09-deadlocks#definicao

#### Resposta
Um conjunto de processos está em deadlock quando cada um espera um evento que só outro do conjunto pode causar. Ocorre tipicamente quando processos **retêm** recursos exclusivos e **pedem** outros já retidos, fechando um ciclo. Ex.: A tem a unidade de fita e pede o CD-ROM; B tem o CD-ROM e pede a fita.

### 2
Quais os dois tipos de recursos? Qual a relação deles com deadlocks?

Material: 09-deadlocks#recursos

#### Resposta
**Preemptíveis**: podem ser retirados do processo sem prejuízo (ex.: memória com troca). **Não preemptíveis**: retirá-los causa falha (ex.: gravador de CD). Deadlocks envolvem recursos **não preemptíveis**; com preemptíveis, em geral basta realocar.

### 3 ★
Quais as quatro condições que causam deadlocks de recursos? Explique cada uma.

Por que cai: é a questão mais clássica do assunto.

Material: 09-deadlocks#as-quatro-condicoes-coffman

#### Resposta
1. **Exclusão mútua**: cada recurso está livre ou com um único processo.
2. **Posse e espera**: quem tem recursos pode pedir outros.
3. **Não preempção**: o recurso só é liberado por quem o detém.
4. **Espera circular**: há uma cadeia circular em que cada processo espera um recurso do seguinte.

As quatro precisam estar presentes.

### 4 ★
Há 5 recursos (R1 a R5) e 3 processos (P1 a P3). Mostre o grafo resultante de cada ordem de requisições e diga se há deadlock.

**a)** P1→R1; P2→R2; P2→R3; P3→R5; P1→R4; P1→R2; P2→R5; P3→R4

**b)** P1→R1; P1→R2; P1→R3; P2→R4; P3→R5; P2→R3; P3→R3

*(P→R significa "P requisita R".)*

Por que cai: aplicação direta do grafo de alocação.

Material: 09-deadlocks#modelagem-com-grafos-dirigidos; 09-deadlocks#exemplo-a-ordem-de-escalonamento-importa

#### Resposta
Convenção: `R → P` = P detém R; `P → R` = P espera R.

**a)** P1 obtém R1; P2 obtém R2 e R3; P3 obtém R5; P1 obtém R4; P1 pede R2 e bloqueia; P2 pede R5 e bloqueia; P3 pede R4 e bloqueia.
```
R1 → P1        R4 → P1
R2 → P2        R3 → P2
R5 → P3
P1 → R2        P2 → R5        P3 → R4

Ciclo: P1 → R2 → P2 → R5 → P3 → R4 → P1
```
**Há deadlock** entre P1, P2 e P3.

**b)** P1 obtém R1, R2 e R3; P2 obtém R4; P3 obtém R5; P2 pede R3 e bloqueia; P3 pede R3 e bloqueia.
```
R1 → P1    R2 → P1    R3 → P1
R4 → P2    R5 → P3
P2 → R3    P3 → R3
```
**Não há ciclo, logo não há deadlock.** P1 não espera nada; ao terminar, libera R3 e P2 e P3 prosseguem, um de cada vez.

### 5 ★
Quais as quatro principais técnicas contra deadlocks? Explique cada uma.

Por que cai: organiza todo o capítulo.

Material: 09-deadlocks#estrategias; 09-deadlocks#5-prevencao

#### Resposta
1. **Ignorar** (algoritmo do avestruz): agir como se não ocorresse.
2. **Detectar e recuperar**: deixar ocorrer, detectar (ciclos ou matrizes) e recuperar por preempção, retrocesso ou eliminação de processos.
3. **Anulação dinâmica**: só conceder pedidos que mantenham o sistema em estado seguro (algoritmo do banqueiro).
4. **Prevenção**: negar estruturalmente uma das quatro condições (spooling, pedir tudo antes, retomar recursos, ordenar recursos).

### 6
Qual dessas técnicas é a mais usada pelos sistemas operacionais? Por quê?

Material: 09-deadlocks#1-algoritmo-do-avestruz

#### Resposta
O **algoritmo do avestruz**, adotado por Unix e Windows: deadlocks são raros e detectar, evitar ou prevenir custa caro em desempenho e impõe restrições aos programas.

### 7
O que é *starvation*? Qual a diferença para deadlock? Como evitar?

Material: 09-deadlocks#starvation-inanicao

#### Resposta
**Inanição**: um processo nunca consegue o recurso (ou a CPU) por causa da política de alocação. No **deadlock**, o conjunto de processos fica parado para sempre, sem progresso; na **inanição**, o sistema continua progredindo, mas alguém é sempre preterido. Evita-se com política **FIFO** (atender por ordem de chegada) ou aumentando a prioridade de quem espera há muito tempo.
