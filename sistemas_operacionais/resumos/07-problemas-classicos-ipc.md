---
aula: 7
titulo: Problemas clássicos de IPC
fonte: "../slides/7 - Problemas classicos IPC.pdf"
topicos: [jantar dos filósofos, deadlock, starvation, livelock, leitores e escritores, barbeiro sonolento, semáforos]
prerequisitos: [6]
---

# Aula 7: Problemas clássicos de IPC

> Texto sem marcação vem dos slides. **[+]** indica complemento. Códigos corrigidos.

## Visão geral
| Problema | O que modela | Risco principal |
|---|---|---|
| Jantar dos filósofos | Acesso exclusivo a recursos limitados (ex.: E/S) | Deadlock e inanição |
| Leitores e escritores | Base de dados com leitura concorrente e escrita exclusiva | Inanição do escritor |
| Barbeiro sonolento | Fila limitada de atendimento | Condições de corrida |

## 1. Jantar dos filósofos (Dijkstra)
**Enunciado**: 5 filósofos em mesa circular, cada um com um prato de espaguete, um garfo entre cada par de pratos. Precisam de **dois** garfos para comer. Alternam entre pensar e comer; com fome, pegam os garfos esquerdo e direito, um de cada vez.

> ⚠️ O slide diz "entre cada par de garfos está um prato"; equivalente: entre cada par de pratos há um garfo.

### Tentativa 1: solução óbvia
```c
#define N 5
void philosopher(int i) {
    while (TRUE) {
        think();
        take_fork(i);            /* esquerdo (bloqueia até estar livre) */
        take_fork((i+1) % N);    /* direito */
        eat();
        put_fork(i);
        put_fork((i+1) % N);
    }
}
```
❌ Se todos pegam o esquerdo ao mesmo tempo, todos esperam o direito para sempre: **deadlock**.

### Tentativa 2: devolver e esperar
Se o direito não está livre, devolve o esquerdo, espera e repete.
- ❌ Se todos esperam o mesmo tempo, repetem o ciclo indefinidamente: todos executam mas ninguém progride (**inanição/starvation**).
- Espera **aleatória** torna isso quase impossível e é usada na maioria das aplicações, mas não serve para sistemas críticos de tempo real.

> **[+]** O caso em que todos mudam de estado sem progredir costuma ser chamado de **livelock**. Inanição, em sentido estrito, é um processo ser preterido indefinidamente enquanto outros progridem.

### Tentativa 3: um mutex para todos os garfos
`lock → pega 2 garfos → come → solta → unlock`
- ✅ Correta. ❌ Só **um** come por vez, embora 5 garfos permitam **dois**.

### Solução eficiente
Vetor de estados (`THINKING`, `HUNGRY`, `EATING`) + um semáforo por filósofo. Um filósofo faminto só come se **nenhum vizinho** estiver comendo; senão dorme e é avisado quando o vizinho terminar.

```c
#define N         5
#define LEFT      ((i + N - 1) % N)
#define RIGHT     ((i + 1) % N)
#define THINKING  0
#define HUNGRY    1
#define EATING    2

int state[N];
semaphore mutex = 1;     /* protege state[] */
semaphore s[N];          /* um por filósofo, todos iniciam em 0 */

void philosopher(int i) {
    while (TRUE) { think(); take_forks(i); eat(); put_forks(i); }
}

void take_forks(int i) {
    down(&mutex);
    state[i] = HUNGRY;
    test(i);             /* tenta pegar os garfos */
    up(&mutex);
    down(&s[i]);         /* bloqueia se não conseguiu */
}

void put_forks(int i) {
    down(&mutex);
    state[i] = THINKING;
    test(LEFT);          /* vizinho esquerdo pode comer agora? */
    test(RIGHT);
    up(&mutex);
}

void test(int i) {
    if (state[i] == HUNGRY && state[LEFT] != EATING && state[RIGHT] != EATING) {
        state[i] = EATING;
        up(&s[i]);
    }
}
```
> **[+]** Os slides omitem as macros `LEFT` e `RIGHT` (definidas acima). Detalhes: o `down(&s[i])` fica **fora** do mutex (senão haveria deadlock); se `test(i)` teve sucesso, o `up` já foi feito e o `down` não bloqueia.

> **[+]** Essa solução é livre de deadlock e permite o paralelismo máximo, mas **ainda admite inanição** em escalonamentos adversos (os dois vizinhos se revezam comendo). Outras soluções: ordenar os recursos (um filósofo pega os garfos na ordem inversa, quebrando a espera circular) ou permitir no máximo 4 à mesa.

## 2. Leitores e escritores
Leituras simultâneas são permitidas; escrita é **exclusiva**. Ideia: contar leitores; o **primeiro** trava a base e o **último** libera.

```c
semaphore mutex = 1;   /* protege rc */
semaphore db    = 1;   /* acesso à base */
int rc = 0;            /* leitores ativos */

void reader(void) {
    while (TRUE) {
        down(&mutex);
        rc++;
        if (rc == 1) down(&db);
        up(&mutex);
        read_data_base();
        down(&mutex);
        rc--;
        if (rc == 0) up(&db);
        up(&mutex);
        use_data_read();
    }
}

void writer(void) {
    while (TRUE) {
        think_up_data();
        down(&db);
        write_data_base();
        up(&db);
    }
}
```
❌ **Inanição do escritor**: se leitores chegam mais rápido do que saem (ex.: cada leitura leva 5 s e chega um leitor a cada 3 s), `rc` nunca zera.

✅ Alternativa: quando um escritor pede acesso, **novos leitores não entram**. Custo: menos concorrência e desempenho.

> **[+]** Implementação com um semáforo extra "catraca":
> ```c
> semaphore turnstile = 1;
> // no leitor, antes da entrada:  down(&turnstile); up(&turnstile);
> // no escritor:  down(&turnstile); down(&db); escreve; up(&db); up(&turnstile);
> ```
> Em pthreads existe `pthread_rwlock_t`.

## 3. Barbeiro sonolento
**Enunciado**: uma cadeira de barbeiro e N cadeiras de espera. Sem clientes, o barbeiro dorme. Quem chega acorda o barbeiro; se ele está ocupado, senta se houver cadeira, senão vai embora.

```c
#define CHAIRS 5
semaphore customers = 0;   /* clientes esperando */
semaphore barbers   = 0;   /* barbeiros prontos */
semaphore mutex     = 1;   /* protege waiting */
int waiting = 0;

void barber(void) {
    while (TRUE) {
        down(&customers);      /* dorme se não há clientes */
        down(&mutex);
        waiting--;
        up(&barbers);          /* pronto para cortar */
        up(&mutex);
        cut_hair();
    }
}

void customer(void) {
    down(&mutex);
    if (waiting < CHAIRS) {
        waiting++;
        up(&customers);        /* acorda o barbeiro */
        up(&mutex);
        down(&barbers);        /* espera barbeiro livre */
        get_haircut();
    } else {
        up(&mutex);            /* barbearia cheia: vai embora */
    }
}
```
- `waiting` duplica o valor de `customers` porque não se pode **ler** o valor de um semáforo.
- Generaliza para **fila única com vários atendentes** (telemarketing): basta executar vários processos `barber`.

## Pontos de atenção para prova
- Explicar por que a solução óbvia dos filósofos trava (quais condições de [deadlock](09-deadlocks.md) estão presentes: todas as quatro).
- Máximo simultâneo comendo com N filósofos: ⌊N/2⌋.
- Identificar quem sofre inanição em leitores-escritores.

## [+] Perguntas de revisão
1. O que acontece se `down(&s[i])` ficar antes de `up(&mutex)`? *Quem não conseguir os garfos dorme segurando o mutex; ninguém consegue liberá-lo: deadlock.*
2. No barbeiro, por que o cliente libera o mutex antes de `down(&barbers)`? *O barbeiro precisa do mutex para decrementar `waiting`.*
3. Com `CHAIRS = 5` e o barbeiro cortando, quantos clientes cabem no sistema? *6: um sendo atendido e cinco esperando.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., seção 2.4.
