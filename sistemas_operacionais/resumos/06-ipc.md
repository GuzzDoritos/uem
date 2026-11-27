---
aula: 6
titulo: Comunicação interprocessos (IPC)
fonte: "../slides/6 - IPC.pdf"
topicos: [condição de corrida, região crítica, exclusão mútua, espera ociosa, alternância obrigatória, Peterson, TSL, sleep e wakeup, produtor-consumidor, semáforo, mutex, monitor, passagem de mensagem, barreira]
prerequisitos: [4, 5]
---

# Aula 6: Comunicação interprocessos

> Texto sem marcação vem dos slides. **[+]** indica complemento. Os códigos foram corrigidos; os erros do original estão apontados.

## Resumo em uma frase
Processos e threads que compartilham dados precisam de exclusão mútua e sincronização; as soluções vão de espera ociosa a primitivas bloqueantes (semáforos, mutexes, monitores) e troca de mensagens.

## Motivação
- Ex.: *pipeline* de comandos (saída de um é entrada do próximo); navegador com um processo por aba.
- Três questões: (1) como passar informação; (2) como impedir que um atrapalhe o outro em atividades críticas; (3) como respeitar dependências de dados.
- Valem também para **threads**, com as mesmas soluções.

## Condições de corrida
- Dois ou mais processos acessam dados compartilhados e o resultado **depende de quem executa e quando**.
- Exemplo do *spool* de impressão: diretório com vagas numeradas, um *daemon* que imprime, variáveis compartilhadas `in` (próxima vaga livre) e `out` (próximo a imprimir). Com `out = 4` e `in = 7`:
  1. A lê `in = 7` e perde a CPU.
  2. B lê `in = 7`.
  3. A grava seu arquivo na vaga 7.
  4. B grava na mesma vaga 7.
  - O arquivo de A nunca é impresso.

> **[+]** O mesmo ocorre com `count++`, que são três instruções (ler, somar, gravar).

## Regiões críticas
- **Região (seção) crítica**: trecho que acessa dados compartilhados.
- Solução: impedir dois processos simultaneamente em regiões críticas sobre o mesmo recurso.

**Quatro condições de uma boa solução** (decorar):
1. Dois processos nunca estão simultaneamente em suas regiões críticas.
2. Nada se pode supor sobre velocidade ou número de CPUs.
3. Nenhum processo fora da região crítica pode bloquear outros.
4. Nenhum processo espera eternamente para entrar.

Figura: A entra em T1; B tenta em T2 e fica bloqueado; A sai em T3 e B entra; B sai em T4.

Duas famílias de solução: **espera ociosa** (*busy wait*, laço testando) e **bloqueio** por chamadas de sistema.

## Desabilitar interrupções
- Desabilita ao entrar e reabilita ao sair.
- ❌ Um programa descuidado para o sistema; ❌ não funciona com multiprocessadores (afeta só uma CPU).
- Usada principalmente pelo próprio núcleo.

## Soluções com espera ociosa

### Alternância obrigatória
```c
// Processo 0                         // Processo 1
while (TRUE) {                        while (TRUE) {
    while (turn != 0);                    while (turn != 1);
    critical_region();                    critical_region();
    turn = 1;                             turn = 0;
    noncritical_region();                 noncritical_region();
}                                     }
```
- Garante exclusão mútua, mas **viola a condição 3**: obriga alternância estrita.
- Cenário: P0 tem região não crítica curta e P1 longa. Depois de uma rodada, P0 termina uma segunda passagem, põe `turn = 1` e fica impedido de entrar de novo, embora P1 esteja fora da região crítica.
- **[+]** Variável testada em laço chama-se *spin lock*.

### Solução de Peterson
Primeira solução "boa" apresentada nos slides.
```c
#define FALSE 0
#define TRUE  1
#define N     2

int turn;
int interested[N];                 /* inicialmente FALSE */

void enter_region(int process) {
    int other = 1 - process;
    interested[process] = TRUE;    /* declara interesse */
    turn = process;                /* último a escrever é quem espera */
    while (turn == process && interested[other] == TRUE);
}

void leave_region(int process) {
    interested[process] = FALSE;
}
```
- Se ambos chamam juntos, vale a última escrita em `turn`: quem escreveu por último espera.
- **[+]** Só para 2 processos. Em hardware moderno, a reordenação de acessos à memória exige barreiras de memória ou operações atômicas. Historicamente, o primeiro algoritmo correto foi o de Dekker.

### Instrução TSL (*Test and Set Lock*)
- Suporte de **hardware**, importante em multiprocessadores. `TSL RX, LOCK` copia `LOCK` para `RX` e grava valor ≠ 0 em `LOCK`, de forma **atômica**.
```asm
enter_region:
    TSL REGISTER, LOCK   ; copia lock e grava 1
    CMP REGISTER, #0     ; estava livre?
    JNE enter_region     ; não: tenta de novo
    RET                  ; sim: entrou
leave_region:
    MOVE LOCK, #0
    RET
```
> ⚠️ O slide escreve `TLS` no código e mistura `REG` e `REGISTER`.

> **[+]** Equivalentes: `XCHG` (x86), *compare-and-swap*, *load-linked/store-conditional*. A atomicidade em multiprocessador vem do travamento do barramento ou da coerência de cache.

### Problemas da espera ociosa
- Desperdiça CPU.
- **Inversão de prioridade**: um processo de baixa prioridade dentro da região crítica pode nunca sair se um de alta prioridade fica no laço ocupando a CPU.

## Primitivas bloqueantes

### Sleep e wakeup
- `sleep`: o chamador se bloqueia até ser acordado. `wakeup(p)`: acorda o processo `p`.

### Produtor-consumidor (buffer limitado)
- Buffer de tamanho fixo N; pode haver vários produtores e consumidores.
- Produtor dorme com buffer **cheio**; consumidor dorme com buffer **vazio**.

```c
void producer(void) {                  void consumer(void) {
  int item;                              int item;
  while (TRUE) {                         while (TRUE) {
    item = produce_item();                 if (count == 0) sleep();
    if (count == N) sleep();               item = remove_item();
    insert_item(item);                     count--;
    count++;                               if (count == N-1) wakeup(producer);
    if (count == 1) wakeup(consumer);      consume_item(item);
  }                                      }
}                                      }
```
**Problema (sinal perdido)**: buffer vazio; o consumidor testa `count == 0` e perde a CPU **antes** de dormir; o produtor insere e chama `wakeup`, que é ignorado; o consumidor dorme para sempre. Depois o produtor enche o buffer e também dorme.

- Remendo: um **bit de espera pelo sinal de acordar** (se o sinal chega com o processo acordado, liga o bit; antes de dormir ele o consulta). Não escala para vários processos.

### Semáforos (Dijkstra, 1965)
- Variável inteira não negativa que **conta wakeups pendentes**.
- **down** (P): se > 0, decrementa e segue; se = 0, dorme.
- **up** (V): incrementa; se há processos dormindo no semáforo, um deles consegue completar o `down`.
- Ambas são **atômicas**.

> ⚠️ O slide descreve que `up` acorda **todos** e só um completa o `down`, voltando os demais a dormir. Isso é uma forma de implementação; a descrição do Tanenbaum é que o sistema **escolhe um** deles. O efeito observável é o mesmo: um `up` libera um `down`. Para a prova, vale saber a versão do professor.

### Mutexes
- Para quando não é preciso contar: só dois estados (0/1). Operações `mutex_lock` e `mutex_unlock`.
- **[+]** Atenção à convenção: no mutex do Tanenbaum, 0 = livre. Um semáforo usado como mutex começa em 1 = livre. Um mutex tem "dono" (quem trava destrava); um semáforo não. **Futex** (Linux) só entra no núcleo quando há disputa.

### Produtor-consumidor com semáforos
```c
#define N 100
semaphore mutex = 1;   /* exclusão mútua no buffer */
semaphore empty = N;   /* vagas livres */
semaphore full  = 0;   /* vagas ocupadas */

void producer(void) {               void consumer(void) {
  int item;                           int item;
  while (TRUE) {                      while (TRUE) {
    item = produce_item();              down(&full);
    down(&empty);                       down(&mutex);
    down(&mutex);                       item = remove_item();
    insert_item(item);                  up(&mutex);
    up(&mutex);                         up(&empty);
    up(&full);                          consume_item(item);
  }                                   }
}                                   }
```
> ⚠️ No slide, a função consumidora aparece com o nome `producer` e termina com `produce_item()`; o correto é `consumer` e `consume_item(item)`.

- `mutex` garante **exclusão mútua**; `empty` e `full` garantem **sincronização**.
- **[+]** A ordem dos `down` é essencial: se o produtor fizer `down(&mutex)` antes de `down(&empty)` com o buffer cheio, dorme segurando o mutex, o consumidor bloqueia no mutex e há **deadlock**. A ordem dos `up` não causa deadlock.

### Monitores (Hoare e Brinch Hansen)
- Motivo: semáforos são genéricos demais e um erro sutil é grave.
- Construção de **linguagem**: (1) estruturas internas ocultas, como atributos privados; (2) **no máximo um processo ativo** no monitor por vez.
- Quem chama com o monitor ocupado bloqueia. O **compilador** gera a exclusão mútua.
- Java: métodos `synchronized`.
- Usados com **variáveis condicionais**.

> **[+]** Operações `wait(c)` e `signal(c)`. Após o `signal`: Hoare executa o acordado imediatamente; Hansen exige que o `signal` seja a última instrução; Mesa (Java, pthreads) deixa o sinalizador continuar, por isso se testa a condição em `while`, não em `if`. Variáveis condicionais **não acumulam** sinais.
> ```java
> class Buffer {
>     private final java.util.ArrayDeque<Integer> q = new java.util.ArrayDeque<>();
>     private final int n = 100;
>     synchronized void inserir(int x) throws InterruptedException {
>         while (q.size() == n) wait();
>         q.add(x); notifyAll();
>     }
>     synchronized int remover() throws InterruptedException {
>         while (q.isEmpty()) wait();
>         int x = q.remove(); notifyAll(); return x;
>     }
> }
> ```

## Passagem de mensagem
- Para processos **sem memória compartilhada** (ex.: em rede).
- Chamadas de sistema `send` (enfileira no destinatário) e `receive` (retira; bloqueia se a fila está vazia).

| Problema | Solução |
|---|---|
| Mensagem perdida | Confirmação (*ack*) |
| Ack perdido (mensagem reenviada) | Identificador único para detectar duplicata |
| Servidor impostor | Autenticação |
| Desempenho na mesma máquina | Tratamento específico/otimizado |

> **[+]** Variações: endereçamento direto ou por **caixa postal**; capacidade zero gera **rendez-vous** (encontro). Bibliotecas como MPI seguem este modelo.

## Barreiras
- Para sincronizar **um grupo** em fases: ninguém inicia a fase n+1 antes de todos terminarem a n.
- Quem chama `barrier` bloqueia até todos chegarem.
- Exemplo: calcular `(expr1) OP (expr2) OP ... OP (exprN)` com um processo por subexpressão, barreira ao final e um único processo combinando os resultados.

> **[+]** O slide menciona "se OP não for associativa". O paralelismo das **subexpressões** independe disso; a associatividade é o que permitiria paralelizar também a combinação (redução em árvore).

## [+] Tabela-síntese
| Mecanismo | Espera ociosa? | Quem implementa | Limitação |
|---|---|---|---|
| Desabilitar interrupções | Não | Núcleo | Uma CPU; perigoso |
| Alternância obrigatória | Sim | Software | Viola condição 3 |
| Peterson | Sim | Software | 2 processos; desperdício |
| TSL | Sim | Hardware + software | Desperdício; pode haver inanição |
| Sleep/wakeup | Não | SO | Sinal perdido |
| Semáforo/mutex | Não | SO/biblioteca | Fácil errar a ordem |
| Monitor | Não | Linguagem | Precisa de suporte da linguagem e memória comum |
| Mensagens | Não | SO | Overhead, perdas em rede |

## Pontos de atenção para prova
- Identificar qual condição cada solução viola.
- Explicar o sinal perdido passo a passo.
- Escrever produtor-consumidor com 3 semáforos e justificar a ordem.

## [+] Perguntas de revisão
1. Semáforo inicia em 3 e sofre 5 `down` e 1 `up`. Resultado? *Três `down` passam, dois bloqueiam; o `up` libera um. Valor 0 e um processo bloqueado.*
2. Por que `down` precisa ser atômico? *Senão dois processos poderiam ver valor 1 e ambos decrementar.*
3. Qual primitiva usar entre máquinas distintas? *Passagem de mensagem.*

## Ver também
[Problemas clássicos](07-problemas-classicos-ipc.md) · [Prática em Python](07.1-ipc-pratica-python.md) · [Deadlocks](09-deadlocks.md)

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., seção 2.3.
