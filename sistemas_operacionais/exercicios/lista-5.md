# Lista 5

> Fonte: `../listas/lista 5.pdf`. As respostas são **sugestões**, não são gabarito do professor. `★` = recomendada para a prova (critério sugerido, não do professor).

### 1
Explique o algoritmo ótimo. Por que não pode ser implementado? Ele tem alguma utilidade?

Material: 12-substituicao-de-paginas#1-otimo

#### Resposta
Remove a página que **demorará mais** para ser referenciada novamente. Não é implementável porque o SO não conhece as referências futuras. Serve como **referência de comparação**: registra-se o log de uma execução e, sobre ele, calcula-se o mínimo de faltas para avaliar algoritmos reais.

### 2
O que são os bits R e M de uma página?

Material: 12-substituicao-de-paginas#2-nru-nao-usada-recentemente; 11-memoria-virtual#entrada-da-tabela-formato-dependente-da-maquina

#### Resposta
**R (referenciada)**: ligado em qualquer leitura ou escrita; é zerado periodicamente pelo SO. **M (modificada)**: ligado em escritas; indica que a página precisa ser gravada no disco antes de ser descartada.

### 3
Como funciona o algoritmo da página não usada recentemente (NRU)?

Material: 12-substituicao-de-paginas#2-nru-nao-usada-recentemente

#### Resposta
Classifica as páginas por (R, M): classe 0 (0,0), 1 (0,1), 2 (1,0) e 3 (1,1). Na falta, remove uma página **aleatória da menor classe** não vazia. O bit R é zerado a cada tick.

### 4 ★
Como funciona o FIFO? Qual seu problema e como corrigi-lo?

Por que cai: leva à segunda chance e ao relógio.

Material: 12-substituicao-de-paginas#3-fifo; 12-substituicao-de-paginas#4-segunda-chance; 12-substituicao-de-paginas#5-relogio

#### Resposta
Mantém uma fila por ordem de chegada e remove a mais antiga. Problema: pode remover uma página **muito usada**. Correção: **segunda chance**: se a mais antiga tem R = 1, zera R e a move para o fim; remove a primeira com R = 0. O **relógio** implementa a mesma ideia com uma lista circular e um ponteiro.

### 5
Como funciona o algoritmo da página menos recentemente usada e como implementá-lo em hardware?

Material: 12-substituicao-de-paginas#6-lru-menos-recentemente-usada; 12-substituicao-de-paginas#hardware-matriz-n-n

#### Resposta
Remove a página há **mais tempo sem uso**, supondo que o passado recente prevê o futuro. Em hardware: matriz N×N de bits para N molduras; ao referenciar a página i, põe-se a **linha i em 1** e depois a **coluna i em 0**. A linha de menor valor binário é a vítima.

### 6
Explique o funcionamento do WSClock.

Material: 12-substituicao-de-paginas#8-wsclock

#### Resposta
Combina relógio e conjunto de trabalho. Percorre uma lista circular de molduras (R, M, instante do último uso). Se R = 1, zera e avança. Se R = 0 e a idade supera o limite: com M = 0, substitui; com M = 1, agenda a escrita e continua. Ao completar a volta: se houve escritas agendadas, prossegue até achar uma página já limpa; se nenhuma foi agendada, usa uma página limpa qualquer ou, na falta dela, grava e usa a atual.

### 7 ★
Sistema com 8 páginas virtuais e 4 molduras. Acessos: `0 1 7 2 3 2 7 1 0 3`. Quantas faltas com (a) FIFO e (b) MRU?

Por que cai: simulação é questão típica.

Material: 12-substituicao-de-paginas#3-fifo; 12-substituicao-de-paginas#6-lru-menos-recentemente-usada

#### Resposta
"MRU" aqui é a página **menos** recentemente usada (LRU). Supõe-se memória inicialmente vazia.

**a) FIFO** (conjunto ordenado do mais antigo para o mais novo)

| Acesso | 0 | 1 | 7 | 2 | 3 | 2 | 7 | 1 | 0 | 3 |
|---|---|---|---|---|---|---|---|---|---|---|
| Molduras | 0 | 01 | 017 | 0172 | 1723 | 1723 | 1723 | 1723 | 7230 | 7230 |
| Falta | F | F | F | F | F | | | | F | |
| Sai | | | | | 0 | | | | 1 | |

**6 faltas.**

**b) LRU** (da menos para a mais recentemente usada)

| Acesso | 0 | 1 | 7 | 2 | 3 | 2 | 7 | 1 | 0 | 3 |
|---|---|---|---|---|---|---|---|---|---|---|
| Recência | 0 | 01 | 017 | 0172 | 1723 | 1732 | 1327 | 3271 | 2710 | 7103 |
| Falta | F | F | F | F | F | | | | F | F |
| Sai | | | | | 0 | | | | 3 | 2 |

**7 faltas.**

### 8 ★
Refaça o exercício 7 com os acessos `0 1 2 3 0 1 2 7 0 1 2 7`.

Por que cai: mostra um caso em que LRU vence o FIFO.

Material: 12-substituicao-de-paginas#3-fifo; 12-substituicao-de-paginas#6-lru-menos-recentemente-usada

#### Resposta
**a) FIFO**

| Acesso | 0 | 1 | 2 | 3 | 0 | 1 | 2 | 7 | 0 | 1 | 2 | 7 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Molduras | 0 | 01 | 012 | 0123 | 0123 | 0123 | 0123 | 1237 | 2370 | 3701 | 7012 | 7012 |
| Falta | F | F | F | F | | | | F | F | F | F | |
| Sai | | | | | | | | 0 | 1 | 2 | 3 | |

**8 faltas.**

**b) LRU**

| Acesso | 0 | 1 | 2 | 3 | 0 | 1 | 2 | 7 | 0 | 1 | 2 | 7 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Recência | 0 | 01 | 012 | 0123 | 1230 | 2301 | 3012 | 0127 | 1270 | 2701 | 7012 | 0127 |
| Falta | F | F | F | F | | | | F | | | | |
| Sai | | | | | | | | 3 | | | | |

**5 faltas.**

### 9 ★
Computador com 4 molduras:

| Página | Carregada | Última ref. | R | M |
|---|---|---|---|---|
| 0 | 126 | 280 | 1 | 0 |
| 1 | 230 | 265 | 0 | 1 |
| 2 | 140 | 270 | 0 | 0 |
| 3 | 110 | 285 | 1 | 1 |

Qual página sai com (a) NRU, (b) FIFO, (c) MRU e (d) segunda chance?

Por que cai: compara quatro algoritmos no mesmo cenário.

Material: 12-substituicao-de-paginas#2-nru-nao-usada-recentemente; 12-substituicao-de-paginas#4-segunda-chance

#### Resposta
- **a) NRU: página 2**, única na classe 0 (R=0, M=0).
- **b) FIFO: página 3**, a carregada há mais tempo (110).
- **c) MRU (menos recentemente usada): página 1**, última referência mais antiga (265).
- **d) Segunda chance: página 2.** Ordem de carga: 3, 0, 2, 1. A 3 tem R=1: zera e vai ao fim. A 0 tem R=1: zera e vai ao fim. A 2 tem R=0: sai.

### 10 ★
Explique a anomalia de Belady.

Por que cai: aparece em slide com exemplo resolvido.

Material: 13-questoes-de-projeto-paginacao#anomalia-de-belady

#### Resposta
Em alguns algoritmos, como o FIFO, **aumentar o número de molduras pode aumentar as faltas de página**. Ex.: `0 1 2 3 0 1 4 0 1 2 3 4` gera 9 faltas com 3 molduras e 10 com 4. Não ocorre em algoritmos de pilha (LRU, ótimo), em que as páginas presentes com m molduras estão contidas nas presentes com m+1.

### 11
O que é *thrashing* e como pode acontecer?

Material: 13-questoes-de-projeto-paginacao#thrashing; 13-questoes-de-projeto-paginacao#2-controle-de-carga

#### Resposta
É a situação em que o sistema gasta a maior parte do tempo tratando faltas de página, quase sem executar. Ocorre quando os processos têm menos molduras que seus conjuntos de trabalho, por exemplo quando a **soma dos conjuntos de trabalho excede a memória**. Combate-se reduzindo a multiprogramação (levar processos ao disco).

### 12
Quais as diferenças entre alocação local e global?

Material: 13-questoes-de-projeto-paginacao#1-politica-de-alocacao-local-global

#### Resposta
Na **local**, a vítima é do próprio processo que faltou, e cada um tem uma fração fixa de molduras. Na **global**, a vítima pode ser de qualquer processo e a quantidade de molduras varia. A global costuma ser melhor, pois se adapta a conjuntos de trabalho que mudam; a local pode causar thrashing mesmo com molduras sobrando, mas isola os processos.

### 13
Para que serve o daemon de paginação e como funciona?

Material: 13-questoes-de-projeto-paginacao#6-politica-de-limpeza

#### Resposta
Mantém um estoque de **molduras livres** para que as faltas sejam atendidas rapidamente. Dorme a maior parte do tempo e acorda periodicamente; se há poucas molduras livres, escolhe páginas pelo algoritmo de substituição, grava no disco as modificadas e libera as molduras.

### 14
Quantas faltas de página podem ocorrer em uma instrução com três operandos em memória (por exemplo, `ADD R1, R2, R3`)? Quais são?

Material: 11-memoria-virtual#paginacao

#### Resposta
Supondo que a instrução e cada operando caibam em uma única página: **até 4 faltas** — uma na **busca da instrução**, duas nas **leituras dos operandos** e uma na **escrita do resultado** (os três operandos, em páginas diferentes e ausentes).

Se a instrução e os operandos puderem **cruzar a fronteira** de páginas, o pior caso dobra para **8**. Com endereçamento indireto, haveria ainda mais.

⚠️ O enunciado usa nomes de registradores (R1, R2, R3); a questão pede que sejam tratados como referências à memória.

### 15
Na segmentação, o que é um segmento e qual sua finalidade?

Material: 14-segmentacao#segmentacao

#### Resposta
É um espaço de endereçamento linear independente, de 0 até um máximo, com tamanho que pode variar, correspondendo a uma unidade lógica (procedimento, vetor, pilha). Finalidade: permitir que áreas cresçam independentemente e facilitar **proteção** e **compartilhamento**.

### 16 ★
Quais as principais diferenças entre segmentação e paginação?

Por que cai: tabela comparativa presente nos slides.

Material: 14-segmentacao#paginacao-segmentacao

#### Resposta
| | Paginação | Segmentação |
|---|---|---|
| Visível ao programador | Não | Sim |
| Espaços de endereçamento | Um | Vários |
| Tamanho das unidades | Fixo | Variável |
| Conteúdo | Sem relação lógica | Unidade lógica |
| Proteção e compartilhamento por procedimento ou dado | Difíceis | Facilitados |
| Fragmentação | Interna | Externa |
| Finalidade | Grande espaço linear | Espaços lógicos independentes |

Ambas permitem espaço total maior que a memória física.
