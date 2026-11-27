---
aula: 4
titulo: Processos
fonte: "../slides/4 - Processos.pdf"
topicos: [multiprogramação, pseudoparalelismo, modelo de processos, criação, término, hierarquia, estados, transições, tabela de processos, PCB, troca de contexto, CPU-bound, I/O-bound]
prerequisitos: [2, 3]
---

# Aula 4: Processos

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
Um processo é um programa em execução com seu próprio estado; o SO cria a ilusão de paralelismo alternando a CPU entre processos e guardando o estado de cada um na tabela de processos.

## Multiprogramação e modelo de processos
- A CPU é chaveada entre programas, cada um executando por dezenas ou centenas de milissegundos. Em um segundo vários avançam: **pseudoparalelismo**.
- No **modelo de processos sequenciais**, todo software executável (inclusive partes do SO) é organizado em processos.
- Cada processo = programa em execução + contador de programa, registradores e variáveis.
- Conceitualmente cada processo tem sua **CPU virtual**; para executar, seu contador de programa é carregado no hardware. Há **um** contador físico e vários lógicos.
- Por causa do chaveamento, a velocidade de avanço não é uniforme nem reproduzível entre execuções.
- **Processo ≠ programa**: o processo é uma instância. O mesmo programa executado duas vezes gera dois processos independentes.

## Criação de processos
Quatro eventos em sistemas de propósito geral:
1. **Início do sistema**: processos de primeiro plano (interagem com o usuário) e de segundo plano (impressão, e-mail etc.; **[+]** chamados *daemons* no Unix e *serviços* no Windows).
2. **Chamada de sistema** de criação feita por um processo em execução (ex.: para colaborar numa tarefa).
3. **Requisição do usuário** (interface gráfica ou interpretador de comandos).
4. **Início de tarefa em lote** (*batch*), em sistemas de grande porte: o SO cria quando julgar possível.

> **[+]** No Unix, `fork()` cria uma cópia do processo (retorna 0 no filho e o PID do filho no pai) e `execve()` substitui a imagem pelo novo programa. No Windows, `CreateProcess` faz as duas coisas.
> ```c
> pid_t pid = fork();
> if (pid == 0)      execlp("ls", "ls", "-l", NULL);   // filho
> else if (pid > 0)  waitpid(pid, NULL, 0);            // pai
> else               perror("fork");
> ```

## Término de processos
| Forma | Voluntário? | Descrição |
|---|---|---|
| Saída normal | Sim | Terminou o trabalho e avisa o SO. Caso mais comum |
| Saída por erro | Sim | Detecta erro fatal e encerra (ex.: compilador recebe arquivo inexistente). Programas interativos podem só mostrar uma janela de erro |
| Erro fatal | Não | Falha no código: instrução ilegal, acesso indevido à memória. Pode tentar tratar (`try/catch`) |
| Cancelado por outro processo | Não | `kill` (POSIX), `TerminateProcess` (Windows) |

## Hierarquia
- Em alguns sistemas pai e filho continuam associados.
- **Unix**: um processo e seus descendentes formam um **grupo de processos**.
- **Windows**: não apresenta hierarquia de processos.
- Boot do Unix: `init` (na imagem de carga) se bifurca até abrir os terminais → cada terminal executa o login → após o login roda o interpretador de comandos.

> **[+]** Em Linux atual, o PID 1 costuma ser o `systemd`. **Zumbi**: terminou, mas o pai ainda não leu seu status com `wait`. **Órfão**: o pai terminou antes; o processo é adotado pelo PID 1 (ou por um *subreaper*).

## Estados e transições
Três estados: **em execução**, **pronto**, **bloqueado**.

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

| # | Transição | Quando ocorre |
|---|---|---|
| 1 | Execução → Bloqueado | O processo não pode prosseguir (espera E/S, leitura de disco) |
| 2 | Execução → Pronto | O escalonador tira o processo da CPU |
| 3 | Pronto → Execução | O escalonador escolhe o processo |
| 4 | Bloqueado → Pronto | O evento esperado ocorreu (E/S concluída, dados chegaram) |

- **Não existem** Bloqueado → Execução nem Pronto → Bloqueado.
- **[+]** Pronto = só falta CPU. Bloqueado = não adianta dar CPU. Modelos mais completos incluem *novo*, *terminado* e estados *suspensos* (processo em disco).

### Linha do tempo (figura do slide)
Três processos e o SO dividindo a CPU:
1. P1 executa com P2 pronto.
2. P1 bloqueia e o SO executa para trocar o contexto; depois P2 entra.
3. P1 desbloqueia e vai para pronto.
4. P2 perde a CPU (SO), P1 executa; P3 chega a pronto.
5. SO escolhe P3, que executa e bloqueia; SO volta a P2 e depois sai de novo.

Ideia central: entre dois processos sempre há execução do SO, e um processo bloqueado não disputa CPU.

## Implementação: tabela de processos
- Uma entrada por processo (**[+]** chamada PCB, *Process Control Block*), com o necessário para retomá-lo como se nunca tivesse parado.

| Gerenciamento de processo | Gerenciamento de memória | Gerenciamento de arquivos |
|---|---|---|
| Registradores | Ponteiro p/ segmento de código | Diretório raiz |
| Contador de programa | Ponteiro p/ segmento de dados | Diretório de trabalho |
| Palavra de estado (PSW) | Ponteiro p/ segmento de pilha | Descritores de arquivos |
| Ponteiro de pilha | | ID do usuário |
| Estado | | ID do grupo |
| Prioridade | | |
| ID, processo pai, grupo | | |

- A tabela é atualizada quando ocorrem **interrupções**: a rotina salva os dados do processo em execução (parte em linguagem de montagem). Os passos variam por sistema, mas são parecidos.

> **[+]** Sequência (Tanenbaum): (1) hardware empilha o PC; (2) carrega novo PC do vetor de interrupções; (3) assembly salva registradores; (4) assembly monta nova pilha; (5) rotina em C trata a interrupção; (6) escalonador decide o próximo; (7) retorno ao assembly; (8) assembly restaura e inicia o processo escolhido. A troca de contexto é sobrecarga pura e ainda esvazia caches e TLB.

## CPU-bound × I/O-bound
- **CPU-bound**: passa a maior parte do tempo executando.
- **I/O-bound**: passa a maior parte do tempo bloqueado.
- Um processo pode mudar de perfil durante a vida. Importa muito no [escalonamento](08-escalonamento.md).

> **[+]** Utilização da CPU com `n` processos em memória, cada um esperando E/S numa fração `p` do tempo: **U = 1 − pⁿ**. Ex.: p = 0,8 e n = 4 → 1 − 0,41 = 59%. É uma aproximação que supõe independência.

## Exercícios dos slides
1. (F) Um processo sempre termina de maneira voluntária. *Há término involuntário: erro fatal ou cancelamento por outro processo.*
2. (V) Um processo pode ser criado por uma tarefa em lotes.
3. (V) Um processo pode ser terminado por outro processo.
4. (F) Uma única CPU pode executar mais de um processo ao mesmo tempo. *Com uma CPU há só pseudoparalelismo: os processos se alternam.*
5. (F) É necessário mais de um contador de programa em hardware para multiprogramação. *Um contador físico basta; cada processo tem o seu valor salvo e recarregado.*
6. (V) Quem passa a maior parte do tempo bloqueado é I/O-bound.
7. (F) Um processo bloqueado não tem pendências, só espera a CPU. *Ele espera um evento (por exemplo, E/S). Quem só espera a CPU está pronto.*

> **[+]** O item 4 considera uma CPU de um único núcleo sem *hyper-threading*.

## [+] Perguntas de revisão
1. Quantos processos existem após `fork(); fork(); fork();`? *8 (2³).*
2. Em um sistema com uma CPU e 10 processos, qual o máximo em execução, pronto e bloqueado? *1 em execução; 9 prontos (se há processo pronto e a CPU está livre, um deles é escalonado); 10 bloqueados.*
3. Por que o estado precisa ser salvo na interrupção? *Para retomar exatamente do ponto interrompido.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª e 3ª ed., cap. 2.
