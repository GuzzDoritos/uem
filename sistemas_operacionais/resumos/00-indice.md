---
titulo: Índice do banco de conhecimento de Sistemas Operacionais
disciplina: Sistemas Operacionais (UEM, Departamento de Informática)
professor: Nilton Luiz Queiroz Junior
idioma: pt-BR
---

# Sistemas Operacionais: índice

## Como usar este banco (instruções para uma LLM)
- Cada arquivo resume **uma aula** e pode ser lido isoladamente. Use este índice para escolher quais carregar.
- Texto sem marcação = **conteúdo dos slides** (reorganizado). **[+]** = **complemento** externo (Tanenbaum e outras fontes de conhecimento geral); não presuma que foi dado em aula.
- **⚠️** = erro, imprecisão ou ambiguidade no slide. Ao criar material de prova, use a versão corrigida, mas avise o aluno da divergência.
- Os complementos e exemplos **[+]** não foram conferidos contra o livro página a página.
- Fonte original: `../slides/`. Em caso de dúvida, o slide e o professor prevalecem para fins de avaliação.

## Aulas
| Nº | Arquivo | Assunto central |
|---|---|---|
| 2 | [Conceitos básicos](02-conceitos-basicos.md) | Papel do SO, boot, modos da CPU, visão geral |
| 3 | [Estruturas e interrupções](03-estruturas-e-interrupcoes.md) | Monolítico, microkernel, VMs, proteção |
| 4 | [Processos](04-processos.md) | Ciclo de vida, estados, tabela de processos |
| 5 | [Threads](05-threads.md) | Usuário × núcleo × híbrido, pthreads |
| 6 | [IPC](06-ipc.md) | Corrida, exclusão mútua, semáforos, monitores, mensagens |
| 7 | [Problemas clássicos](07-problemas-classicos-ipc.md) | Filósofos, leitores/escritores, barbeiro |
| 7.1 | [Prática em Python](07.1-ipc-pratica-python.md) | Memória compartilhada, posix_ipc |
| 8 | [Escalonamento](08-escalonamento.md) | Lote, interativo, tempo real |
| 9 | [Deadlocks](09-deadlocks.md) | Condições, detecção, banqueiro, prevenção |
| 10 | [Gerência de memória](10-gerencia-de-memoria.md) | Partições, fits, buddy |
| 11 | [Memória virtual](11-memoria-virtual.md) | Paginação, tabelas, TLB |
| 12 | [Substituição de páginas](12-substituicao-de-paginas.md) | Ótimo, NRU, FIFO, LRU, WSClock |
| 13 | [Projeto de paginação](13-questoes-de-projeto-paginacao.md) | Belady, alocação, tamanho de página |
| 14 | [Segmentação](14-segmentacao.md) | MULTICS, x86 |
| 16 | [Sistemas de arquivos](16-sistemas-de-arquivos.md) | Alocação, FAT, i-nodes, diretórios |
| 17 | [E/S: hardware](17-entrada-e-saida-hardware.md) | Controladores, DMA, interrupções |
| 18 | [E/S: software](18-entrada-e-saida-software.md) | Camadas, drivers, buffering |
| 19 | [Discos e relógio](19-discos-e-relogios.md) | **Complemento sem slide**: RAID, braço do disco, relógio (apoia a Lista 8) |

Não há slides **1** nem **15** na pasta de origem.

## Listas de exercícios com respostas sugeridas
Em `../exercicios/` (enunciados originais em `../listas/`). As respostas não são gabarito do professor; `★` marca uma recomendação de estudo, não uma indicação dele.

| Lista | Assunto |
|---|---|
| [1](../exercicios/lista-1.md) | Fundamentos, processos e threads |
| [2](../exercicios/lista-2.md) | IPC e escalonamento |
| [3](../exercicios/lista-3.md) | Deadlocks |
| [4](../exercicios/lista-4.md) | Gerência de memória e paginação |
| [5](../exercicios/lista-5.md) | Substituição de páginas, projeto e segmentação |
| [6](../exercicios/lista-6.md) | Sistemas de arquivos |
| [7](../exercicios/lista-7.md) | Entrada e saída |
| [8](../exercicios/lista-8.md) | Discos e relógio |

## Blocos temáticos e dependências
```
Fundamentos (2, 3) ─▶ Processos e concorrência (4 → 5 → 6 → 7/7.1 → 8 → 9)
        │
        ├─▶ Memória (10 → 11 → 12 → 13 → 14)
        └─▶ Persistência e E/S (16, 17 → 18)
```

## Informações da disciplina
- Bibliografia dos slides: Tanenbaum, *Sistemas Operacionais Modernos* (2ª ed. 2003; 3ª ed. 2010) e *Modern Operating Systems* (4ª ed. 2014).
- Há um **trabalho** (2ª avaliação periódica): simulador de escalonamento de processos, em dupla, com relatório no formato SBC. Ver [especificação](../trabalho/Especificação%20Trabalho.pdf) e [aula 8](08-escalonamento.md).

## Mapa de conceitos transversais
| Conceito | Onde aparece |
|---|---|
| Interrupções e trap | 2, 3, 4, 8, 11, 17, 18 |
| Modo usuário × núcleo | 2, 3, 5, 18 |
| Troca de contexto | 4, 5, 8, 11 |
| CPU-bound × I/O-bound | 4, 8 |
| Condições de corrida e sincronização | 6, 7, 7.1 |
| Deadlock e inanição | 2, 7, 8, 9, 18 |
| Spooling | 2, 6, 9, 18 |
| Fragmentação interna e externa | 10, 11, 13, 14, 16 |
| Aging (duas técnicas de mesmo nome) | 8 (estimar surto), 12 (aproximar LRU) |
| Algoritmo do relógio | 12 (substituição de páginas) |
| Localidade e caches | 11 (TLB), 12 (conjunto de trabalho) |
| Proteção | 3, 10, 11, 14, 16, 17 |

## Fórmulas
| Fórmula | Significado | Aula |
|---|---|---|
| U = 1 − pⁿ | [+] Utilização da CPU com n processos | 4 |
| Σ Cᵢ/Pᵢ ≤ 1 | Escalonabilidade em tempo real | 8 |
| U ≤ m(2^(1/m) − 1) | [+] Limite suficiente do RMS | 8 |
| aT₀ + (1−a)T₁ | Estimativa por aging | 8 |
| TP / (TS/n) | Razão no escalonamento garantido | 8 |
| ΣᵢC[i][j] + A[j] = E[j] | [+] Invariante da detecção de deadlock | 9 |
| p = e div tam; d = e mod tam | [+] Tradução de endereço | 11 |
| TEA com TLB | Tempo médio de acesso | 11 |
| se/p + p/2 → p = √(2se) | Tamanho ótimo de página | 13 |

## Divergências encontradas nos slides
Vale confirmar com o professor as que podem cair em prova.

| Aula | Ponto | Gravidade |
|---|---|---|
| 3 | Definição de monolítico aparece negada ("não tem-se uma coleção...") | Alta |
| 5 | `pthread_yeld` (correto: `yield`); "tempo real" no lugar de "tempo de execução" | Baixa |
| 6 | `up` descrito como acordando todos; `TLS` por `TSL`; consumidor chamado `producer` | Média |
| 7.1 | "Python não tem semáforos"; falta `venv` no comando; `len(msg)` falha com acentos; leitor rotulado "escritor" | Média |
| 8 | Rótulos preemptivo × não preemptivo **trocados** em "Quando escalonar" | Alta |
| 9 | Sentido das arestas do grafo **invertido** no texto; exemplo inseguro com números que não fecham; critério do banqueiro incompleto | Alta |
| 11 | TLB: 28 ns considera só a tradução; M^(i−1) no multinível | **Alta** |
| 12/13 | "MRU" usado para LRU | Média |
| 13 | Fórmula `se/p + 1/2` (correto `p/2`); "levar para a memória" (é disco) | Média |
| 14 | "1014 palavras" (1024) | Baixa |
| 16 | Lista encadeada: o problema é o acesso aleatório, não o sequencial | Média |
| 18 | Três buffers: texto diverge da figura | Média |
