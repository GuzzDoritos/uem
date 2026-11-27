---
aula: 5
titulo: Threads
fonte: "../slides/5 - Threads.pdf"
topicos: [thread, processo leve, multithread, POSIX threads, pthread, threads de usuário, threads de núcleo, runtime, implementação híbrida]
prerequisitos: [4]
---

# Aula 5: Threads

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
Threads são múltiplas linhas de execução que compartilham os recursos de um processo; podem ser implementadas no espaço de usuário, no núcleo ou de forma híbrida.

## Conceito
- No modelo tradicional, um processo tem um espaço de endereçamento e **uma** linha de execução.
- O processo combina duas ideias: **agrupamento de recursos** (arquivos abertos, filhos etc.) e **execução** (contador de programa, pilha, estado). Threads permitem várias execuções sobre o mesmo agrupamento.
- Também chamadas de **processos leves** (*lightweight processes*).
- A CPU alterna entre threads como na multiprogramação; com várias CPUs podem rodar em paralelo.
- **Não há proteção entre threads** do mesmo processo: é impossível e desnecessário, pois cooperam. Compartilham variáveis globais e podem mexer nos dados umas das outras.
- Figura clássica: (a) 3 processos com 1 thread cada × (b) 1 processo com 3 threads.

> ⚠️ A legenda extraída do slide diz "3 processos com 3 threads (a)"; o sentido é três processos com **uma** thread cada.

| Por processo (compartilhado) | Por thread (privado) |
|---|---|
| Espaço de endereçamento | Contador de programa |
| Variáveis globais | Registradores |
| Arquivos abertos | Pilha |
| Processos filhos | Estado |
| Alarmes pendentes | |
| Sinais e tratadores | |
| Informação de contabilidade | |

- Um processo começa com uma única thread e cria outras por chamada de biblioteca (ex.: `thread_create`), que devolve um identificador.

## Por que usar threads
- Programas fazem várias atividades ao mesmo tempo.
- Criar e destruir threads é mais fácil e rápido que processos.
- Ganho de desempenho quando nem todas são CPU-bound (sobrepõem E/S e cálculo).
- Aproveitam múltiplas CPUs.

| Exemplo | Como as threads ajudam |
|---|---|
| Editor de texto | Reformata o livro após apagar um parágrafo enquanto o usuário continua digitando |
| Servidor web com cache | Uma thread despachante recebe requisições e entrega a trabalhadoras; uma leitura de disco não paralisa as demais |
| Processamento de grandes bases | Uma thread lê, outra processa, outra escreve |

> **[+]** Modelos de servidor (Tanenbaum): **multithread** (paralelismo + chamadas bloqueantes), **thread única** (sem paralelismo, bloqueante), **máquina de estados finitos** (paralelismo, não bloqueante, por interrupções).

## POSIX threads (pthreads)
Padrão IEEE com mais de 60 funções. Principais:

| Função | Efeito |
|---|---|
| `pthread_create` | Cria thread que executa um procedimento |
| `pthread_exit` | Encerra a thread e libera sua pilha |
| `pthread_join` | Espera outra thread terminar (precisa do identificador) |
| `pthread_yield` | Cede voluntariamente a CPU |

> ⚠️ Os slides grafam `pthread_yeld`; o correto é `pthread_yield`. **[+]** Ela não é padrão POSIX; o equivalente portável é `sched_yield()`.

> **[+]** Exemplo mínimo (`gcc -pthread`):
> ```c
> #include <pthread.h>
> #include <stdio.h>
> void *tarefa(void *arg) {
>     printf("thread %ld\n", (long)arg);
>     return NULL;
> }
> int main(void) {
>     pthread_t t[4];
>     for (long i = 0; i < 4; i++) pthread_create(&t[i], NULL, tarefa, (void *)i);
>     for (int i = 0; i < 4; i++)  pthread_join(t[i], NULL);
> }
> ```
> A ordem das mensagens não é garantida.

## Implementações

### No espaço de usuário
- O núcleo **não sabe** que as threads existem e escalona **processos**.
- Um **sistema de tempo de execução** (*runtime*) em cada processo gerencia a **tabela de threads** daquele processo e escolhe a próxima thread.
- ✅ Funciona em SO sem suporte a threads.
- ✅ Escalonamento personalizado por aplicação.
- ✅ Escalam melhor (não consomem tabela e pilha do núcleo). **[+]** A troca de thread não precisa de trap, então é muito mais rápida.
- ❌ Chamada de sistema bloqueante bloqueia o **processo inteiro**. Contorno: verificar antes com `select`, o que gera muitas chamadas extras.
- ❌ **Falta de página** também bloqueia o processo inteiro.
- ❌ A thread em execução usa a CPU até **ceder voluntariamente** (não há relógio dentro do processo).
- ❌ O principal argumento contra: quem quer threads costuma ter aplicações que bloqueiam muito. E para trabalho CPU-bound não fazem sentido sem multiprocessamento.
- **[+]** Mesmo com várias CPUs, threads puramente de usuário de um processo não rodam em paralelo, pois o núcleo só vê uma entidade.

### No núcleo
- Sem runtime nem tabela de threads por processo: há **uma tabela no núcleo** para todas as threads do sistema.
- Criar threads exige chamada ao núcleo.
- Quando uma thread bloqueia, o núcleo pode escolher outra do mesmo processo **ou de outro**.
- Geralmente não são destruídas, mas marcadas como inativas e **recicladas**.
- ✅ Chamada bloqueante não bloqueia as demais threads.
- ❌ Chamadas de sistema são caras, então criar e gerenciar é mais custoso.

### Híbrida
- O núcleo conhece e escalona as threads de núcleo.
- Cada uma pode ter várias threads de usuário multiplexadas sobre ela, escalonadas pelo **sistema de tempo de execução**.

> ⚠️ O slide diz "sistema de tempo **real**"; o correto é sistema de tempo de **execução**.

### [+] Comparação
| Critério | Usuário (N:1) | Núcleo (1:1) | Híbrida (M:N) |
|---|---|---|---|
| Custo de criar/trocar | Baixo | Alto | Intermediário |
| Bloqueio afeta | Processo todo | Só a thread | Threads sobre aquela thread de núcleo |
| Paralelismo real | Não | Sim | Sim |
| Escalonador próprio | Sim | Não | Sim, no nível de usuário |
| Exemplos | GNU Pth | Linux (NPTL), Windows | Goroutines (Go), virtual threads (Java 21) |

> **[+]** Problemas ao converter código monothread: variáveis globais como `errno`, bibliotecas não **reentrantes**, tratamento de sinais e crescimento de pilhas. Em CPython tradicional, o **GIL** impede paralelismo de CPU entre threads. Condições de corrida: ver [aula 6](06-ipc.md).

## Exercícios dos slides
1. (V) Duas threads compartilham o mesmo espaço de endereçamento. *(Entende-se: do mesmo processo.)*
2. (F) A pilha de chamadas é a mesma para todas as threads da aplicação. *Cada thread tem sua própria pilha.*
3. (F) Um sistema só suporta multithread se for multiprocessado. *Com uma CPU, as threads se alternam.*

Threads **no núcleo**:

4. (F) Cada aplicação pode adotar um algoritmo de escalonamento de threads diferente. *O escalonador é o do SO, único para o sistema.*
5. (V) A tabela de threads é gerenciada pelo SO.
6. (V) A criação de threads depende de chamadas ao SO.

Threads **no espaço de usuário**:

7. (F) O escalonador do runtime pode tirar a thread da CPU para entregá-la a qualquer outra da aplicação. *Não há interrupção de relógio dentro do processo: a thread precisa ceder a CPU.*
8. (V) Chamadas de sistema que bloqueiam processos são um problema e precisam ser tratadas.
9. (F) Quando uma thread cede a CPU voluntariamente, o SO escolhe a próxima. *(Quem escolhe é o runtime.)*

## [+] Perguntas de revisão
1. Por que cada thread precisa de pilha própria? *Cada uma tem sua sequência de chamadas, variáveis locais e endereços de retorno.*
2. Um processo com threads de usuário faz `read` bloqueante. O que acontece? *O processo inteiro bloqueia.*
3. Se uma thread causa falha de segmentação, o que acontece? *Em geral o processo inteiro é encerrado.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., cap. 2.
