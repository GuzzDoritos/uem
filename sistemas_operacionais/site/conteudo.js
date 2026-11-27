// Arquivo gerado por gerar.py. Não edite à mão.
window.PAGINAS = [
 {
  "id": "00-indice",
  "aula": "",
  "titulo": "Índice do banco de conhecimento de Sistemas Operacionais",
  "fonte": "",
  "texto": "\n# Sistemas Operacionais: índice\n\n## Como usar este banco (instruções para uma LLM)\n- Cada arquivo resume **uma aula** e pode ser lido isoladamente. Use este índice para escolher quais carregar.\n- Texto sem marcação = **conteúdo dos slides** (reorganizado). **[+]** = **complemento** externo (Tanenbaum e outras fontes de conhecimento geral); não presuma que foi dado em aula.\n- **⚠️** = erro, imprecisão ou ambiguidade no slide. Ao criar material de prova, use a versão corrigida, mas avise o aluno da divergência.\n- Os complementos e exemplos **[+]** não foram conferidos contra o livro página a página.\n- Fonte original: `../slides/`. Em caso de dúvida, o slide e o professor prevalecem para fins de avaliação.\n\n## Aulas\n| Nº | Arquivo | Assunto central |\n|---|---|---|\n| 2 | [Conceitos básicos](02-conceitos-basicos.md) | Papel do SO, boot, modos da CPU, visão geral |\n| 3 | [Estruturas e interrupções](03-estruturas-e-interrupcoes.md) | Monolítico, microkernel, VMs, proteção |\n| 4 | [Processos](04-processos.md) | Ciclo de vida, estados, tabela de processos |\n| 5 | [Threads](05-threads.md) | Usuário × núcleo × híbrido, pthreads |\n| 6 | [IPC](06-ipc.md) | Corrida, exclusão mútua, semáforos, monitores, mensagens |\n| 7 | [Problemas clássicos](07-problemas-classicos-ipc.md) | Filósofos, leitores/escritores, barbeiro |\n| 7.1 | [Prática em Python](07.1-ipc-pratica-python.md) | Memória compartilhada, posix_ipc |\n| 8 | [Escalonamento](08-escalonamento.md) | Lote, interativo, tempo real |\n| 9 | [Deadlocks](09-deadlocks.md) | Condições, detecção, banqueiro, prevenção |\n| 10 | [Gerência de memória](10-gerencia-de-memoria.md) | Partições, fits, buddy |\n| 11 | [Memória virtual](11-memoria-virtual.md) | Paginação, tabelas, TLB |\n| 12 | [Substituição de páginas](12-substituicao-de-paginas.md) | Ótimo, NRU, FIFO, LRU, WSClock |\n| 13 | [Projeto de paginação](13-questoes-de-projeto-paginacao.md) | Belady, alocação, tamanho de página |\n| 14 | [Segmentação](14-segmentacao.md) | MULTICS, x86 |\n| 16 | [Sistemas de arquivos](16-sistemas-de-arquivos.md) | Alocação, FAT, i-nodes, diretórios |\n| 17 | [E/S: hardware](17-entrada-e-saida-hardware.md) | Controladores, DMA, interrupções |\n| 18 | [E/S: software](18-entrada-e-saida-software.md) | Camadas, drivers, buffering |\n| 19 | [Discos e relógio](19-discos-e-relogios.md) | **Complemento sem slide**: RAID, braço do disco, relógio (apoia a Lista 8) |\n\nNão há slides **1** nem **15** na pasta de origem.\n\n## Listas de exercícios com respostas sugeridas\nEm `../exercicios/` (enunciados originais em `../listas/`). As respostas não são gabarito do professor; `★` marca uma recomendação de estudo, não uma indicação dele.\n\n| Lista | Assunto |\n|---|---|\n| [1](../exercicios/lista-1.md) | Fundamentos, processos e threads |\n| [2](../exercicios/lista-2.md) | IPC e escalonamento |\n| [3](../exercicios/lista-3.md) | Deadlocks |\n| [4](../exercicios/lista-4.md) | Gerência de memória e paginação |\n| [5](../exercicios/lista-5.md) | Substituição de páginas, projeto e segmentação |\n| [6](../exercicios/lista-6.md) | Sistemas de arquivos |\n| [7](../exercicios/lista-7.md) | Entrada e saída |\n| [8](../exercicios/lista-8.md) | Discos e relógio |\n\n## Blocos temáticos e dependências\n```\nFundamentos (2, 3) ─▶ Processos e concorrência (4 → 5 → 6 → 7/7.1 → 8 → 9)\n        │\n        ├─▶ Memória (10 → 11 → 12 → 13 → 14)\n        └─▶ Persistência e E/S (16, 17 → 18)\n```\n\n## Informações da disciplina\n- Bibliografia dos slides: Tanenbaum, *Sistemas Operacionais Modernos* (2ª ed. 2003; 3ª ed. 2010) e *Modern Operating Systems* (4ª ed. 2014).\n- Há um **trabalho** (2ª avaliação periódica): simulador de escalonamento de processos, em dupla, com relatório no formato SBC. Ver [especificação](../trabalho/Especificação%20Trabalho.pdf) e [aula 8](08-escalonamento.md).\n\n## Mapa de conceitos transversais\n| Conceito | Onde aparece |\n|---|---|\n| Interrupções e trap | 2, 3, 4, 8, 11, 17, 18 |\n| Modo usuário × núcleo | 2, 3, 5, 18 |\n| Troca de contexto | 4, 5, 8, 11 |\n| CPU-bound × I/O-bound | 4, 8 |\n| Condições de corrida e sincronização | 6, 7, 7.1 |\n| Deadlock e inanição | 2, 7, 8, 9, 18 |\n| Spooling | 2, 6, 9, 18 |\n| Fragmentação interna e externa | 10, 11, 13, 14, 16 |\n| Aging (duas técnicas de mesmo nome) | 8 (estimar surto), 12 (aproximar LRU) |\n| Algoritmo do relógio | 12 (substituição de páginas) |\n| Localidade e caches | 11 (TLB), 12 (conjunto de trabalho) |\n| Proteção | 3, 10, 11, 14, 16, 17 |\n\n## Fórmulas\n| Fórmula | Significado | Aula |\n|---|---|---|\n| U = 1 − pⁿ | [+] Utilização da CPU com n processos | 4 |\n| Σ Cᵢ/Pᵢ ≤ 1 | Escalonabilidade em tempo real | 8 |\n| U ≤ m(2^(1/m) − 1) | [+] Limite suficiente do RMS | 8 |\n| aT₀ + (1−a)T₁ | Estimativa por aging | 8 |\n| TP / (TS/n) | Razão no escalonamento garantido | 8 |\n| ΣᵢC[i][j] + A[j] = E[j] | [+] Invariante da detecção de deadlock | 9 |\n| p = e div tam; d = e mod tam | [+] Tradução de endereço | 11 |\n| TEA com TLB | Tempo médio de acesso | 11 |\n| se/p + p/2 → p = √(2se) | Tamanho ótimo de página | 13 |\n\n## Divergências encontradas nos slides\nVale confirmar com o professor as que podem cair em prova.\n\n| Aula | Ponto | Gravidade |\n|---|---|---|\n| 3 | Definição de monolítico aparece negada (\"não tem-se uma coleção...\") | Alta |\n| 5 | `pthread_yeld` (correto: `yield`); \"tempo real\" no lugar de \"tempo de execução\" | Baixa |\n| 6 | `up` descrito como acordando todos; `TLS` por `TSL`; consumidor chamado `producer` | Média |\n| 7.1 | \"Python não tem semáforos\"; falta `venv` no comando; `len(msg)` falha com acentos; leitor rotulado \"escritor\" | Média |\n| 8 | Rótulos preemptivo × não preemptivo **trocados** em \"Quando escalonar\" | Alta |\n| 9 | Sentido das arestas do grafo **invertido** no texto; exemplo inseguro com números que não fecham; critério do banqueiro incompleto | Alta |\n| 11 | TLB: 28 ns considera só a tradução; M^(i−1) no multinível | **Alta** |\n| 12/13 | \"MRU\" usado para LRU | Média |\n| 13 | Fórmula `se/p + 1/2` (correto `p/2`); \"levar para a memória\" (é disco) | Média |\n| 14 | \"1014 palavras\" (1024) | Baixa |\n| 16 | Lista encadeada: o problema é o acesso aleatório, não o sequencial | Média |\n| 18 | Três buffers: texto diverge da figura | Média |\n"
 },
 {
  "id": "02-conceitos-basicos",
  "aula": "2",
  "titulo": "Conceitos básicos",
  "fonte": "../slides/2 - Conceitos básicos.pdf",
  "texto": "\n# Aula 2: Conceitos básicos\n\n> Convenção: o texto sem marcação vem dos slides. Blocos e seções marcados com **[+]** são complementos que não estão nos slides.\n\n## Resumo em uma frase\nO SO é a camada de software que esconde a complexidade do hardware (máquina estendida) e arbitra o uso dos recursos entre programas concorrentes (gerenciador de recursos).\n\n## O que é um sistema operacional\n- Um computador moderno é complexo: processador, memória principal, discos e outros dispositivos de E/S.\n- O SO é um software com duas tarefas principais:\n  1. Gerenciar os componentes do sistema.\n  2. Oferecer aos programas de usuário uma interface mais simples que a do hardware.\n\n### Visão 1: máquina estendida (ou virtual)\n- Abstrai detalhes do hardware. Os serviços são mais fáceis de usar que o recurso bruto e são acessados por **chamadas de sistema**.\n- Exemplo: ler um arquivo sem SO exigiria conhecer pratos, trilhas, setores e cilindros, posicionar a cabeça de leitura e girar o eixo. Com SO bastam `abrir`, `ler`, `escrever` e `fechar`.\n\n### Visão 2: gerenciador de recursos\n- Aloca CPU, memória, impressora etc. entre programas que competem por eles.\n- Exemplo: três programas imprimindo ao mesmo tempo embaralhariam as linhas. O SO armazena as saídas em disco e imprime um trabalho por vez (**[+]** técnica chamada *spooling*).\n- Evita que processos interfiram uns nos outros ou acessem recursos indevidos.\n- Compartilhamento (multiplexação) de dois tipos:\n\n| Tipo | Como funciona | Papel do SO | Exemplo |\n|---|---|---|---|\n| No **tempo** | Cada processo usa na sua vez | Decidir quem usa e por quanto tempo | CPU |\n| No **espaço** | Cada processo ocupa uma parte | Impedir que um invada a parte do outro | Memória |\n\n## Inicialização (boot)\n1. O **BIOS** (rotinas básicas de E/S de baixo nível) executa e verifica os dispositivos básicos.\n2. Determina o dispositivo de boot.\n3. O primeiro setor do disco é carregado na memória e executado.\n4. Esse programa examina a tabela de partições e acha a partição ativa.\n5. Um carregador secundário é lido dessa partição e carrega o SO.\n6. O SO obtém do BIOS os dados dos dispositivos e carrega os *drivers* no kernel.\n7. Inicia tabelas, cria processos em segundo plano e inicia o programa de login.\n\n> **[+]** O primeiro setor é o **MBR** (*Master Boot Record*). Máquinas atuais usam **UEFI** com tabela de partições **GPT**, que carrega o *bootloader* de uma partição de sistema EFI. A sequência acima é a do modelo BIOS/MBR, descrita no Tanenbaum.\n\n## Modos de execução da CPU\n| | Modo usuário | Modo núcleo (kernel) |\n|---|---|---|\n| Instruções | Um subconjunto | Todas |\n| Acesso ao hardware | Parcial | Total |\n\n- Instruções de E/S, de proteção de memória e outras são privilegiadas.\n- Programas de usuário pedem esses serviços por **chamada de sistema**, que muda de modo usuário para núcleo com a instrução **TRAP**.\n\n> **[+]** Fluxo de `read(fd, buf, n)`: a biblioteca coloca o número da chamada e os argumentos nos registradores, executa TRAP, o hardware muda para modo núcleo e salta para um endereço fixo, o núcleo consulta a tabela de chamadas, executa o tratador e retorna ao modo usuário. Trocar de modo **não** é o mesmo que trocar de processo.\n\n> **[+]** Chamadas POSIX típicas: processos (`fork`, `execve`, `waitpid`, `exit`, `kill`), arquivos (`open`, `read`, `write`, `lseek`, `close`, `stat`), diretórios (`mkdir`, `rmdir`, `link`, `unlink`, `chdir`, `mount`).\n\n## Processos\n- Processo é um **programa em execução**. Tem associados:\n  - Espaço de endereçamento (código, dados, pilha).\n  - Registradores, incluindo contador de programa e ponteiro de pilha.\n- Em tempo compartilhado o SO troca periodicamente o processo em execução, então precisa salvar o estado dos suspensos.\n- Informações do processo que não estão no seu espaço de endereçamento ficam na **tabela de processos**.\n- Há chamadas de sistema para criar e terminar processos. Isso gera uma **árvore de processos** (pai e filho).\n- Processos que cooperam precisam de **comunicação interprocessos** (IPC).\n- **UID**: identifica o usuário. O processo recebe o UID de quem o iniciou e o filho herda o do pai.\n- **PID**: identificador único do processo.\n- Um processo tem uma ou mais linhas de execução (**threads**), que compartilham os recursos do processo.\n\n## Deadlocks\n- Quando processos compartilham recursos de uso exclusivo, podem entrar em situação da qual não saem. Analogia: cruzamento travado no trânsito.\n- Exemplo com unidade de fita e CD-ROM:\n  1. A pega a fita.\n  2. B pega o CD-ROM.\n  3. B pede a fita e bloqueia.\n  4. A pede o CD-ROM e bloqueia.\n  - Ambos esperam para sempre. Ver [aula 9](09-deadlocks.md).\n\n## Memória\n- Guarda os programas em execução. SOs simples: um programa por vez. Sofisticados: vários.\n- Com vários programas é preciso proteção: mecanismo de **hardware controlado pelo SO**.\n- Endereçamento: se o processo precisa de mais espaço que a memória física, computadores antigos não o executavam. Hoje há **memória virtual**: parte fica na RAM e parte no disco, com trocas sob demanda.\n\n## Entrada e saída\n- O subsistema de E/S do SO tem uma parte **independente de dispositivo** e uma parte **específica** (o *driver*).\n\n## Arquivos\n- O SO oculta peculiaridades dos dispositivos e oferece abrir, ler, escrever e fechar.\n- **Diretórios** agrupam arquivos. Suas entradas são arquivos ou outros diretórios, formando um sistema hierárquico.\n- Há chamadas para criar e remover diretórios e para colocar e remover arquivos.\n- Caminho **absoluto** (a partir da raiz) ou **relativo** (a partir do diretório de trabalho, que o processo pode mudar).\n- O acesso usa um **descritor de arquivo**, devolvido na abertura se o arquivo existe e o usuário tem permissão.\n- **Arquivos especiais** (Unix, em `/dev`) fazem dispositivos parecerem arquivos:\n  - **De bloco**: blocos endereçáveis aleatoriamente (discos).\n  - **De caracteres**: fluxo serial (impressoras).\n\n## Pontos de atenção para prova\n- Saber dar as duas visões do SO e um exemplo de cada.\n- CPU é multiplexada no tempo; memória, no espaço.\n- Chamada de sistema ≠ chamada de função comum: envolve TRAP e mudança de modo.\n- Programa (passivo, no disco) ≠ processo (ativo, com estado).\n\n## [+] Perguntas de revisão\n1. Por que as instruções de E/S são privilegiadas?\n   *Para que um processo não acesse dispositivos diretamente, burlando permissões ou interferindo em outros processos.*\n2. O que acontece quando um programa de usuário tenta executar uma instrução privilegiada?\n   *O hardware gera uma exceção e o controle passa ao SO, que normalmente encerra o processo.*\n3. Dê um recurso multiplexado no tempo e no espaço.\n   *Disco: o espaço é dividido entre arquivos e o acesso à cabeça é intercalado no tempo.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., cap. 1.\n"
 },
 {
  "id": "03-estruturas-e-interrupcoes",
  "aula": "3",
  "titulo": "Estruturas de sistemas operacionais e interrupções",
  "fonte": "../slides/3 - Estruturas e Interrupções.pdf",
  "texto": "\n# Aula 3: Estruturas de SOs e interrupções\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nA estrutura de um SO define o que roda em modo núcleo e como as partes se comunicam; interrupções são o mecanismo que devolve o controle ao SO e sustenta a proteção.\n\n## Estruturas de SOs\n\n### 1. Monolítico\n- O SO inteiro é **um único programa** executando em modo núcleo.\n- Coleção de procedimentos com interfaces bem definidas, livres para se chamarem entre si. **Não há ocultação de informação.**\n- A forma de tratar chamadas de sistema impõe uma estrutura básica:\n  - Programa principal: invoca o serviço pedido.\n  - Procedimentos de serviço: executam as chamadas de sistema.\n  - Procedimentos utilitários: auxiliam os de serviço.\n- ✅ Bom desempenho (sem vários níveis intermediários).\n- ❌ Baixa tolerância a falhas: um erro no kernel trava tudo.\n\n> ⚠️ **Erro no slide:** está escrito que \"não tem-se uma coleção de rotinas ligadas a um único grande programa\". No Tanenbaum é o oposto: o sistema monolítico **é** uma coleção de rotinas ligadas em um único grande binário.\n\n> **[+]** Linux é monolítico, mas com **módulos carregáveis** (drivers inseridos em tempo de execução, ainda em modo núcleo). Windows NT e macOS (XNU) costumam ser chamados de híbridos.\n\n### 2. Em camadas\n- Hierarquia de camadas, cada uma oferecendo serviços às demais.\n- ✅ Isola componentes, facilita depuração e alteração; camadas internas podem ser protegidas das externas.\n- ❌ Requisições atravessam várias camadas, o que pode piorar o desempenho.\n\n**Sistema THE** (organização para facilitar o projeto):\n\n| Camada | Função |\n|---|---|\n| 5 | Operador |\n| 4 | Programas de usuário |\n| 3 | Gerenciamento de E/S |\n| 2 | Comunicação operador-processo |\n| 1 | Gerenciamento de memória |\n| 0 | Alocação do processador e multiprogramação |\n\n**MULTICS** (anéis presentes em tempo de execução): anéis internos são mais privilegiados. Do mais externo ao mais interno: Usuário → Supervisor → Executivo → Kernel. Anéis externos fazem \"chamadas de sistema\" aos internos.\n\n> **[+]** A arquitetura x86 herdou a ideia com 4 anéis (0 a 3); sistemas comuns usam só o 0 (núcleo) e o 3 (usuário).\n\n### 3. Microkernel\n- Reduz o núcleo ao mínimo. Motivação: erros no núcleo derrubam o sistema e há cerca de **10 bugs a cada 1000 linhas** de código.\n- Driver em modo núcleo com erro: trava o sistema. Driver em modo usuário com erro: só o componente fica indisponível.\n- Usado onde se exige alta confiabilidade: tempo real, industrial, aviônica.\n- **MINIX**: cerca de 3200 linhas de C e 800 de assembly no núcleo. Fora dele, três camadas em modo usuário: **drivers**, **servidores** e **programas de usuário**.\n- Diagrama do MINIX: o micronúcleo trata interrupções, processos, escalonamento e IPC, e hospeda as tarefas de relógio e de sistema. Acima: drivers (disco, TTY, rede, impressora), servidores (sistema de arquivos, processos, reencarnação) e programas (shell, make).\n- Princípio **mecanismo × política**: o mecanismo fica no núcleo e a política em modo usuário. Ex.: o núcleo só escolhe e executa o processo de maior prioridade; um processo de usuário atribui as prioridades.\n\n> **[+]** O custo do microkernel é a sobrecarga de troca de mensagens e de contexto. Outros exemplos: QNX, seL4 (formalmente verificado).\n\n### 4. Cliente-servidor\n- Variação do microkernel com duas classes de processos: **servidores** prestam serviços e **clientes** os usam.\n- Comunicação por **troca de mensagens** (requisição e resposta).\n- Nenhum depende da localização do outro: funciona na mesma máquina ou em máquinas em rede.\n\n### 5. Máquinas virtuais\n- Um sistema de tempo compartilhado oferece multiprogramação e máquina estendida. A VM **separa completamente** essas duas funções.\n- Pioneiro: **IBM VM/370**.\n- O **monitor de máquina virtual (hipervisor)** roda sobre o hardware, faz a multiprogramação e entrega várias cópias exatas do hardware (com modos núcleo e usuário, E/S e interrupções). Cada cópia roda qualquer SO.\n- Fluxo de uma chamada de sistema: a aplicação faz TRAP, que vai ao SO convidado; o SO emite instruções normais de hardware; estas geram trap para o hipervisor, que as executa simulando o hardware real.\n- Exige hardware **virtualizável**.\n\n| | Hipervisor tipo 1 | Hipervisor tipo 2 |\n|---|---|---|\n| Onde roda | Direto no hardware | Como aplicação sobre um SO hospedeiro |\n| [+] Exemplos | VMware ESXi, Xen, Hyper-V | VirtualBox, VMware Workstation |\n\n> **[+]** Virtualizável (critério de Popek e Goldberg): toda instrução sensível executada em modo usuário deve causar trap. O x86 antigo não cumpria isso, o que levou a tradução binária, paravirtualização e depois às extensões Intel VT-x e AMD-V. **Contêineres** (Docker) não são VMs: compartilham o kernel do hospedeiro.\n\n### 6. Exonúcleo\n- Em vez de clonar a máquina, **divide os recursos** em subconjuntos e dá um a cada VM.\n- O exonúcleo isola as máquinas.\n- Dispensa a camada de mapeamento que o hipervisor precisaria fazer.\n\n### [+] Comparação rápida\n| Estrutura | Em modo núcleo | Ponto forte | Ponto fraco |\n|---|---|---|---|\n| Monolítico | Tudo | Desempenho | Uma falha derruba tudo |\n| Camadas | Geralmente tudo | Organização | Overhead entre camadas |\n| Microkernel | Mínimo | Confiabilidade | Overhead de mensagens |\n| Cliente-servidor | Mínimo | Distribuição | Overhead de comunicação |\n| VM | Hipervisor | Vários SOs, isolamento | Custo da virtualização |\n| Exonúcleo | Isolamento de recursos | Sem remapeamento | Mais trabalho para cada SO/biblioteca |\n\n## Interrupções\n- **Sinais de hardware** que informam a ocorrência de um evento e desviam a CPU para a **rotina de tratamento**.\n\n| Tipo (classificação dos slides) | Origem | Exemplos |\n|---|---|---|\n| Hardware | Eventos externos à instrução | Relógio, pedidos de dispositivos de E/S |\n| Software | Solicitada pelo programa | Instrução TRAP |\n| Exceção | Uso indevido de instruções ou dados | Divisão por zero, overflow |\n\n- Precisam ser **identificadas**, têm **prioridades** e **rotinas de tratamento**.\n- Auxiliam a detectar e tratar erros. O SO deve garantir que um processo defeituoso não afete outro.\n\n> **[+]** Passos típicos: o dispositivo sinaliza → a CPU termina a instrução atual → salva PC e PSW → consulta o **vetor de interrupções** → entra em modo núcleo → a rotina salva registradores e trata o evento → o escalonador escolhe o processo → restaura o estado e retorna. Interrupções de hardware são **assíncronas**; traps e exceções são **síncronas**. Detalhes nas aulas [17](17-entrada-e-saida-hardware.md) e [18](18-entrada-e-saida-software.md).\n\n## Mecanismos de proteção\n1. **Modo de operação**: kernel executa todas as instruções; usuário não executa as privilegiadas. Usuário → kernel por **interrupção**; kernel → usuário por **uma instrução**.\n2. **Proteção de E/S**: E/S só em modo kernel; processos usam chamadas de sistema.\n3. **Proteção de memória**: registradores **base** e **limite**; endereços fora da faixa são protegidos. Ver [aula 10](10-gerencia-de-memoria.md).\n4. **Proteção do processador**: **interrupção de tempo**, que permite a multiprogramação e garante que o SO volte a executar.\n\n### Inibição de interrupções\n- Instruções permitem ignorar certas interrupções, geralmente durante atividades críticas.\n- **[+]** É instrução privilegiada. Como mecanismo de exclusão mútua, ver [aula 6](06-ipc.md).\n\n## Pontos de atenção para prova\n- Comparar monolítico × microkernel (desempenho × confiabilidade).\n- Mecanismo × política.\n- Tipo 1 × tipo 2; VM (clona) × exonúcleo (particiona).\n- A interrupção de relógio é o que impede um processo de monopolizar a CPU.\n\n## [+] Perguntas de revisão\n1. Por que um erro de driver é menos grave em um microkernel?\n   *O driver é um processo de usuário isolado; pode falhar e ser reiniciado sem derrubar o núcleo.*\n2. Por que desabilitar interrupções não pode ser permitido em modo usuário?\n   *Um processo poderia desligar o relógio e nunca devolver a CPU.*\n3. Classifique: tecla pressionada, `syscall`, acesso a endereço inválido.\n   *Hardware; software; exceção.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª e 3ª ed., cap. 1.\n"
 },
 {
  "id": "04-processos",
  "aula": "4",
  "titulo": "Processos",
  "fonte": "../slides/4 - Processos.pdf",
  "texto": "\n# Aula 4: Processos\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nUm processo é um programa em execução com seu próprio estado; o SO cria a ilusão de paralelismo alternando a CPU entre processos e guardando o estado de cada um na tabela de processos.\n\n## Multiprogramação e modelo de processos\n- A CPU é chaveada entre programas, cada um executando por dezenas ou centenas de milissegundos. Em um segundo vários avançam: **pseudoparalelismo**.\n- No **modelo de processos sequenciais**, todo software executável (inclusive partes do SO) é organizado em processos.\n- Cada processo = programa em execução + contador de programa, registradores e variáveis.\n- Conceitualmente cada processo tem sua **CPU virtual**; para executar, seu contador de programa é carregado no hardware. Há **um** contador físico e vários lógicos.\n- Por causa do chaveamento, a velocidade de avanço não é uniforme nem reproduzível entre execuções.\n- **Processo ≠ programa**: o processo é uma instância. O mesmo programa executado duas vezes gera dois processos independentes.\n\n## Criação de processos\nQuatro eventos em sistemas de propósito geral:\n1. **Início do sistema**: processos de primeiro plano (interagem com o usuário) e de segundo plano (impressão, e-mail etc.; **[+]** chamados *daemons* no Unix e *serviços* no Windows).\n2. **Chamada de sistema** de criação feita por um processo em execução (ex.: para colaborar numa tarefa).\n3. **Requisição do usuário** (interface gráfica ou interpretador de comandos).\n4. **Início de tarefa em lote** (*batch*), em sistemas de grande porte: o SO cria quando julgar possível.\n\n> **[+]** No Unix, `fork()` cria uma cópia do processo (retorna 0 no filho e o PID do filho no pai) e `execve()` substitui a imagem pelo novo programa. No Windows, `CreateProcess` faz as duas coisas.\n> ```c\n> pid_t pid = fork();\n> if (pid == 0)      execlp(\"ls\", \"ls\", \"-l\", NULL);   // filho\n> else if (pid > 0)  waitpid(pid, NULL, 0);            // pai\n> else               perror(\"fork\");\n> ```\n\n## Término de processos\n| Forma | Voluntário? | Descrição |\n|---|---|---|\n| Saída normal | Sim | Terminou o trabalho e avisa o SO. Caso mais comum |\n| Saída por erro | Sim | Detecta erro fatal e encerra (ex.: compilador recebe arquivo inexistente). Programas interativos podem só mostrar uma janela de erro |\n| Erro fatal | Não | Falha no código: instrução ilegal, acesso indevido à memória. Pode tentar tratar (`try/catch`) |\n| Cancelado por outro processo | Não | `kill` (POSIX), `TerminateProcess` (Windows) |\n\n## Hierarquia\n- Em alguns sistemas pai e filho continuam associados.\n- **Unix**: um processo e seus descendentes formam um **grupo de processos**.\n- **Windows**: não apresenta hierarquia de processos.\n- Boot do Unix: `init` (na imagem de carga) se bifurca até abrir os terminais → cada terminal executa o login → após o login roda o interpretador de comandos.\n\n> **[+]** Em Linux atual, o PID 1 costuma ser o `systemd`. **Zumbi**: terminou, mas o pai ainda não leu seu status com `wait`. **Órfão**: o pai terminou antes; o processo é adotado pelo PID 1 (ou por um *subreaper*).\n\n## Estados e transições\nTrês estados: **em execução**, **pronto**, **bloqueado**.\n\n```\n            ┌──────────────┐\n      ┌─────│ Em execução  │─────┐\n     (1)    └──────▲───────┘    (2)\n      │           (3)            │\n      ▼            │             ▼\n ┌───────────┐     └───────── ┌────────┐\n │ Bloqueado │──────(4)─────▶ │ Pronto │\n └───────────┘                └────────┘\n```\n\n| # | Transição | Quando ocorre |\n|---|---|---|\n| 1 | Execução → Bloqueado | O processo não pode prosseguir (espera E/S, leitura de disco) |\n| 2 | Execução → Pronto | O escalonador tira o processo da CPU |\n| 3 | Pronto → Execução | O escalonador escolhe o processo |\n| 4 | Bloqueado → Pronto | O evento esperado ocorreu (E/S concluída, dados chegaram) |\n\n- **Não existem** Bloqueado → Execução nem Pronto → Bloqueado.\n- **[+]** Pronto = só falta CPU. Bloqueado = não adianta dar CPU. Modelos mais completos incluem *novo*, *terminado* e estados *suspensos* (processo em disco).\n\n### Linha do tempo (figura do slide)\nTrês processos e o SO dividindo a CPU:\n1. P1 executa com P2 pronto.\n2. P1 bloqueia e o SO executa para trocar o contexto; depois P2 entra.\n3. P1 desbloqueia e vai para pronto.\n4. P2 perde a CPU (SO), P1 executa; P3 chega a pronto.\n5. SO escolhe P3, que executa e bloqueia; SO volta a P2 e depois sai de novo.\n\nIdeia central: entre dois processos sempre há execução do SO, e um processo bloqueado não disputa CPU.\n\n## Implementação: tabela de processos\n- Uma entrada por processo (**[+]** chamada PCB, *Process Control Block*), com o necessário para retomá-lo como se nunca tivesse parado.\n\n| Gerenciamento de processo | Gerenciamento de memória | Gerenciamento de arquivos |\n|---|---|---|\n| Registradores | Ponteiro p/ segmento de código | Diretório raiz |\n| Contador de programa | Ponteiro p/ segmento de dados | Diretório de trabalho |\n| Palavra de estado (PSW) | Ponteiro p/ segmento de pilha | Descritores de arquivos |\n| Ponteiro de pilha | | ID do usuário |\n| Estado | | ID do grupo |\n| Prioridade | | |\n| ID, processo pai, grupo | | |\n\n- A tabela é atualizada quando ocorrem **interrupções**: a rotina salva os dados do processo em execução (parte em linguagem de montagem). Os passos variam por sistema, mas são parecidos.\n\n> **[+]** Sequência (Tanenbaum): (1) hardware empilha o PC; (2) carrega novo PC do vetor de interrupções; (3) assembly salva registradores; (4) assembly monta nova pilha; (5) rotina em C trata a interrupção; (6) escalonador decide o próximo; (7) retorno ao assembly; (8) assembly restaura e inicia o processo escolhido. A troca de contexto é sobrecarga pura e ainda esvazia caches e TLB.\n\n## CPU-bound × I/O-bound\n- **CPU-bound**: passa a maior parte do tempo executando.\n- **I/O-bound**: passa a maior parte do tempo bloqueado.\n- Um processo pode mudar de perfil durante a vida. Importa muito no [escalonamento](08-escalonamento.md).\n\n> **[+]** Utilização da CPU com `n` processos em memória, cada um esperando E/S numa fração `p` do tempo: **U = 1 − pⁿ**. Ex.: p = 0,8 e n = 4 → 1 − 0,41 = 59%. É uma aproximação que supõe independência.\n\n## Exercícios dos slides\n1. (F) Um processo sempre termina de maneira voluntária. *Há término involuntário: erro fatal ou cancelamento por outro processo.*\n2. (V) Um processo pode ser criado por uma tarefa em lotes.\n3. (V) Um processo pode ser terminado por outro processo.\n4. (F) Uma única CPU pode executar mais de um processo ao mesmo tempo. *Com uma CPU há só pseudoparalelismo: os processos se alternam.*\n5. (F) É necessário mais de um contador de programa em hardware para multiprogramação. *Um contador físico basta; cada processo tem o seu valor salvo e recarregado.*\n6. (V) Quem passa a maior parte do tempo bloqueado é I/O-bound.\n7. (F) Um processo bloqueado não tem pendências, só espera a CPU. *Ele espera um evento (por exemplo, E/S). Quem só espera a CPU está pronto.*\n\n> **[+]** O item 4 considera uma CPU de um único núcleo sem *hyper-threading*.\n\n## [+] Perguntas de revisão\n1. Quantos processos existem após `fork(); fork(); fork();`? *8 (2³).*\n2. Em um sistema com uma CPU e 10 processos, qual o máximo em execução, pronto e bloqueado? *1 em execução; 9 prontos (se há processo pronto e a CPU está livre, um deles é escalonado); 10 bloqueados.*\n3. Por que o estado precisa ser salvo na interrupção? *Para retomar exatamente do ponto interrompido.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª e 3ª ed., cap. 2.\n"
 },
 {
  "id": "05-threads",
  "aula": "5",
  "titulo": "Threads",
  "fonte": "../slides/5 - Threads.pdf",
  "texto": "\n# Aula 5: Threads\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nThreads são múltiplas linhas de execução que compartilham os recursos de um processo; podem ser implementadas no espaço de usuário, no núcleo ou de forma híbrida.\n\n## Conceito\n- No modelo tradicional, um processo tem um espaço de endereçamento e **uma** linha de execução.\n- O processo combina duas ideias: **agrupamento de recursos** (arquivos abertos, filhos etc.) e **execução** (contador de programa, pilha, estado). Threads permitem várias execuções sobre o mesmo agrupamento.\n- Também chamadas de **processos leves** (*lightweight processes*).\n- A CPU alterna entre threads como na multiprogramação; com várias CPUs podem rodar em paralelo.\n- **Não há proteção entre threads** do mesmo processo: é impossível e desnecessário, pois cooperam. Compartilham variáveis globais e podem mexer nos dados umas das outras.\n- Figura clássica: (a) 3 processos com 1 thread cada × (b) 1 processo com 3 threads.\n\n> ⚠️ A legenda extraída do slide diz \"3 processos com 3 threads (a)\"; o sentido é três processos com **uma** thread cada.\n\n| Por processo (compartilhado) | Por thread (privado) |\n|---|---|\n| Espaço de endereçamento | Contador de programa |\n| Variáveis globais | Registradores |\n| Arquivos abertos | Pilha |\n| Processos filhos | Estado |\n| Alarmes pendentes | |\n| Sinais e tratadores | |\n| Informação de contabilidade | |\n\n- Um processo começa com uma única thread e cria outras por chamada de biblioteca (ex.: `thread_create`), que devolve um identificador.\n\n## Por que usar threads\n- Programas fazem várias atividades ao mesmo tempo.\n- Criar e destruir threads é mais fácil e rápido que processos.\n- Ganho de desempenho quando nem todas são CPU-bound (sobrepõem E/S e cálculo).\n- Aproveitam múltiplas CPUs.\n\n| Exemplo | Como as threads ajudam |\n|---|---|\n| Editor de texto | Reformata o livro após apagar um parágrafo enquanto o usuário continua digitando |\n| Servidor web com cache | Uma thread despachante recebe requisições e entrega a trabalhadoras; uma leitura de disco não paralisa as demais |\n| Processamento de grandes bases | Uma thread lê, outra processa, outra escreve |\n\n> **[+]** Modelos de servidor (Tanenbaum): **multithread** (paralelismo + chamadas bloqueantes), **thread única** (sem paralelismo, bloqueante), **máquina de estados finitos** (paralelismo, não bloqueante, por interrupções).\n\n## POSIX threads (pthreads)\nPadrão IEEE com mais de 60 funções. Principais:\n\n| Função | Efeito |\n|---|---|\n| `pthread_create` | Cria thread que executa um procedimento |\n| `pthread_exit` | Encerra a thread e libera sua pilha |\n| `pthread_join` | Espera outra thread terminar (precisa do identificador) |\n| `pthread_yield` | Cede voluntariamente a CPU |\n\n> ⚠️ Os slides grafam `pthread_yeld`; o correto é `pthread_yield`. **[+]** Ela não é padrão POSIX; o equivalente portável é `sched_yield()`.\n\n> **[+]** Exemplo mínimo (`gcc -pthread`):\n> ```c\n> #include <pthread.h>\n> #include <stdio.h>\n> void *tarefa(void *arg) {\n>     printf(\"thread %ld\\n\", (long)arg);\n>     return NULL;\n> }\n> int main(void) {\n>     pthread_t t[4];\n>     for (long i = 0; i < 4; i++) pthread_create(&t[i], NULL, tarefa, (void *)i);\n>     for (int i = 0; i < 4; i++)  pthread_join(t[i], NULL);\n> }\n> ```\n> A ordem das mensagens não é garantida.\n\n## Implementações\n\n### No espaço de usuário\n- O núcleo **não sabe** que as threads existem e escalona **processos**.\n- Um **sistema de tempo de execução** (*runtime*) em cada processo gerencia a **tabela de threads** daquele processo e escolhe a próxima thread.\n- ✅ Funciona em SO sem suporte a threads.\n- ✅ Escalonamento personalizado por aplicação.\n- ✅ Escalam melhor (não consomem tabela e pilha do núcleo). **[+]** A troca de thread não precisa de trap, então é muito mais rápida.\n- ❌ Chamada de sistema bloqueante bloqueia o **processo inteiro**. Contorno: verificar antes com `select`, o que gera muitas chamadas extras.\n- ❌ **Falta de página** também bloqueia o processo inteiro.\n- ❌ A thread em execução usa a CPU até **ceder voluntariamente** (não há relógio dentro do processo).\n- ❌ O principal argumento contra: quem quer threads costuma ter aplicações que bloqueiam muito. E para trabalho CPU-bound não fazem sentido sem multiprocessamento.\n- **[+]** Mesmo com várias CPUs, threads puramente de usuário de um processo não rodam em paralelo, pois o núcleo só vê uma entidade.\n\n### No núcleo\n- Sem runtime nem tabela de threads por processo: há **uma tabela no núcleo** para todas as threads do sistema.\n- Criar threads exige chamada ao núcleo.\n- Quando uma thread bloqueia, o núcleo pode escolher outra do mesmo processo **ou de outro**.\n- Geralmente não são destruídas, mas marcadas como inativas e **recicladas**.\n- ✅ Chamada bloqueante não bloqueia as demais threads.\n- ❌ Chamadas de sistema são caras, então criar e gerenciar é mais custoso.\n\n### Híbrida\n- O núcleo conhece e escalona as threads de núcleo.\n- Cada uma pode ter várias threads de usuário multiplexadas sobre ela, escalonadas pelo **sistema de tempo de execução**.\n\n> ⚠️ O slide diz \"sistema de tempo **real**\"; o correto é sistema de tempo de **execução**.\n\n### [+] Comparação\n| Critério | Usuário (N:1) | Núcleo (1:1) | Híbrida (M:N) |\n|---|---|---|---|\n| Custo de criar/trocar | Baixo | Alto | Intermediário |\n| Bloqueio afeta | Processo todo | Só a thread | Threads sobre aquela thread de núcleo |\n| Paralelismo real | Não | Sim | Sim |\n| Escalonador próprio | Sim | Não | Sim, no nível de usuário |\n| Exemplos | GNU Pth | Linux (NPTL), Windows | Goroutines (Go), virtual threads (Java 21) |\n\n> **[+]** Problemas ao converter código monothread: variáveis globais como `errno`, bibliotecas não **reentrantes**, tratamento de sinais e crescimento de pilhas. Em CPython tradicional, o **GIL** impede paralelismo de CPU entre threads. Condições de corrida: ver [aula 6](06-ipc.md).\n\n## Exercícios dos slides\n1. (V) Duas threads compartilham o mesmo espaço de endereçamento. *(Entende-se: do mesmo processo.)*\n2. (F) A pilha de chamadas é a mesma para todas as threads da aplicação. *Cada thread tem sua própria pilha.*\n3. (F) Um sistema só suporta multithread se for multiprocessado. *Com uma CPU, as threads se alternam.*\n\nThreads **no núcleo**:\n\n4. (F) Cada aplicação pode adotar um algoritmo de escalonamento de threads diferente. *O escalonador é o do SO, único para o sistema.*\n5. (V) A tabela de threads é gerenciada pelo SO.\n6. (V) A criação de threads depende de chamadas ao SO.\n\nThreads **no espaço de usuário**:\n\n7. (F) O escalonador do runtime pode tirar a thread da CPU para entregá-la a qualquer outra da aplicação. *Não há interrupção de relógio dentro do processo: a thread precisa ceder a CPU.*\n8. (V) Chamadas de sistema que bloqueiam processos são um problema e precisam ser tratadas.\n9. (F) Quando uma thread cede a CPU voluntariamente, o SO escolhe a próxima. *(Quem escolhe é o runtime.)*\n\n## [+] Perguntas de revisão\n1. Por que cada thread precisa de pilha própria? *Cada uma tem sua sequência de chamadas, variáveis locais e endereços de retorno.*\n2. Um processo com threads de usuário faz `read` bloqueante. O que acontece? *O processo inteiro bloqueia.*\n3. Se uma thread causa falha de segmentação, o que acontece? *Em geral o processo inteiro é encerrado.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., cap. 2.\n"
 },
 {
  "id": "06-ipc",
  "aula": "6",
  "titulo": "Comunicação interprocessos (IPC)",
  "fonte": "../slides/6 - IPC.pdf",
  "texto": "\n# Aula 6: Comunicação interprocessos\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento. Os códigos foram corrigidos; os erros do original estão apontados.\n\n## Resumo em uma frase\nProcessos e threads que compartilham dados precisam de exclusão mútua e sincronização; as soluções vão de espera ociosa a primitivas bloqueantes (semáforos, mutexes, monitores) e troca de mensagens.\n\n## Motivação\n- Ex.: *pipeline* de comandos (saída de um é entrada do próximo); navegador com um processo por aba.\n- Três questões: (1) como passar informação; (2) como impedir que um atrapalhe o outro em atividades críticas; (3) como respeitar dependências de dados.\n- Valem também para **threads**, com as mesmas soluções.\n\n## Condições de corrida\n- Dois ou mais processos acessam dados compartilhados e o resultado **depende de quem executa e quando**.\n- Exemplo do *spool* de impressão: diretório com vagas numeradas, um *daemon* que imprime, variáveis compartilhadas `in` (próxima vaga livre) e `out` (próximo a imprimir). Com `out = 4` e `in = 7`:\n  1. A lê `in = 7` e perde a CPU.\n  2. B lê `in = 7`.\n  3. A grava seu arquivo na vaga 7.\n  4. B grava na mesma vaga 7.\n  - O arquivo de A nunca é impresso.\n\n> **[+]** O mesmo ocorre com `count++`, que são três instruções (ler, somar, gravar).\n\n## Regiões críticas\n- **Região (seção) crítica**: trecho que acessa dados compartilhados.\n- Solução: impedir dois processos simultaneamente em regiões críticas sobre o mesmo recurso.\n\n**Quatro condições de uma boa solução** (decorar):\n1. Dois processos nunca estão simultaneamente em suas regiões críticas.\n2. Nada se pode supor sobre velocidade ou número de CPUs.\n3. Nenhum processo fora da região crítica pode bloquear outros.\n4. Nenhum processo espera eternamente para entrar.\n\nFigura: A entra em T1; B tenta em T2 e fica bloqueado; A sai em T3 e B entra; B sai em T4.\n\nDuas famílias de solução: **espera ociosa** (*busy wait*, laço testando) e **bloqueio** por chamadas de sistema.\n\n## Desabilitar interrupções\n- Desabilita ao entrar e reabilita ao sair.\n- ❌ Um programa descuidado para o sistema; ❌ não funciona com multiprocessadores (afeta só uma CPU).\n- Usada principalmente pelo próprio núcleo.\n\n## Soluções com espera ociosa\n\n### Alternância obrigatória\n```c\n// Processo 0                         // Processo 1\nwhile (TRUE) {                        while (TRUE) {\n    while (turn != 0);                    while (turn != 1);\n    critical_region();                    critical_region();\n    turn = 1;                             turn = 0;\n    noncritical_region();                 noncritical_region();\n}                                     }\n```\n- Garante exclusão mútua, mas **viola a condição 3**: obriga alternância estrita.\n- Cenário: P0 tem região não crítica curta e P1 longa. Depois de uma rodada, P0 termina uma segunda passagem, põe `turn = 1` e fica impedido de entrar de novo, embora P1 esteja fora da região crítica.\n- **[+]** Variável testada em laço chama-se *spin lock*.\n\n### Solução de Peterson\nPrimeira solução \"boa\" apresentada nos slides.\n```c\n#define FALSE 0\n#define TRUE  1\n#define N     2\n\nint turn;\nint interested[N];                 /* inicialmente FALSE */\n\nvoid enter_region(int process) {\n    int other = 1 - process;\n    interested[process] = TRUE;    /* declara interesse */\n    turn = process;                /* último a escrever é quem espera */\n    while (turn == process && interested[other] == TRUE);\n}\n\nvoid leave_region(int process) {\n    interested[process] = FALSE;\n}\n```\n- Se ambos chamam juntos, vale a última escrita em `turn`: quem escreveu por último espera.\n- **[+]** Só para 2 processos. Em hardware moderno, a reordenação de acessos à memória exige barreiras de memória ou operações atômicas. Historicamente, o primeiro algoritmo correto foi o de Dekker.\n\n### Instrução TSL (*Test and Set Lock*)\n- Suporte de **hardware**, importante em multiprocessadores. `TSL RX, LOCK` copia `LOCK` para `RX` e grava valor ≠ 0 em `LOCK`, de forma **atômica**.\n```asm\nenter_region:\n    TSL REGISTER, LOCK   ; copia lock e grava 1\n    CMP REGISTER, #0     ; estava livre?\n    JNE enter_region     ; não: tenta de novo\n    RET                  ; sim: entrou\nleave_region:\n    MOVE LOCK, #0\n    RET\n```\n> ⚠️ O slide escreve `TLS` no código e mistura `REG` e `REGISTER`.\n\n> **[+]** Equivalentes: `XCHG` (x86), *compare-and-swap*, *load-linked/store-conditional*. A atomicidade em multiprocessador vem do travamento do barramento ou da coerência de cache.\n\n### Problemas da espera ociosa\n- Desperdiça CPU.\n- **Inversão de prioridade**: um processo de baixa prioridade dentro da região crítica pode nunca sair se um de alta prioridade fica no laço ocupando a CPU.\n\n## Primitivas bloqueantes\n\n### Sleep e wakeup\n- `sleep`: o chamador se bloqueia até ser acordado. `wakeup(p)`: acorda o processo `p`.\n\n### Produtor-consumidor (buffer limitado)\n- Buffer de tamanho fixo N; pode haver vários produtores e consumidores.\n- Produtor dorme com buffer **cheio**; consumidor dorme com buffer **vazio**.\n\n```c\nvoid producer(void) {                  void consumer(void) {\n  int item;                              int item;\n  while (TRUE) {                         while (TRUE) {\n    item = produce_item();                 if (count == 0) sleep();\n    if (count == N) sleep();               item = remove_item();\n    insert_item(item);                     count--;\n    count++;                               if (count == N-1) wakeup(producer);\n    if (count == 1) wakeup(consumer);      consume_item(item);\n  }                                      }\n}                                      }\n```\n**Problema (sinal perdido)**: buffer vazio; o consumidor testa `count == 0` e perde a CPU **antes** de dormir; o produtor insere e chama `wakeup`, que é ignorado; o consumidor dorme para sempre. Depois o produtor enche o buffer e também dorme.\n\n- Remendo: um **bit de espera pelo sinal de acordar** (se o sinal chega com o processo acordado, liga o bit; antes de dormir ele o consulta). Não escala para vários processos.\n\n### Semáforos (Dijkstra, 1965)\n- Variável inteira não negativa que **conta wakeups pendentes**.\n- **down** (P): se > 0, decrementa e segue; se = 0, dorme.\n- **up** (V): incrementa; se há processos dormindo no semáforo, um deles consegue completar o `down`.\n- Ambas são **atômicas**.\n\n> ⚠️ O slide descreve que `up` acorda **todos** e só um completa o `down`, voltando os demais a dormir. Isso é uma forma de implementação; a descrição do Tanenbaum é que o sistema **escolhe um** deles. O efeito observável é o mesmo: um `up` libera um `down`. Para a prova, vale saber a versão do professor.\n\n### Mutexes\n- Para quando não é preciso contar: só dois estados (0/1). Operações `mutex_lock` e `mutex_unlock`.\n- **[+]** Atenção à convenção: no mutex do Tanenbaum, 0 = livre. Um semáforo usado como mutex começa em 1 = livre. Um mutex tem \"dono\" (quem trava destrava); um semáforo não. **Futex** (Linux) só entra no núcleo quando há disputa.\n\n### Produtor-consumidor com semáforos\n```c\n#define N 100\nsemaphore mutex = 1;   /* exclusão mútua no buffer */\nsemaphore empty = N;   /* vagas livres */\nsemaphore full  = 0;   /* vagas ocupadas */\n\nvoid producer(void) {               void consumer(void) {\n  int item;                           int item;\n  while (TRUE) {                      while (TRUE) {\n    item = produce_item();              down(&full);\n    down(&empty);                       down(&mutex);\n    down(&mutex);                       item = remove_item();\n    insert_item(item);                  up(&mutex);\n    up(&mutex);                         up(&empty);\n    up(&full);                          consume_item(item);\n  }                                   }\n}                                   }\n```\n> ⚠️ No slide, a função consumidora aparece com o nome `producer` e termina com `produce_item()`; o correto é `consumer` e `consume_item(item)`.\n\n- `mutex` garante **exclusão mútua**; `empty` e `full` garantem **sincronização**.\n- **[+]** A ordem dos `down` é essencial: se o produtor fizer `down(&mutex)` antes de `down(&empty)` com o buffer cheio, dorme segurando o mutex, o consumidor bloqueia no mutex e há **deadlock**. A ordem dos `up` não causa deadlock.\n\n### Monitores (Hoare e Brinch Hansen)\n- Motivo: semáforos são genéricos demais e um erro sutil é grave.\n- Construção de **linguagem**: (1) estruturas internas ocultas, como atributos privados; (2) **no máximo um processo ativo** no monitor por vez.\n- Quem chama com o monitor ocupado bloqueia. O **compilador** gera a exclusão mútua.\n- Java: métodos `synchronized`.\n- Usados com **variáveis condicionais**.\n\n> **[+]** Operações `wait(c)` e `signal(c)`. Após o `signal`: Hoare executa o acordado imediatamente; Hansen exige que o `signal` seja a última instrução; Mesa (Java, pthreads) deixa o sinalizador continuar, por isso se testa a condição em `while`, não em `if`. Variáveis condicionais **não acumulam** sinais.\n> ```java\n> class Buffer {\n>     private final java.util.ArrayDeque<Integer> q = new java.util.ArrayDeque<>();\n>     private final int n = 100;\n>     synchronized void inserir(int x) throws InterruptedException {\n>         while (q.size() == n) wait();\n>         q.add(x); notifyAll();\n>     }\n>     synchronized int remover() throws InterruptedException {\n>         while (q.isEmpty()) wait();\n>         int x = q.remove(); notifyAll(); return x;\n>     }\n> }\n> ```\n\n## Passagem de mensagem\n- Para processos **sem memória compartilhada** (ex.: em rede).\n- Chamadas de sistema `send` (enfileira no destinatário) e `receive` (retira; bloqueia se a fila está vazia).\n\n| Problema | Solução |\n|---|---|\n| Mensagem perdida | Confirmação (*ack*) |\n| Ack perdido (mensagem reenviada) | Identificador único para detectar duplicata |\n| Servidor impostor | Autenticação |\n| Desempenho na mesma máquina | Tratamento específico/otimizado |\n\n> **[+]** Variações: endereçamento direto ou por **caixa postal**; capacidade zero gera **rendez-vous** (encontro). Bibliotecas como MPI seguem este modelo.\n\n## Barreiras\n- Para sincronizar **um grupo** em fases: ninguém inicia a fase n+1 antes de todos terminarem a n.\n- Quem chama `barrier` bloqueia até todos chegarem.\n- Exemplo: calcular `(expr1) OP (expr2) OP ... OP (exprN)` com um processo por subexpressão, barreira ao final e um único processo combinando os resultados.\n\n> **[+]** O slide menciona \"se OP não for associativa\". O paralelismo das **subexpressões** independe disso; a associatividade é o que permitiria paralelizar também a combinação (redução em árvore).\n\n## [+] Tabela-síntese\n| Mecanismo | Espera ociosa? | Quem implementa | Limitação |\n|---|---|---|---|\n| Desabilitar interrupções | Não | Núcleo | Uma CPU; perigoso |\n| Alternância obrigatória | Sim | Software | Viola condição 3 |\n| Peterson | Sim | Software | 2 processos; desperdício |\n| TSL | Sim | Hardware + software | Desperdício; pode haver inanição |\n| Sleep/wakeup | Não | SO | Sinal perdido |\n| Semáforo/mutex | Não | SO/biblioteca | Fácil errar a ordem |\n| Monitor | Não | Linguagem | Precisa de suporte da linguagem e memória comum |\n| Mensagens | Não | SO | Overhead, perdas em rede |\n\n## Pontos de atenção para prova\n- Identificar qual condição cada solução viola.\n- Explicar o sinal perdido passo a passo.\n- Escrever produtor-consumidor com 3 semáforos e justificar a ordem.\n\n## [+] Perguntas de revisão\n1. Semáforo inicia em 3 e sofre 5 `down` e 1 `up`. Resultado? *Três `down` passam, dois bloqueiam; o `up` libera um. Valor 0 e um processo bloqueado.*\n2. Por que `down` precisa ser atômico? *Senão dois processos poderiam ver valor 1 e ambos decrementar.*\n3. Qual primitiva usar entre máquinas distintas? *Passagem de mensagem.*\n\n## Ver também\n[Problemas clássicos](07-problemas-classicos-ipc.md) · [Prática em Python](07.1-ipc-pratica-python.md) · [Deadlocks](09-deadlocks.md)\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., seção 2.3.\n"
 },
 {
  "id": "07-problemas-classicos-ipc",
  "aula": "7",
  "titulo": "Problemas clássicos de IPC",
  "fonte": "../slides/7 - Problemas classicos IPC.pdf",
  "texto": "\n# Aula 7: Problemas clássicos de IPC\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento. Códigos corrigidos.\n\n## Visão geral\n| Problema | O que modela | Risco principal |\n|---|---|---|\n| Jantar dos filósofos | Acesso exclusivo a recursos limitados (ex.: E/S) | Deadlock e inanição |\n| Leitores e escritores | Base de dados com leitura concorrente e escrita exclusiva | Inanição do escritor |\n| Barbeiro sonolento | Fila limitada de atendimento | Condições de corrida |\n\n## 1. Jantar dos filósofos (Dijkstra)\n**Enunciado**: 5 filósofos em mesa circular, cada um com um prato de espaguete, um garfo entre cada par de pratos. Precisam de **dois** garfos para comer. Alternam entre pensar e comer; com fome, pegam os garfos esquerdo e direito, um de cada vez.\n\n> ⚠️ O slide diz \"entre cada par de garfos está um prato\"; equivalente: entre cada par de pratos há um garfo.\n\n### Tentativa 1: solução óbvia\n```c\n#define N 5\nvoid philosopher(int i) {\n    while (TRUE) {\n        think();\n        take_fork(i);            /* esquerdo (bloqueia até estar livre) */\n        take_fork((i+1) % N);    /* direito */\n        eat();\n        put_fork(i);\n        put_fork((i+1) % N);\n    }\n}\n```\n❌ Se todos pegam o esquerdo ao mesmo tempo, todos esperam o direito para sempre: **deadlock**.\n\n### Tentativa 2: devolver e esperar\nSe o direito não está livre, devolve o esquerdo, espera e repete.\n- ❌ Se todos esperam o mesmo tempo, repetem o ciclo indefinidamente: todos executam mas ninguém progride (**inanição/starvation**).\n- Espera **aleatória** torna isso quase impossível e é usada na maioria das aplicações, mas não serve para sistemas críticos de tempo real.\n\n> **[+]** O caso em que todos mudam de estado sem progredir costuma ser chamado de **livelock**. Inanição, em sentido estrito, é um processo ser preterido indefinidamente enquanto outros progridem.\n\n### Tentativa 3: um mutex para todos os garfos\n`lock → pega 2 garfos → come → solta → unlock`\n- ✅ Correta. ❌ Só **um** come por vez, embora 5 garfos permitam **dois**.\n\n### Solução eficiente\nVetor de estados (`THINKING`, `HUNGRY`, `EATING`) + um semáforo por filósofo. Um filósofo faminto só come se **nenhum vizinho** estiver comendo; senão dorme e é avisado quando o vizinho terminar.\n\n```c\n#define N         5\n#define LEFT      ((i + N - 1) % N)\n#define RIGHT     ((i + 1) % N)\n#define THINKING  0\n#define HUNGRY    1\n#define EATING    2\n\nint state[N];\nsemaphore mutex = 1;     /* protege state[] */\nsemaphore s[N];          /* um por filósofo, todos iniciam em 0 */\n\nvoid philosopher(int i) {\n    while (TRUE) { think(); take_forks(i); eat(); put_forks(i); }\n}\n\nvoid take_forks(int i) {\n    down(&mutex);\n    state[i] = HUNGRY;\n    test(i);             /* tenta pegar os garfos */\n    up(&mutex);\n    down(&s[i]);         /* bloqueia se não conseguiu */\n}\n\nvoid put_forks(int i) {\n    down(&mutex);\n    state[i] = THINKING;\n    test(LEFT);          /* vizinho esquerdo pode comer agora? */\n    test(RIGHT);\n    up(&mutex);\n}\n\nvoid test(int i) {\n    if (state[i] == HUNGRY && state[LEFT] != EATING && state[RIGHT] != EATING) {\n        state[i] = EATING;\n        up(&s[i]);\n    }\n}\n```\n> **[+]** Os slides omitem as macros `LEFT` e `RIGHT` (definidas acima). Detalhes: o `down(&s[i])` fica **fora** do mutex (senão haveria deadlock); se `test(i)` teve sucesso, o `up` já foi feito e o `down` não bloqueia.\n\n> **[+]** Essa solução é livre de deadlock e permite o paralelismo máximo, mas **ainda admite inanição** em escalonamentos adversos (os dois vizinhos se revezam comendo). Outras soluções: ordenar os recursos (um filósofo pega os garfos na ordem inversa, quebrando a espera circular) ou permitir no máximo 4 à mesa.\n\n## 2. Leitores e escritores\nLeituras simultâneas são permitidas; escrita é **exclusiva**. Ideia: contar leitores; o **primeiro** trava a base e o **último** libera.\n\n```c\nsemaphore mutex = 1;   /* protege rc */\nsemaphore db    = 1;   /* acesso à base */\nint rc = 0;            /* leitores ativos */\n\nvoid reader(void) {\n    while (TRUE) {\n        down(&mutex);\n        rc++;\n        if (rc == 1) down(&db);\n        up(&mutex);\n        read_data_base();\n        down(&mutex);\n        rc--;\n        if (rc == 0) up(&db);\n        up(&mutex);\n        use_data_read();\n    }\n}\n\nvoid writer(void) {\n    while (TRUE) {\n        think_up_data();\n        down(&db);\n        write_data_base();\n        up(&db);\n    }\n}\n```\n❌ **Inanição do escritor**: se leitores chegam mais rápido do que saem (ex.: cada leitura leva 5 s e chega um leitor a cada 3 s), `rc` nunca zera.\n\n✅ Alternativa: quando um escritor pede acesso, **novos leitores não entram**. Custo: menos concorrência e desempenho.\n\n> **[+]** Implementação com um semáforo extra \"catraca\":\n> ```c\n> semaphore turnstile = 1;\n> // no leitor, antes da entrada:  down(&turnstile); up(&turnstile);\n> // no escritor:  down(&turnstile); down(&db); escreve; up(&db); up(&turnstile);\n> ```\n> Em pthreads existe `pthread_rwlock_t`.\n\n## 3. Barbeiro sonolento\n**Enunciado**: uma cadeira de barbeiro e N cadeiras de espera. Sem clientes, o barbeiro dorme. Quem chega acorda o barbeiro; se ele está ocupado, senta se houver cadeira, senão vai embora.\n\n```c\n#define CHAIRS 5\nsemaphore customers = 0;   /* clientes esperando */\nsemaphore barbers   = 0;   /* barbeiros prontos */\nsemaphore mutex     = 1;   /* protege waiting */\nint waiting = 0;\n\nvoid barber(void) {\n    while (TRUE) {\n        down(&customers);      /* dorme se não há clientes */\n        down(&mutex);\n        waiting--;\n        up(&barbers);          /* pronto para cortar */\n        up(&mutex);\n        cut_hair();\n    }\n}\n\nvoid customer(void) {\n    down(&mutex);\n    if (waiting < CHAIRS) {\n        waiting++;\n        up(&customers);        /* acorda o barbeiro */\n        up(&mutex);\n        down(&barbers);        /* espera barbeiro livre */\n        get_haircut();\n    } else {\n        up(&mutex);            /* barbearia cheia: vai embora */\n    }\n}\n```\n- `waiting` duplica o valor de `customers` porque não se pode **ler** o valor de um semáforo.\n- Generaliza para **fila única com vários atendentes** (telemarketing): basta executar vários processos `barber`.\n\n## Pontos de atenção para prova\n- Explicar por que a solução óbvia dos filósofos trava (quais condições de [deadlock](09-deadlocks.md) estão presentes: todas as quatro).\n- Máximo simultâneo comendo com N filósofos: ⌊N/2⌋.\n- Identificar quem sofre inanição em leitores-escritores.\n\n## [+] Perguntas de revisão\n1. O que acontece se `down(&s[i])` ficar antes de `up(&mutex)`? *Quem não conseguir os garfos dorme segurando o mutex; ninguém consegue liberá-lo: deadlock.*\n2. No barbeiro, por que o cliente libera o mutex antes de `down(&barbers)`? *O barbeiro precisa do mutex para decrementar `waiting`.*\n3. Com `CHAIRS = 5` e o barbeiro cortando, quantos clientes cabem no sistema? *6: um sendo atendido e cinco esperando.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., seção 2.4.\n"
 },
 {
  "id": "07.1-ipc-pratica-python",
  "aula": "7.1",
  "titulo": "IPC na prática: memória compartilhada e semáforos em Python",
  "fonte": "../slides/7.1 - IPC aula pratica - Python.pdf",
  "texto": "\n# Aula 7.1: IPC na prática com Python\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento. Os códigos marcados como corrigidos diferem do slide.\n\n## Formas de IPC\nProcessos são isolados: um não acessa a memória do outro. O SO oferece:\n\n| Forma | Como | Sincronização |\n|---|---|---|\n| **Memória compartilhada** | Região mapeada no espaço de endereçamento de dois ou mais processos | Por conta dos processos |\n| **Troca de mensagens** | Via núcleo | Embutida (receive bloqueia) |\n\n- A região deve ser **criada** e **ligada** (anexada) ao processo.\n- O SO gerencia regiões e processos; o **conteúdo** é responsabilidade dos processos.\n- Não há sincronização automática: use, por exemplo, semáforos **também compartilhados** entre os processos.\n- Ideia: A faz `x = compartilhada('comp'); x = 10` e B, ligado à mesma região, imprime `10`.\n\n## Conversão para bytes\nA escrita é de baixo nível (bytes), e em Python tudo é objeto: é preciso serializar.\n```python\n>>> x = 'ola mundo!'\n>>> b = x.encode()          # str -> bytes (UTF-8 por padrão)\n>>> b[2]                    # índice em bytes devolve int\n97\n>>> b.decode()[2]           # em str devolve caractere\n'a'\n```\n> **[+]** Para números: `int.to_bytes` / `int.from_bytes`, ou o módulo `struct`.\n\n## Opção 1: `multiprocessing.shared_memory`\n`SharedMemory(name, create=False, size=0, track=True)`\n\n| Parâmetro | Significado |\n|---|---|\n| `name` | Identificador da região |\n| `create` | Criar a região (erro se já existir) |\n| `size` | Tamanho em bytes |\n| `track` | Se um rastreador de recursos limpará a memória (**[+]** existe a partir do Python 3.13) |\n\n- Acesso pelo campo `buf`: leitura com `.tobytes()` ou `.tolist()`; escrita por **fatiamento com o tamanho exato** dos bytes.\n```python\n>>> m = SharedMemory(name='memcomp', create=True, size=20)\n>>> m.buf[:10] = b'ola mundo!'\n>>> m.buf.tobytes()\nb'ola mundo!\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00'\n```\n\n### Escritor (corrigido)\n```python\nfrom multiprocessing.shared_memory import SharedMemory\n\nx = SharedMemory(name='area_comp', create=True, size=30)\nmsg_b = input('> ').encode()[:30]\nx.buf[:len(msg_b)] = msg_b          # slide usa len(msg)\ninput('pressione enter para encerrar...')\nx.close()                           # desliga deste processo\nx.unlink()                          # destrói a região\n```\n> ⚠️ No slide, `x.buf[:len(msg)] = msg_b` falha com acentos, pois `ç` ou `á` ocupam 2 bytes em UTF-8 e `len(msg)` conta caracteres.\n\n### Leitor\n```python\nfrom multiprocessing.shared_memory import SharedMemory\n\nx = SharedMemory(name='area_comp', track=False)\ntexto = x.buf.tobytes().rstrip(b'\\x00').decode()   # [+] remove os zeros de sobra\nprint(f'string da memoria compartilhada: {texto}')\nx.close()\n```\nExecutar o escritor primeiro e, com ele parado no `input`, o leitor em outro terminal.\n\n## Opção 2: biblioteca `posix_ipc`\n> ⚠️ O slide diz que Python não tem nativamente semáforos ou locks. Tem (`threading.Lock/Semaphore` e `multiprocessing.Lock/Semaphore`). O que a biblioteca padrão não oferece é um **semáforo nomeado** que programas independentes abram pelo nome; para isso serve o `posix_ipc`.\n\n### Instalação em ambiente virtual\n```bash\npython3 -m venv ./ambiente_virtual\nsource ./ambiente_virtual/bin/activate\npip3 install posix_ipc\n```\n> ⚠️ Nos exemplos do slide falta a palavra `venv` (`python3 -m /caminho` não funciona).\n\n> **[+]** `posix_ipc` é para sistemas POSIX (Linux, macOS). No Windows, use o WSL.\n\n### Classes principais\n| Classe | Função |\n|---|---|\n| `SharedMemory` | Segmento de memória compartilhada |\n| `Semaphore` | Semáforo compartilhado |\n| `MessageQueue` | Fila de mensagens (troca de mensagens) |\n\nTodos os objetos são identificados por **nome**, como arquivos (**[+]** começa com `/`).\n\n### SharedMemory + mmap\n- `posix_ipc.SharedMemory(name, flags=..., size=...)` apenas cria ou abre o segmento; flags no estilo da chamada `open` (`O_CREAT` etc.).\n- O mapeamento é feito pelo módulo padrão `mmap`: `mmap.mmap(fileno, length, ...)`.\n- Métodos: `seek(pos)`, `read()`, `write(bytes)`, `close()`.\n\n> **[+]** Para abrir somente para leitura, use `read_only=True` no `posix_ipc.SharedMemory` e `access=mmap.ACCESS_READ` no `mmap`. No `posix_ipc`, a flag `O_RDONLY` sozinha não restringe o acesso.\n\n**Escritor**\n```python\nimport posix_ipc, mmap\n\nshm = posix_ipc.SharedMemory('/shared_msg', flags=posix_ipc.O_CREAT, size=512)\nmp = mmap.mmap(shm.fileno(), shm.size)\nmp.seek(0)\nmp.write(input('> ').encode())\ninput('pressione enter para encerrar...')\nmp.close()\nshm.close_fd()\nshm.unlink()        # [+] ausente no slide; sem isso o segmento permanece no sistema\n```\n\n**Leitor** (no slide está rotulado como \"escritor\")\n```python\nimport posix_ipc, mmap\n\nshm = posix_ipc.SharedMemory('/shared_msg')\nmp = mmap.mmap(shm.fileno(), shm.size)\nmp.seek(0)\nprint(f\"mensagem lida: {mp.read().rstrip(bytes(1)).decode()}\")\nmp.close()\nshm.close_fd()\n```\n\n### Semaphore\n`posix_ipc.Semaphore(name, flags=..., initial_value=...)`\n\n| Método | Equivale a |\n|---|---|\n| `acquire()` | `down` |\n| `release()` | `up` |\n\n> **[+]** Exemplo sincronizado: o leitor espera o escritor.\n> ```python\n> # escritor.py\n> import posix_ipc, mmap\n> shm = posix_ipc.SharedMemory('/msg', flags=posix_ipc.O_CREAT, size=512)\n> pronto = posix_ipc.Semaphore('/pronto', flags=posix_ipc.O_CREAT, initial_value=0)\n> lido = posix_ipc.Semaphore('/lido', flags=posix_ipc.O_CREAT, initial_value=0)\n> mp = mmap.mmap(shm.fileno(), shm.size)\n> dados = input('> ').encode()[:511]\n> mp.write(dados + bytes(1))\n> pronto.release()      # up: há mensagem\n> lido.acquire()        # down: espera a leitura\n> mp.close(); shm.close_fd(); shm.unlink(); pronto.unlink(); lido.unlink()\n>\n> # leitor.py (inicie depois do escritor)\n> import posix_ipc, mmap\n> shm = posix_ipc.SharedMemory('/msg')\n> pronto = posix_ipc.Semaphore('/pronto')\n> lido = posix_ipc.Semaphore('/lido')\n> mp = mmap.mmap(shm.fileno(), shm.size)\n> pronto.acquire()\n> print(mp.read().split(bytes(1))[0].decode())\n> lido.release()\n> mp.close(); shm.close_fd()\n> ```\n\n## Exercícios sugeridos [+]\n1. Produtor-consumidor com buffer circular em memória compartilhada e três semáforos (ver [aula 6](06-ipc.md)).\n2. Reescrever com `MessageQueue` e comparar a necessidade de sincronização explícita.\n3. Fazer dois processos incrementarem um contador sem e com semáforo e observar a condição de corrida.\n\n## Referências\n- Python Software Foundation. Documentação do Python 3. <https://docs.python.org/3/>\n- Gomes, R. L. *IPC: Memória compartilhada*. Notas de aula.\n"
 },
 {
  "id": "08-escalonamento",
  "aula": "8",
  "titulo": "Escalonamento de processos",
  "fonte": "../slides/8 - Escalonamento.pdf",
  "texto": "\n# Aula 8: Escalonamento\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nO escalonador escolhe qual processo pronto usa a CPU; o algoritmo certo depende do ambiente (lote, interativo, tempo real) e das métricas que se quer otimizar.\n\n## Fundamentos\n- Vários processos **prontos** competem pela CPU; o **escalonador** decide usando um **algoritmo de escalonamento**.\n- A escolha afeta a percepção de velocidade (o usuário tolera um envio de e-mail lento, mas não uma janela que demora a fechar).\n- **Troca de contexto é cara**: entrar em modo núcleo, salvar registradores e mapa de memória, escolher o processo, recarregar o mapa na MMU e os registradores, voltar ao modo usuário.\n\n### CPU-bound × I/O-bound\n- CPU-bound: surtos longos de CPU, poucas esperas. I/O-bound: surtos curtos, muitas esperas.\n- O que define um processo I/O-bound é o **surto curto de CPU**, não a duração da E/S.\n- Entre os dois, convém escolher o **I/O-bound**: ele logo emite um pedido e mantém o disco ocupado.\n\n### Quando escalonar\n| Situação | Decisão possível |\n|---|---|\n| Processo criado | Executar o pai ou o filho |\n| Processo termina | Escolher outro; sem prontos, rodar o processo ocioso |\n| Processo bloqueia | Escolher outro; se ele esperava um recurso preso por B, pode ser útil rodar B |\n| Interrupção de E/S | Pode dar a CPU a quem acabou de ficar pronto |\n| Interrupção de relógio | Pode retirar o processo em execução |\n\n### Preemptivo × não preemptivo\n- **Preemptivo**: o escalonador **pode retirar** o processo da CPU (tipicamente na interrupção de relógio, ao fim do quantum).\n- **Não preemptivo**: ignora a interrupção para esse fim; o processo roda até bloquear, terminar ou ceder a CPU.\n\n> ⚠️ **Erro no slide \"Quando escalonar\":** os rótulos estão **trocados** (\"pode optar por retirar\" aparece como não preemptivo). Vale a definição acima, coerente com o restante da aula.\n\n- **Quantum**: tempo concedido a um processo. **Tick**: interrupção de um relógio do hardware.\n\n## Ambientes e objetivos\n| Ambiente | Preempção | Objetivos específicos |\n|---|---|---|\n| Lote | Não preemptivo ou quantum longo (minimiza trocas) | Vazão, tempo de retorno, utilização da CPU |\n| Interativo | Necessária | Tempo de resposta, proporcionalidade |\n| Tempo real | Nem sempre necessária (processos cooperam e bloqueiam rápido) | Cumprir prazos, previsibilidade |\n\n**Objetivos comuns a todos**\n- **Justiça**: processos semelhantes têm tratamento semelhante.\n- **Aplicação da política**: o algoritmo respeita a política definida.\n- **Equilíbrio**: manter os recursos ocupados (só CPU-bound em memória deixa o disco ocioso; só I/O-bound deixa a CPU ociosa).\n\n**Métricas**\n- **Vazão (throughput)**: tarefas concluídas por unidade de tempo.\n- **Tempo de retorno (turnaround)**: da submissão à conclusão.\n- **Utilização da CPU**: fração do tempo ocupada (não é a melhor métrica).\n- **Tempo de resposta**: espera do usuário pela resposta. **[+]** Em simuladores costuma-se medir do pedido até a primeira vez em execução.\n- **[+] Tempo de espera**: total na fila de prontos. Sem E/S: espera = retorno − tempo de CPU.\n- **Proporcionalidade**: atender a expectativa (tarefas complexas podem demorar, simples não).\n- Maximizar vazão **não** minimiza necessariamente o retorno: priorizando tarefas curtas que chegam sem parar, as longas nunca terminam.\n\n## Algoritmos para lote\n\n### FCFS (primeiro a chegar, primeiro a ser servido), não preemptivo\n- Fila única; quem bloqueia sai da CPU e, ao voltar a pronto, vai para o **fim**.\n- ✅ Simples de entender e implementar.\n- ❌ Prejudica I/O-bound. Exemplo: um processo CPU-bound que roda 1 s por vez antes de fazer E/S, junto a 5 processos I/O-bound que precisam de 1000 operações cada: cada um destes leva cerca de 1000 s. **[+]** É o **efeito comboio**.\n\n### SJF (job mais curto primeiro), não preemptivo\n- Supõe tempo de execução **conhecido**. Escolhe o menor entre os prontos de mesma prioridade.\n- Jobs A, B, C, D com 8, 4, 3, 2 min:\n\n| Ordem | Conclusões | Média |\n|---|---|---|\n| A B C D | 8, 12, 15, 17 | **13** |\n| D C B A | 2, 5, 9, 17 | **8,25** |\n\n> Os slides chamam esses valores de \"tempo de resposta\"; formalmente são tempos de **retorno**.\n\n- ❌ Se chegar um job menor, não há como interromper o atual.\n- **[+]** É ótimo para tempo médio de retorno **quando todos os jobs estão disponíveis ao mesmo tempo**.\n\n### SRTN (próximo de menor tempo restante), preemptivo\n- Versão preemptiva do SJF: se o job que chega precisa de **menos tempo que o restante** do atual, assume a CPU.\n- Figura: C em execução (parte já feita), fila B, A. Chega D, menor que o restante de C: D executa e C volta para a frente da fila.\n- **[+]** Pode causar inanição de jobs longos.\n\n### Escalonamento em três níveis\n| Escalonador | Decide |\n|---|---|\n| **Admissão** | Quais jobs entram no sistema e quais ficam na fila de entrada |\n| **Memória** | Quais admitidos ficam na memória e quais em disco (faz trocas). Ex.: 5 jobs que usam ~20% de CPU cada ocupam bem a CPU |\n| **CPU** | Qual processo pronto em memória executa (qualquer algoritmo) |\n\n## Algoritmos para sistemas interativos\nUsados em PCs, servidores e outros.\n\n### Round-robin (circular), preemptivo\n- Lista de prontos; cada um recebe um **quantum**; ao esgotá-lo, ou ao voltar de um bloqueio, vai para o **fim**.\n- Figura: lista B, F, D, G, A; após o quantum de B: F, D, G, A, B.\n- Simples, justo, muito usado.\n- **Tamanho do quantum**: pequeno → troca de contexto proporcionalmente cara; grande → demora para obter a CPU.\n- **[+]** Com troca de 1 ms e quantum de 4 ms, 20% se perde. Quantum muito grande degenera em FCFS. Faixa usualmente recomendada: 20 a 50 ms.\n\n### Por prioridades\n- Executa o de maior prioridade.\n- Para evitar monopólio: reduzir a prioridade a cada tick; quando cair abaixo do próximo, preemptar.\n- Alternativa dinâmica: **prioridade = 1/f**, onde f é a fração usada do último quantum (usou 1/50 → prioridade 50), favorecendo I/O-bound.\n- **Classes de prioridade** com round-robin dentro de cada uma; só se desce de classe quando as superiores estão vazias.\n- É preciso **reajustar prioridades** para evitar inanição.\n\n### Filas múltiplas\n- Classes com quanta 1, 2, 4, 8...\n- Todos começam na **classe mais alta**; quem usa todo o quantum **desce** (menos prioridade, mais tempo por vez).\n- Penaliza CPU-bound e reduz trocas de contexto para eles.\n- **[+]** Um processo de 100 quanta recebe 1, 2, 4, 8, 16, 32 e 64 (usa 37 deste último): **7** trocas em vez de 100. Criado no sistema CTSS.\n\n### Próximo processo mais curto\n- SJF aplicado a processos interativos (cada comando é um \"job\").\n- Estima pelo passado: técnica de **envelhecimento (aging)**. Média ponderada `a·T0 + (1−a)·T1`, repetida a cada nova medida.\n- Com a = ½: `T0`; `T0/2 + T1/2`; `T0/4 + T1/4 + T2/2`; `T0/8 + T1/8 + T2/4 + T3/2`; `T0/16 + T1/16 + T2/8 + T3/4 + T4/2`.\n- A constante `a` controla a rapidez com que medidas antigas são esquecidas.\n- **[+]** Forma geral: `S(n+1) = a·S(n) + (1−a)·T(n)`, onde S é a estimativa e T a medida. Quanto menor `a` nesta forma, mais rápido o esquecimento.\n\n### Garantido\n- Divide a CPU igualmente entre usuários (ou processos).\n- Mantém o tempo de CPU usado e o tempo desde a criação.\n- **Razão = TP / (TS / n)**: TP = tempo usado pelo processo; TS = tempo de CPU usado por todos os existentes; n = número de processos. Executa quem tem a **menor** razão até se aproximar dos demais.\n\n### Loteria\n- Processos recebem bilhetes; a cada decisão sorteia-se um.\n- Fração `f` dos bilhetes ≈ fração `f` da CPU. Mais bilhetes = mais prioridade.\n- **[+]** Processos cooperantes podem transferir bilhetes. Qualquer processo com ≥ 1 bilhete acaba sorteado (probabilisticamente sem inanição).\n\n### Fração justa\n- Problema: A tem 1 processo e B tem 9; B ficaria com 90% da CPU (vale também para processos com mais threads).\n- Solução: cota **por usuário**.\n- U com A, B, C, D e V com E:\n  - 50/50: `A E B E C E D E A E B E ...`\n  - 2/3 para U e 1/3 para V: `A B E C D E A B E C D E ...`\n\n## Tempo real\n- Resposta fora do prazo é indesejável ou inadmissível. Ex.: áudio/vídeo, monitor de pacientes, piloto automático, reator nuclear.\n- **Críticos (hard)**: atraso inadmissível. **Não críticos (soft)**: tolerável, mas indesejável.\n- Eventos **periódicos** ou **aperiódicos**.\n\n### Teste de escalonabilidade\nPara m eventos periódicos, com C_i = tempo de CPU para tratar o evento i e P_i = período:\n\n```\nC1/P1 + C2/P2 + ... + Cm/Pm  ≤  1\n```\n\nExemplo: períodos 100, 200, 500 ms e custos 50, 30, 100 ms → 0,50 + 0,15 + 0,20 = **0,85 ≤ 1**, escalonável. **[+]** Sobra folga para um 4º evento com C/P ≤ 0,15 (ignorando o custo das trocas).\n\n### RMS (taxa monotônica): prioridade estática\nCondições:\n1. Cada processo periódico termina dentro do período.\n2. Processos independentes.\n3. Mesmo tempo de CPU em todas as ocorrências.\n4. Processos não periódicos não têm prazos.\n5. Preempção instantânea e sem custo.\n\nPrioridade = **frequência** do evento (menor período, maior prioridade). Há preempção quando fica pronto um de prioridade maior.\n\n### EDF (prazo mais curto primeiro): prioridade dinâmica\n- Processos anunciam presença e **deadline**; executa o de prazo mais próximo; há preempção se surgir prazo mais curto.\n\n### Exemplos das figuras (RMS × EDF)\n| Caso | A (C/P) | B (C/P) | C (C/P) | Utilização | RMS | EDF |\n|---|---|---|---|---|---|---|\n| 1 | 10/30 | 15/40 | 5/50 | 0,808 | ✅ | ✅ |\n| 2 | 15/30 | 15/40 | 5/50 | 0,975 | ❌ | ✅ |\n\nCaso 2:\n- RMS: A1 0–15, B1 15–30, A2 30–45, B2 45–60; **C1 perde o prazo em t = 50**.\n- EDF: A1 0–15, B1 15–30, C1 30–35, A2 35–50, B2 50–65, A3 65–80, C2 80–85, B3 85–100, A4 100–115, C3 115–120, A5 120–135, B4 135–150.\n\n> **[+]** Limite suficiente do RMS (Liu e Layland): garantido se `U ≤ m(2^(1/m) − 1)`: m = 2 → 0,828; m = 3 → 0,780; m → ∞ → ln 2 ≈ 0,693. Não é necessário: o caso 1 excede 0,780 e funciona. EDF (preemptivo, uma CPU, prazo = período) é garantido se `U ≤ 1`.\n\n## Escalonamento de threads\n| | Nível de usuário | No núcleo |\n|---|---|---|\n| Quem o SO escalona | Processos | Threads |\n| Quem escolhe a thread | Escalonador interno do processo | SO |\n| Preempção entre threads | Não há | Há |\n| Thread que não libera a CPU | Prejudica só o próprio processo; continua de onde parou no próximo quantum | SO pode preemptar |\n| Conhecimento da aplicação | Pode saber o que cada thread faz e escolher melhor | No máximo dá prioridades; pode considerar o custo e preferir thread do mesmo processo |\n\n## [+] Exemplo resolvido para estudo\n| Processo | Chegada | CPU |\n|---|---|---|\n| P1 | 0 | 8 |\n| P2 | 1 | 4 |\n| P3 | 2 | 2 |\n\nConvenção do RR: quem chega entra na fila antes do processo preemptado no mesmo instante.\n\n| Algoritmo | Linha do tempo | Retorno médio | Espera média |\n|---|---|---|---|\n| FCFS | P1 0–8, P2 8–12, P3 12–14 | 10,33 | 5,67 |\n| SJF | P1 0–8, P3 8–10, P2 10–14 | 9,67 | 5,00 |\n| SRTN | P1 0–1, P2 1–2, P3 2–4, P2 4–7, P1 7–14 | 7,33 | 2,67 |\n| RR (q=3) | P1 0–3, P2 3–6, P3 6–8, P1 8–11, P2 11–12, P1 12–14 | 10,33 | 5,67 |\n\nTempo de resposta médio (até a 1ª execução): SRTN = 0; RR = 2. RR melhora a resposta em relação ao FCFS, não o retorno.\n\n## [+] Tabela-síntese\n| Algoritmo | Preemptivo | Inanição possível | Precisa saber tempos |\n|---|---|---|---|\n| FCFS | Não | Não (se todo surto termina) | Não |\n| SJF | Não | Sim | Sim |\n| SRTN | Sim | Sim | Sim |\n| RR | Sim | Não | Não |\n| Prioridades | Em geral | Sim, sem reajuste | Não |\n| Filas múltiplas | Sim | Sim, para classes baixas | Não |\n| Loteria | Sim | Improvável | Não |\n| RMS / EDF | Sim | Perde prazos em sobrecarga | Sim (C e P ou prazo) |\n\n> **[+]** Na prática: Linux usou o CFS (fração proporcional por tempo virtual) e, desde o kernel 6.6, o EEVDF; há ainda as classes `SCHED_FIFO`, `SCHED_RR` e `SCHED_DEADLINE`. Windows usa prioridades preemptivas com round-robin por nível.\n\n## [+] Ligação com o trabalho da disciplina\nO trabalho (2ª avaliação periódica) pede um **simulador de escalonador**: uma CPU, entrada `<chegada>: <CPU1>, <E/S1>, ..., <CPUn>`, pelo menos 2 algoritmos (1 preemptivo), quantum em ciclos, sem custo de troca de contexto, e relatório SBC de até 6 páginas comparando vazão e tempo de resposta. Detalhes na [especificação](../trabalho/Especificação%20Trabalho.pdf).\n- Cuidado conceitual: como a troca de contexto é ignorada, o simulador não penaliza quantum pequeno; vale citar isso na análise.\n\n## Exercícios dos slides\n1. (F) Não há objetivos comuns entre tipos de SO. *Justiça, aplicação da política e equilíbrio valem para todos.*\n2. (F) É melhor dar a CPU a um CPU-bound que a um I/O-bound. *O I/O-bound usa pouco a CPU e logo mantém o disco ocupado.*\n3. (F) Todos os algoritmos de lote são não preemptivos. *O SRTN é preemptivo.*\n4. (F) No round-robin um processo pode nunca ser escalonado. *A fila circular garante a vez de todos os processos prontos.*\n5. (V) Filas múltiplas penalizam quem usa muita CPU.\n6. (F) Na loteria é impossível priorizar. *Basta dar mais bilhetes ao processo.*\n7. (F) A principal diferença entre RMS e EDF é que RMS não faz preempção. *Ambos fazem preempção; a diferença é a prioridade estática (RMS) ou dinâmica (EDF).*\n8. (F) EDF tem prioridades estáticas. *No EDF a prioridade muda conforme o prazo mais próximo.*\n9. (V) No RMS a prioridade se relaciona à frequência do evento.\n\n## [+] Perguntas de revisão\n1. O que acontece com o round-robin quando o quantum é maior que todos os surtos de CPU? *Nenhum processo é preemptado: ele se comporta como FCFS.*\n2. Um sistema tem eventos com C/P iguais a 20/50 e 35/80 ms. É escalonável? *0,40 + 0,4375 = 0,8375 ≤ 1: sim. O RMS não tem garantia pelo limite de 0,828, então é preciso simular; o EDF garante.*\n3. Qual algoritmo minimiza o tempo médio de retorno quando todos os jobs chegam juntos? *Job mais curto primeiro (SJF).*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (2003) e 3ª ed. (2010), seção 2.5.\n- **[+]** Liu, C. L.; Layland, J. W. *Scheduling algorithms for multiprogramming in a hard-real-time environment*. JACM, 1973.\n"
 },
 {
  "id": "09-deadlocks",
  "aula": "9",
  "titulo": "Deadlocks",
  "fonte": "../slides/9 - Deadlocks.pdf",
  "texto": "\n# Aula 9: Deadlocks\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nDeadlock é um conjunto de processos em que cada um espera um evento que só outro do conjunto pode causar; lida-se ignorando, detectando e recuperando, evitando dinamicamente ou prevenindo.\n\n## Recursos\n- Alguns são de **uso exclusivo** (impressora, fita, entradas de tabelas internas); o SO garante acesso exclusivo temporário.\n- Ex.: gravar em CD dados escaneados exige dois recursos ao mesmo tempo.\n\n| Tipo | Definição | [+] Exemplo |\n|---|---|---|\n| **Preemptível** | Pode ser retirado sem prejuízo | Memória (com swap), CPU |\n| **Não preemptível** | Retirar causa falha na computação | Gravador de CD, impressora no meio do trabalho |\n\n- Uso: **requisitar → usar → liberar**. Se indisponível, o processo espera (bloqueado) ou recebe código de erro.\n- Deadlocks envolvem recursos **não preemptíveis**; com preemptíveis em geral basta realocar.\n- Recursos de nível de usuário (ex.: registros de banco de dados) são controlados com semáforos/mutexes; os do SO, por chamada de sistema (*request*) ou arquivos especiais (`open`).\n\n> ⚠️ O slide chama a chamada de `require`; o usual é `request`.\n\n## Definição\n\"Um conjunto de processos está em deadlock se todo processo do conjunto estiver esperando por um evento que somente outro processo do mesmo conjunto pode causar.\"\n- Hipóteses: cada processo tem uma única thread e não há interrupções que acordem os bloqueados.\n- O mais comum é o **deadlock de recurso** (o evento esperado é a liberação de um recurso). Há outros tipos.\n\n> **[+]** Outros: deadlock de **comunicação** (A espera mensagem de B, que espera de A; trata-se com *timeouts*); **livelock** (processos ativos sem progresso).\n\n## As quatro condições (Coffman)\nTodas são necessárias:\n\n| # | Condição | Enunciado |\n|---|---|---|\n| 1 | **Exclusão mútua** | Cada recurso está disponível ou associado a um único processo |\n| 2 | **Posse e espera** | Quem tem recursos pode pedir outros |\n| 3 | **Não preempção** | Recursos só são liberados explicitamente pelo processo |\n| 4 | **Espera circular** | Há uma cadeia circular de processos esperando recursos uns dos outros |\n\nSão, na prática, **políticas** que o sistema pode ou não adotar.\n\n## Modelagem com grafos dirigidos\n- Processos = círculos; recursos = retângulos.\n- **Recurso → processo**: o processo **detém** o recurso.\n- **Processo → recurso**: o processo está **bloqueado esperando**.\n- Um **ciclo** indica deadlock.\n\n> ⚠️ **Erro no slide:** o texto descreve as duas arestas com os sentidos **invertidos**. As figuras do próprio material seguem a convenção acima.\n\n```\n R ──▶ A ──▶ S ──▶ B ──▶ R      (A tem R e espera S; B tem S e espera R)\n```\n\n> **[+]** Com **um** recurso de cada tipo, ciclo é necessário e suficiente. Com várias instâncias, é necessário mas não suficiente.\n\n### Exemplo: a ordem de escalonamento importa\nProcessos precisam de: A → R, S; B → S, T; C → T, R.\n\n**Ordem 1** (A:R, B:S, C:T, A:S, B:T, C:R)\n| Passo | Resultado |\n|---|---|\n| A pede R, B pede S, C pede T | Todos obtêm |\n| A pede S | Bloqueia (B tem) |\n| B pede T | Bloqueia (C tem) |\n| C pede R | Bloqueia (A tem): **ciclo → deadlock** |\n\n**Ordem 2** (A:R, A:S, B:S, B:T, C:T, C:R)\n- A obtém R e S; B pede S e bloqueia (não chega a pedir T); C obtém T e bloqueia em R.\n- **Sem ciclo**: A não pedirá mais nada, termina e libera R e S; B e C prosseguem (B ainda esperará C liberar T).\n\n## Estratégias\n| Estratégia | Ideia |\n|---|---|\n| Ignorar (avestruz) | Fingir que não acontece |\n| Detectar e recuperar | Deixar ocorrer, detectar e agir |\n| Anulação dinâmica (*avoidance*) | Alocar com cuidado |\n| Prevenção | Negar estruturalmente uma das 4 condições |\n\n## 1. Algoritmo do avestruz\n- \"Enterre a cabeça na areia e finja que nada está acontecendo.\"\n- Razoável se deadlocks são raros, pois detectar custa caro.\n- Adotado por **Unix e Windows**.\n\n## 2. Detecção\n\n### Um recurso de cada tipo\n- Procurar ciclos no grafo: **busca em profundidade** a partir de cada nó, marcando os visitados.\n\n> **[+]** Em grafo dirigido, há ciclo quando se reencontra um nó que está **no caminho atual** da busca; reencontrar um nó já finalizado em outro caminho não basta.\n\n### Várias instâncias por tipo\n- Estruturas: **E** (recursos existentes), **A** (disponíveis), **C** (alocação atual), **R** (requisições). Linhas = processos, colunas = recursos.\n- Presume-se que cada processo já fez todas as suas requisições.\n\nAlgoritmo:\n1. Procurar processo não marcado cuja linha de R seja ≤ A (componente a componente).\n2. Se achar, somar sua linha de C a A, marcá-lo e repetir.\n3. Se não achar, terminar. **Os não marcados estão em deadlock.**\n\n> **[+]** Invariante: para cada recurso j, Σᵢ C[i][j] + A[j] = E[j]. Custo O(m·n²) para n processos e m tipos.\n\n**Exemplo** (fitas, plotters, scanners, CD-ROMs): E = (4 2 3 1), A = (2 1 0 0)\n\n| Processo | C (alocado) | R (requisitado) |\n|---|---|---|\n| P1 | 0 0 1 0 | 2 0 0 1 |\n| P2 | 2 0 0 1 | 1 0 1 0 |\n| P3 | 0 1 2 0 | 2 1 0 0 |\n\n- P3 pode: A = (2,1,0,0) + (0,1,2,0) = (2,2,2,0)\n- P2 pode: A = (2,2,2,0) + (2,0,0,1) = (4,2,2,1)\n- P1 pode. Todos marcados: **não há deadlock**.\n\n## 3. Recuperação (nenhuma é boa)\n| Método | Como | Problema |\n|---|---|---|\n| **Preempção** | Retirar o recurso e devolvê-lo depois | Depende do recurso; às vezes quase impossível |\n| **Retrocesso** | Voltar um processo a um *checkpoint* anterior à posse do recurso | Trabalho refeito (reimprimir, reler entradas) |\n| **Eliminação** | Matar processos até resolver | Grosseiro; pode causar inconsistência |\n\n- Pode-se matar um processo **fora do ciclo** que detém os recursos disputados.\n- Preferir processos que possam reiniciar do zero; matar um que atualiza banco de dados pode ser irreversível.\n\n## 4. Anulação dinâmica\n- **Estado seguro**: existe uma ordem de escalonamento em que todos terminam, mesmo que cada um peça de imediato o seu máximo.\n- Exige conhecer **antecipadamente** o máximo de cada processo.\n\n### Exemplo seguro (10 instâncias)\n| Processo | Possui | Máximo | Falta |\n|---|---|---|---|\n| A | 3 | 9 | 6 |\n| B | 2 | 4 | 2 |\n| C | 2 | 7 | 5 |\n\nDisponível 3. B recebe 2 e termina → 5 livres; C recebe 5 e termina → 7 livres; A recebe 6. **Seguro** (B, C, A).\n\n### Exemplo inseguro\n| Processo | Possui | Máximo | Falta |\n|---|---|---|---|\n| A | 7 | 9 | 2 |\n| B | 1 | 4 | 3 |\n| C | 2 | 7 | 5 |\n\nDisponível 1: ninguém consegue terminar. **Inseguro**.\n\n> ⚠️ Os números do slide não fecham: 7 + 1 + 2 = 10, então com 10 instâncias o disponível seria **0**. A conclusão (inseguro) vale com 0 ou 1.\n\n> **[+]** Inseguro **não** é o mesmo que deadlock: processos podem pedir menos que o máximo ou liberar antes. Inseguro significa que o SO não pode **garantir** o término de todos.\n\n### Algoritmo do banqueiro (Dijkstra)\n- Cada solicitação é avaliada; se levar a estado **inseguro**, é **adiada**.\n\n> ⚠️ O critério do slide (\"se nenhum puder concluir\") é incompleto: o estado só é seguro se existe uma sequência em que **todos** concluem.\n\nPassos para uma requisição:\n1. Conferir se o pedido ≤ necessidade restante e ≤ disponível.\n2. Simular a concessão.\n3. Aplicar o teste de segurança (igual ao de detecção, usando **Necessidade = Máximo − Alocado** no lugar de R).\n4. Seguro → conceder; senão → adiar.\n\n**[+] Exemplo com vários recursos** (Silberschatz). Disponível = (3,3,2).\n\n| P | Alocado | Máximo | Necessidade |\n|---|---|---|---|\n| P0 | 0 1 0 | 7 5 3 | 7 4 3 |\n| P1 | 2 0 0 | 3 2 2 | 1 2 2 |\n| P2 | 3 0 2 | 9 0 2 | 6 0 0 |\n| P3 | 2 1 1 | 2 2 2 | 0 1 1 |\n| P4 | 0 0 2 | 4 3 3 | 4 3 1 |\n\nSequência segura P1 → P3 → P4 → P0 → P2, com disponível: (5,3,2) → (7,4,3) → (7,4,5) → (7,5,5) → (10,5,7).\n\n> **[+]** Limitações práticas: raramente se conhece o máximo, o número de processos varia e recursos podem sumir.\n\n## 5. Prevenção\n| Condição atacada | Técnica | Limitação |\n|---|---|---|\n| Exclusão mútua | **Spooling** (só o daemon usa a impressora) | Ainda há deadlock se o spool encher só com arquivos incompletos e o daemon exigir arquivo completo (raro com discos grandes); nem tudo permite spool |\n| Posse e espera | Requisitar **tudo antes** de começar (alguns sistemas em lote) | Muitos não sabem antecipadamente; desperdício. **[+]** Alternativa: liberar tudo antes de pedir novo conjunto |\n| Não preempção | Retomar recursos; **virtualizar** | Nem sempre possível (ex.: registros de BD) |\n| Espera circular | Um recurso por processo, ou **numerar os recursos** e pedir em ordem crescente (R1, R3, R5) | A primeira é inaceitável em muitos casos |\n\n> **[+]** Por que a ordenação funciona: quem detém o recurso de maior número entre os alocados nunca espera um recurso de número menor, logo não se fecha ciclo.\n\n## Starvation (inanição)\n- Um processo nunca obtém o recurso por causa da **política de alocação**.\n- Evita-se com política **FIFO**.\n- **[+]** Deadlock: ninguém do conjunto progride. Inanição: o sistema progride, mas alguém é sempre preterido.\n\n> **[+]** Também existe o **bloqueio em duas fases** em bancos de dados (travar tudo; se falhar, soltar tudo e recomeçar; só depois atualizar).\n\n## Pontos de atenção para prova\n- Citar as 4 condições e uma técnica que negue cada uma.\n- Desenhar o grafo e achar o ciclo (cuidado com o sentido das arestas).\n- Rodar detecção/banqueiro em matrizes.\n- Distinguir prevenção (regra estrutural), anulação (decisão em tempo de execução) e detecção (a posteriori).\n\n## [+] Perguntas de revisão\n1. No exemplo seguro, A pede 1 recurso. Conceder? *A ficaria com 4, disponível 2: B termina → 4 livres; A falta 5 e C falta 5: ninguém mais. Inseguro → adiar.*\n2. n processos compartilham m instâncias e cada um precisa de no máximo k. Quando não há deadlock? *Se m ≥ n(k−1) + 1.*\n3. Qual condição o spooling ataca? *Exclusão mútua (e, ao virtualizar, também a não preempção, na visão dos slides).*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 3) e 3ª ed. (cap. 6).\n- **[+]** Coffman, E. G. et al. *System Deadlocks*. ACM Computing Surveys, 1971. Silberschatz et al. *Fundamentos de Sistemas Operacionais*.\n"
 },
 {
  "id": "10-gerencia-de-memoria",
  "aula": "10",
  "titulo": "Gerenciamento de memória",
  "fonte": "../slides/10 - Gerencia de memória.pdf",
  "texto": "\n# Aula 10: Gerenciamento de memória\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nO gerenciador de memória decide onde cada processo fica na RAM, resolve relocação e proteção e controla o espaço livre, equilibrando velocidade de alocação e fragmentação.\n\n## Contexto\n- Adaptação da lei de Parkinson: **programas tendem a se expandir até ocupar toda a memória disponível**.\n\n| Nível | Volátil | Velocidade | Quantidade | Custo | Gerido por |\n|---|---|---|---|---|---|\n| Cache | Sim | Muito rápida | Poucos MB | Alto | Hardware |\n| Principal (RAM) | Sim | Média | Alguns GB | Razoável | SO |\n| Secundária | Não | Baixa | TB | Baixo | SO |\n\n- **Gerenciador de memória**: parte do SO que concede memória aos processos.\n- Dois grupos de sistemas: os que **não usam** memória secundária e os que **usam** (para contornar a falta de RAM).\n\n## Monoprogramação\n- Memória dividida só entre o SO e **um** processo. Sem abstração: o programa acessa qualquer endereço. Raro hoje.\n\n| Variação | Layout | Uso |\n|---|---|---|\n| (a) | SO em RAM + programa | Primeiros computadores de grande porte |\n| (b) | SO em ROM + programa | Embarcados |\n| (c) | SO em RAM + programa + drivers em ROM (BIOS) | Primeiros PCs |\n\n## Multiprogramação: relocação e proteção\n\n### Relocação\n- Endereços do programa passam a ser **relativos**: um desvio para a posição 100 precisa ser recalculado conforme o endereço inicial do processo.\n- Solução por software: somar o endereço base **na carga**. O ligador deve marcar no executável quais palavras são endereços. **Não resolve proteção.**\n\n### Proteção\n- Blocos de memória com **bits de proteção**, comparados com a chave no **PSW**; acesso inválido gera interrupção. **[+]** Esquema do IBM 360.\n\n### Registradores base e limite\n- Resolvem **os dois** problemas com ajuda do hardware. Carregados a cada troca de processo.\n- Todo endereço é **somado à base** e verificado contra o **limite**.\n\n> **[+]**\n> ```\n> endereço lógico ──▶ (< limite?) ──sim──▶ (+ base) ──▶ endereço físico\n>                          └──não──▶ exceção\n> ```\n> Aqui \"limite\" é o tamanho da partição. Alterar base e limite é instrução privilegiada.\n\n## Fragmentação\n- **Interna**: memória **concedida** ao processo e não usada.\n- **Externa**: memória **não alocada** a ninguém, espalhada entre áreas alocadas.\n\n## Partições fixas\n- Memória dividida em partições de tamanho imutável (podem diferir entre si). O processo fica na partição, em geral, até terminar. A sobra é perdida (**fragmentação interna**).\n\n| Estratégia | Funcionamento | Problema |\n|---|---|---|\n| **Filas separadas** | Processo entra na fila da menor partição que o comporta | Partição livre com fila vazia enquanto outros esperam em filas cheias |\n| **Fila única**, próximo que cabe | Libera partição → primeiro da fila que caiba | Processos pequenos em partições grandes (muito desperdício) |\n| **Fila única**, maior que cabe | Escolhe o maior que caiba | Pequenos podem nunca executar (inanição) |\n| Com **contador** | Quem foi preterido k vezes passa a ser o próximo | Remedia a inanição |\n\n## Partições variáveis: controle do espaço livre\n\n### Mapa de bits\n- Memória dividida em **unidades** de tamanho fixo; um bit por unidade (0 livre, 1 ocupada).\n- Unidade maior → mapa menor, porém mais desperdício na última unidade.\n- ❌ Alocar k unidades exige achar **k bits zero consecutivos**: caro.\n- **[+]** Fração da memória gasta com o mapa, com unidade de u bits: 1/(u+1). Para u = 32 bits (4 bytes), ≈ 3%.\n\n### Lista encadeada\n- Cada nó: alocado (P) ou livre/buraco (H), endereço inicial, tamanho.\n- Exemplo da figura: `P0,5 → H5,3 → P8,6 → P14,4 → H18,2 → P20,6 → P26,3 → H29,3`.\n- Manter **ordenada por endereço** facilita a liberação, pois permite fundir vizinhos. Quatro casos ao liberar X:\n\n| Antecessor | Sucessor | Ação |\n|---|---|---|\n| Ocupado | Ocupado | Apenas marca X como livre |\n| Ocupado | Livre | Funde X com o sucessor |\n| Livre | Ocupado | Funde X com o antecessor |\n| Livre | Livre | Funde os três |\n\n## Algoritmos de alocação\nUsados quando um processo é criado ou volta do disco.\n\n| Algoritmo | Escolha | Prós | Contras |\n|---|---|---|---|\n| **First fit** | Primeiro buraco que cabe; divide o resto | Simples e rápido | **[+]** Acumula fragmentos no início |\n| **Next fit** | Como first fit, mas retoma de onde parou | | Um pouco pior que first fit |\n| **Best fit** | Menor buraco que cabe | Preserva buracos grandes | Percorre toda a lista; gera sobras minúsculas inúteis e desperdiça mais |\n| **Worst fit** | Maior buraco | Sobras reaproveitáveis | Percorre a lista; simulações mostram que é ruim |\n| **Quick fit** | Listas separadas por tamanhos comuns | Busca extremamente rápida | Devolução cara: sem fundir blocos há muita fragmentação |\n\n- No quick fit, um buraco fora dos tamanhos exatos (ex.: 21 KB) pode ir para a lista do maior tamanho menor que ele (20 KB) ou para uma lista de tamanhos especiais.\n\n**[+] Exemplo resolvido.** Buracos (em ordem): 100, 500, 200, 300, 600 KB. Pedidos: 212, 417, 112, 426.\n\n| Pedido | First fit | Best fit | Worst fit |\n|---|---|---|---|\n| 212 | 500 (sobra 288) | 300 (sobra 88) | 600 (sobra 388) |\n| 417 | 600 (sobra 183) | 500 (sobra 83) | 500 (sobra 83) |\n| 112 | 288 (sobra 176) | 200 (sobra 88) | 388 (sobra 276) |\n| 426 | **espera** | 600 (sobra 174) | **espera** |\n\nUm único exemplo não define o melhor algoritmo em geral.\n\n## Algoritmo buddy\n- Usado no **Linux**. Divide blocos em n partes (geralmente **n = 2**) até achar o menor que comporta o pedido.\n- Mantém listas de blocos livres em potências de n.\n\n**Alocação**\n1. No início há um único bloco.\n2. Arredonda o pedido para a menor potência de n **maior ou igual** a ele (P).\n3. Se há bloco livre de tamanho P, entrega.\n4. Senão, pega um dos menores blocos maiores e divide até obter P.\n\n**Liberação**: se os **companheiros** (gerados pela mesma divisão, mesmo tamanho) estão livres, funde, repetindo para cima. Vizinhos de **origens diferentes não** são fundidos, mesmo que adjacentes.\n\n### Exemplo dos slides (1 GB = 1024 MB)\n| Operação | Estado (endereço crescente) |\n|---|---|\n| Início | `[1024]` |\n| A pede 70 → 128 | `A128 · 128 · 256 · 512` |\n| B pede 35 → 64 | `A128 · B64 · 64 · 256 · 512` |\n| C pede 80 → 128 | `A128 · B64 · 64 · C128 · 128 · 512` |\n| Libera A | `128 · B64 · 64 · C128 · 128 · 512` |\n| D pede 60 → 64 | `128 · B64 · D64 · C128 · 128 · 512` |\n| Libera B | `128 · 64 · D64 · C128 · 128 · 512` |\n| Libera D | 64+64 → 128; 128+128 → 256: `256 · C128 · 128 · 512` |\n| Libera C | 128+128 → 256 → 512 → `[1024]` |\n\n> **[+]** Com A, B, C e D arredondados, a fragmentação interna é 58 (A), 29 (B), 48 (C) e 4 MB (D).\n\n- Gera fragmentação **interna e externa**, mas é **rápido**.\n- Um **vetor de cabeças de lista**, uma por tamanho (1 KB, 2 KB, 4 KB...), facilita achar blocos.\n- **[+]** Truque (n = 2): endereço do companheiro = `endereço XOR tamanho`. No Linux o buddy aloca páginas físicas; o *slab allocator* fica por cima para objetos pequenos.\n\n## Troca de processos\n- **[+]** *Swapping*: mover processos inteiros entre RAM e disco quando não cabem todos.\n- Entradas e saídas sucessivas geram **fragmentação externa**. **Compactação** junta os buracos, mas é **cara**. **[+]** Exige relocação em tempo de execução (base/limite).\n- **Processos que crescem**:\n  - Se há memória livre adjacente, é alocada ao processo.\n  - Senão, o processo é movido, ou vizinhos vão para o disco.\n  - Se nada for possível, ele espera ou é encerrado.\n- Pode-se reservar folga para expansão. Com duas áreas que crescem, **pilha** (em geral para baixo) e **heap** (para cima) compartilham o espaço livre entre elas.\n\n## Pontos de atenção para prova\n- Distinguir fragmentação interna e externa e dizer qual cada técnica gera (fixas → interna; variáveis → externa; buddy → ambas).\n- Simular first/best/worst fit e buddy.\n- Base e limite resolvem relocação **e** proteção.\n\n## [+] Perguntas de revisão\n1. Pedido de 129 KB no buddy: quanto é reservado? *256 KB; 127 KB de fragmentação interna.*\n2. Por que o best fit pode desperdiçar mais que o first fit? *Cria muitas sobras pequenas demais para serem usadas.*\n3. O que o mapa de bits economiza e o que encarece? *Espaço de controle previsível; busca por sequências livres.*\n\n## Ver também\n[Memória virtual](11-memoria-virtual.md) · [Segmentação](14-segmentacao.md)\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 4) e 3ª ed. (cap. 3).\n"
 },
 {
  "id": "11-memoria-virtual",
  "aula": "11",
  "titulo": "Memória virtual e paginação",
  "fonte": "../slides/11 - Memória virtual.pdf",
  "texto": "\n# Aula 11: Memória virtual\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nMemória virtual permite processos maiores que a RAM mantendo só as partes ativas na memória; a MMU traduz endereços por tabelas de páginas, aceleradas pela TLB.\n\n## Ideia\n- Antes, o **programador** dividia programas grandes em módulos (**[+]** *overlays*) trocados com o disco. Com memória virtual, a divisão é do **SO**.\n- O SO mantém partes ativas na RAM e o resto na memória secundária, carregando sob necessidade.\n- Com multiprogramação, pedaços de vários processos ficam na RAM. Quem espera um pedaço vindo do disco está **bloqueado por E/S**.\n\n## Endereçamento\n- Sem memória virtual: o endereço do programa vai direto ao barramento (é físico).\n- Com memória virtual: o programa usa **endereços virtuais** (espaço de endereçamento virtual); a **MMU** os converte em físicos. Ex.: em `MOV R, 1000`, o 1000 é virtual.\n\n## Paginação\n- Espaço virtual dividido em **páginas**; memória física em **molduras** (*page frames*) do mesmo tamanho. Transferências RAM ↔ disco são sempre em páginas.\n- Página ausente → a MMU gera interrupção de **falta de página** (*page fault*); o SO escolhe uma vítima, substitui e atualiza a tabela. Ver [aula 12](12-substituicao-de-paginas.md).\n\n### Tradução\n```\nendereço virtual (16 bits)\n┌────────────┬──────────────────────┐\n│ página (4) │ deslocamento (12)    │\n└─────┬──────┴──────────┬───────────┘\n      ▼ índice          │ copiado\n tabela de páginas      │\n      ▼                 ▼\n┌────────────┬──────────────────────┐\n│ moldura    │ deslocamento (12)    │  endereço físico\n└────────────┴──────────────────────┘\n```\n- Bits **mais significativos**: número da página (índice na tabela). Bits **menos significativos**: deslocamento.\n- 4 bits → 16 páginas; 12 bits → páginas de 4 KB.\n\n> **[+] Fórmulas**: `p = endereço div tamanho_página`; `d = endereço mod tamanho_página`; `físico = moldura × tamanho_página + d`.\n> Ex.: endereço 8196 com páginas de 4096 → p = 2, d = 4. Se a página 2 está na moldura 6 → físico = 6 × 4096 + 4 = **24580**.\n\n> **[+] Passos de um page fault**: trap → SO salva o estado → verifica se o acesso é válido (senão encerra o processo) → obtém moldura livre ou escolhe vítima (grava se M = 1) → lê a página do disco (processo bloqueado) → atualiza a tabela → **reexecuta** a instrução.\n\n## Tabela de páginas\n- Uma por processo. Duas preocupações: pode ser **enorme** (32 bits com páginas de 4 KB → ~1 milhão de entradas) e o mapeamento precisa ser **rápido** (ocorre em todo acesso).\n\n| Implementação | Troca de contexto | Tradução |\n|---|---|---|\n| Vetor de registradores no hardware | Cara (recarrega a tabela inteira) | Sem acesso à memória |\n| Tabela em RAM + registrador de base | Barata (troca um registrador) | 1 ou mais acessos extras por referência |\n\n### Multinível\n- N níveis → endereço com **N + 1 campos** (N índices + deslocamento).\n- Campo de M bits → tabelas com 2^M entradas.\n- Exemplo: 32 bits, N = 2, M = 10 → `10 | 10 | 12` (12 bits de deslocamento).\n- Só precisam ficar na memória as tabelas no **caminho** de páginas realmente usadas.\n- Além de 3 níveis a complexidade em geral não compensa.\n\n> ⚠️ O slide diz que o nível i tem M^(i−1) tabelas; o correto é **até (2^M)^(i−1) = 2^(M(i−1))** tabelas. No exemplo: 1 tabela no nível 1 e até 1024 no nível 2.\n\n> **[+]** Exemplo: processo com 4 MB de código, 4 MB de dados e 4 MB de pilha (regiões separadas) usa 1 tabela raiz + 3 de segundo nível = 4 × 4 KB = 16 KB, contra 4 MB da tabela de um nível. Hoje x86-64 usa 4 ou 5 níveis.\n\n### Entrada da tabela (formato dependente da máquina)\n| Campo | Função |\n|---|---|\n| **Número da moldura** | Bits altos do endereço físico; é o objetivo do mapeamento |\n| **Presente/ausente** | 1 presente; acesso com 0 gera page fault |\n| **Proteção** | 1 bit (leitura ou leitura/escrita) ou 3 bits (R, W, X) |\n| **Referenciada (R)** | Marcada em qualquer acesso; usada na substituição |\n| **Modificada (M)** | Marcada na escrita; se 1, a página precisa ser gravada ao sair (**[+]** *dirty bit*) |\n| **Cache desabilitada** | Garante leitura do dispositivo, não de cópia velha (E/S mapeada em memória) |\n\n## TLB (*Translation Lookaside Buffer*)\n- Custo sem TLB: sem tabela, 1 acesso; 1 nível, 2 acessos (desempenho −50%); 2 níveis, 3 acessos (−⅔).\n- Como quase todas as referências vão a **poucas páginas** (localidade), usa-se um cache de traduções: a **TLB** ou **memória associativa**, com poucas entradas, geralmente na MMU, pesquisada **em paralelo**.\n- Entrada: número da página virtual, bit M, proteção, moldura, bit de validade.\n\n| Situação | Resultado |\n|---|---|\n| Encontrada e acesso permitido (**hit**) | Moldura vem da TLB |\n| Encontrada, mas acesso viola proteção | *Protection fault* |\n| Não encontrada (**miss**) | Consulta a tabela e substitui uma entrada da TLB |\n\n| Gerência | No miss | Observação |\n|---|---|---|\n| Hardware | A MMU resolve | MMU mais complexa |\n| Software | Interrupção, o SO resolve | Aceitável se a taxa de miss é baixa; simplifica a MMU e libera área do chip |\n\n### Desempenho\nMemória 100 ns, TLB 20 ns, acerto de 90%. **Resposta dos slides**: `0,9 × 20 + 0,1 × 100 = 28 ns`.\n\n> ⚠️ **Atenção:** os 28 ns representam só o **custo médio da tradução** no modelo \"hit custa a TLB, miss custa um acesso à memória\". Não incluem o acesso ao dado (somando-o: 128 ns). No modelo mais comum (Silberschatz), com 1 nível: hit = 20 + 100 = 120; miss = 20 + 100 + 100 = 220; **média = 130 ns**. Em prova do professor, conferir qual modelo ele usa.\n\n> **[+]** Forma geral: `TEA = h·(t_tlb + m) + (1−h)·(t_tlb + (n+1)·m)`, com n níveis. Na troca de contexto a TLB precisa ser invalidada, salvo se as entradas tiverem identificador de processo (ASID/PCID).\n\n## Tabela de páginas invertida\n- Problema de tamanho:\n  - 32 bits, páginas de 4 KB: 2³²/2¹² = 1.048.576 entradas × 4 B = **4 MB** por processo.\n  - 64 bits: 2⁵² ≈ 4,5×10¹⁵ páginas × 8 B ≈ 32.768 TB (os slides dizem \"mais de 32.740 TB\", cerca de 33 mil discos de 1 TB).\n- **Invertida**: **uma entrada por moldura**, informando (processo, página). 1 GB de RAM com 4 KB → 262.144 entradas.\n- ❌ Não dá para indexar pela página p: é preciso **procurar** o par (n, p), e isso a cada referência.\n- ✅ A **TLB** guarda as mais usadas; no miss, a busca é feita por software, com **hash** do endereço virtual.\n\n> **[+]** Dificulta o compartilhamento de páginas. Usada em PowerPC e IA-64.\n\n## Fragmentação\n- Paginação **elimina a fragmentação externa**, mas gera **interna** (última página do processo, em média meia página).\n\n## Pontos de atenção para prova\n- Decompor endereço em página e deslocamento; calcular tamanho de tabela.\n- Calcular tempo efetivo de acesso.\n- Diferenciar TLB miss (tradução ausente no cache) de page fault (página fora da RAM).\n\n## [+] Perguntas de revisão\n1. 32 bits, páginas de 8 KB: bits de deslocamento e entradas? *13 bits; 2¹⁹ = 524.288.*\n2. Por que o tamanho da página é potência de 2? *Para separar página e deslocamento só dividindo bits.*\n3. TLB miss implica page fault? *Não.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 4) e 3ª ed. (cap. 3).\n"
 },
 {
  "id": "12-substituicao-de-paginas",
  "aula": "12",
  "titulo": "Substituição de páginas",
  "fonte": "../slides/12 - Substituição de páginas.pdf",
  "texto": "\n# Aula 12: Substituição de páginas\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nQuando há falta de página e não há moldura livre, o SO escolhe uma vítima tentando minimizar faltas futuras; os algoritmos práticos aproximam o ótimo usando os bits R e M.\n\n## Contexto\n- Há moldura livre → basta carregar. Memória cheia → substituir; se a vítima foi **modificada**, gravá-la antes.\n- Trazer página do disco é caro: o objetivo é **minimizar trocas**.\n\n## 1. Ótimo\n- Remove a página que **demorará mais** a ser usada novamente.\n- **Impossível** de implementar (exige conhecer o futuro).\n- Serve de **referência**: executa-se o programa, registra-se o log de referências e, numa segunda execução, aplica-se o ótimo para comparar com algoritmos reais.\n\n## 2. NRU (não usada recentemente)\n- Bits **R** (leitura ou escrita) e **M** (escrita); em hardware ou simulados pelo SO.\n- R é limpo periodicamente (ex.: a cada tick). M não é limpo.\n\n| Classe | R | M |\n|---|---|---|\n| 0 | 0 | 0 |\n| 1 | 0 | 1 |\n| 2 | 1 | 0 |\n| 3 | 1 | 1 |\n\n- Remove **página aleatória da classe mais baixa** não vazia.\n- ✅ Simples, desempenho aceitável.\n- **[+]** A classe 1 existe porque o tick zera R, mas preserva M.\n\n## 3. FIFO\n- Fila por ordem de chegada; remove a mais antiga.\n- ❌ Pode remover páginas muito usadas.\n\n## 4. Segunda chance\n- FIFO que consulta R na cabeça: **R = 1** → vai para o fim com R = 0; **R = 0** → é removida.\n- Busca a página **mais antiga não referenciada recentemente**. Se todas têm R = 1, degenera em FIFO.\n\nExemplo (cabeça à esquerda, formato R/M):\n\n| Passo | Fila |\n|---|---|\n| Falta | P1(1/0) P2(1/1) P3(0/0) P4(0/0) P5(1/1) |\n| P1 tem R=1 | P2(1/1) P3 P4 P5(1/1) P1(0/0) |\n| P2 tem R=1 | P3(0/0) P4 P5(1/1) P1(0/0) P2(0/1) |\n| P3 tem R=0: sai (M=0, sem escrita) | P4 P5 P1 P2 PX(1/0) |\n\n## 5. Relógio\n- Mesma política, com **lista circular e ponteiro** (sem remover e inserir na fila).\n- Apontada com R = 1 → zera e avança. R = 0 → substitui e avança.\n- Exemplo: P1(1) → zera; P2(1) → zera; P3(0) → substituída por PX; ponteiro vai a P4.\n\n## 6. LRU (menos recentemente usada)\n- Desempenho próximo do ótimo; supõe que o usado recentemente será usado em breve.\n\n> ⚠️ Os slides abreviam como \"MRU\". Em inglês **MRU = *most* recently used**, o oposto. Aqui trata-se de **LRU**.\n\n- Implementação completa: lista ordenada atualizada **a cada referência** (cara).\n\n### Hardware: matriz N×N\n- N molduras, matriz zerada. A cada referência à página i: **linha i ← 1**, depois **coluna i ← 0**.\n- A vítima é a linha de **menor valor binário**.\n- Exemplo com 4 páginas e acessos `0,1,2,3,2,1,0,3,2,3`. Estado final:\n\n| Página | Linha | Valor |\n|---|---|---|\n| 0 | 0100 | 4 |\n| 1 | 0000 | **0 → vítima** |\n| 2 | 1100 | 12 |\n| 3 | 1110 | 14 |\n\n### Software: envelhecimento (*aging*)\n- Contador de bits por página. A cada tick: desloca à direita e insere **R no bit mais significativo** (e zera R).\n- Vítima = menor contador (empate: escolhe uma).\n\nExemplo da figura (6 páginas, 8 bits, 5 ticks):\n\n| Pág. | R nos ticks 0→4 | Contador final |\n|---|---|---|\n| 0 | 1 1 1 1 0 | 01111000 |\n| 1 | 0 1 1 0 1 | 10110000 |\n| 2 | 1 0 0 0 1 | 10001000 |\n| 3 | 0 0 1 0 0 | **00100000 → vítima** |\n| 4 | 1 1 0 1 0 | 01011000 |\n| 5 | 1 0 1 0 0 | 00101000 |\n\n> **[+]** Diferenças para o LRU real: não distingue a ordem dentro de um mesmo tick e o histórico é limitado ao número de bits.\n\n## 7. Conjunto de trabalho\n- **Paginação por demanda**: o processo começa sem páginas e as traz conforme as faltas.\n- **Princípio da localidade**: em cada fase usa-se pequena fração das páginas; esse é o **conjunto de trabalho**.\n- **Pré-paginação** (modelo de conjunto de trabalho): garantir que o conjunto esteja na memória antes de o processo executar.\n- No instante t, é o conjunto das páginas nas **últimas k referências**; tamanho **w(k, t)**.\n- w é **não decrescente em k** e limitado pelo total de páginas; cresce bem menos que proporcionalmente.\n- Falta de página → remover página **fora** do conjunto.\n- Guardar as últimas k referências é caro; usa-se **tempo**: páginas acessadas nos últimos τ (ex.: 100 ms) de **tempo virtual** (CPU usada pelo próprio processo).\n\n**Implementação** (entrada com instante do último uso, R, M etc.). Em cada falta, percorrem-se todas as páginas:\n1. R = 1 → atualiza o instante com o tempo virtual atual.\n2. R = 0 → `idade = tempo atual − último uso`; se idade > τ, **substitui**.\n3. Se nenhuma passa de τ, remove a de **maior idade** entre as de R = 0.\n4. Se todas têm R = 1, escolhe uma ao acaso (**[+]** preferindo limpa).\n\n## 8. WSClock\n- Une conjunto de trabalho e relógio, evitando varrer a tabela inteira. Procura página **fora do conjunto e não modificada**.\n- Lista circular de molduras com R, M e instante do último acesso.\n- Em cada posição:\n\n| Condição | Ação |\n|---|---|\n| R = 1 | Zera R (**[+]** atualiza o instante) e avança |\n| R = 0, idade > τ, M = 0 | **Substitui** |\n| R = 0, idade > τ, M = 1 | **Agenda escrita** e continua |\n| R = 0, idade ≤ τ | Avança |\n\n- Se o ponteiro der a volta:\n  - **Houve escrita agendada**: continua até achar a primeira página já gravada (a primeira agendada nem sempre é a primeira concluída).\n  - **Nenhuma escrita**: pega a primeira com M = 0; se não houver, grava a página atual e usa sua moldura.\n\n## [+] Comparação (classificação de Tanenbaum)\n| Algoritmo | Avaliação |\n|---|---|\n| Ótimo | Impossível; referência |\n| NRU | Aproximação grosseira |\n| FIFO | Pode jogar fora páginas importantes |\n| Segunda chance | Grande melhora sobre FIFO |\n| Relógio | Realista |\n| LRU | Excelente, difícil de implementar |\n| Aging | Boa aproximação eficiente do LRU |\n| Conjunto de trabalho | Bom, caro |\n| WSClock | Bom e eficiente |\n\n## [+] Exemplo resolvido (3 molduras)\nReferências: `7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1` (inclui as faltas iniciais)\n\n| Algoritmo | Faltas |\n|---|---|\n| Ótimo | 9 |\n| LRU | 12 |\n| FIFO | 15 |\n\n**Anomalia de Belady**: com `1 2 3 4 1 2 5 1 2 3 4 5`, FIFO tem **9** faltas com 3 molduras e **10** com 4. Algoritmos de pilha (LRU, ótimo) não sofrem dela.\n\n## Pontos de atenção para prova\n- Simular FIFO, ótimo, LRU, relógio e aging.\n- Dizer que bits cada algoritmo usa.\n- Explicar por que preferir vítima não modificada.\n\n## [+] Perguntas de revisão\n1. Duas páginas com contadores `00110000` e `01000000`: qual sai? *A primeira (menor), pois a outra teve uso mais recente.*\n2. Por que usar tempo virtual no conjunto de trabalho? *Para que a idade não cresça enquanto o processo nem está executando.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 4) e 3ª ed. (cap. 3).\n- **[+]** Silberschatz et al., capítulo de memória virtual (exemplos de referências).\n"
 },
 {
  "id": "13-questoes-de-projeto-paginacao",
  "aula": "13",
  "titulo": "Questões de projeto para sistemas de paginação",
  "fonte": "../slides/13 - Questoes de projeto para paginação.pdf",
  "texto": "\n# Aula 13: Questões de projeto para paginação\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nAlém do algoritmo de substituição, o desempenho da paginação depende de como se distribuem molduras, controla-se a carga, escolhe-se o tamanho de página, compartilha-se e limpa-se a memória.\n\n## Anomalia de Belady\n**Mais molduras sempre significam menos faltas? Não.**\n\nFIFO, páginas 0–4, sequência `0 1 2 3 0 1 4 0 1 2 3 4`. Colunas = estado após cada referência (topo = entrada mais recente); `*` = falta.\n\n**3 molduras → 9 faltas**\n```\nref   0  1  2  3  0  1  4  0  1  2  3  4\nnovo  0  1  2  3  0  1  4  4  4  2  3  3\n         0  1  2  3  0  1  1  1  4  2  2\nvelho       0  1  2  3  0  0  0  1  4  4\nfalta *  *  *  *  *  *  *        *  *\n```\n**4 molduras → 10 faltas**\n```\nref   0  1  2  3  0  1  4  0  1  2  3  4\nnovo  0  1  2  3  3  3  4  0  1  2  3  4\n         0  1  2  2  2  3  4  0  1  2  3\n            0  1  1  1  2  3  4  0  1  2\nvelho          0  0  0  1  2  3  4  0  1\nfalta *  *  *  *        *  *  *  *  *  *\n```\n- Não ocorre com **algoritmos de pilha** (LRU, ótimo): o conjunto de páginas em memória com m molduras está **contido** no conjunto com m+1.\n\n> ⚠️ O slide cita \"MRU\", querendo dizer menos recentemente usada (**LRU**).\n\n## Thrashing\nPrograma que gera faltas continuamente e passa a maior parte do tempo esperando por páginas.\n\n## 1. Política de alocação: local × global\nNa falta, a vítima vem **só do processo que faltou** (local) ou de **qualquer processo** (global)?\n\n| | Local | Global |\n|---|---|---|\n| Molduras por processo | Fração fixa | Variam no tempo |\n| Quando o conjunto de trabalho cresce | Pode haver thrashing **mesmo com molduras sobrando** | Se adapta |\n| Em geral | | **Melhor** |\n\n- Figura: ao faltar A6, a local substitui a página de menor idade **de A** (A5, idade 3); a global, a de menor idade **de todos** (B3, idade 2).\n- **[+]** Desvantagem da global: um processo pode tomar molduras dos outros, tornando o desempenho imprevisível. Na local, se o conjunto de trabalho encolhe, há desperdício.\n\n### Dividindo molduras (global)\nConjuntos de trabalho mudam rápido, então a divisão é revista continuamente:\n- **Igual**: fatias iguais; as sobras formam um *pool* comum.\n- **Proporcional ao tamanho**: um processo de 300 KB recebe 30× mais que um de 10 KB. Convém garantir um **mínimo** a todos.\n- **PFF** (*page fault frequency*): aumenta ou reduz as molduras conforme a taxa de faltas. **Não** diz qual página remover.\n\n```\ntaxa de faltas\n  │\\\n  │ \\_______ limite superior A → dar mais molduras\n  │   \\____\n  │ ........ limite inferior B → retirar molduras\n  │        \\_____\n  └──────────────── nº de molduras\n```\n*(diagrama [+])*\n\n- **Conjunto de trabalho e WSClock** não fazem sentido como globais: não existe conjunto de trabalho da máquina; unir todos perde a localidade.\n\n## 2. Controle de carga\n- Se a **soma dos conjuntos de trabalho** excede a memória → thrashing.\n- Solução: levar alguns processos para o **disco** (**escalonamento de dois níveis**), considerando tamanho, tipo (CPU/IO-bound) etc.\n\n> ⚠️ O slide diz \"levar para a memória\"; o correto é para o **disco**.\n\n## 3. Tamanho de página\nO SO pode adotar um tamanho mesmo diferente do hardware (**[+]** agrupando páginas físicas).\n\n| A favor de páginas **pequenas** | A favor de páginas **grandes** |\n|---|---|\n| Menos fragmentação interna (em média meia última página; n segmentos → n·p/2 bytes) | Tabela de páginas menor |\n| Partes não usadas não ocupam memória | Transferência mais eficiente: o tempo de disco é dominado por posicionamento e rotação |\n\n> ⚠️ O slide escreve \"segmentação interna\"; é **fragmentação** interna.\n\n### Tamanho ótimo\ns = tamanho médio do processo; e = tamanho da entrada da tabela; p = tamanho da página.\n\n```\ncusto(p) = s·e/p + p/2\n```\n\n```\nderivada:  −s·e/p² + 1/2 = 0   ⇒   p = √(2·s·e)\n```\n\n> ⚠️ Os slides mostram `se/p + 1/2` e `−se/p + 1/2 = 0`. O correto é **p/2** no custo e **p²** na derivada; o resultado final `p = √(2se)` está certo.\n\n> **[+]** s = 1 MB, e = 8 B → p = √(2²⁴) = **4 KB**.\n\n## 4. Espaços separados de instruções e dados\n- A maioria usa um espaço único; alguns têm **espaço I** e **espaço D**, cada um com sua tabela de páginas, dobrando o espaço endereçável (**[+]**).\n\n## 5. Compartilhamento de páginas\n- Páginas somente leitura (ex.: código) podem ser compartilhadas.\n- Com I e D separados é simples: processos usam a **mesma tabela de instruções**.\n- Com espaço único é mais complexo:\n  - controlar quais são compartilhadas, para não descartá-las na troca;\n  - ao terminar um processo, verificar o que outros ainda usam.\n- **Dados (Unix, `fork`)**: pai e filho têm tabelas próprias apontando para as mesmas páginas, **somente leitura**. Na primeira escrita cria-se uma cópia e ambas passam a leitura/escrita (**[+]** ***copy-on-write***).\n\n## 6. Política de limpeza\n- Gravar páginas modificadas no momento da falta atrasa; é melhor **manter molduras livres** de antemão.\n- **Daemon de paginação**: dorme e acorda periodicamente; com poucas molduras livres, escolhe vítimas pelo algoritmo de substituição, gravando as modificadas.\n\n## 7. Interface da memória virtual\n- Alguns sistemas dão controle ao programador sobre o mapa de memória:\n  - compartilhar regiões **nomeadas** entre processos (ver [prática 7.1](07.1-ipc-pratica-python.md));\n  - troca de mensagens de alto desempenho.\n- **[+]** `mmap`, `shm_open`, `mprotect`, `madvise`.\n\n## Pontos de atenção para prova\n- Reproduzir Belady.\n- Local × global e o papel do PFF.\n- Derivar p = √(2se).\n\n## [+] Perguntas de revisão\n1. Como combater thrashing? *Reduzir o grau de multiprogramação (suspender processos) ou dar mais memória.*\n2. Por que baixa utilização de CPU pode enganar o escalonador? *Em thrashing a CPU fica ociosa; admitir mais processos piora.*\n3. s = 4 MB, e = 8 B: p ótimo? *√(2·2²²·8) = 2¹³ = 8 KB.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., cap. 4.\n- **[+]** Belady, L. A. et al. *An anomaly in space-time characteristics...* CACM, 1969.\n"
 },
 {
  "id": "14-segmentacao",
  "aula": "14",
  "titulo": "Segmentação",
  "fonte": "../slides/14 - Segmentação.pdf",
  "texto": "\n# Aula 14: Segmentação\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nSegmentação oferece vários espaços de endereçamento lógicos e independentes, facilitando crescimento, proteção e compartilhamento; combinada à paginação, evita exigir segmentos inteiros na memória.\n\n## Motivação\n- A paginação vista é **unidimensional**: endereços de 0 a um máximo.\n- Um compilador mantém: **texto fonte**, **tabela de símbolos**, **tabela de constantes**, **árvore sintática** e **pilha**. As quatro primeiras crescem continuamente; a pilha cresce e encolhe.\n- Num espaço único, cada área ganha uma margem; se uma estoura (muitas variáveis → tabela de símbolos), falta espaço mesmo havendo memória livre.\n- Redistribuir manualmente é trabalhoso; melhor gerenciar automaticamente.\n\n## Segmentação\n- **Segmentos**: sequências lineares de endereços, de 0 a um máximo; tamanho **variável** em execução; **independentes** (qualquer lugar da memória; crescer um não afeta outros).\n- Endereço em **duas partes**: `(segmento, deslocamento)`.\n- São entidades **lógicas**, conhecidas pelo programador (um procedimento, um vetor etc.).\n\n### Vantagens\n- Todo segmento começa em 0: um procedimento no segmento n é chamado em `(n, 0)`.\n- **Ligação simplificada**: alterar um procedimento não obriga a mudar os outros.\n- **Proteção por segmento**: código só execução; dados leitura/escrita.\n- **Compartilhamento** (bibliotecas).\n\n> **[+] Tradução**: tabela de segmentos com (base, limite). Se `deslocamento ≥ limite` → exceção; senão `físico = base + deslocamento`.\n> Ex.: segmento 2 com base 4300 e limite 400: (2, 53) → 4353; (2, 500) → erro.\n\n## Paginação × segmentação\n| Consideração | Paginação | Segmentação |\n|---|---|---|\n| Programador precisa saber? | Não | Sim |\n| Quantos espaços lineares? | Um | Muitos |\n| Espaço total pode exceder a memória física? | Sim | Sim |\n| Procedimentos e dados distinguidos e protegidos separadamente? | Não | Sim |\n| Tabelas de tamanho variável acomodadas facilmente? | Não | Sim |\n| Compartilhamento de procedimentos facilitado? | Não | Sim |\n\n- **Finalidade da paginação**: grande espaço linear sem precisar de mais memória física.\n- **Finalidade da segmentação**: separar programas e dados em espaços lógicos independentes, ajudando compartilhamento e proteção.\n- Conteúdo de uma página: relação **acidental**. De um segmento: relação **lógica**.\n\n## Segmentação pura\n- Segmentos têm **tamanho variável** e ocupam qualquer área que os comporte; podem ser trocados com o disco.\n- Trocas geram **fragmentação externa**; solução: **compactação** (cara).\n\nFigura (evolução):\n| Estado | Mudança | Buracos |\n|---|---|---|\n| a | S0(4K) S1(8K) S2(5K) S3(8K) S4(7K) | nenhum |\n| b | S1 sai, entra S7(5K) | 3K |\n| c | S4 sai, entra S5(4K) | 3K + 3K |\n| d | S3 sai, entra S6(4K) | 3K + 4K + 3K |\n| e | Compactação | um único de 10K |\n\n> **[+]** Também chamada de *checkerboarding*. Aplicam-se first fit, best fit etc. ([aula 10](10-gerencia-de-memoria.md)).\n\n## Segmentação com paginação\n- Segmentos grandes são inconvenientes ou impossíveis de manter inteiros → **paginar os segmentos**.\n- Combina o endereçamento de alto nível da segmentação com o gerenciamento automático da paginação.\n- Pioneiro: **MULTICS**; também o **x86 de 32 bits**.\n\n## MULTICS\n- **2¹⁸ segmentos** por programa, cada um com até **65.536 palavras** (os slides mostram \"218\" por perda do expoente no texto extraído).\n- Cada segmento é uma memória virtual paginada. Cada programa tem uma **tabela de segmentos** (que é ela própria um segmento paginado) com um descritor por segmento.\n- O descritor indica presença e aponta para a tabela de páginas. Se **qualquer parte** do segmento está na memória, ele é considerado presente, assim como sua tabela de páginas.\n- Páginas de **1024 palavras**; alguns segmentos pequenos não são paginados ou usam páginas de **64**.\n\n### Descritor (36 bits)\n| Bits | Campo |\n|---|---|\n| 18 | Endereço em memória principal da tabela de páginas |\n| 9 | Tamanho do segmento em páginas |\n| 1 | Tamanho de página: 0 = 1024, 1 = 64 palavras |\n| 1 | 0 = paginado, 1 = não paginado |\n| 1 | (reservado) |\n| 3 | Diversos |\n| 3 | Proteção |\n\n> ⚠️ A figura do slide traz \"1014 palavras\"; o correto é **1024**.\n\n### Endereço virtual (34 bits)\n```\n┌───────────────┬──────────┬─────────────────┐\n│ segmento (18) │ pág. (6) │ deslocamento(10)│\n└───────────────┴──────────┴─────────────────┘\n```\n\n### Tradução\n1. Número do segmento → descritor.\n2. Localiza a tabela de páginas; ausente → **falta de segmento**; violação de proteção → interrupção.\n3. Consulta a entrada da página; ausente → **falta de página**; senão obtém o início da moldura.\n4. Soma o deslocamento.\n5. Faz o acesso.\n\n- Como é caro, há uma **TLB de 16 entradas**, comparando **em paralelo** (segmento, página). Cada entrada: segmento, página, moldura, proteção, idade, bit de uso.\n\n## x86 de 32 bits\n- Parecido com o MULTICS, com até **2¹⁴ segmentos** (16.384), cada um com até **1 bilhão de palavras** de 32 bits (**[+]** 4 GB).\n- **LDT** (tabela local): uma por processo, para seus segmentos. **GDT** (tabela global): única, para segmentos do sistema, incluindo o SO.\n- Para acessar um segmento, carrega-se um **seletor** em um registrador: **CS** (código), **DS** (dados), **SS** (pilha).\n\n```\nSeletor (16 bits)\n┌──────────────┬─────────────┬─────────┐\n│ índice (13)  │ 0=GDT,1=LDT │ RPL (2) │\n└──────────────┴─────────────┴─────────┘\n```\n*(o campo de privilégio RPL é [+])*\n\n- Ao carregar o seletor, o descritor é buscado na LDT/GDT.\n- **Descritor: 8 bytes**: base (32 bits, dividida em 3 pedaços), limite (20 bits, dividido em 2), **G** (limite em bytes ou páginas), **D** (segmento de 16 ou 32 bits), **P** (presente), **DPL** (privilégio 0–3), **S** (sistema ou aplicação), tipo e proteção.\n\n### Tradução (seletor, deslocamento)\n1. Obter o descritor (interrupção se o segmento não existe ou está em disco).\n2. Verificar se o deslocamento ultrapassa o limite (interrupção). **[+]** Com G = 1 o limite é contado em páginas de 4 KB: 2²⁰ × 4 KB = 4 GB.\n3. `endereço linear = base + deslocamento`.\n4. Paginação desabilitada → linear = físico. Habilitada → o linear é virtual e passa pela paginação.\n\n> **[+]** Paginação do x86-32: linear `10 | 10 | 12` (diretório, tabela, deslocamento). Há uma pequena TLB.\n\n```\n(seletor, desloc.) ─segmentação─▶ linear ─paginação─▶ físico\n```\n\n## x86-64\n- Segundo os slides, não dá suporte à segmentação: como Windows e Unix/Linux praticamente não a usavam, o recurso foi abandonado.\n\n> **[+]** Precisamente: no modo de 64 bits a segmentação é **quase** desativada (base 0, sem verificação de limite em CS, DS, ES, SS); FS e GS ainda têm base e são usados para dados por thread e por CPU. O modo de compatibilidade mantém o esquema antigo.\n\n## Pontos de atenção para prova\n- Reproduzir a tabela comparativa.\n- Segmentação pura → fragmentação externa; paginada → interna.\n- Passos de tradução no MULTICS e no x86.\n\n## [+] Perguntas de revisão\n1. Por que paginar segmentos elimina a fragmentação externa? *A alocação física passa a ser em molduras de tamanho fixo.*\n2. Qual tabela guarda o segmento de código do kernel no x86? *A GDT.*\n\n## Referências\n- Tanenbaum, A. S.; Bos, H. *Modern Operating Systems*, 4ª ed., 2014, cap. 3.\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed.\n"
 },
 {
  "id": "16-sistemas-de-arquivos",
  "aula": "16",
  "titulo": "Sistemas de arquivos",
  "fonte": "../slides/16 - Sistemas de arquivo.pdf",
  "texto": "\n# Aula 16: Sistemas de arquivos\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nO sistema de arquivos oferece armazenamento persistente com nomes e diretórios e, internamente, decide como mapear arquivos em blocos de disco (contígua, encadeada, FAT ou i-node).\n\n## Motivação\n- O espaço de endereçamento de um processo é limitado e some quando ele termina.\n- Requisitos do armazenamento de longo prazo: (1) grande volume; (2) persistir após o processo; (3) acesso concorrente por vários processos.\n- Solução: **arquivos**, tratados pelo **sistema de arquivos** (nomes, organização, acesso, proteção).\n- Duas visões: a do **usuário** (o que é um arquivo, nomes, proteção) e a do **projetista** (estruturas e algoritmos sobre o disco).\n\n## Arquivos\n- Abstração que isola o usuário de onde e como a informação está armazenada.\n- **Nomeação**: caracteres e tamanho dependem do SO. Alguns são *case sensitive*. Nome geralmente em duas partes, `nome.extensão`; a extensão pode ter tamanho fixo ou livre.\n  - **[+]** MS-DOS usava 8.3 e ignorava maiúsculas; no Unix a extensão é convenção.\n\n### Estrutura\n| Modelo | Descrição |\n|---|---|\n| **Sequência de bytes** | O SO não interpreta o conteúdo; **mais comum** (Unix, Windows) |\n| **Registros de tamanho fixo** | Leitura e escrita por registro |\n| **Árvore de registros** | Cada registro tem chave; acesso por chave (**[+]** mainframes) |\n\n### Tipos (Unix)\n- **Regulares**: dados do usuário.\n- **Diretórios**: mantêm a estrutura.\n- **Especiais de caracteres** e **de bloco**: modelam E/S e discos.\n\nRegulares se dividem em **ASCII** (linhas de texto) e **binários** (estrutura conhecida pelo programa):\n- **Executável**: cabeçalho (número mágico, tamanhos de texto, dados, dados não inicializados e tabela de símbolos, ponto de entrada, flags) + texto, dados, bits de realocação, tabela de símbolos.\n- **Archive** (biblioteca): módulos objeto compilados e não ligados, cada um com cabeçalho (nome, data, proprietário, proteção, tamanho).\n\n### Acesso\n| Sequencial | Aleatório |\n|---|---|\n| Não salta posições | Lê fora de ordem, com **seek** |\n| Conveniente para fitas | Usado em discos |\n\n### Atributos (variam por sistema)\nProteção, senha, criador, proprietário, flag de oculto, tamanho atual, criação, último acesso, última modificação etc.\n\n### Operações\n`create`, `delete`, `open`, `close`, `read`, `write`, `append`, `seek`, `get attributes`, `set attributes`, `rename`.\n\n> **[+]**\n> ```c\n> int in  = open(\"origem\", O_RDONLY);\n> int out = open(\"destino\", O_WRONLY | O_CREAT | O_TRUNC, 0644);\n> char buf[4096];\n> ssize_t n;\n> while ((n = read(in, buf, sizeof buf)) > 0) write(out, buf, n);\n> close(in); close(out);\n> ```\n> (sem tratamento de erros)\n\n## Diretórios\nEm geral também são arquivos.\n\n| Sistema | Organização |\n|---|---|\n| **Um nível** | Um único diretório para tudo |\n| **Dois níveis** | Um diretório privado por usuário, sem subdivisão (pode haver compartilhamento) |\n| **Hierárquico** | Árvore a partir da raiz; cada usuário cria os diretórios que quiser |\n\n- Raiz: `/` no Unix; letras de unidade (`C:`, `D:`) no Windows.\n\n### Caminhos\n- **Absoluto**: desde a raiz, vale em qualquer diretório. `cp /home/nilton/arquivo.txt /home/nilton/txts`\n- **Relativo**: a partir do diretório de trabalho. `cd /home/nilton` e `cp arq.txt txts/arq.txt`\n- Entradas especiais: `.` (atual) e `..` (pai).\n\n### Operações (Unix)\n`create`, `delete`, `opendir`, `closedir`, `readdir`, `rename`, `link`, `unlink`.\n\n> **[+]** **Link físico**: outra entrada apontando para o mesmo i-node (há contador de links). **Link simbólico**: arquivo que guarda um caminho e pode ficar quebrado.\n\n## Implementação\nQuestões: como armazenar arquivos e diretórios, como gerir o espaço e como ter eficiência e confiabilidade.\n\n### Layout do disco\n- Disco → uma ou mais **partições**, cada uma com seu sistema de arquivos.\n- **Setor 0: MBR**, com a **tabela de partições** (início e fim). O BIOS lê e executa o MBR, que localiza a partição **ativa**, lê seu **bloco de boot** e o executa; este carrega o SO.\n- Toda partição tem bloco de boot, mesmo sem SO.\n\n```\nDisco:    | MBR | tabela | partição 1 | partição 2 | ... |\nPartição: | Boot | Superbloco | Espaço livre | I-nodes | Raiz | Arquivos e diretórios |\n```\n\n| Área | Conteúdo |\n|---|---|\n| Superbloco | Parâmetros do sistema de arquivos, carregados em memória |\n| Espaço livre | Quais blocos estão livres |\n| I-nodes | Uma estrutura por arquivo, que diz tudo sobre ele |\n| Diretório raiz | Topo da árvore |\n| Demais | Arquivos e diretórios |\n\n> **[+]** Espaço livre costuma ser controlado por **mapa de bits** ou **lista encadeada de blocos livres**. UEFI/GPT substituem BIOS/MBR em máquinas atuais.\n\n## Alocação de arquivos\nExemplo das figuras: arquivo A nos blocos **4 → 7 → 2 → 10 → 12**; B nos blocos **6 → 3 → 11 → 14**.\n\n### 1. Contígua\n- Blocos consecutivos. Guarda só **início e número de blocos**.\n- ✅ Simples; leitura do arquivo inteiro em uma operação sequencial (ótimo desempenho).\n- ❌ **Fragmentação externa**; exige compactação. **[+]** Precisa saber o tamanho final; ideal para CD/DVD.\n\n### 2. Lista encadeada\n- Cada bloco: ponteiro para o próximo + dados.\n- ✅ Sem fragmentação externa.\n- ❌ **Acesso aleatório lento** (para chegar ao bloco n, lê n blocos antes); o ponteiro rouba espaço do bloco (**[+]** o dado deixa de ser potência de 2).\n\n> ⚠️ O slide diz \"o acesso não é sequencial\". A leitura **sequencial** funciona; o problema é o **acesso aleatório**.\n\n### 3. Lista encadeada com tabela em memória (FAT)\n- Uma entrada por bloco do disco, contendo o próximo bloco (**-1** = fim). MS-DOS, Windows 95/98/ME.\n\n| Bloco | 2 | 3 | 4 | 6 | 7 | 10 | 11 | 12 | 14 |\n|---|---|---|---|---|---|---|---|---|---|\n| Próximo | 10 | 11 | 7 | 3 | 2 | 12 | 14 | -1 | -1 |\n\n- ✅ Sem fragmentação externa; bloco inteiro para dados; acesso aleatório segue a cadeia **sem ir ao disco**.\n- ❌ Tabela **inteira na memória** o tempo todo.\n- **[+]** Disco de 1 TB, blocos de 1 KB, entradas de 4 B: 2³⁰ entradas = **4 GB** de tabela. Há fragmentação **interna** no último bloco (vale para todos os métodos com blocos).\n\n### 4. I-node\n- Uma estrutura por arquivo com **atributos e endereços dos blocos**. Usado em Unix-like.\n- ✅ Só ocupa memória quando o arquivo está **aberto**.\n- Problema: arquivo com mais blocos que cabem no i-node → entradas que apontam para **blocos de endereços** (indiretos).\n\n```\ni-node: [atributos][bloco 0]...[bloco 7][ponteiro p/ bloco de ponteiros] ─▶ [mais endereços]\n```\n\n> **[+]** Estilo ext2: 12 diretos + indireto simples, duplo e triplo. Blocos de 4 KB e ponteiros de 4 B (1024 por bloco): máximo ≈ (12 + 1024 + 1024² + 1024³) × 4 KB ≈ **4 TB**. O i-node **não** guarda o nome do arquivo.\n\n### Comparação\n| Método | Fragmentação externa | Acesso aleatório | Memória |\n|---|---|---|---|\n| Contígua | Sim | Rápido | Mínima |\n| Encadeada | Não | Lento | Mínima |\n| FAT | Não | Bom | Proporcional ao **disco** |\n| I-node | Não | Bom | Proporcional aos **arquivos abertos** |\n\n## Implementação de diretórios\n- Função: mapear **nome → informação para achar os dados**: número do i-node, primeiro bloco (listas) ou endereço inicial (contígua).\n- Entradas com nome e atributos; ou, com i-nodes, nome + número do i-node (atributos ficam no i-node).\n- **Nomes de tamanho variável**: cada entrada tem um ponteiro para o primeiro caractere do nome, guardado numa área (*heap*) no fim do diretório, junto dos atributos ou do número do i-node.\n\n> **[+] Resolução de `/usr/ast/mbox`**: lê o i-node da raiz → bloco do diretório raiz → acha `usr` → i-node de usr → seu bloco → acha `ast` → i-node → bloco → acha `mbox` → i-node do arquivo.\n\n> **[+] Fora dos slides, mas comum na disciplina**: tamanho de bloco (desempenho × desperdício), *cache* de blocos, **journaling** (ext4, NTFS), verificação de consistência (`fsck`), permissões Unix `rwx`.\n\n## Pontos de atenção para prova\n- Vantagens e desvantagens dos 4 métodos.\n- Calcular tamanho de FAT e tamanho máximo de arquivo com i-node.\n- Contar acessos a disco na resolução de um caminho.\n\n## [+] Perguntas de revisão\n1. Para ler o 5º bloco de um arquivo (i-node já em memória, ponteiro direto), quantos acessos? *1. Na lista encadeada em disco: 5.*\n2. Por que a FAT escala mal? *Cresce com o tamanho do disco, mesmo sem arquivos abertos.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 6) e 3ª ed. (cap. 4).\n- Material baseado também no do prof. Rodolfo Miranda Pereira.\n"
 },
 {
  "id": "17-entrada-e-saida-hardware",
  "aula": "17",
  "titulo": "Entrada e saída: hardware",
  "fonte": "../slides/17 - Entrada e saída hardware.pdf",
  "texto": "\n# Aula 17: E/S em hardware\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nA CPU controla dispositivos escrevendo em registradores dos controladores (por portas ou memória), delega cópias ao DMA e é avisada do término por interrupções.\n\n## Papel do SO\n- **Controlar** dispositivos: emitir comandos, interceptar interrupções, tratar erros.\n- Oferecer **interface** simples.\n- Dispositivo pode ser visto pelos componentes físicos ou pela **interface** (comandos, funções, erros).\n\n## Categorias de dispositivos\n| | Bloco | Caractere |\n|---|---|---|\n| Unidade | Blocos de tamanho fixo (512 B a 32.768 B) | Fluxo de caracteres |\n| Endereçável | Sim (há posicionamento) | Não |\n| Acesso | Blocos independentes | Serial |\n| Exemplos | Discos | Impressora, rede, mouse |\n\n- Há os que não se encaixam: **relógio**, vídeo mapeado em memória. As duas categorias servem de base ao software independente de dispositivo.\n- Taxas variam muitíssimo, e o software precisa lidar com todas:\n\n| Dispositivo | Taxa | Dispositivo | Taxa |\n|---|---|---|---|\n| Teclado | 10 B/s | Gigabit Ethernet | 125 MB/s |\n| Mouse | 100 B/s | Disco SATA 3 | 600 MB/s |\n| Modem 56K | 7 KB/s | USB 3.0 | 625 MB/s |\n| Blu-ray 4× | 18 MB/s | PCIe 3.0 (1 via) | 985 MB/s |\n| USB 2.0 | 60 MB/s | Thunderbolt 2 | 2,5 GB/s |\n\n## Controlador de dispositivo\n- Componente eletrônico (**controlador** ou **adaptador**) com interface de nível muito baixo.\n- No disco chega um **fluxo serial de bits**: **preâmbulo** (gravado na formatação, com cilindro e setor), dados do setor (os slides citam \"geralmente 4096 bits\") e **ECC**. O controlador monta o bloco de bytes e corrige erros.\n\n> **[+]** Tamanhos usuais de setor são 512 ou 4096 **bytes** (512 B = 4096 bits, que é o valor do exemplo no Tanenbaum).\n\n- Tem **registradores** (o SO escreve comandos e lê estado) e, em alguns casos, um **buffer** de dados.\n\n## Como a CPU acessa os registradores\n\n### Portas de E/S (espaços separados)\n- Cada registrador tem um número de porta; instruções especiais:\n  - `IN R, P`: porta P → registrador R.\n  - `OUT P, R`: registrador R → porta P.\n\n### E/S mapeada em memória\n- Registradores recebem **endereços de memória reservados**, sem RAM associada e indisponíveis para dados.\n\n| Vantagens | Desvantagens |\n|---|---|\n| Dispensa instruções especiais (**[+]** o driver pode ser todo em C) | **Cache** pode manter valor desatualizado (é preciso desabilitá-la por página) |\n| Dispensa mecanismo extra de proteção contra E/S por usuários (basta não mapear essas páginas) | Com **vários barramentos** (um dedicado CPU–memória), dispositivos não veem os endereços; é preciso filtrar/encaminhar |\n| Toda instrução que referencia memória serve para o dispositivo | |\n\n> **[+]** Há esquemas **híbridos**: buffers mapeados em memória e registradores de controle em portas (x86).\n\n## DMA (*Direct Memory Access*)\n- Pedir dados byte a byte ao controlador desperdiça CPU. O **controlador de DMA** acessa a memória sem passar pela CPU.\n- Normalmente há um só, na placa-mãe, com registradores de **endereço de memória**, **contador de bytes** e **controle**.\n\n**Leitura sem DMA**: controladora lê o bloco → verifica erros → interrompe → o SO copia o buffer **byte a byte** em laço.\n\n**Leitura com DMA**\n1. A CPU **programa** o DMA (endereço, contagem, controle).\n2. O controlador de disco recebe o sinal, lê e verifica os dados no buffer.\n3. Com os dados prontos, o DMA **solicita** a transferência.\n4. O disco grava uma parte do buffer na memória.\n5. O controlador de disco **confirma** ao DMA.\n6. O DMA incrementa o endereço e decrementa o contador.\n7. Enquanto o contador ≠ 0, volta a solicitar (passo 4).\n8. **[+]** Com contador zero, o DMA **interrompe** a CPU.\n\n> ⚠️ A numeração do slide tem a frase truncada no passo 1 (\"A CPU envia programa o controlador\"): leia \"a CPU programa o controlador de DMA\".\n\n### Por que o disco precisa de buffer\n- Permite **verificar erros antes** de transferir (se houver erro, nada é transferido).\n- Os bits chegam em ritmo constante; se o **barramento estiver ocupado**, a controladora precisa guardar os dados enquanto espera.\n\n> **[+]** Modos: **roubo de ciclo** (uma palavra por vez, disputando o barramento) e **rajada** (*burst*, segura o barramento para um bloco).\n\n## Interrupções\nFluxo (figura): (1) o dispositivo conclui e sinaliza o **controlador de interrupção** → (2) o controlador interrompe a CPU → (3) a CPU confirma.\n\n- O dispositivo ativa uma linha no barramento ao terminar.\n- O controlador atende imediatamente se estiver livre; se ocupado, a nova é ignorada por ora, mas o dispositivo **mantém o pedido** até ser atendido.\n- Simultâneas: maior **prioridade** primeiro (em geral definida pelo tipo de dispositivo).\n- O controlador coloca um **número** nas linhas de endereço, usado como índice da tabela (**[+]** **vetor de interrupções**) com o endereço da rotina.\n- A rotina **confirma** a interrupção, liberando o controlador para a próxima.\n- Antes, salva-se o **contexto** do processo, geralmente na **pilha**.\n\n### Pipeline e execução fora de ordem\n- Interrupções descartam instruções no pipeline.\n- Com pipeline, o PC não indica quais instruções **terminaram**, só quais **entraram**; o SO precisa reconstruir o que foi executado.\n- Com execução fora de ordem, às vezes nem é possível saber.\n\n### Precisas × imprecisas\n**Precisa** = deixa a máquina em estado bem definido:\n1. O PC é salvo em local conhecido.\n2. Todas as instruções **anteriores** à apontada pelo PC terminaram.\n3. Nenhuma **posterior** foi executada.\n4. O estado da instrução apontada é conhecido.\n\n**Imprecisa** = não cumpre os requisitos. A máquina despeja muito estado interno na pilha e o SO precisa interpretá-lo.\n\n| | Precisa (ex.: x86 superescalar) | Imprecisa |\n|---|---|---|\n| Hardware | Circuito muito complexo | Mais simples; sobra área para cache etc. |\n| SO | Simples | Mais complexo e lento no tratamento |\n\n## Pontos de atenção para prova\n- Portas × mapeamento em memória.\n- Sequência do DMA e razões do buffer.\n- Quatro propriedades da interrupção precisa.\n\n## [+] Perguntas de revisão\n1. Por que não usar cache nos registradores mapeados? *O laço de espera leria sempre a cópia antiga do estado.*\n2. Quantas interrupções para ler um bloco de 4 KB com DMA? *Uma, ao final.*\n\n## Ver também\n[E/S em software](18-entrada-e-saida-software.md) · [Interrupções (aula 3)](03-estruturas-e-interrupcoes.md)\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 5) e 3ª ed. (cap. 5).\n"
 },
 {
  "id": "18-entrada-e-saida-software",
  "aula": "18",
  "titulo": "Entrada e saída: software",
  "fonte": "../slides/18 - Entrada e Saída Software.pdf",
  "texto": "\n# Aula 18: E/S em software\n\n> Texto sem marcação vem dos slides. **[+]** indica complemento.\n\n## Resumo em uma frase\nO software de E/S esconde as diferenças entre dispositivos em quatro camadas e pode operar por espera ocupada, por interrupções ou com DMA.\n\n## Objetivos (questões de projeto)\n| Questão | Significado |\n|---|---|\n| **Independência de dispositivo** | O mesmo programa lê de CD, HD ou SSD |\n| **Nomeação uniforme** | Nomes não dependem do dispositivo (no Unix, um pendrive é montado num diretório) |\n| **Tratamento de erros** | O mais **perto do hardware** possível; muitos são transitórios (a controladora tenta de novo) e só sobem se não resolvidos |\n| **Tipo de transferência** | **Assíncrona** (por interrupção, a CPU faz outra coisa) × **síncrona** (bloqueante). O SO faz a assíncrona parecer bloqueante ao usuário, o que facilita programar |\n| **Buffers** | Armazenamento temporário (analisar pacotes antes de entregar; atender taxas em tempo real). Cópias custam desempenho |\n| **Compartilhamento** | **Compartilhados** (disco) × **dedicados** (impressora; trazem problemas como [deadlock](09-deadlocks.md)) |\n\n## Três formas de realizar E/S\n\n### 1. E/S programada\nA CPU faz tudo. Exemplo de impressão: o processo adquire a impressora e faz a chamada de sistema; o SO copia os dados para o núcleo e, para cada caractere, **espera a impressora ficar pronta** e o envia.\n```c\ncopy_from_user(buffer, p, count);        /* p = buffer do núcleo */\nfor (i = 0; i < count; i++) {\n    while (*printer_status_reg != READY);  /* espera ocupada */\n    *printer_data_register = p[i];\n}\nreturn_to_user();\n```\n- ❌ Prende a CPU até o fim (*busy waiting*).\n- Aceitável se o tempo por caractere é muito curto ou em embarcados sem outra tarefa.\n\n### 2. E/S orientada à interrupção\n- Impressora de 100 caracteres/s → **10 ms** por caractere, tempo para outra tarefa.\n1. Copia o buffer para o núcleo.\n2. Envia o primeiro caractere quando a impressora aceitar.\n3. Chama o escalonador; o processo fica bloqueado.\n4. A cada caractere impresso há interrupção; o tratador envia o próximo.\n5. Sem mais caracteres, desbloqueia o processo.\n\n```c\n/* (a) chamada de sistema */             /* (b) tratador de interrupção */\ncopy_from_user(buffer, p, count);        if (count == 0) {\nenable_interrupts();                         unblock_user();\nwhile (*printer_status_reg != READY);    } else {\n*printer_data_register = p[0];               *printer_data_register = p[i];\nscheduler();                                 count = count - 1;\n                                             i = i + 1;\n                                         }\n                                         acknowledge_interrupt();\n                                         return_from_interrupt();\n```\n> **[+]** O esquema supõe que, depois de enviar `p[0]`, `i` vale 1 e `count` já foi descontado.\n\n- ❌ **Uma interrupção por caractere**, com custo de CPU.\n\n### 3. E/S com DMA\n- O controlador de DMA alimenta a impressora; é **E/S programada feita pelo DMA** (ele faz a espera).\n- CPU: copia o buffer → programa o DMA → bloqueia o processo e escalona → **uma interrupção** ao fim do buffer → desbloqueia.\n\n```c\n/* (a) chamada */                /* (b) tratador  [+] forma do Tanenbaum */\ncopy_from_user(buffer, p, count);    acknowledge_interrupt();\nset_up_DMA_controller();             unblock_user();\nscheduler();                         return_from_interrupt();\n```\n- Pode **não compensar** se o DMA (em geral bem mais lento que a CPU) não acompanhar o dispositivo, ou se a CPU não tiver nada a fazer enquanto espera.\n\n### [+] Comparação\n| Forma | Quem copia | Interrupções | CPU durante a E/S |\n|---|---|---|---|\n| Programada | CPU | 0 | Ocupada esperando |\n| Interrupção | CPU | 1 por caractere | Livre entre caracteres |\n| DMA | Controlador de DMA | 1 por buffer | Livre |\n\n> **[+]** Ex.: 1000 caracteres a 100/s, tratador de 4 µs: por interrupção gastam-se 4 ms de CPU em 10 s; na programada, os 10 s inteiros.\n\n## Camadas do software de E/S\n```\n┌─────────────────────────────────────┐\n│ E/S em nível de usuário             │ chama E/S, formata, faz spool\n│ Software independente de dispositivo│ nomeação, proteção, bloqueio, buffers, alocação\n│ Drivers de dispositivo              │ configura registradores, verifica status\n│ Tratadores de interrupção           │ acorda o driver ao fim da E/S\n├─────────────────────────────────────┤\n│ Hardware                            │ executa a operação\n└─────────────────────────────────────┘\n```\n\n### Tratadores de interrupção\n- Normalmente o driver que iniciou a E/S fica **bloqueado** e o tratador o desbloqueia. Detalhes dependem de SO e hardware. Passos gerais:\n1. Salvar registradores não salvos pelo hardware.\n2. Estabelecer contexto para a rotina (TLB, MMU, tabela de páginas).\n3. Estabelecer uma pilha.\n4. Sinalizar o controlador de interrupção (sem controlador centralizado, reabilitar interrupções).\n5. Copiar os registradores para a tabela de processos.\n6. Executar a rotina, lendo os registradores do dispositivo.\n7. Escolher o próximo processo.\n8. Ajustar TLB e MMU para ele.\n9. Carregar seus registradores.\n10. Iniciar sua execução.\n\n### Drivers\n- Código específico de cada dispositivo; normalmente **no núcleo** (acesso aos registradores), mas podem rodar em **modo usuário** fazendo chamadas de sistema (ver [microkernel](03-estruturas-e-interrupcoes.md)).\n- Categorias: de **bloco** e de **caractere**, cada uma com **interface padrão**.\n- Funções: executar pedidos abstratos de leitura/escrita, inicializar o dispositivo, tratar energia, registrar eventos.\n- Funcionamento típico: verificar parâmetros → verificar se está em uso → escrever comandos nos registradores → bloquear até a interrupção (às vezes não há espera) → verificar erros → devolver status.\n\n> **[+]** Drivers precisam ser **reentrantes** (uma interrupção pode chegar durante a execução) e são a principal fonte de falhas em núcleos.\n\n### Software independente de dispositivo\n- Executa funções comuns e dá **interface uniforme** ao nível de usuário. A fronteira com o driver varia.\n- **Interface uniforme para drivers**: facilita acoplar novos drivers (depende da colaboração dos desenvolvedores).\n- **Nomeação**: Unix usa `/dev` (ex.: `/dev/disk0`). **Proteção**: dispositivos são arquivos, com o mesmo esquema de permissões. **[+]** *Major number* identifica o driver; *minor*, a unidade.\n- **Tamanho de bloco lógico** uniforme, escondendo diferenças entre dispositivos (HD, Blu-ray).\n- **Buffering**.\n\n#### Estratégias de buffer (leitura de um modem)\n| Esquema | Como | Problema |\n|---|---|---|\n| (a) Sem buffer | Cada caractere interrompe e desbloqueia o processo | Processo executado a **cada caractere** |\n| (b) Buffer no usuário (n caracteres) | A interrupção grava no buffer do processo | A página pode estar **em disco**; travar muitas páginas degrada o sistema |\n| (c) Buffer no núcleo + no usuário | Enche no núcleo e depois copia | Caracteres chegam enquanto a página do usuário é trazida do disco |\n| (d) **Buffer duplo no núcleo** + usuário | Enquanto um é copiado, o outro recebe | Resolve |\n\n> ⚠️ O texto do slide diz \"dois em espaço de usuário e um em kernel\", mas a **figura** (e o Tanenbaum) mostram **dois no núcleo** e um no usuário. Confirmar com o professor.\n\n> **[+]** Alternativa: **buffer circular**.\n\n### E/S no espaço de usuário\n- **Bibliotecas** ligadas aos programas (`printf`, `scanf` formatam e chamam o SO).\n- **Spooling**: um **daemon**, único com acesso à impressora, imprime os arquivos de um **diretório de spool**. Também usado em transferência de arquivos em rede.\n\n> **[+] Caminho de um `read`**: biblioteca → chamada de sistema → software independente (permissão, cache) → driver programa o controlador e bloqueia → hardware → interrupção → tratador acorda o driver → dados sobem e o processo vira pronto.\n\n## Pontos de atenção para prova\n- Comparar as três formas de E/S.\n- Dizer em qual camada fica cada função (verificar permissão: independente; calcular trilha e setor: driver; formatar texto: usuário; acordar driver: tratador).\n\n## [+] Perguntas de revisão\n1. Por que tratar erros nas camadas baixas? *Quem está perto do hardware pode repetir a operação sem incomodar as de cima.*\n2. Que condição de deadlock o spooling ataca? *Exclusão mútua.*\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 5) e 3ª ed. (cap. 5).\n"
 },
 {
  "id": "19-discos-e-relogios",
  "aula": "19",
  "titulo": "Complemento: discos e relógio",
  "fonte": "",
  "texto": "\n# Complemento: discos e relógio\n\n> ⚠️ **Esta página inteira é complemento.** Não há slide sobre este assunto na pasta; o texto foi escrito com base em conhecimento geral (Tanenbaum, cap. de E/S) para apoiar a Lista 8. Confira com o material do professor.\n\n## Organização do disco rígido\n- **Pratos** que giram juntos; cada **superfície** tem uma cabeça de leitura e escrita, todas presas ao mesmo **braço**.\n- **Trilha**: círculo concêntrico em uma superfície. **Setor**: fatia da trilha, unidade mínima de acesso (512 B ou 4 KB). **Cilindro**: conjunto das trilhas de mesmo raio em todas as superfícies.\n- Cada setor tem preâmbulo, dados e ECC.\n- Discos modernos usam **gravação por zonas** (trilhas externas têm mais setores) e expõem endereços lógicos de bloco (**LBA**).\n\n## RAID\n**Redundant Array of Independent (ou Inexpensive) Disks**: vários discos vistos pelo SO como um só, para ganhar **desempenho** (acesso paralelo) e **confiabilidade** (redundância).\n\n| Nível | Organização | Capacidade útil (N discos) | Tolera falha | Característica |\n|---|---|---|---|---|\n| 0 | Faixas (*striping*) entre os discos | N | Nenhuma | Máximo desempenho; menos confiável que um disco |\n| 1 | Espelhamento | N/2 | 1 por par | Leitura rápida; escrita em dois discos |\n| 4 | Faixas + **um disco só de paridade** | N − 1 | 1 | Disco de paridade vira gargalo nas escritas |\n| 5 | Faixas + **paridade distribuída** | N − 1 | 1 | Elimina o gargalo; reconstrução trabalhosa |\n\n- Paridade = XOR das faixas de uma linha. Um disco perdido é recuperado pelo XOR dos demais.\n- Escrita pequena em RAID 4 ou 5: ler dado antigo e paridade antiga, escrever dado novo e paridade nova (4 acessos).\n\n## Torção cilíndrica (*cylinder skew*)\n- O setor 0 de cada trilha é **deslocado** em relação ao da trilha vizinha.\n- Objetivo: após ler uma trilha e mover o braço para a próxima, o setor seguinte ainda não ter passado sob a cabeça, permitindo leitura contínua sem esperar uma volta inteira.\n- Torção ≈ tempo de busca entre trilhas ÷ tempo de um setor. Ex.: 10.000 rpm (6 ms por volta), 300 setores (20 µs cada) e busca de 800 µs → **40 setores**.\n\n## Tempo de acesso\n| Componente | O que é |\n|---|---|\n| **Busca (*seek*)** | Mover o braço até o cilindro. Normalmente o **maior** |\n| **Latência rotacional** | Esperar o setor passar sob a cabeça (em média meia volta) |\n| **Transferência** | Ler ou escrever os bits |\n\nPara reduzir: escalonar o braço, guardar em cache a trilha lida, colocar blocos de um arquivo próximos.\n\n## Escalonamento do braço\nExemplo: cabeça no cilindro **11**; pedidos, na ordem de chegada: 1, 36, 16, 34, 9, 12.\n\n| Algoritmo | Regra | Ordem atendida | Cilindros percorridos |\n|---|---|---|---|\n| **FCFS** | Ordem de chegada | 1, 36, 16, 34, 9, 12 | 10+35+20+18+25+3 = **111** |\n| **SSF** (busca mais curta) | O pedido mais próximo | 12, 9, 16, 1, 34, 36 | 1+3+7+15+33+2 = **61** |\n| **Elevador** (subindo) | Segue num sentido até acabar, depois inverte | 12, 16, 34, 36, 9, 1 | 1+4+18+2+27+8 = **60** |\n\n- **FCFS**: simples e justo, mas move muito o braço.\n- **SSF**: reduz o movimento, mas pedidos distantes (nas bordas) podem sofrer **inanição**.\n- **Elevador (SCAN)**: um bit guarda o sentido; o movimento total é limitado a duas vezes o número de cilindros. Variante **C-SCAN** atende sempre no mesmo sentido, uniformizando a espera.\n\n## Setores defeituosos\nHá sempre setores reservas. Duas abordagens:\n1. **Substituição**: o setor ruim é remapeado para um reserva. Rápido de fazer, mas quebra a sequência física.\n2. **Deslocamento**: todos os setores entre o ruim e o reserva são empurrados uma posição, mantendo a ordem. Exige mais cópias.\n\nO remapeamento pode ser feito pelo **controlador** (transparente) ou pelo **SO**.\n\n## Relógio\n- **Hardware**: um **oscilador de cristal**, um **contador** e um **registrador de apoio** (carga).\n- O cristal gera pulsos de frequência precisa; a cada pulso o contador é decrementado; ao chegar a zero gera uma **interrupção**.\n- **Modo disparo único**: para após zerar, até o software recarregar. **Modo onda quadrada**: o registrador recarrega o contador automaticamente, gerando interrupções periódicas (**ticks**).\n- Usos pelo software: hora do dia, fim do quantum, contabilização de CPU, alarmes, temporizadores de vigilância.\n\n## Referências\n- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, cap. 5.\n"
 }
];
window.LISTAS = [
 {
  "numero": 1,
  "questoes": [
   {
    "n": 1,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais as duas principais funções de um sistema operacional? Descreva citando exemplos.",
    "resposta": "1. **Máquina estendida**: oferece uma interface mais simples que a do hardware, por chamadas de sistema. Ex.: para ler um arquivo basta abrir, ler e fechar, sem lidar com trilhas, setores e posicionamento da cabeça.\n2. **Gerenciador de recursos**: aloca CPU, memória, discos e impressora entre programas concorrentes, evitando conflitos. A CPU é compartilhada no **tempo** e a memória no **espaço**. Ex.: o spool impede que saídas de programas se misturem na impressora.",
    "material": [
     {
      "href": "#/02-conceitos-basicos/o-que-e-um-sistema-operacional",
      "rotulo": "Aula 2 › O que é um sistema operacional"
     }
    ]
   },
   {
    "n": 2,
    "recomendada": true,
    "motivo": "comparação clássica, com vários itens.",
    "enunciado": "Quais as diferentes estruturas de sistemas operacionais? Explique cada uma delas.",
    "resposta": "- **Monolítico**: todo o SO é um único programa em modo núcleo, com procedimentos que se chamam livremente. Rápido; uma falha derruba tudo.\n- **Camadas**: hierarquia em que cada camada usa serviços das inferiores (THE, MULTICS). Organizado e fácil de depurar; requisições atravessam várias camadas.\n- **Microkernel**: núcleo mínimo (mecanismo); drivers e servidores em modo usuário (política). Mais confiável; custa em comunicação. Ex.: MINIX.\n- **Cliente-servidor**: processos clientes pedem serviços a servidores por troca de mensagens, na mesma máquina ou em rede.\n- **Máquinas virtuais**: um hipervisor cria cópias do hardware, cada uma com seu SO. Tipo 1 roda sobre o hardware; tipo 2, como aplicação.\n- **Exonúcleo**: em vez de clonar, particiona os recursos entre as VMs e apenas as isola.",
    "material": [
     {
      "href": "#/03-estruturas-e-interrupcoes/estruturas-de-sos",
      "rotulo": "Aula 3 › Estruturas de SOs"
     }
    ]
   },
   {
    "n": 3,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são interrupções? O que uma interrupção causa?",
    "resposta": "São sinais que informam a ocorrência de um evento. Causam uma mudança no fluxo de execução: a CPU suspende o que fazia, salva o contexto, passa ao modo núcleo e executa a **rotina de tratamento** correspondente. Depois, o processo interrompido (ou outro escolhido pelo escalonador) volta a executar.",
    "material": [
     {
      "href": "#/03-estruturas-e-interrupcoes/interrupcoes",
      "rotulo": "Aula 3 › Interrupções"
     }
    ]
   },
   {
    "n": 4,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais tipos de interrupções podem ocorrer? Descreva cada uma delas.",
    "resposta": "- **Hardware**: eventos externos à instrução, como o relógio e pedidos de dispositivos de E/S.\n- **Software**: solicitadas pelo programa, com a instrução TRAP (chamadas de sistema).\n- **Exceções**: uso indevido de instruções ou dados, como divisão por zero, overflow ou acesso inválido.",
    "material": [
     {
      "href": "#/03-estruturas-e-interrupcoes/interrupcoes",
      "rotulo": "Aula 3 › Interrupções"
     }
    ]
   },
   {
    "n": 5,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Interrupções são eventos raros? Por quê?",
    "resposta": "**Não.** São muito frequentes: o relógio interrompe periodicamente (dezenas a centenas de vezes por segundo ou mais), cada operação de E/S concluída gera interrupção e os programas fazem chamadas de sistema o tempo todo. É o mecanismo que permite ao SO retomar o controle e implementar a multiprogramação.",
    "material": [
     {
      "href": "#/03-estruturas-e-interrupcoes/mecanismos-de-protecao",
      "rotulo": "Aula 3 › Mecanismos de proteção"
     }
    ]
   },
   {
    "n": 6,
    "recomendada": true,
    "motivo": "base para proteção, chamadas de sistema e E/S.",
    "enunciado": "Qual a diferença entre modo usuário e modo núcleo na CPU?",
    "resposta": "No **modo núcleo** a CPU executa qualquer instrução e acessa todo o hardware; é onde roda o kernel. No **modo usuário** só um subconjunto é permitido: instruções privilegiadas (E/S, proteção de memória, inibir interrupções) não podem ser executadas. Passa-se de usuário para núcleo por interrupção/TRAP e volta-se com uma instrução.",
    "material": [
     {
      "href": "#/02-conceitos-basicos/modos-de-execucao-da-cpu",
      "rotulo": "Aula 2 › Modos de execução da CPU"
     },
     {
      "href": "#/03-estruturas-e-interrupcoes/mecanismos-de-protecao",
      "rotulo": "Aula 3 › Mecanismos de proteção"
     }
    ]
   },
   {
    "n": 7,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual a diferença entre as chamadas de sistema `fork` e `execv`?",
    "resposta": "`fork` **cria um novo processo**, cópia do pai; ambos continuam a partir do mesmo ponto (retorna 0 no filho e o PID do filho no pai). `execv` **não cria processo**: substitui a imagem (código, dados e pilha) do processo atual por outro programa, mantendo o PID, e só retorna em caso de erro. O uso comum é `fork` seguido de `execv` no filho.",
    "material": [
     {
      "href": "#/04-processos/criacao-de-processos",
      "rotulo": "Aula 4 › Criação de processos"
     }
    ]
   },
   {
    "n": 8,
    "recomendada": true,
    "motivo": "liga interrupções, modos da CPU e chamadas de sistema.",
    "enunciado": "O que é uma *trap*? Quais os efeitos causados por uma *trap* no processador?",
    "resposta": "É uma **interrupção de software**: uma instrução usada pelo programa para pedir um serviço ao SO. Efeitos: o contexto (PC, estado) é salvo, a CPU **muda de modo usuário para modo núcleo**, desvia para um endereço definido pelo SO, executa o serviço e depois retorna ao modo usuário na instrução seguinte.",
    "material": [
     {
      "href": "#/02-conceitos-basicos/modos-de-execucao-da-cpu",
      "rotulo": "Aula 2 › Modos de execução da CPU"
     }
    ]
   },
   {
    "n": 9,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são processos?",
    "resposta": "Um processo é um **programa em execução**, junto com seu espaço de endereçamento (código, dados, pilha), contador de programa, registradores e demais informações (arquivos abertos, identificadores). É uma instância: o mesmo programa executado duas vezes gera dois processos.",
    "material": [
     {
      "href": "#/04-processos/multiprogramacao-e-modelo-de-processos",
      "rotulo": "Aula 4 › Multiprogramação e modelo de processos"
     }
    ]
   },
   {
    "n": 10,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que é pseudoparalelismo?",
    "resposta": "É a **ilusão de simultaneidade** em uma CPU: ela alterna rapidamente entre processos (dezenas a centenas de milissegundos cada), de modo que vários avançam em um segundo, embora em cada instante só um execute.",
    "material": [
     {
      "href": "#/04-processos/multiprogramacao-e-modelo-de-processos",
      "rotulo": "Aula 4 › Multiprogramação e modelo de processos"
     }
    ]
   },
   {
    "n": 11,
    "recomendada": true,
    "motivo": "questão central de processos, pede desenho e explicação.",
    "enunciado": "Faça um diagrama dos estados e transições de um processo, explique cada estado e como ocorrem as transições.",
    "resposta": "```\n            ┌──────────────┐\n      ┌─────│ Em execução  │─────┐\n     (1)    └──────▲───────┘    (2)\n      │           (3)            │\n      ▼            │             ▼\n ┌───────────┐     └───────── ┌────────┐\n │ Bloqueado │──────(4)─────▶ │ Pronto │\n └───────────┘                └────────┘\n```\n- **Em execução**: usando a CPU agora.\n- **Pronto**: pode executar, só espera a CPU.\n- **Bloqueado**: não pode prosseguir até um evento externo.\n\n1. Execução → Bloqueado: precisa esperar E/S ou outro evento.\n2. Execução → Pronto: o escalonador o retira da CPU.\n3. Pronto → Execução: o escalonador o escolhe.\n4. Bloqueado → Pronto: o evento esperado ocorreu.\n\nNão existem Bloqueado → Execução nem Pronto → Bloqueado.",
    "material": [
     {
      "href": "#/04-processos/estados-e-transicoes",
      "rotulo": "Aula 4 › Estados e transições"
     }
    ]
   },
   {
    "n": 12,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Cite três eventos que podem inicializar um processo em sistemas de propósito geral.",
    "resposta": "Quaisquer três destes: **início do sistema**; **chamada de sistema** de criação feita por um processo em execução; **requisição do usuário**; **início de uma tarefa em lote**.",
    "material": [
     {
      "href": "#/04-processos/criacao-de-processos",
      "rotulo": "Aula 4 › Criação de processos"
     }
    ]
   },
   {
    "n": 13,
    "recomendada": true,
    "motivo": "lista fechada de quatro itens.",
    "enunciado": "Quais as quatro principais maneiras de um processo encerrar sua execução? Explique cada uma.",
    "resposta": "1. **Saída normal** (voluntária): terminou o trabalho e avisa o SO.\n2. **Saída por erro** (voluntária): detecta um problema e encerra, como um compilador que recebe um arquivo inexistente.\n3. **Erro fatal** (involuntária): falha como instrução ilegal ou acesso indevido à memória.\n4. **Cancelamento por outro processo** (involuntária): `kill` no POSIX, `TerminateProcess` no Windows.",
    "material": [
     {
      "href": "#/04-processos/termino-de-processos",
      "rotulo": "Aula 4 › Término de processos"
     }
    ]
   },
   {
    "n": 14,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual recurso o SO utiliza para gerenciar e manter as informações de um processo?",
    "resposta": "A **tabela de processos**, com uma entrada por processo (PCB) contendo registradores, PC, PSW, ponteiro de pilha, estado, prioridade, identificadores, informações de memória e de arquivos.",
    "material": [
     {
      "href": "#/04-processos/implementacao-tabela-de-processos",
      "rotulo": "Aula 4 › Implementação: tabela de processos"
     }
    ]
   },
   {
    "n": 15,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quando ocorrem atualizações nas informações dos processos?",
    "resposta": "Principalmente quando ocorrem **interrupções** (incluindo chamadas de sistema e o relógio): a rotina de tratamento salva o estado do processo em execução na tabela. As informações também mudam em transições de estado, para que o processo possa ser retomado exatamente de onde parou.",
    "material": [
     {
      "href": "#/04-processos/implementacao-tabela-de-processos",
      "rotulo": "Aula 4 › Implementação: tabela de processos"
     }
    ]
   },
   {
    "n": 16,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual a diferença entre processos I/O-bound e CPU-bound?",
    "resposta": "**CPU-bound** passa a maior parte do tempo computando: surtos longos de CPU e poucas esperas. **I/O-bound** passa a maior parte bloqueado em E/S: surtos curtos de CPU. O que caracteriza o I/O-bound é o surto curto de CPU, e não a duração da E/S. Um processo pode mudar de perfil.",
    "material": [
     {
      "href": "#/08-escalonamento/cpu-bound-i-o-bound",
      "rotulo": "Aula 8 › CPU-bound × I/O-bound"
     },
     {
      "href": "#/04-processos/cpu-bound-i-o-bound",
      "rotulo": "Aula 4 › CPU-bound × I/O-bound"
     }
    ]
   },
   {
    "n": 17,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são *threads*?",
    "resposta": "São **linhas de execução dentro de um processo** (\"processos leves\"). Compartilham espaço de endereçamento e recursos, mas cada uma tem seu contador de programa, registradores, pilha e estado.",
    "material": [
     {
      "href": "#/05-threads/conceito",
      "rotulo": "Aula 5 › Conceito"
     }
    ]
   },
   {
    "n": 18,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais os principais motivos para o uso de *threads*?",
    "resposta": "Várias atividades ao mesmo tempo no mesmo programa; criação e destruição mais rápidas que as de processos; ganho de desempenho quando há E/S sobreposta a computação; e aproveitamento de múltiplas CPUs.",
    "material": [
     {
      "href": "#/05-threads/por-que-usar-threads",
      "rotulo": "Aula 5 › Por que usar threads"
     }
    ]
   },
   {
    "n": 19,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Cite três informações que o gerenciador de *threads* deve armazenar para cada uma e explique por que são exclusivas.",
    "resposta": "- **Contador de programa**: cada thread está em um ponto diferente do código.\n- **Registradores**: guardam os valores de trabalho daquela execução; precisam ser salvos na troca.\n- **Pilha**: cada thread tem sua própria sequência de chamadas, variáveis locais e retornos.\n\n(Também o **estado**: uma pode estar bloqueada enquanto outra executa.)",
    "material": [
     {
      "href": "#/05-threads/conceito",
      "rotulo": "Aula 5 › Conceito"
     }
    ]
   },
   {
    "n": 20,
    "recomendada": true,
    "motivo": "comparação com muitos pontos; também aparece em escalonamento.",
    "enunciado": "Quais as duas implementações mais comuns para *threads*? Explique cada uma, com vantagens e desvantagens.",
    "resposta": "**No espaço de usuário**: o núcleo não conhece as threads; um sistema de tempo de execução mantém a tabela de threads em cada processo.\n- Vantagens: funciona sem suporte do SO; escalonador personalizado; troca e criação baratas; escala melhor.\n- Desvantagens: chamada bloqueante ou falta de página bloqueia o processo todo; uma thread precisa ceder a CPU; sem paralelismo real.\n\n**No núcleo**: o SO mantém a tabela e escalona as threads.\n- Vantagens: uma thread bloqueada não bloqueia as outras; pode haver paralelismo em várias CPUs.\n- Desvantagens: criar e gerenciar exige chamadas de sistema, mais caras.",
    "material": [
     {
      "href": "#/05-threads/implementacoes",
      "rotulo": "Aula 5 › Implementações"
     }
    ]
   }
  ]
 },
 {
  "numero": 2,
  "questoes": [
   {
    "n": 1,
    "recomendada": true,
    "motivo": "conceito que sustenta todo o bloco de IPC.",
    "enunciado": "O que são condições de corrida? O que são regiões críticas? Qual a relação entre elas?",
    "resposta": "**Condição de corrida**: processos acessam dados compartilhados e o resultado depende de quem executa e quando. **Região crítica**: trecho do programa que acessa os dados compartilhados. Relação: a corrida acontece quando dois processos estão ao mesmo tempo em regiões críticas sobre o mesmo recurso; garantir **exclusão mútua** nessas regiões a evita.",
    "material": [
     {
      "href": "#/06-ipc/condicoes-de-corrida",
      "rotulo": "Aula 6 › Condições de corrida"
     },
     {
      "href": "#/06-ipc/regioes-criticas",
      "rotulo": "Aula 6 › Regiões críticas"
     }
    ]
   },
   {
    "n": 2,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Por que não é interessante desabilitar interrupções antes da entrada em regiões críticas?",
    "resposta": "Dá a processos de usuário um poder perigoso: se um deles não reabilitar (erro ou má-fé), o sistema para. Além disso, em multiprocessadores a desativação afeta só uma CPU, e outra pode entrar na região crítica. É uma técnica usada pelo próprio núcleo.",
    "material": [
     {
      "href": "#/06-ipc/desabilitar-interrupcoes",
      "rotulo": "Aula 6 › Desabilitar interrupções"
     }
    ]
   },
   {
    "n": 3,
    "recomendada": true,
    "motivo": "quatro condições para decorar e aplicar.",
    "enunciado": "Quais os critérios que boas soluções devem atender para resolver condições de corrida?",
    "resposta": "1. Dois processos nunca estão simultaneamente em suas regiões críticas.\n2. Nada se pode supor sobre velocidade ou número de CPUs.\n3. Nenhum processo fora da região crítica pode bloquear outro.\n4. Nenhum processo espera eternamente para entrar.",
    "material": [
     {
      "href": "#/06-ipc/regioes-criticas",
      "rotulo": "Aula 6 › Regiões críticas"
     }
    ]
   },
   {
    "n": 4,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Explique o que é espera ociosa no contexto de IPC.",
    "resposta": "O processo fica em um **laço testando** uma condição até poder entrar na região crítica. Consome CPU sem trabalho útil e pode causar **inversão de prioridade**.",
    "material": [
     {
      "href": "#/06-ipc/solucoes-com-espera-ociosa",
      "rotulo": "Aula 6 › Soluções com espera ociosa"
     },
     {
      "href": "#/06-ipc/problemas-da-espera-ociosa",
      "rotulo": "Aula 6 › Problemas da espera ociosa"
     }
    ]
   },
   {
    "n": 5,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Cite três soluções para problemas de IPC com espera ocupada.",
    "resposta": "**Alternância obrigatória**, **solução de Peterson** e **instrução TSL** (*test and set lock*).",
    "material": [
     {
      "href": "#/06-ipc/solucoes-com-espera-ociosa",
      "rotulo": "Aula 6 › Soluções com espera ociosa"
     }
    ]
   },
   {
    "n": 6,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual o problema do método de alternância obrigatória?",
    "resposta": "Obriga os processos a se **revezarem**. Se um deles tem região não crítica longa, o outro, que quer entrar de novo, fica esperando a vez mesmo com a região crítica livre. Viola a condição 3: um processo fora da região crítica bloqueia outro.",
    "material": [
     {
      "href": "#/06-ipc/alternancia-obrigatoria",
      "rotulo": "Aula 6 › Alternância obrigatória"
     }
    ]
   },
   {
    "n": 7,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Explique as operações *sleep* e *wakeup*.",
    "resposta": "São chamadas de sistema. `sleep` bloqueia quem a chama até que outro o acorde. `wakeup(p)` acorda o processo `p`. Evitam a espera ociosa.",
    "material": [
     {
      "href": "#/06-ipc/sleep-e-wakeup",
      "rotulo": "Aula 6 › Sleep e wakeup"
     }
    ]
   },
   {
    "n": 8,
    "recomendada": true,
    "motivo": "exige explicar um escalonamento passo a passo.",
    "enunciado": "O que pode dar errado no produtor-consumidor com *sleep* e *wakeup*? Por quê?",
    "resposta": "O sinal de acordar pode ser **perdido**:\n1. Buffer vazio; o consumidor lê `count == 0` e perde a CPU **antes** de executar `sleep`.\n2. O produtor insere um item, faz `count = 1` e chama `wakeup(consumidor)`, que não tem efeito, pois ele está acordado.\n3. O consumidor volta e dorme.\n4. O produtor enche o buffer e também dorme. Ambos dormem para sempre.\n\nCausa: o teste de `count` e o `sleep` **não são atômicos**; há uma condição de corrida sobre `count`.",
    "material": [
     {
      "href": "#/06-ipc/produtor-consumidor-buffer-limitado",
      "rotulo": "Aula 6 › Produtor-consumidor (buffer limitado)"
     }
    ]
   },
   {
    "n": 9,
    "recomendada": true,
    "motivo": "base dos problemas clássicos e do produtor-consumidor.",
    "enunciado": "O que é um semáforo? Quais operações podem ser realizadas? Qual a relação entre semáforos e mutexes?",
    "resposta": "Variável inteira não negativa que conta sinais de acordar pendentes. Operações **atômicas**: `down` (se maior que zero, decrementa; se zero, bloqueia) e `up` (incrementa e permite que um bloqueado complete seu `down`). O **mutex** é a versão simplificada com apenas dois estados (travado e livre), usado só para exclusão mútua (`mutex_lock`/`mutex_unlock`), quando não é preciso contar.",
    "material": [
     {
      "href": "#/06-ipc/semaforos-dijkstra-1965",
      "rotulo": "Aula 6 › Semáforos (Dijkstra, 1965)"
     },
     {
      "href": "#/06-ipc/mutexes",
      "rotulo": "Aula 6 › Mutexes"
     }
    ]
   },
   {
    "n": 10,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são monitores?",
    "resposta": "Construção de **linguagem de programação** que reúne dados privados e procedimentos, garantindo que **apenas um processo esteja ativo** dentro dele por vez. O compilador implementa a exclusão mútua. Usa variáveis condicionais para espera e sinalização. Ex.: `synchronized` em Java.",
    "material": [
     {
      "href": "#/06-ipc/monitores-hoare-e-brinch-hansen",
      "rotulo": "Aula 6 › Monitores (Hoare e Brinch Hansen)"
     }
    ]
   },
   {
    "n": 11,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Explique troca de mensagens entre processos, suas duas primitivas e como funcionam.",
    "resposta": "Processos se comunicam enviando mensagens, sem exigir memória compartilhada (podem estar em máquinas diferentes). `send` envia uma mensagem, que entra na fila do destinatário. `receive` retira uma mensagem da fila; se não houver, bloqueia o processo até chegar. É preciso tratar perdas (confirmação), duplicatas (identificadores) e autenticação.",
    "material": [
     {
      "href": "#/06-ipc/passagem-de-mensagem",
      "rotulo": "Aula 6 › Passagem de mensagem"
     }
    ]
   },
   {
    "n": 12,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são barreiras e como funcionam?",
    "resposta": "Mecanismo para sincronizar um **grupo** de processos entre fases. Cada um chama `barrier` ao terminar a fase e fica bloqueado até **todos** chegarem; então todos prosseguem.",
    "material": [
     {
      "href": "#/06-ipc/barreiras",
      "rotulo": "Aula 6 › Barreiras"
     }
    ]
   },
   {
    "n": 13,
    "recomendada": true,
    "motivo": "reúne os três problemas clássicos.",
    "enunciado": "Que problemas reais o jantar dos filósofos, os leitores e escritores e o barbeiro sonolento modelam? Como resolvê-los?",
    "resposta": "- **Filósofos**: processos disputando acesso exclusivo a um número limitado de recursos (ex.: dispositivos de E/S). Solução: vetor de estados e um semáforo por filósofo; só come quem não tem vizinho comendo; um mutex protege os estados.\n- **Leitores e escritores**: acesso a uma base de dados, com leituras concorrentes e escrita exclusiva. Solução: contador de leitores protegido por mutex; o primeiro leitor trava a base e o último libera. Para não deixar o escritor em inanição, bloquear novos leitores quando ele chegar.\n- **Barbeiro sonolento**: fila de atendimento limitada (ex.: telemarketing). Solução: semáforos `customers` e `barbers`, um mutex e um contador de clientes esperando; cliente sem cadeira vai embora.",
    "material": [
     {
      "href": "#/07-problemas-classicos-ipc/visao-geral",
      "rotulo": "Aula 7 › Visão geral"
     },
     {
      "href": "#/07-problemas-classicos-ipc/solucao-eficiente",
      "rotulo": "Aula 7 › Solução eficiente"
     }
    ]
   },
   {
    "n": 14,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais os objetivos comuns a todos os escalonadores?",
    "resposta": "**Justiça** (processos semelhantes, tratamento semelhante), **aplicação da política** definida e **equilíbrio** (manter os recursos do sistema ocupados).",
    "material": [
     {
      "href": "#/08-escalonamento/ambientes-e-objetivos",
      "rotulo": "Aula 8 › Ambientes e objetivos"
     }
    ]
   },
   {
    "n": 15,
    "recomendada": true,
    "motivo": "classificação que costuma ser cobrada.",
    "enunciado": "Quais os objetivos de um escalonador para sistemas em lote, interativos e de tempo real?",
    "resposta": "- **Lote**: maximizar a **vazão**, minimizar o **tempo de retorno** e manter alta a utilização da CPU.\n- **Interativo**: minimizar o **tempo de resposta** e atender a **proporcionalidade** (expectativas do usuário).\n- **Tempo real**: **cumprir prazos** e ter **previsibilidade**.",
    "material": [
     {
      "href": "#/08-escalonamento/ambientes-e-objetivos",
      "rotulo": "Aula 8 › Ambientes e objetivos"
     }
    ]
   },
   {
    "n": 16,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são algoritmos de escalonamento preemptivos?",
    "resposta": "São os que **podem retirar** o processo da CPU antes de ele bloquear ou terminar, por exemplo ao fim do quantum ou quando surge um de maior prioridade.\n\n⚠️ O slide \"Quando escalonar\" traz os rótulos trocados; use a definição acima.",
    "material": [
     {
      "href": "#/08-escalonamento/preemptivo-nao-preemptivo",
      "rotulo": "Aula 8 › Preemptivo × não preemptivo"
     }
    ]
   },
   {
    "n": 17,
    "recomendada": true,
    "motivo": "algoritmo mais usado; relação com troca de contexto.",
    "enunciado": "Explique o *round-robin*. Qual a importância do quantum?",
    "resposta": "Mantém uma fila circular de prontos; cada processo executa por até um **quantum**. Ao esgotá-lo, é preemptado e vai para o fim; se bloquear antes, volta ao fim quando ficar pronto. O quantum define o equilíbrio: **pequeno** gera muitas trocas de contexto e desperdício proporcional; **grande** aumenta o tempo de resposta e aproxima o algoritmo do FCFS.",
    "material": [
     {
      "href": "#/08-escalonamento/round-robin-circular-preemptivo",
      "rotulo": "Aula 8 › Round-robin (circular), preemptivo"
     }
    ]
   },
   {
    "n": 18,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual a diferença entre o escalonamento por classes de prioridades e o de filas múltiplas?",
    "resposta": "Nas **classes de prioridades**, a classe reflete a importância do processo e usa-se round-robin dentro dela, com o mesmo quantum; só se atende uma classe se as superiores estiverem vazias, sendo preciso reajustar prioridades. Nas **filas múltiplas**, a classe depende do **uso de CPU**: cada nível tem quantum diferente (1, 2, 4, 8...); quem esgota o quantum desce, ganhando menos prioridade e fatias maiores.",
    "material": [
     {
      "href": "#/08-escalonamento/por-prioridades",
      "rotulo": "Aula 8 › Por prioridades"
     },
     {
      "href": "#/08-escalonamento/filas-multiplas",
      "rotulo": "Aula 8 › Filas múltiplas"
     }
    ]
   },
   {
    "n": 19,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual o critério para um sistema de tempo real ser escalonável?",
    "resposta": "Para m eventos periódicos, com Cᵢ o tempo de CPU e Pᵢ o período:\n```\nC1/P1 + C2/P2 + ... + Cm/Pm  ≤  1\n```",
    "material": [
     {
      "href": "#/08-escalonamento/teste-de-escalonabilidade",
      "rotulo": "Aula 8 › Teste de escalonabilidade"
     }
    ]
   },
   {
    "n": 20,
    "recomendada": true,
    "motivo": "questão numérica direta.",
    "enunciado": "Eventos A, B, C e D têm períodos de 50, 100, 200 e 250 ms e requerem 35, 20, 10 e x ms de CPU. (a) Com x = 25 ms, é escalonável? (b) Qual o maior x para que seja?",
    "resposta": "Parte fixa: 35/50 + 20/100 + 10/200 = 0,70 + 0,20 + 0,05 = **0,95**.\n\n**a)** 25/250 = 0,10 → total **1,05 > 1**: **não** é escalonável.\n\n**b)** x/250 ≤ 0,05 → **x ≤ 12,5 ms**.",
    "material": [
     {
      "href": "#/08-escalonamento/teste-de-escalonabilidade",
      "rotulo": "Aula 8 › Teste de escalonabilidade"
     }
    ]
   },
   {
    "n": 21,
    "recomendada": true,
    "motivo": "comparação com figura nos slides.",
    "enunciado": "Qual a diferença entre RMS e EDF?",
    "resposta": "Ambos são preemptivos. **RMS** usa prioridade **estática**, proporcional à frequência do evento (menor período, maior prioridade), e exige processos periódicos, independentes e com custo constante. **EDF** usa prioridade **dinâmica**: executa quem tem o **prazo mais próximo**. O EDF consegue escalonar casos de alta utilização em que o RMS perde prazos.",
    "material": [
     {
      "href": "#/08-escalonamento/rms-taxa-monotonica-prioridade-estatica",
      "rotulo": "Aula 8 › RMS (taxa monotônica): prioridade estática"
     },
     {
      "href": "#/08-escalonamento/exemplos-das-figuras-rms-edf",
      "rotulo": "Aula 8 › Exemplos das figuras (RMS × EDF)"
     }
    ]
   }
  ]
 },
 {
  "numero": 3,
  "questoes": [
   {
    "n": 1,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são deadlocks? Como podem ocorrer? Cite uma situação.",
    "resposta": "Um conjunto de processos está em deadlock quando cada um espera um evento que só outro do conjunto pode causar. Ocorre tipicamente quando processos **retêm** recursos exclusivos e **pedem** outros já retidos, fechando um ciclo. Ex.: A tem a unidade de fita e pede o CD-ROM; B tem o CD-ROM e pede a fita.",
    "material": [
     {
      "href": "#/09-deadlocks/definicao",
      "rotulo": "Aula 9 › Definição"
     }
    ]
   },
   {
    "n": 2,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais os dois tipos de recursos? Qual a relação deles com deadlocks?",
    "resposta": "**Preemptíveis**: podem ser retirados do processo sem prejuízo (ex.: memória com troca). **Não preemptíveis**: retirá-los causa falha (ex.: gravador de CD). Deadlocks envolvem recursos **não preemptíveis**; com preemptíveis, em geral basta realocar.",
    "material": [
     {
      "href": "#/09-deadlocks/recursos",
      "rotulo": "Aula 9 › Recursos"
     }
    ]
   },
   {
    "n": 3,
    "recomendada": true,
    "motivo": "é a questão mais clássica do assunto.",
    "enunciado": "Quais as quatro condições que causam deadlocks de recursos? Explique cada uma.",
    "resposta": "1. **Exclusão mútua**: cada recurso está livre ou com um único processo.\n2. **Posse e espera**: quem tem recursos pode pedir outros.\n3. **Não preempção**: o recurso só é liberado por quem o detém.\n4. **Espera circular**: há uma cadeia circular em que cada processo espera um recurso do seguinte.\n\nAs quatro precisam estar presentes.",
    "material": [
     {
      "href": "#/09-deadlocks/as-quatro-condicoes-coffman",
      "rotulo": "Aula 9 › As quatro condições (Coffman)"
     }
    ]
   },
   {
    "n": 4,
    "recomendada": true,
    "motivo": "aplicação direta do grafo de alocação.",
    "enunciado": "Há 5 recursos (R1 a R5) e 3 processos (P1 a P3). Mostre o grafo resultante de cada ordem de requisições e diga se há deadlock.\n\n**a)** P1→R1; P2→R2; P2→R3; P3→R5; P1→R4; P1→R2; P2→R5; P3→R4\n\n**b)** P1→R1; P1→R2; P1→R3; P2→R4; P3→R5; P2→R3; P3→R3\n\n*(P→R significa \"P requisita R\".)*",
    "resposta": "Convenção: `R → P` = P detém R; `P → R` = P espera R.\n\n**a)** P1 obtém R1; P2 obtém R2 e R3; P3 obtém R5; P1 obtém R4; P1 pede R2 e bloqueia; P2 pede R5 e bloqueia; P3 pede R4 e bloqueia.\n```\nR1 → P1        R4 → P1\nR2 → P2        R3 → P2\nR5 → P3\nP1 → R2        P2 → R5        P3 → R4\n\nCiclo: P1 → R2 → P2 → R5 → P3 → R4 → P1\n```\n**Há deadlock** entre P1, P2 e P3.\n\n**b)** P1 obtém R1, R2 e R3; P2 obtém R4; P3 obtém R5; P2 pede R3 e bloqueia; P3 pede R3 e bloqueia.\n```\nR1 → P1    R2 → P1    R3 → P1\nR4 → P2    R5 → P3\nP2 → R3    P3 → R3\n```\n**Não há ciclo, logo não há deadlock.** P1 não espera nada; ao terminar, libera R3 e P2 e P3 prosseguem, um de cada vez.",
    "material": [
     {
      "href": "#/09-deadlocks/modelagem-com-grafos-dirigidos",
      "rotulo": "Aula 9 › Modelagem com grafos dirigidos"
     },
     {
      "href": "#/09-deadlocks/exemplo-a-ordem-de-escalonamento-importa",
      "rotulo": "Aula 9 › Exemplo: a ordem de escalonamento importa"
     }
    ]
   },
   {
    "n": 5,
    "recomendada": true,
    "motivo": "organiza todo o capítulo.",
    "enunciado": "Quais as quatro principais técnicas contra deadlocks? Explique cada uma.",
    "resposta": "1. **Ignorar** (algoritmo do avestruz): agir como se não ocorresse.\n2. **Detectar e recuperar**: deixar ocorrer, detectar (ciclos ou matrizes) e recuperar por preempção, retrocesso ou eliminação de processos.\n3. **Anulação dinâmica**: só conceder pedidos que mantenham o sistema em estado seguro (algoritmo do banqueiro).\n4. **Prevenção**: negar estruturalmente uma das quatro condições (spooling, pedir tudo antes, retomar recursos, ordenar recursos).",
    "material": [
     {
      "href": "#/09-deadlocks/estrategias",
      "rotulo": "Aula 9 › Estratégias"
     },
     {
      "href": "#/09-deadlocks/5-prevencao",
      "rotulo": "Aula 9 › 5. Prevenção"
     }
    ]
   },
   {
    "n": 6,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual dessas técnicas é a mais usada pelos sistemas operacionais? Por quê?",
    "resposta": "O **algoritmo do avestruz**, adotado por Unix e Windows: deadlocks são raros e detectar, evitar ou prevenir custa caro em desempenho e impõe restrições aos programas.",
    "material": [
     {
      "href": "#/09-deadlocks/1-algoritmo-do-avestruz",
      "rotulo": "Aula 9 › 1. Algoritmo do avestruz"
     }
    ]
   },
   {
    "n": 7,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que é *starvation*? Qual a diferença para deadlock? Como evitar?",
    "resposta": "**Inanição**: um processo nunca consegue o recurso (ou a CPU) por causa da política de alocação. No **deadlock**, o conjunto de processos fica parado para sempre, sem progresso; na **inanição**, o sistema continua progredindo, mas alguém é sempre preterido. Evita-se com política **FIFO** (atender por ordem de chegada) ou aumentando a prioridade de quem espera há muito tempo.",
    "material": [
     {
      "href": "#/09-deadlocks/starvation-inanicao",
      "rotulo": "Aula 9 › Starvation (inanição)"
     }
    ]
   }
  ]
 },
 {
  "numero": 4,
  "questoes": [
   {
    "n": 1,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual a função do gerenciador de memória?",
    "resposta": "É a parte do SO que gerencia a memória principal: controla o que está livre e ocupado, **concede memória** aos processos quando precisam, libera quando terminam, garante proteção e faz as trocas com o disco quando necessário.",
    "material": [
     {
      "href": "#/10-gerencia-de-memoria/contexto",
      "rotulo": "Aula 10 › Contexto"
     }
    ]
   },
   {
    "n": 2,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Explique o gerenciamento de memória em sistemas monoprogramados.",
    "resposta": "A memória é dividida apenas entre o SO e **um** processo, sem abstração: o programa usa endereços físicos e pode acessar qualquer região. Variações: SO em RAM; SO em ROM (embarcados); SO em RAM com drivers em ROM/BIOS (primeiros PCs).",
    "material": [
     {
      "href": "#/10-gerencia-de-memoria/monoprogramacao",
      "rotulo": "Aula 10 › Monoprogramação"
     }
    ]
   },
   {
    "n": 3,
    "recomendada": true,
    "motivo": "motiva base/limite e a memória virtual.",
    "enunciado": "Explique os problemas de relocação e proteção. Como podem ser resolvidos?",
    "resposta": "**Relocação**: o programa pode ser carregado em posições diferentes, então seus endereços precisam ser ajustados. **Proteção**: um processo não pode acessar memória de outro ou do SO.\n- Somar a base aos endereços **na carga** resolve só a relocação.\n- Bits de proteção por bloco, comparados com o PSW, tratam a proteção.\n- **Registradores base e limite** resolvem os dois: cada endereço é verificado contra o limite e somado à base em tempo de execução; os registradores mudam a cada troca de processo.",
    "material": [
     {
      "href": "#/10-gerencia-de-memoria/multiprogramacao-relocacao-e-protecao",
      "rotulo": "Aula 10 › Multiprogramação: relocação e proteção"
     },
     {
      "href": "#/10-gerencia-de-memoria/registradores-base-e-limite",
      "rotulo": "Aula 10 › Registradores base e limite"
     }
    ]
   },
   {
    "n": 4,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Explique a gerência com partições de tamanho fixo em sistemas multiprogramados. Que problemas surgem?",
    "resposta": "A memória é dividida em partições imutáveis (podem ter tamanhos diferentes) e cada processo ocupa uma. Há **filas separadas** (menor partição que comporta) ou **fila única**. Problemas: **fragmentação interna**; com filas separadas, partições ociosas enquanto há processos em outras filas; com fila única, pequenos desperdiçam partições grandes ou, priorizando o maior que cabe, sofrem inanição (mitigada com contador de preterições). Também limita o tamanho e o número de processos.",
    "material": [
     {
      "href": "#/10-gerencia-de-memoria/particoes-fixas",
      "rotulo": "Aula 10 › Partições fixas"
     }
    ]
   },
   {
    "n": 5,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Explique o mapa de bits e as listas encadeadas no gerenciamento de partições variáveis.",
    "resposta": "**Mapa de bits**: memória dividida em unidades; um bit por unidade (0 livre, 1 ocupada). Unidade grande diminui o mapa e aumenta o desperdício. Alocar exige achar k zeros consecutivos, o que é lento.\n\n**Lista encadeada**: cada nó descreve um segmento (processo ou buraco), com início e tamanho. Ordenada por endereço, facilita fundir buracos vizinhos na liberação.",
    "material": [
     {
      "href": "#/10-gerencia-de-memoria/mapa-de-bits",
      "rotulo": "Aula 10 › Mapa de bits"
     },
     {
      "href": "#/10-gerencia-de-memoria/lista-encadeada",
      "rotulo": "Aula 10 › Lista encadeada"
     }
    ]
   },
   {
    "n": 6,
    "recomendada": true,
    "motivo": "permite pedir simulação.",
    "enunciado": "Explique os principais algoritmos de alocação de memória, com vantagens e desvantagens.",
    "resposta": "| Algoritmo | Como escolhe | Vantagem | Desvantagem |\n|---|---|---|---|\n| First fit | Primeiro que cabe | Simples e rápido | Fragmenta o início |\n| Next fit | Como o first, a partir de onde parou | Distribui a busca | Um pouco pior que first fit |\n| Best fit | Menor que cabe | Preserva buracos grandes | Percorre tudo; gera sobras inúteis |\n| Worst fit | Maior buraco | Sobras aproveitáveis | Percorre tudo; desempenho ruim em simulações |\n| Quick fit | Listas por tamanho | Busca muito rápida | Devolução e fusão custosas |\n| Buddy | Divide blocos em potências de 2 | Rápido; fusão simples | Fragmentação interna e externa |",
    "material": [
     {
      "href": "#/10-gerencia-de-memoria/algoritmos-de-alocacao",
      "rotulo": "Aula 10 › Algoritmos de alocação"
     },
     {
      "href": "#/10-gerencia-de-memoria/algoritmo-buddy",
      "rotulo": "Aula 10 › Algoritmo buddy"
     }
    ]
   },
   {
    "n": 7,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que é memória virtual?",
    "resposta": "Técnica que permite a processos ocuparem **mais espaço que a memória física**: o SO mantém as partes ativas na RAM e as demais no disco, trazendo-as quando necessário, de forma transparente ao programador.",
    "material": [
     {
      "href": "#/11-memoria-virtual/ideia",
      "rotulo": "Aula 11 › Ideia"
     }
    ]
   },
   {
    "n": 8,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual a ideia básica da paginação? Qual a diferença entre página virtual e moldura?",
    "resposta": "Dividir o espaço de endereçamento virtual em blocos de tamanho fixo e mapeá-los na memória física. A **página** é o bloco do espaço **virtual**; a **moldura** é o bloco de mesmo tamanho na memória **física** que pode abrigar uma página. Transferências com o disco são em páginas.",
    "material": [
     {
      "href": "#/11-memoria-virtual/paginacao",
      "rotulo": "Aula 11 › Paginação"
     }
    ]
   },
   {
    "n": 9,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que é a MMU e como funciona?",
    "resposta": "Unidade de gerenciamento de memória (*Memory Management Unit*): hardware que converte endereços virtuais em físicos. Usa os bits mais significativos (número da página) para consultar a tabela de páginas (ou a TLB), obtém a moldura e concatena o deslocamento. Se a página está ausente, gera uma **falta de página**; se o acesso viola a proteção, uma exceção.",
    "material": [
     {
      "href": "#/11-memoria-virtual/enderecamento",
      "rotulo": "Aula 11 › Endereçamento"
     },
     {
      "href": "#/11-memoria-virtual/traducao",
      "rotulo": "Aula 11 › Tradução"
     }
    ]
   },
   {
    "n": 10,
    "recomendada": true,
    "motivo": "junta tradução, bits da entrada e multinível.",
    "enunciado": "O que é a tabela de páginas, como funciona e como pode ser implementada?",
    "resposta": "Estrutura, uma por processo, que mapeia cada página para uma moldura; é indexada pelo número da página. Cada entrada tem moldura, presente/ausente, proteção, referenciada, modificada e cache desabilitada.\n\nImplementações: **registradores** em hardware (rápida, troca de contexto cara); **em memória** com registrador de base (troca barata, acessos extras); **multinível** (só mantém as partes usadas); **invertida** (uma entrada por moldura, com busca por hash).",
    "material": [
     {
      "href": "#/11-memoria-virtual/tabela-de-paginas",
      "rotulo": "Aula 11 › Tabela de páginas"
     },
     {
      "href": "#/11-memoria-virtual/multinivel",
      "rotulo": "Aula 11 › Multinível"
     },
     {
      "href": "#/11-memoria-virtual/tabela-de-paginas-invertida",
      "rotulo": "Aula 11 › Tabela de páginas invertida"
     }
    ]
   },
   {
    "n": 11,
    "recomendada": true,
    "motivo": "leva à TLB e ao cálculo de tempo de acesso.",
    "enunciado": "Por que a paginação pode prejudicar o desempenho de um processo? Como mitigar?",
    "resposta": "Com a tabela em memória, **cada referência exige acessos extras** para traduzir: um nível dobra os acessos (desempenho cai à metade); dois níveis triplicam. Faltas de página custam ainda mais, pois envolvem o disco. Mitigação: a **TLB**, cache associativo de traduções que aproveita a localidade; para as faltas, bons algoritmos de substituição, memória suficiente para o conjunto de trabalho e pré-paginação.",
    "material": [
     {
      "href": "#/11-memoria-virtual/tlb-translation-lookaside-buffer",
      "rotulo": "Aula 11 › TLB (Translation Lookaside Buffer)"
     },
     {
      "href": "#/11-memoria-virtual/desempenho",
      "rotulo": "Aula 11 › Desempenho"
     }
    ]
   }
  ]
 },
 {
  "numero": 5,
  "questoes": [
   {
    "n": 1,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Explique o algoritmo ótimo. Por que não pode ser implementado? Ele tem alguma utilidade?",
    "resposta": "Remove a página que **demorará mais** para ser referenciada novamente. Não é implementável porque o SO não conhece as referências futuras. Serve como **referência de comparação**: registra-se o log de uma execução e, sobre ele, calcula-se o mínimo de faltas para avaliar algoritmos reais.",
    "material": [
     {
      "href": "#/12-substituicao-de-paginas/1-otimo",
      "rotulo": "Aula 12 › 1. Ótimo"
     }
    ]
   },
   {
    "n": 2,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são os bits R e M de uma página?",
    "resposta": "**R (referenciada)**: ligado em qualquer leitura ou escrita; é zerado periodicamente pelo SO. **M (modificada)**: ligado em escritas; indica que a página precisa ser gravada no disco antes de ser descartada.",
    "material": [
     {
      "href": "#/12-substituicao-de-paginas/2-nru-nao-usada-recentemente",
      "rotulo": "Aula 12 › 2. NRU (não usada recentemente)"
     },
     {
      "href": "#/11-memoria-virtual/entrada-da-tabela-formato-dependente-da-maquina",
      "rotulo": "Aula 11 › Entrada da tabela (formato dependente da máquina)"
     }
    ]
   },
   {
    "n": 3,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Como funciona o algoritmo da página não usada recentemente (NRU)?",
    "resposta": "Classifica as páginas por (R, M): classe 0 (0,0), 1 (0,1), 2 (1,0) e 3 (1,1). Na falta, remove uma página **aleatória da menor classe** não vazia. O bit R é zerado a cada tick.",
    "material": [
     {
      "href": "#/12-substituicao-de-paginas/2-nru-nao-usada-recentemente",
      "rotulo": "Aula 12 › 2. NRU (não usada recentemente)"
     }
    ]
   },
   {
    "n": 4,
    "recomendada": true,
    "motivo": "leva à segunda chance e ao relógio.",
    "enunciado": "Como funciona o FIFO? Qual seu problema e como corrigi-lo?",
    "resposta": "Mantém uma fila por ordem de chegada e remove a mais antiga. Problema: pode remover uma página **muito usada**. Correção: **segunda chance**: se a mais antiga tem R = 1, zera R e a move para o fim; remove a primeira com R = 0. O **relógio** implementa a mesma ideia com uma lista circular e um ponteiro.",
    "material": [
     {
      "href": "#/12-substituicao-de-paginas/3-fifo",
      "rotulo": "Aula 12 › 3. FIFO"
     },
     {
      "href": "#/12-substituicao-de-paginas/4-segunda-chance",
      "rotulo": "Aula 12 › 4. Segunda chance"
     },
     {
      "href": "#/12-substituicao-de-paginas/5-relogio",
      "rotulo": "Aula 12 › 5. Relógio"
     }
    ]
   },
   {
    "n": 5,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Como funciona o algoritmo da página menos recentemente usada e como implementá-lo em hardware?",
    "resposta": "Remove a página há **mais tempo sem uso**, supondo que o passado recente prevê o futuro. Em hardware: matriz N×N de bits para N molduras; ao referenciar a página i, põe-se a **linha i em 1** e depois a **coluna i em 0**. A linha de menor valor binário é a vítima.",
    "material": [
     {
      "href": "#/12-substituicao-de-paginas/6-lru-menos-recentemente-usada",
      "rotulo": "Aula 12 › 6. LRU (menos recentemente usada)"
     },
     {
      "href": "#/12-substituicao-de-paginas/hardware-matriz-n-n",
      "rotulo": "Aula 12 › Hardware: matriz N×N"
     }
    ]
   },
   {
    "n": 6,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Explique o funcionamento do WSClock.",
    "resposta": "Combina relógio e conjunto de trabalho. Percorre uma lista circular de molduras (R, M, instante do último uso). Se R = 1, zera e avança. Se R = 0 e a idade supera o limite: com M = 0, substitui; com M = 1, agenda a escrita e continua. Ao completar a volta: se houve escritas agendadas, prossegue até achar uma página já limpa; se nenhuma foi agendada, usa uma página limpa qualquer ou, na falta dela, grava e usa a atual.",
    "material": [
     {
      "href": "#/12-substituicao-de-paginas/8-wsclock",
      "rotulo": "Aula 12 › 8. WSClock"
     }
    ]
   },
   {
    "n": 7,
    "recomendada": true,
    "motivo": "simulação é questão típica.",
    "enunciado": "Sistema com 8 páginas virtuais e 4 molduras. Acessos: `0 1 7 2 3 2 7 1 0 3`. Quantas faltas com (a) FIFO e (b) MRU?",
    "resposta": "\"MRU\" aqui é a página **menos** recentemente usada (LRU). Supõe-se memória inicialmente vazia.\n\n**a) FIFO** (conjunto ordenado do mais antigo para o mais novo)\n\n| Acesso | 0 | 1 | 7 | 2 | 3 | 2 | 7 | 1 | 0 | 3 |\n|---|---|---|---|---|---|---|---|---|---|---|\n| Molduras | 0 | 01 | 017 | 0172 | 1723 | 1723 | 1723 | 1723 | 7230 | 7230 |\n| Falta | F | F | F | F | F | | | | F | |\n| Sai | | | | | 0 | | | | 1 | |\n\n**6 faltas.**\n\n**b) LRU** (da menos para a mais recentemente usada)\n\n| Acesso | 0 | 1 | 7 | 2 | 3 | 2 | 7 | 1 | 0 | 3 |\n|---|---|---|---|---|---|---|---|---|---|---|\n| Recência | 0 | 01 | 017 | 0172 | 1723 | 1732 | 1327 | 3271 | 2710 | 7103 |\n| Falta | F | F | F | F | F | | | | F | F |\n| Sai | | | | | 0 | | | | 3 | 2 |\n\n**7 faltas.**",
    "material": [
     {
      "href": "#/12-substituicao-de-paginas/3-fifo",
      "rotulo": "Aula 12 › 3. FIFO"
     },
     {
      "href": "#/12-substituicao-de-paginas/6-lru-menos-recentemente-usada",
      "rotulo": "Aula 12 › 6. LRU (menos recentemente usada)"
     }
    ]
   },
   {
    "n": 8,
    "recomendada": true,
    "motivo": "mostra um caso em que LRU vence o FIFO.",
    "enunciado": "Refaça o exercício 7 com os acessos `0 1 2 3 0 1 2 7 0 1 2 7`.",
    "resposta": "**a) FIFO**\n\n| Acesso | 0 | 1 | 2 | 3 | 0 | 1 | 2 | 7 | 0 | 1 | 2 | 7 |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n| Molduras | 0 | 01 | 012 | 0123 | 0123 | 0123 | 0123 | 1237 | 2370 | 3701 | 7012 | 7012 |\n| Falta | F | F | F | F | | | | F | F | F | F | |\n| Sai | | | | | | | | 0 | 1 | 2 | 3 | |\n\n**8 faltas.**\n\n**b) LRU**\n\n| Acesso | 0 | 1 | 2 | 3 | 0 | 1 | 2 | 7 | 0 | 1 | 2 | 7 |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n| Recência | 0 | 01 | 012 | 0123 | 1230 | 2301 | 3012 | 0127 | 1270 | 2701 | 7012 | 0127 |\n| Falta | F | F | F | F | | | | F | | | | |\n| Sai | | | | | | | | 3 | | | | |\n\n**5 faltas.**",
    "material": [
     {
      "href": "#/12-substituicao-de-paginas/3-fifo",
      "rotulo": "Aula 12 › 3. FIFO"
     },
     {
      "href": "#/12-substituicao-de-paginas/6-lru-menos-recentemente-usada",
      "rotulo": "Aula 12 › 6. LRU (menos recentemente usada)"
     }
    ]
   },
   {
    "n": 9,
    "recomendada": true,
    "motivo": "compara quatro algoritmos no mesmo cenário.",
    "enunciado": "Computador com 4 molduras:\n\n| Página | Carregada | Última ref. | R | M |\n|---|---|---|---|---|\n| 0 | 126 | 280 | 1 | 0 |\n| 1 | 230 | 265 | 0 | 1 |\n| 2 | 140 | 270 | 0 | 0 |\n| 3 | 110 | 285 | 1 | 1 |\n\nQual página sai com (a) NRU, (b) FIFO, (c) MRU e (d) segunda chance?",
    "resposta": "- **a) NRU: página 2**, única na classe 0 (R=0, M=0).\n- **b) FIFO: página 3**, a carregada há mais tempo (110).\n- **c) MRU (menos recentemente usada): página 1**, última referência mais antiga (265).\n- **d) Segunda chance: página 2.** Ordem de carga: 3, 0, 2, 1. A 3 tem R=1: zera e vai ao fim. A 0 tem R=1: zera e vai ao fim. A 2 tem R=0: sai.",
    "material": [
     {
      "href": "#/12-substituicao-de-paginas/2-nru-nao-usada-recentemente",
      "rotulo": "Aula 12 › 2. NRU (não usada recentemente)"
     },
     {
      "href": "#/12-substituicao-de-paginas/4-segunda-chance",
      "rotulo": "Aula 12 › 4. Segunda chance"
     }
    ]
   },
   {
    "n": 10,
    "recomendada": true,
    "motivo": "aparece em slide com exemplo resolvido.",
    "enunciado": "Explique a anomalia de Belady.",
    "resposta": "Em alguns algoritmos, como o FIFO, **aumentar o número de molduras pode aumentar as faltas de página**. Ex.: `0 1 2 3 0 1 4 0 1 2 3 4` gera 9 faltas com 3 molduras e 10 com 4. Não ocorre em algoritmos de pilha (LRU, ótimo), em que as páginas presentes com m molduras estão contidas nas presentes com m+1.",
    "material": [
     {
      "href": "#/13-questoes-de-projeto-paginacao/anomalia-de-belady",
      "rotulo": "Aula 13 › Anomalia de Belady"
     }
    ]
   },
   {
    "n": 11,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que é *thrashing* e como pode acontecer?",
    "resposta": "É a situação em que o sistema gasta a maior parte do tempo tratando faltas de página, quase sem executar. Ocorre quando os processos têm menos molduras que seus conjuntos de trabalho, por exemplo quando a **soma dos conjuntos de trabalho excede a memória**. Combate-se reduzindo a multiprogramação (levar processos ao disco).",
    "material": [
     {
      "href": "#/13-questoes-de-projeto-paginacao/thrashing",
      "rotulo": "Aula 13 › Thrashing"
     },
     {
      "href": "#/13-questoes-de-projeto-paginacao/2-controle-de-carga",
      "rotulo": "Aula 13 › 2. Controle de carga"
     }
    ]
   },
   {
    "n": 12,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais as diferenças entre alocação local e global?",
    "resposta": "Na **local**, a vítima é do próprio processo que faltou, e cada um tem uma fração fixa de molduras. Na **global**, a vítima pode ser de qualquer processo e a quantidade de molduras varia. A global costuma ser melhor, pois se adapta a conjuntos de trabalho que mudam; a local pode causar thrashing mesmo com molduras sobrando, mas isola os processos.",
    "material": [
     {
      "href": "#/13-questoes-de-projeto-paginacao/1-politica-de-alocacao-local-global",
      "rotulo": "Aula 13 › 1. Política de alocação: local × global"
     }
    ]
   },
   {
    "n": 13,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Para que serve o daemon de paginação e como funciona?",
    "resposta": "Mantém um estoque de **molduras livres** para que as faltas sejam atendidas rapidamente. Dorme a maior parte do tempo e acorda periodicamente; se há poucas molduras livres, escolhe páginas pelo algoritmo de substituição, grava no disco as modificadas e libera as molduras.",
    "material": [
     {
      "href": "#/13-questoes-de-projeto-paginacao/6-politica-de-limpeza",
      "rotulo": "Aula 13 › 6. Política de limpeza"
     }
    ]
   },
   {
    "n": 14,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quantas faltas de página podem ocorrer em uma instrução com três operandos em memória (por exemplo, `ADD R1, R2, R3`)? Quais são?",
    "resposta": "Supondo que a instrução e cada operando caibam em uma única página: **até 4 faltas** — uma na **busca da instrução**, duas nas **leituras dos operandos** e uma na **escrita do resultado** (os três operandos, em páginas diferentes e ausentes).\n\nSe a instrução e os operandos puderem **cruzar a fronteira** de páginas, o pior caso dobra para **8**. Com endereçamento indireto, haveria ainda mais.\n\n⚠️ O enunciado usa nomes de registradores (R1, R2, R3); a questão pede que sejam tratados como referências à memória.",
    "material": [
     {
      "href": "#/11-memoria-virtual/paginacao",
      "rotulo": "Aula 11 › Paginação"
     }
    ]
   },
   {
    "n": 15,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Na segmentação, o que é um segmento e qual sua finalidade?",
    "resposta": "É um espaço de endereçamento linear independente, de 0 até um máximo, com tamanho que pode variar, correspondendo a uma unidade lógica (procedimento, vetor, pilha). Finalidade: permitir que áreas cresçam independentemente e facilitar **proteção** e **compartilhamento**.",
    "material": [
     {
      "href": "#/14-segmentacao/segmentacao",
      "rotulo": "Aula 14 › Segmentação"
     }
    ]
   },
   {
    "n": 16,
    "recomendada": true,
    "motivo": "tabela comparativa presente nos slides.",
    "enunciado": "Quais as principais diferenças entre segmentação e paginação?",
    "resposta": "| | Paginação | Segmentação |\n|---|---|---|\n| Visível ao programador | Não | Sim |\n| Espaços de endereçamento | Um | Vários |\n| Tamanho das unidades | Fixo | Variável |\n| Conteúdo | Sem relação lógica | Unidade lógica |\n| Proteção e compartilhamento por procedimento ou dado | Difíceis | Facilitados |\n| Fragmentação | Interna | Externa |\n| Finalidade | Grande espaço linear | Espaços lógicos independentes |\n\nAmbas permitem espaço total maior que a memória física.",
    "material": [
     {
      "href": "#/14-segmentacao/paginacao-segmentacao",
      "rotulo": "Aula 14 › Paginação × segmentação"
     }
    ]
   }
  ]
 },
 {
  "numero": 6,
  "questoes": [
   {
    "n": 1,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais são os três requisitos para armazenamento de longo prazo?",
    "resposta": "Armazenar **grandes volumes** de informação; a informação **persistir** após o fim do processo; permitir **acesso concorrente** por vários processos.",
    "material": [
     {
      "href": "#/16-sistemas-de-arquivos/motivacao",
      "rotulo": "Aula 16 › Motivação"
     }
    ]
   },
   {
    "n": 2,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que é um arquivo?",
    "resposta": "Um **mecanismo de abstração** para armazenar e recuperar informações em dispositivos de armazenamento, identificado por nome, que esconde do usuário onde e como os dados estão guardados.",
    "material": [
     {
      "href": "#/16-sistemas-de-arquivos/arquivos",
      "rotulo": "Aula 16 › Arquivos"
     }
    ]
   },
   {
    "n": 3,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Cite e explique três maneiras de estruturar arquivos. Qual é a mais comum?",
    "resposta": "- **Sequência de bytes**: o SO não interpreta o conteúdo. É a **mais comum**.\n- **Registros de tamanho fixo**: leituras e escritas por registro.\n- **Árvore de registros**: cada registro tem uma chave, usada no acesso.",
    "material": [
     {
      "href": "#/16-sistemas-de-arquivos/estrutura",
      "rotulo": "Aula 16 › Estrutura"
     }
    ]
   },
   {
    "n": 4,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Cite e explique três tipos de arquivo suportados pelo SO.",
    "resposta": "**Regulares** (dados do usuário, ASCII ou binários), **diretórios** (mantêm a estrutura do sistema de arquivos) e **especiais de caracteres ou de bloco** (modelam dispositivos de E/S, como impressoras e discos).",
    "material": [
     {
      "href": "#/16-sistemas-de-arquivos/tipos-unix",
      "rotulo": "Aula 16 › Tipos (Unix)"
     }
    ]
   },
   {
    "n": 5,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são diretórios?",
    "resposta": "Estruturas (em geral também arquivos) usadas para **organizar** os arquivos. Suas entradas mapeiam nomes para as informações necessárias para localizar os dados, e podem conter outros diretórios.",
    "material": [
     {
      "href": "#/16-sistemas-de-arquivos/diretorios",
      "rotulo": "Aula 16 › Diretórios"
     }
    ]
   },
   {
    "n": 6,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Como funciona um sistema de diretórios hierárquico? Cite exemplos.",
    "resposta": "É uma **árvore** a partir de um diretório raiz; cada diretório contém arquivos e outros diretórios, e cada usuário cria os que quiser. Ex.: Unix, com raiz `/` (como `/home/ana/notas.txt`); Windows, com uma raiz por unidade (`C:\\Users\\ana`).",
    "material": [
     {
      "href": "#/16-sistemas-de-arquivos/diretorios",
      "rotulo": "Aula 16 › Diretórios"
     }
    ]
   },
   {
    "n": 7,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual a diferença entre caminho relativo e absoluto? Exemplifique.",
    "resposta": "O **absoluto** parte da raiz e vale em qualquer lugar: `/home/nilton/arq.txt`. O **relativo** parte do diretório de trabalho atual: estando em `/home/nilton`, `txts/arq.txt` se refere a `/home/nilton/txts/arq.txt`. `.` é o atual e `..` o pai.",
    "material": [
     {
      "href": "#/16-sistemas-de-arquivos/caminhos",
      "rotulo": "Aula 16 › Caminhos"
     }
    ]
   },
   {
    "n": 8,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual o layout de um sistema de arquivos dentro de uma partição do disco?",
    "resposta": "Em geral: **bloco de boot**, **superbloco** (parâmetros do sistema de arquivos), **gerenciamento de espaço livre**, **i-nodes**, **diretório raiz** e **arquivos e diretórios**. Apenas o bloco de boot é comum a todos; o resto varia com o sistema de arquivos.",
    "material": [
     {
      "href": "#/16-sistemas-de-arquivos/layout-do-disco",
      "rotulo": "Aula 16 › Layout do disco"
     }
    ]
   },
   {
    "n": 9,
    "recomendada": true,
    "motivo": "é a questão principal de sistemas de arquivos.",
    "enunciado": "Explique alocação contígua, lista encadeada, lista com tabela em memória e i-nodes, com vantagens e desvantagens.",
    "resposta": "| Método | Como funciona | Vantagens | Desvantagens |\n|---|---|---|---|\n| **Contígua** | Blocos consecutivos; guarda início e tamanho | Simples; leitura muito rápida | Fragmentação externa; compactação; difícil crescer |\n| **Lista encadeada** | Cada bloco aponta o próximo | Sem fragmentação externa | Acesso aleatório lento; ponteiro ocupa espaço do bloco |\n| **Tabela em memória (FAT)** | Os ponteiros ficam em uma tabela na RAM | Bloco inteiro para dados; acesso aleatório sem ler o disco | Tabela inteira na memória, proporcional ao disco |\n| **I-node** | Estrutura por arquivo com atributos e endereços dos blocos | Só ocupa memória com o arquivo aberto; acesso direto | Limite de endereços, exigindo blocos indiretos |",
    "material": [
     {
      "href": "#/16-sistemas-de-arquivos/alocacao-de-arquivos",
      "rotulo": "Aula 16 › Alocação de arquivos"
     },
     {
      "href": "#/16-sistemas-de-arquivos/comparacao",
      "rotulo": "Aula 16 › Comparação"
     }
    ]
   }
  ]
 },
 {
  "numero": 7,
  "questoes": [
   {
    "n": 1,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais as duas principais categorias de dispositivos de E/S? Explique.",
    "resposta": "**De bloco**: armazenam em blocos de tamanho fixo, endereçáveis e lidos ou escritos independentemente (discos). **De caractere**: enviam ou recebem um fluxo de caracteres, sem endereçamento nem posicionamento (impressora, mouse, rede).",
    "material": [
     {
      "href": "#/17-entrada-e-saida-hardware/categorias-de-dispositivos",
      "rotulo": "Aula 17 › Categorias de dispositivos"
     }
    ]
   },
   {
    "n": 2,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Como é organizado o fluxo de bits entregue ao controlador de disco?",
    "resposta": "Um **preâmbulo** (gravado na formatação, com número do cilindro e do setor), os **dados** do setor e o **código de correção de erros** (ECC). O controlador converte o fluxo em um bloco de bytes e corrige erros.",
    "material": [
     {
      "href": "#/17-entrada-e-saida-hardware/controlador-de-dispositivo",
      "rotulo": "Aula 17 › Controlador de dispositivo"
     }
    ]
   },
   {
    "n": 3,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Para que são usados os registradores de um controlador de E/S?",
    "resposta": "Para a comunicação com a CPU: o SO **escreve** neles para enviar comandos e dados e **lê** para conhecer o estado do dispositivo (pronto, ocupado, erro).",
    "material": [
     {
      "href": "#/17-entrada-e-saida-hardware/controlador-de-dispositivo",
      "rotulo": "Aula 17 › Controlador de dispositivo"
     }
    ]
   },
   {
    "n": 4,
    "recomendada": true,
    "motivo": "comparação central de E/S em hardware.",
    "enunciado": "Quais as duas maneiras de o SO se comunicar com os registradores dos controladores? Explique, com vantagens e desvantagens.",
    "resposta": "**Portas de E/S**: cada registrador tem um número de porta, em espaço separado, acessado por instruções especiais (`IN`, `OUT`).\n- Vantagens: não ocupa endereços de memória; não há problema com cache.\n- Desvantagens: exige instruções especiais (geralmente assembly) e proteção própria.\n\n**Mapeada em memória**: registradores ocupam endereços de memória reservados.\n- Vantagens: dispensa instruções especiais; toda instrução de memória serve; proteção pelo próprio mecanismo de memória.\n- Desvantagens: é preciso desabilitar cache nesses endereços; complica sistemas com vários barramentos; reduz o espaço de endereçamento disponível.",
    "material": [
     {
      "href": "#/17-entrada-e-saida-hardware/como-a-cpu-acessa-os-registradores",
      "rotulo": "Aula 17 › Como a CPU acessa os registradores"
     }
    ]
   },
   {
    "n": 5,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são interrupções?",
    "resposta": "Sinais enviados à CPU (por exemplo, quando um dispositivo conclui seu trabalho) que a fazem suspender a execução atual, salvar o contexto e executar a rotina de tratamento indicada pelo vetor de interrupções.",
    "material": [
     {
      "href": "#/17-entrada-e-saida-hardware/interrupcoes",
      "rotulo": "Aula 17 › Interrupções"
     }
    ]
   },
   {
    "n": 6,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Qual o problema das interrupções em processadores com pipeline?",
    "resposta": "Há várias instruções em execução parcial; o **PC não indica quais terminaram**, apenas quais entraram no pipeline. Com execução fora de ordem, pode ser impossível determinar o que foi executado, dificultando retomar o processo, além de desperdiçar trabalho do pipeline.",
    "material": [
     {
      "href": "#/17-entrada-e-saida-hardware/pipeline-e-execucao-fora-de-ordem",
      "rotulo": "Aula 17 › Pipeline e execução fora de ordem"
     }
    ]
   },
   {
    "n": 7,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais são as duas categorias de interrupções? Explique.",
    "resposta": "**Precisas**: o PC é salvo em lugar conhecido; todas as instruções anteriores foram concluídas; nenhuma posterior foi executada; o estado da instrução apontada é conhecido. Exigem hardware complexo. **Imprecisas**: não cumprem isso; a máquina salva muito estado interno e o SO precisa interpretá-lo.",
    "material": [
     {
      "href": "#/17-entrada-e-saida-hardware/precisas-imprecisas",
      "rotulo": "Aula 17 › Precisas × imprecisas"
     }
    ]
   },
   {
    "n": 8,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais tipos de transferência o software de E/S pode oferecer?",
    "resposta": "**Síncrona (bloqueante)**: quem pede espera a conclusão. **Assíncrona (por interrupção)**: a CPU inicia a transferência e faz outra coisa até ser avisada. O SO costuma apresentar operações assíncronas como bloqueantes ao usuário.",
    "material": [
     {
      "href": "#/18-entrada-e-saida-software/objetivos-questoes-de-projeto",
      "rotulo": "Aula 18 › Objetivos (questões de projeto)"
     }
    ]
   },
   {
    "n": 9,
    "recomendada": true,
    "motivo": "junta hardware, software e desempenho.",
    "enunciado": "Quais as três maneiras de realizar E/S? Explique cada uma, com exemplos.",
    "resposta": "Exemplo: imprimir uma cadeia de caracteres.\n- **E/S programada**: a CPU faz tudo; para cada caractere, espera em laço a impressora ficar pronta e o envia. Simples, mas prende a CPU.\n- **Por interrupção**: a CPU envia um caractere, bloqueia o processo e executa outro; a cada interrupção da impressora, envia o próximo; ao fim, desbloqueia. Há uma interrupção por caractere.\n- **Com DMA**: a CPU programa o controlador de DMA, que alimenta a impressora; há **uma** interrupção ao fim do buffer. Pode não compensar se o DMA for lento ou a CPU não tiver o que fazer.",
    "material": [
     {
      "href": "#/18-entrada-e-saida-software/tres-formas-de-realizar-e-s",
      "rotulo": "Aula 18 › Três formas de realizar E/S"
     }
    ]
   },
   {
    "n": 10,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são drivers de dispositivos e quais suas funções?",
    "resposta": "Código específico que controla um tipo de dispositivo, normalmente no núcleo. Funções: receber pedidos abstratos do software independente de dispositivo, verificar parâmetros e disponibilidade, escrever comandos nos registradores, aguardar a conclusão, tratar erros e devolver o status; além de inicializar o dispositivo e gerenciar energia e registros de eventos.",
    "material": [
     {
      "href": "#/18-entrada-e-saida-software/drivers",
      "rotulo": "Aula 18 › Drivers"
     }
    ]
   },
   {
    "n": 11,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Por que o uso de buffers é importante para dispositivos de E/S?",
    "resposta": "Armazenam dados temporariamente quando não podem ir direto ao destino, **compensam diferenças de velocidade**, evitam acordar o processo a cada caractere, permitem analisar dados antes da entrega (pacotes de rede) e atender prazos de dispositivos de tempo real. O custo são cópias extras.",
    "material": [
     {
      "href": "#/18-entrada-e-saida-software/software-independente-de-dispositivo",
      "rotulo": "Aula 18 › Software independente de dispositivo"
     }
    ]
   },
   {
    "n": 12,
    "recomendada": true,
    "motivo": "questão detalhada com quatro casos.",
    "enunciado": "Explique as alternativas (a) sem buffer, (b) buffer no usuário, (c) buffer no usuário e um no núcleo, (d) buffer no usuário e dois no núcleo, citando os problemas de a, b e c.",
    "resposta": "- **a)** Cada caractere interrompe e é entregue ao processo. **Problema**: o processo precisa ser executado a cada caractere.\n- **b)** O processo fornece um buffer de n caracteres, preenchido pela rotina de interrupção. **Problema**: a página do buffer pode estar no disco quando chega um caractere; travá-la na memória, se generalizado, degrada o sistema.\n- **c)** A interrupção enche um buffer no núcleo, depois copiado ao do usuário. **Problema**: caracteres podem chegar enquanto o buffer do núcleo está cheio e a página do usuário é trazida do disco.\n- **d)** Dois buffers no núcleo se alternam: enquanto um é copiado para o usuário, o outro recebe os novos caracteres (buffer duplo).\n\n⚠️ O texto do slide diz \"dois em espaço de usuário e um no kernel\"; a lista e a figura confirmam **dois no kernel**.",
    "material": [
     {
      "href": "#/18-entrada-e-saida-software/estrategias-de-buffer-leitura-de-um-modem",
      "rotulo": "Aula 18 › Estratégias de buffer (leitura de um modem)"
     }
    ]
   }
  ]
 },
 {
  "numero": 8,
  "questoes": [
   {
    "n": 1,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Como são organizados os dados em um disco rígido?",
    "resposta": "Em **pratos** com superfícies divididas em **trilhas** concêntricas, cada uma dividida em **setores** (com preâmbulo, dados e ECC). As trilhas de mesmo raio formam um **cilindro**. Cada superfície tem uma cabeça no mesmo braço. Discos atuais usam zonas e endereçamento lógico de blocos.",
    "material": [
     {
      "href": "#/19-discos-e-relogios/organizacao-do-disco-rigido",
      "rotulo": "Aula 19 › Organização do disco rígido"
     }
    ]
   },
   {
    "n": 2,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que são RAIDs e qual a justificativa para seu uso?",
    "resposta": "Conjunto de discos vistos como um só. Justificativa: **desempenho**, por acessos paralelos, e **confiabilidade**, por redundância (espelho ou paridade).",
    "material": [
     {
      "href": "#/19-discos-e-relogios/raid",
      "rotulo": "Aula 19 › RAID"
     }
    ]
   },
   {
    "n": 3,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais as diferenças entre RAID 0, 1, 4 e 5?",
    "resposta": "- **0**: divisão em faixas, sem redundância.\n- **1**: espelhamento; metade da capacidade.\n- **4**: faixas com paridade em **um disco dedicado**, que vira gargalo de escrita.\n- **5**: faixas com paridade **distribuída** entre os discos, eliminando o gargalo.\n\n4 e 5 toleram a falha de um disco.",
    "material": [
     {
      "href": "#/19-discos-e-relogios/raid",
      "rotulo": "Aula 19 › RAID"
     }
    ]
   },
   {
    "n": 4,
    "recomendada": false,
    "motivo": "",
    "enunciado": "O que é torção cilíndrica e qual seu objetivo?",
    "resposta": "Deslocamento do setor inicial de uma trilha em relação ao da vizinha, para que, após mover o braço, o próximo setor esteja chegando sob a cabeça, evitando esperar uma rotação inteira em leituras contínuas.",
    "material": [
     {
      "href": "#/19-discos-e-relogios/torcao-cilindrica-cylinder-skew",
      "rotulo": "Aula 19 › Torção cilíndrica (cylinder skew)"
     }
    ]
   },
   {
    "n": 5,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais elementos influenciam o tempo de leitura e escrita no disco? Qual o mais custoso e como amenizar?",
    "resposta": "**Tempo de busca**, **latência rotacional** e **tempo de transferência**. O mais custoso costuma ser a **busca**. Ameniza-se com algoritmos de escalonamento do braço, cache de trilhas e colocação de blocos relacionados próximos.",
    "material": [
     {
      "href": "#/19-discos-e-relogios/tempo-de-acesso",
      "rotulo": "Aula 19 › Tempo de acesso"
     }
    ]
   },
   {
    "n": 6,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Como funciona o escalonamento de braço First Come First Served?",
    "resposta": "Atende os pedidos **na ordem de chegada**. Simples e justo, mas pode mover muito o braço. No exemplo (cabeça em 11; pedidos 1, 36, 16, 34, 9, 12) percorre 111 cilindros.",
    "material": [
     {
      "href": "#/19-discos-e-relogios/escalonamento-do-braco",
      "rotulo": "Aula 19 › Escalonamento do braço"
     }
    ]
   },
   {
    "n": 7,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Como funciona o Shortest Seek First?",
    "resposta": "Atende sempre o pedido **mais próximo** da posição atual. No exemplo: 12, 9, 16, 1, 34, 36 (61 cilindros). Reduz o movimento, mas pedidos distantes podem sofrer inanição.",
    "material": [
     {
      "href": "#/19-discos-e-relogios/escalonamento-do-braco",
      "rotulo": "Aula 19 › Escalonamento do braço"
     }
    ]
   },
   {
    "n": 8,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Como funciona o algoritmo do elevador?",
    "resposta": "Move-se em um sentido atendendo todos os pedidos no caminho; quando não há mais naquele sentido, **inverte**. No exemplo, subindo: 12, 16, 34, 36, 9, 1 (60 cilindros). Evita inanição.",
    "material": [
     {
      "href": "#/19-discos-e-relogios/escalonamento-do-braco",
      "rotulo": "Aula 19 › Escalonamento do braço"
     }
    ]
   },
   {
    "n": 9,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Quais as duas abordagens para substituir setores defeituosos?",
    "resposta": "**Substituição**: o setor ruim é remapeado para um setor reserva. **Deslocamento**: os setores seguintes são empurrados uma posição até o reserva, preservando a sequência física. Pode ser feito pelo controlador ou pelo SO.",
    "material": [
     {
      "href": "#/19-discos-e-relogios/setores-defeituosos",
      "rotulo": "Aula 19 › Setores defeituosos"
     }
    ]
   },
   {
    "n": 10,
    "recomendada": false,
    "motivo": "",
    "enunciado": "Do que é composto o hardware de um relógio e como funciona?",
    "resposta": "**Oscilador de cristal**, **contador** e **registrador de apoio**. Cada pulso do cristal decrementa o contador; ao zerar, há uma interrupção. No modo de disparo único ele espera novo comando; no modo de onda quadrada, o contador é recarregado pelo registrador e gera interrupções periódicas (*ticks*).",
    "material": [
     {
      "href": "#/19-discos-e-relogios/relogio",
      "rotulo": "Aula 19 › Relógio"
     }
    ]
   }
  ]
 }
];
