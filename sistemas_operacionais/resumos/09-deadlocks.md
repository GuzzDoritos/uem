---
aula: 9
titulo: Deadlocks
fonte: "../slides/9 - Deadlocks.pdf"
topicos: [recursos preemptíveis e não preemptíveis, condições de Coffman, grafo de alocação, avestruz, detecção, recuperação, estado seguro, algoritmo do banqueiro, prevenção, starvation]
prerequisitos: [6]
---

# Aula 9: Deadlocks

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
Deadlock é um conjunto de processos em que cada um espera um evento que só outro do conjunto pode causar; lida-se ignorando, detectando e recuperando, evitando dinamicamente ou prevenindo.

## Recursos
- Alguns são de **uso exclusivo** (impressora, fita, entradas de tabelas internas); o SO garante acesso exclusivo temporário.
- Ex.: gravar em CD dados escaneados exige dois recursos ao mesmo tempo.

| Tipo | Definição | [+] Exemplo |
|---|---|---|
| **Preemptível** | Pode ser retirado sem prejuízo | Memória (com swap), CPU |
| **Não preemptível** | Retirar causa falha na computação | Gravador de CD, impressora no meio do trabalho |

- Uso: **requisitar → usar → liberar**. Se indisponível, o processo espera (bloqueado) ou recebe código de erro.
- Deadlocks envolvem recursos **não preemptíveis**; com preemptíveis em geral basta realocar.
- Recursos de nível de usuário (ex.: registros de banco de dados) são controlados com semáforos/mutexes; os do SO, por chamada de sistema (*request*) ou arquivos especiais (`open`).

> ⚠️ O slide chama a chamada de `require`; o usual é `request`.

## Definição
"Um conjunto de processos está em deadlock se todo processo do conjunto estiver esperando por um evento que somente outro processo do mesmo conjunto pode causar."
- Hipóteses: cada processo tem uma única thread e não há interrupções que acordem os bloqueados.
- O mais comum é o **deadlock de recurso** (o evento esperado é a liberação de um recurso). Há outros tipos.

> **[+]** Outros: deadlock de **comunicação** (A espera mensagem de B, que espera de A; trata-se com *timeouts*); **livelock** (processos ativos sem progresso).

## As quatro condições (Coffman)
Todas são necessárias:

| # | Condição | Enunciado |
|---|---|---|
| 1 | **Exclusão mútua** | Cada recurso está disponível ou associado a um único processo |
| 2 | **Posse e espera** | Quem tem recursos pode pedir outros |
| 3 | **Não preempção** | Recursos só são liberados explicitamente pelo processo |
| 4 | **Espera circular** | Há uma cadeia circular de processos esperando recursos uns dos outros |

São, na prática, **políticas** que o sistema pode ou não adotar.

## Modelagem com grafos dirigidos
- Processos = círculos; recursos = retângulos.
- **Recurso → processo**: o processo **detém** o recurso.
- **Processo → recurso**: o processo está **bloqueado esperando**.
- Um **ciclo** indica deadlock.

> ⚠️ **Erro no slide:** o texto descreve as duas arestas com os sentidos **invertidos**. As figuras do próprio material seguem a convenção acima.

```
 R ──▶ A ──▶ S ──▶ B ──▶ R      (A tem R e espera S; B tem S e espera R)
```

> **[+]** Com **um** recurso de cada tipo, ciclo é necessário e suficiente. Com várias instâncias, é necessário mas não suficiente.

### Exemplo: a ordem de escalonamento importa
Processos precisam de: A → R, S; B → S, T; C → T, R.

**Ordem 1** (A:R, B:S, C:T, A:S, B:T, C:R)
| Passo | Resultado |
|---|---|
| A pede R, B pede S, C pede T | Todos obtêm |
| A pede S | Bloqueia (B tem) |
| B pede T | Bloqueia (C tem) |
| C pede R | Bloqueia (A tem): **ciclo → deadlock** |

**Ordem 2** (A:R, A:S, B:S, B:T, C:T, C:R)
- A obtém R e S; B pede S e bloqueia (não chega a pedir T); C obtém T e bloqueia em R.
- **Sem ciclo**: A não pedirá mais nada, termina e libera R e S; B e C prosseguem (B ainda esperará C liberar T).

## Estratégias
| Estratégia | Ideia |
|---|---|
| Ignorar (avestruz) | Fingir que não acontece |
| Detectar e recuperar | Deixar ocorrer, detectar e agir |
| Anulação dinâmica (*avoidance*) | Alocar com cuidado |
| Prevenção | Negar estruturalmente uma das 4 condições |

## 1. Algoritmo do avestruz
- "Enterre a cabeça na areia e finja que nada está acontecendo."
- Razoável se deadlocks são raros, pois detectar custa caro.
- Adotado por **Unix e Windows**.

## 2. Detecção

### Um recurso de cada tipo
- Procurar ciclos no grafo: **busca em profundidade** a partir de cada nó, marcando os visitados.

> **[+]** Em grafo dirigido, há ciclo quando se reencontra um nó que está **no caminho atual** da busca; reencontrar um nó já finalizado em outro caminho não basta.

### Várias instâncias por tipo
- Estruturas: **E** (recursos existentes), **A** (disponíveis), **C** (alocação atual), **R** (requisições). Linhas = processos, colunas = recursos.
- Presume-se que cada processo já fez todas as suas requisições.

Algoritmo:
1. Procurar processo não marcado cuja linha de R seja ≤ A (componente a componente).
2. Se achar, somar sua linha de C a A, marcá-lo e repetir.
3. Se não achar, terminar. **Os não marcados estão em deadlock.**

> **[+]** Invariante: para cada recurso j, Σᵢ C[i][j] + A[j] = E[j]. Custo O(m·n²) para n processos e m tipos.

**Exemplo** (fitas, plotters, scanners, CD-ROMs): E = (4 2 3 1), A = (2 1 0 0)

| Processo | C (alocado) | R (requisitado) |
|---|---|---|
| P1 | 0 0 1 0 | 2 0 0 1 |
| P2 | 2 0 0 1 | 1 0 1 0 |
| P3 | 0 1 2 0 | 2 1 0 0 |

- P3 pode: A = (2,1,0,0) + (0,1,2,0) = (2,2,2,0)
- P2 pode: A = (2,2,2,0) + (2,0,0,1) = (4,2,2,1)
- P1 pode. Todos marcados: **não há deadlock**.

## 3. Recuperação (nenhuma é boa)
| Método | Como | Problema |
|---|---|---|
| **Preempção** | Retirar o recurso e devolvê-lo depois | Depende do recurso; às vezes quase impossível |
| **Retrocesso** | Voltar um processo a um *checkpoint* anterior à posse do recurso | Trabalho refeito (reimprimir, reler entradas) |
| **Eliminação** | Matar processos até resolver | Grosseiro; pode causar inconsistência |

- Pode-se matar um processo **fora do ciclo** que detém os recursos disputados.
- Preferir processos que possam reiniciar do zero; matar um que atualiza banco de dados pode ser irreversível.

## 4. Anulação dinâmica
- **Estado seguro**: existe uma ordem de escalonamento em que todos terminam, mesmo que cada um peça de imediato o seu máximo.
- Exige conhecer **antecipadamente** o máximo de cada processo.

### Exemplo seguro (10 instâncias)
| Processo | Possui | Máximo | Falta |
|---|---|---|---|
| A | 3 | 9 | 6 |
| B | 2 | 4 | 2 |
| C | 2 | 7 | 5 |

Disponível 3. B recebe 2 e termina → 5 livres; C recebe 5 e termina → 7 livres; A recebe 6. **Seguro** (B, C, A).

### Exemplo inseguro
| Processo | Possui | Máximo | Falta |
|---|---|---|---|
| A | 7 | 9 | 2 |
| B | 1 | 4 | 3 |
| C | 2 | 7 | 5 |

Disponível 1: ninguém consegue terminar. **Inseguro**.

> ⚠️ Os números do slide não fecham: 7 + 1 + 2 = 10, então com 10 instâncias o disponível seria **0**. A conclusão (inseguro) vale com 0 ou 1.

> **[+]** Inseguro **não** é o mesmo que deadlock: processos podem pedir menos que o máximo ou liberar antes. Inseguro significa que o SO não pode **garantir** o término de todos.

### Algoritmo do banqueiro (Dijkstra)
- Cada solicitação é avaliada; se levar a estado **inseguro**, é **adiada**.

> ⚠️ O critério do slide ("se nenhum puder concluir") é incompleto: o estado só é seguro se existe uma sequência em que **todos** concluem.

Passos para uma requisição:
1. Conferir se o pedido ≤ necessidade restante e ≤ disponível.
2. Simular a concessão.
3. Aplicar o teste de segurança (igual ao de detecção, usando **Necessidade = Máximo − Alocado** no lugar de R).
4. Seguro → conceder; senão → adiar.

**[+] Exemplo com vários recursos** (Silberschatz). Disponível = (3,3,2).

| P | Alocado | Máximo | Necessidade |
|---|---|---|---|
| P0 | 0 1 0 | 7 5 3 | 7 4 3 |
| P1 | 2 0 0 | 3 2 2 | 1 2 2 |
| P2 | 3 0 2 | 9 0 2 | 6 0 0 |
| P3 | 2 1 1 | 2 2 2 | 0 1 1 |
| P4 | 0 0 2 | 4 3 3 | 4 3 1 |

Sequência segura P1 → P3 → P4 → P0 → P2, com disponível: (5,3,2) → (7,4,3) → (7,4,5) → (7,5,5) → (10,5,7).

> **[+]** Limitações práticas: raramente se conhece o máximo, o número de processos varia e recursos podem sumir.

## 5. Prevenção
| Condição atacada | Técnica | Limitação |
|---|---|---|
| Exclusão mútua | **Spooling** (só o daemon usa a impressora) | Ainda há deadlock se o spool encher só com arquivos incompletos e o daemon exigir arquivo completo (raro com discos grandes); nem tudo permite spool |
| Posse e espera | Requisitar **tudo antes** de começar (alguns sistemas em lote) | Muitos não sabem antecipadamente; desperdício. **[+]** Alternativa: liberar tudo antes de pedir novo conjunto |
| Não preempção | Retomar recursos; **virtualizar** | Nem sempre possível (ex.: registros de BD) |
| Espera circular | Um recurso por processo, ou **numerar os recursos** e pedir em ordem crescente (R1, R3, R5) | A primeira é inaceitável em muitos casos |

> **[+]** Por que a ordenação funciona: quem detém o recurso de maior número entre os alocados nunca espera um recurso de número menor, logo não se fecha ciclo.

## Starvation (inanição)
- Um processo nunca obtém o recurso por causa da **política de alocação**.
- Evita-se com política **FIFO**.
- **[+]** Deadlock: ninguém do conjunto progride. Inanição: o sistema progride, mas alguém é sempre preterido.

> **[+]** Também existe o **bloqueio em duas fases** em bancos de dados (travar tudo; se falhar, soltar tudo e recomeçar; só depois atualizar).

## Pontos de atenção para prova
- Citar as 4 condições e uma técnica que negue cada uma.
- Desenhar o grafo e achar o ciclo (cuidado com o sentido das arestas).
- Rodar detecção/banqueiro em matrizes.
- Distinguir prevenção (regra estrutural), anulação (decisão em tempo de execução) e detecção (a posteriori).

## [+] Perguntas de revisão
1. No exemplo seguro, A pede 1 recurso. Conceder? *A ficaria com 4, disponível 2: B termina → 4 livres; A falta 5 e C falta 5: ninguém mais. Inseguro → adiar.*
2. n processos compartilham m instâncias e cada um precisa de no máximo k. Quando não há deadlock? *Se m ≥ n(k−1) + 1.*
3. Qual condição o spooling ataca? *Exclusão mútua (e, ao virtualizar, também a não preempção, na visão dos slides).*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 3) e 3ª ed. (cap. 6).
- **[+]** Coffman, E. G. et al. *System Deadlocks*. ACM Computing Surveys, 1971. Silberschatz et al. *Fundamentos de Sistemas Operacionais*.
