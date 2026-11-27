# Lista 1

> Fonte: `../listas/lista 1.pdf`. As respostas são **sugestões**, não são gabarito do professor. `★` = recomendada para a prova (critério sugerido, não do professor).

### 1
Quais as duas principais funções de um sistema operacional? Descreva citando exemplos.

Material: 02-conceitos-basicos#o-que-e-um-sistema-operacional

#### Resposta
1. **Máquina estendida**: oferece uma interface mais simples que a do hardware, por chamadas de sistema. Ex.: para ler um arquivo basta abrir, ler e fechar, sem lidar com trilhas, setores e posicionamento da cabeça.
2. **Gerenciador de recursos**: aloca CPU, memória, discos e impressora entre programas concorrentes, evitando conflitos. A CPU é compartilhada no **tempo** e a memória no **espaço**. Ex.: o spool impede que saídas de programas se misturem na impressora.

### 2 ★
Quais as diferentes estruturas de sistemas operacionais? Explique cada uma delas.

Por que cai: comparação clássica, com vários itens.

Material: 03-estruturas-e-interrupcoes#estruturas-de-sos

#### Resposta
- **Monolítico**: todo o SO é um único programa em modo núcleo, com procedimentos que se chamam livremente. Rápido; uma falha derruba tudo.
- **Camadas**: hierarquia em que cada camada usa serviços das inferiores (THE, MULTICS). Organizado e fácil de depurar; requisições atravessam várias camadas.
- **Microkernel**: núcleo mínimo (mecanismo); drivers e servidores em modo usuário (política). Mais confiável; custa em comunicação. Ex.: MINIX.
- **Cliente-servidor**: processos clientes pedem serviços a servidores por troca de mensagens, na mesma máquina ou em rede.
- **Máquinas virtuais**: um hipervisor cria cópias do hardware, cada uma com seu SO. Tipo 1 roda sobre o hardware; tipo 2, como aplicação.
- **Exonúcleo**: em vez de clonar, particiona os recursos entre as VMs e apenas as isola.

### 3
O que são interrupções? O que uma interrupção causa?

Material: 03-estruturas-e-interrupcoes#interrupcoes

#### Resposta
São sinais que informam a ocorrência de um evento. Causam uma mudança no fluxo de execução: a CPU suspende o que fazia, salva o contexto, passa ao modo núcleo e executa a **rotina de tratamento** correspondente. Depois, o processo interrompido (ou outro escolhido pelo escalonador) volta a executar.

### 4
Quais tipos de interrupções podem ocorrer? Descreva cada uma delas.

Material: 03-estruturas-e-interrupcoes#interrupcoes

#### Resposta
- **Hardware**: eventos externos à instrução, como o relógio e pedidos de dispositivos de E/S.
- **Software**: solicitadas pelo programa, com a instrução TRAP (chamadas de sistema).
- **Exceções**: uso indevido de instruções ou dados, como divisão por zero, overflow ou acesso inválido.

### 5
Interrupções são eventos raros? Por quê?

Material: 03-estruturas-e-interrupcoes#mecanismos-de-protecao

#### Resposta
**Não.** São muito frequentes: o relógio interrompe periodicamente (dezenas a centenas de vezes por segundo ou mais), cada operação de E/S concluída gera interrupção e os programas fazem chamadas de sistema o tempo todo. É o mecanismo que permite ao SO retomar o controle e implementar a multiprogramação.

### 6 ★
Qual a diferença entre modo usuário e modo núcleo na CPU?

Por que cai: base para proteção, chamadas de sistema e E/S.

Material: 02-conceitos-basicos#modos-de-execucao-da-cpu; 03-estruturas-e-interrupcoes#mecanismos-de-protecao

#### Resposta
No **modo núcleo** a CPU executa qualquer instrução e acessa todo o hardware; é onde roda o kernel. No **modo usuário** só um subconjunto é permitido: instruções privilegiadas (E/S, proteção de memória, inibir interrupções) não podem ser executadas. Passa-se de usuário para núcleo por interrupção/TRAP e volta-se com uma instrução.

### 7
Qual a diferença entre as chamadas de sistema `fork` e `execv`?

Material: 04-processos#criacao-de-processos

#### Resposta
`fork` **cria um novo processo**, cópia do pai; ambos continuam a partir do mesmo ponto (retorna 0 no filho e o PID do filho no pai). `execv` **não cria processo**: substitui a imagem (código, dados e pilha) do processo atual por outro programa, mantendo o PID, e só retorna em caso de erro. O uso comum é `fork` seguido de `execv` no filho.

### 8 ★
O que é uma *trap*? Quais os efeitos causados por uma *trap* no processador?

Por que cai: liga interrupções, modos da CPU e chamadas de sistema.

Material: 02-conceitos-basicos#modos-de-execucao-da-cpu

#### Resposta
É uma **interrupção de software**: uma instrução usada pelo programa para pedir um serviço ao SO. Efeitos: o contexto (PC, estado) é salvo, a CPU **muda de modo usuário para modo núcleo**, desvia para um endereço definido pelo SO, executa o serviço e depois retorna ao modo usuário na instrução seguinte.

### 9
O que são processos?

Material: 04-processos#multiprogramacao-e-modelo-de-processos

#### Resposta
Um processo é um **programa em execução**, junto com seu espaço de endereçamento (código, dados, pilha), contador de programa, registradores e demais informações (arquivos abertos, identificadores). É uma instância: o mesmo programa executado duas vezes gera dois processos.

### 10
O que é pseudoparalelismo?

Material: 04-processos#multiprogramacao-e-modelo-de-processos

#### Resposta
É a **ilusão de simultaneidade** em uma CPU: ela alterna rapidamente entre processos (dezenas a centenas de milissegundos cada), de modo que vários avançam em um segundo, embora em cada instante só um execute.

### 11 ★
Faça um diagrama dos estados e transições de um processo, explique cada estado e como ocorrem as transições.

Por que cai: questão central de processos, pede desenho e explicação.

Material: 04-processos#estados-e-transicoes

#### Resposta
```
            ┌──────────────┐
      ┌─────│ Em execução  │─────┐
     (1)    └──────▲───────┘    (2)
      │           (3)            │
      ▼            │             ▼
 ┌───────────┐     └───────── ┌────────┐
 │ Bloqueado │──────(4)─────▶ │ Pronto │
 └───────────┘                └────────┘
```
- **Em execução**: usando a CPU agora.
- **Pronto**: pode executar, só espera a CPU.
- **Bloqueado**: não pode prosseguir até um evento externo.

1. Execução → Bloqueado: precisa esperar E/S ou outro evento.
2. Execução → Pronto: o escalonador o retira da CPU.
3. Pronto → Execução: o escalonador o escolhe.
4. Bloqueado → Pronto: o evento esperado ocorreu.

Não existem Bloqueado → Execução nem Pronto → Bloqueado.

### 12
Cite três eventos que podem inicializar um processo em sistemas de propósito geral.

Material: 04-processos#criacao-de-processos

#### Resposta
Quaisquer três destes: **início do sistema**; **chamada de sistema** de criação feita por um processo em execução; **requisição do usuário**; **início de uma tarefa em lote**.

### 13 ★
Quais as quatro principais maneiras de um processo encerrar sua execução? Explique cada uma.

Por que cai: lista fechada de quatro itens.

Material: 04-processos#termino-de-processos

#### Resposta
1. **Saída normal** (voluntária): terminou o trabalho e avisa o SO.
2. **Saída por erro** (voluntária): detecta um problema e encerra, como um compilador que recebe um arquivo inexistente.
3. **Erro fatal** (involuntária): falha como instrução ilegal ou acesso indevido à memória.
4. **Cancelamento por outro processo** (involuntária): `kill` no POSIX, `TerminateProcess` no Windows.

### 14
Qual recurso o SO utiliza para gerenciar e manter as informações de um processo?

Material: 04-processos#implementacao-tabela-de-processos

#### Resposta
A **tabela de processos**, com uma entrada por processo (PCB) contendo registradores, PC, PSW, ponteiro de pilha, estado, prioridade, identificadores, informações de memória e de arquivos.

### 15
Quando ocorrem atualizações nas informações dos processos?

Material: 04-processos#implementacao-tabela-de-processos

#### Resposta
Principalmente quando ocorrem **interrupções** (incluindo chamadas de sistema e o relógio): a rotina de tratamento salva o estado do processo em execução na tabela. As informações também mudam em transições de estado, para que o processo possa ser retomado exatamente de onde parou.

### 16
Qual a diferença entre processos I/O-bound e CPU-bound?

Material: 08-escalonamento#cpu-bound-i-o-bound; 04-processos#cpu-bound-i-o-bound

#### Resposta
**CPU-bound** passa a maior parte do tempo computando: surtos longos de CPU e poucas esperas. **I/O-bound** passa a maior parte bloqueado em E/S: surtos curtos de CPU. O que caracteriza o I/O-bound é o surto curto de CPU, e não a duração da E/S. Um processo pode mudar de perfil.

### 17
O que são *threads*?

Material: 05-threads#conceito

#### Resposta
São **linhas de execução dentro de um processo** ("processos leves"). Compartilham espaço de endereçamento e recursos, mas cada uma tem seu contador de programa, registradores, pilha e estado.

### 18
Quais os principais motivos para o uso de *threads*?

Material: 05-threads#por-que-usar-threads

#### Resposta
Várias atividades ao mesmo tempo no mesmo programa; criação e destruição mais rápidas que as de processos; ganho de desempenho quando há E/S sobreposta a computação; e aproveitamento de múltiplas CPUs.

### 19
Cite três informações que o gerenciador de *threads* deve armazenar para cada uma e explique por que são exclusivas.

Material: 05-threads#conceito

#### Resposta
- **Contador de programa**: cada thread está em um ponto diferente do código.
- **Registradores**: guardam os valores de trabalho daquela execução; precisam ser salvos na troca.
- **Pilha**: cada thread tem sua própria sequência de chamadas, variáveis locais e retornos.

(Também o **estado**: uma pode estar bloqueada enquanto outra executa.)

### 20 ★
Quais as duas implementações mais comuns para *threads*? Explique cada uma, com vantagens e desvantagens.

Por que cai: comparação com muitos pontos; também aparece em escalonamento.

Material: 05-threads#implementacoes

#### Resposta
**No espaço de usuário**: o núcleo não conhece as threads; um sistema de tempo de execução mantém a tabela de threads em cada processo.
- Vantagens: funciona sem suporte do SO; escalonador personalizado; troca e criação baratas; escala melhor.
- Desvantagens: chamada bloqueante ou falta de página bloqueia o processo todo; uma thread precisa ceder a CPU; sem paralelismo real.

**No núcleo**: o SO mantém a tabela e escalona as threads.
- Vantagens: uma thread bloqueada não bloqueia as outras; pode haver paralelismo em várias CPUs.
- Desvantagens: criar e gerenciar exige chamadas de sistema, mais caras.
