# Lista 2

> Fonte: `../listas/lista 2.pdf`. As respostas são **sugestões**, não são gabarito do professor. `★` = recomendada para a prova (critério sugerido, não do professor).

### 1 ★
O que são condições de corrida? O que são regiões críticas? Qual a relação entre elas?

Por que cai: conceito que sustenta todo o bloco de IPC.

Material: 06-ipc#condicoes-de-corrida; 06-ipc#regioes-criticas

#### Resposta
**Condição de corrida**: processos acessam dados compartilhados e o resultado depende de quem executa e quando. **Região crítica**: trecho do programa que acessa os dados compartilhados. Relação: a corrida acontece quando dois processos estão ao mesmo tempo em regiões críticas sobre o mesmo recurso; garantir **exclusão mútua** nessas regiões a evita.

### 2
Por que não é interessante desabilitar interrupções antes da entrada em regiões críticas?

Material: 06-ipc#desabilitar-interrupcoes

#### Resposta
Dá a processos de usuário um poder perigoso: se um deles não reabilitar (erro ou má-fé), o sistema para. Além disso, em multiprocessadores a desativação afeta só uma CPU, e outra pode entrar na região crítica. É uma técnica usada pelo próprio núcleo.

### 3 ★
Quais os critérios que boas soluções devem atender para resolver condições de corrida?

Por que cai: quatro condições para decorar e aplicar.

Material: 06-ipc#regioes-criticas

#### Resposta
1. Dois processos nunca estão simultaneamente em suas regiões críticas.
2. Nada se pode supor sobre velocidade ou número de CPUs.
3. Nenhum processo fora da região crítica pode bloquear outro.
4. Nenhum processo espera eternamente para entrar.

### 4
Explique o que é espera ociosa no contexto de IPC.

Material: 06-ipc#solucoes-com-espera-ociosa; 06-ipc#problemas-da-espera-ociosa

#### Resposta
O processo fica em um **laço testando** uma condição até poder entrar na região crítica. Consome CPU sem trabalho útil e pode causar **inversão de prioridade**.

### 5
Cite três soluções para problemas de IPC com espera ocupada.

Material: 06-ipc#solucoes-com-espera-ociosa

#### Resposta
**Alternância obrigatória**, **solução de Peterson** e **instrução TSL** (*test and set lock*).

### 6
Qual o problema do método de alternância obrigatória?

Material: 06-ipc#alternancia-obrigatoria

#### Resposta
Obriga os processos a se **revezarem**. Se um deles tem região não crítica longa, o outro, que quer entrar de novo, fica esperando a vez mesmo com a região crítica livre. Viola a condição 3: um processo fora da região crítica bloqueia outro.

### 7
Explique as operações *sleep* e *wakeup*.

Material: 06-ipc#sleep-e-wakeup

#### Resposta
São chamadas de sistema. `sleep` bloqueia quem a chama até que outro o acorde. `wakeup(p)` acorda o processo `p`. Evitam a espera ociosa.

### 8 ★
O que pode dar errado no produtor-consumidor com *sleep* e *wakeup*? Por quê?

Por que cai: exige explicar um escalonamento passo a passo.

Material: 06-ipc#produtor-consumidor-buffer-limitado

#### Resposta
O sinal de acordar pode ser **perdido**:
1. Buffer vazio; o consumidor lê `count == 0` e perde a CPU **antes** de executar `sleep`.
2. O produtor insere um item, faz `count = 1` e chama `wakeup(consumidor)`, que não tem efeito, pois ele está acordado.
3. O consumidor volta e dorme.
4. O produtor enche o buffer e também dorme. Ambos dormem para sempre.

Causa: o teste de `count` e o `sleep` **não são atômicos**; há uma condição de corrida sobre `count`.

### 9 ★
O que é um semáforo? Quais operações podem ser realizadas? Qual a relação entre semáforos e mutexes?

Por que cai: base dos problemas clássicos e do produtor-consumidor.

Material: 06-ipc#semaforos-dijkstra-1965; 06-ipc#mutexes

#### Resposta
Variável inteira não negativa que conta sinais de acordar pendentes. Operações **atômicas**: `down` (se maior que zero, decrementa; se zero, bloqueia) e `up` (incrementa e permite que um bloqueado complete seu `down`). O **mutex** é a versão simplificada com apenas dois estados (travado e livre), usado só para exclusão mútua (`mutex_lock`/`mutex_unlock`), quando não é preciso contar.

### 10
O que são monitores?

Material: 06-ipc#monitores-hoare-e-brinch-hansen

#### Resposta
Construção de **linguagem de programação** que reúne dados privados e procedimentos, garantindo que **apenas um processo esteja ativo** dentro dele por vez. O compilador implementa a exclusão mútua. Usa variáveis condicionais para espera e sinalização. Ex.: `synchronized` em Java.

### 11
Explique troca de mensagens entre processos, suas duas primitivas e como funcionam.

Material: 06-ipc#passagem-de-mensagem

#### Resposta
Processos se comunicam enviando mensagens, sem exigir memória compartilhada (podem estar em máquinas diferentes). `send` envia uma mensagem, que entra na fila do destinatário. `receive` retira uma mensagem da fila; se não houver, bloqueia o processo até chegar. É preciso tratar perdas (confirmação), duplicatas (identificadores) e autenticação.

### 12
O que são barreiras e como funcionam?

Material: 06-ipc#barreiras

#### Resposta
Mecanismo para sincronizar um **grupo** de processos entre fases. Cada um chama `barrier` ao terminar a fase e fica bloqueado até **todos** chegarem; então todos prosseguem.

### 13 ★
Que problemas reais o jantar dos filósofos, os leitores e escritores e o barbeiro sonolento modelam? Como resolvê-los?

Por que cai: reúne os três problemas clássicos.

Material: 07-problemas-classicos-ipc#visao-geral; 07-problemas-classicos-ipc#solucao-eficiente

#### Resposta
- **Filósofos**: processos disputando acesso exclusivo a um número limitado de recursos (ex.: dispositivos de E/S). Solução: vetor de estados e um semáforo por filósofo; só come quem não tem vizinho comendo; um mutex protege os estados.
- **Leitores e escritores**: acesso a uma base de dados, com leituras concorrentes e escrita exclusiva. Solução: contador de leitores protegido por mutex; o primeiro leitor trava a base e o último libera. Para não deixar o escritor em inanição, bloquear novos leitores quando ele chegar.
- **Barbeiro sonolento**: fila de atendimento limitada (ex.: telemarketing). Solução: semáforos `customers` e `barbers`, um mutex e um contador de clientes esperando; cliente sem cadeira vai embora.

### 14
Quais os objetivos comuns a todos os escalonadores?

Material: 08-escalonamento#ambientes-e-objetivos

#### Resposta
**Justiça** (processos semelhantes, tratamento semelhante), **aplicação da política** definida e **equilíbrio** (manter os recursos do sistema ocupados).

### 15 ★
Quais os objetivos de um escalonador para sistemas em lote, interativos e de tempo real?

Por que cai: classificação que costuma ser cobrada.

Material: 08-escalonamento#ambientes-e-objetivos

#### Resposta
- **Lote**: maximizar a **vazão**, minimizar o **tempo de retorno** e manter alta a utilização da CPU.
- **Interativo**: minimizar o **tempo de resposta** e atender a **proporcionalidade** (expectativas do usuário).
- **Tempo real**: **cumprir prazos** e ter **previsibilidade**.

### 16
O que são algoritmos de escalonamento preemptivos?

Material: 08-escalonamento#preemptivo-nao-preemptivo

#### Resposta
São os que **podem retirar** o processo da CPU antes de ele bloquear ou terminar, por exemplo ao fim do quantum ou quando surge um de maior prioridade.

⚠️ O slide "Quando escalonar" traz os rótulos trocados; use a definição acima.

### 17 ★
Explique o *round-robin*. Qual a importância do quantum?

Por que cai: algoritmo mais usado; relação com troca de contexto.

Material: 08-escalonamento#round-robin-circular-preemptivo

#### Resposta
Mantém uma fila circular de prontos; cada processo executa por até um **quantum**. Ao esgotá-lo, é preemptado e vai para o fim; se bloquear antes, volta ao fim quando ficar pronto. O quantum define o equilíbrio: **pequeno** gera muitas trocas de contexto e desperdício proporcional; **grande** aumenta o tempo de resposta e aproxima o algoritmo do FCFS.

### 18
Qual a diferença entre o escalonamento por classes de prioridades e o de filas múltiplas?

Material: 08-escalonamento#por-prioridades; 08-escalonamento#filas-multiplas

#### Resposta
Nas **classes de prioridades**, a classe reflete a importância do processo e usa-se round-robin dentro dela, com o mesmo quantum; só se atende uma classe se as superiores estiverem vazias, sendo preciso reajustar prioridades. Nas **filas múltiplas**, a classe depende do **uso de CPU**: cada nível tem quantum diferente (1, 2, 4, 8...); quem esgota o quantum desce, ganhando menos prioridade e fatias maiores.

### 19
Qual o critério para um sistema de tempo real ser escalonável?

Material: 08-escalonamento#teste-de-escalonabilidade

#### Resposta
Para m eventos periódicos, com Cᵢ o tempo de CPU e Pᵢ o período:
```
C1/P1 + C2/P2 + ... + Cm/Pm  ≤  1
```

### 20 ★
Eventos A, B, C e D têm períodos de 50, 100, 200 e 250 ms e requerem 35, 20, 10 e x ms de CPU. (a) Com x = 25 ms, é escalonável? (b) Qual o maior x para que seja?

Por que cai: questão numérica direta.

Material: 08-escalonamento#teste-de-escalonabilidade

#### Resposta
Parte fixa: 35/50 + 20/100 + 10/200 = 0,70 + 0,20 + 0,05 = **0,95**.

**a)** 25/250 = 0,10 → total **1,05 > 1**: **não** é escalonável.

**b)** x/250 ≤ 0,05 → **x ≤ 12,5 ms**.

### 21 ★
Qual a diferença entre RMS e EDF?

Por que cai: comparação com figura nos slides.

Material: 08-escalonamento#rms-taxa-monotonica-prioridade-estatica; 08-escalonamento#exemplos-das-figuras-rms-edf

#### Resposta
Ambos são preemptivos. **RMS** usa prioridade **estática**, proporcional à frequência do evento (menor período, maior prioridade), e exige processos periódicos, independentes e com custo constante. **EDF** usa prioridade **dinâmica**: executa quem tem o **prazo mais próximo**. O EDF consegue escalonar casos de alta utilização em que o RMS perde prazos.
