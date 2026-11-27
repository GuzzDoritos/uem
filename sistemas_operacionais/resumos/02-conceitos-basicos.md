---
aula: 2
titulo: Conceitos básicos
fonte: "../slides/2 - Conceitos básicos.pdf"
topicos: [definição de SO, máquina estendida, gerenciador de recursos, boot, modo usuário e núcleo, chamadas de sistema, processos, deadlock, memória, E/S, arquivos]
prerequisitos: []
---

# Aula 2: Conceitos básicos

> Convenção: o texto sem marcação vem dos slides. Blocos e seções marcados com **[+]** são complementos que não estão nos slides.

## Resumo em uma frase
O SO é a camada de software que esconde a complexidade do hardware (máquina estendida) e arbitra o uso dos recursos entre programas concorrentes (gerenciador de recursos).

## O que é um sistema operacional
- Um computador moderno é complexo: processador, memória principal, discos e outros dispositivos de E/S.
- O SO é um software com duas tarefas principais:
  1. Gerenciar os componentes do sistema.
  2. Oferecer aos programas de usuário uma interface mais simples que a do hardware.

### Visão 1: máquina estendida (ou virtual)
- Abstrai detalhes do hardware. Os serviços são mais fáceis de usar que o recurso bruto e são acessados por **chamadas de sistema**.
- Exemplo: ler um arquivo sem SO exigiria conhecer pratos, trilhas, setores e cilindros, posicionar a cabeça de leitura e girar o eixo. Com SO bastam `abrir`, `ler`, `escrever` e `fechar`.

### Visão 2: gerenciador de recursos
- Aloca CPU, memória, impressora etc. entre programas que competem por eles.
- Exemplo: três programas imprimindo ao mesmo tempo embaralhariam as linhas. O SO armazena as saídas em disco e imprime um trabalho por vez (**[+]** técnica chamada *spooling*).
- Evita que processos interfiram uns nos outros ou acessem recursos indevidos.
- Compartilhamento (multiplexação) de dois tipos:

| Tipo | Como funciona | Papel do SO | Exemplo |
|---|---|---|---|
| No **tempo** | Cada processo usa na sua vez | Decidir quem usa e por quanto tempo | CPU |
| No **espaço** | Cada processo ocupa uma parte | Impedir que um invada a parte do outro | Memória |

## Inicialização (boot)
1. O **BIOS** (rotinas básicas de E/S de baixo nível) executa e verifica os dispositivos básicos.
2. Determina o dispositivo de boot.
3. O primeiro setor do disco é carregado na memória e executado.
4. Esse programa examina a tabela de partições e acha a partição ativa.
5. Um carregador secundário é lido dessa partição e carrega o SO.
6. O SO obtém do BIOS os dados dos dispositivos e carrega os *drivers* no kernel.
7. Inicia tabelas, cria processos em segundo plano e inicia o programa de login.

> **[+]** O primeiro setor é o **MBR** (*Master Boot Record*). Máquinas atuais usam **UEFI** com tabela de partições **GPT**, que carrega o *bootloader* de uma partição de sistema EFI. A sequência acima é a do modelo BIOS/MBR, descrita no Tanenbaum.

## Modos de execução da CPU
| | Modo usuário | Modo núcleo (kernel) |
|---|---|---|
| Instruções | Um subconjunto | Todas |
| Acesso ao hardware | Parcial | Total |

- Instruções de E/S, de proteção de memória e outras são privilegiadas.
- Programas de usuário pedem esses serviços por **chamada de sistema**, que muda de modo usuário para núcleo com a instrução **TRAP**.

> **[+]** Fluxo de `read(fd, buf, n)`: a biblioteca coloca o número da chamada e os argumentos nos registradores, executa TRAP, o hardware muda para modo núcleo e salta para um endereço fixo, o núcleo consulta a tabela de chamadas, executa o tratador e retorna ao modo usuário. Trocar de modo **não** é o mesmo que trocar de processo.

> **[+]** Chamadas POSIX típicas: processos (`fork`, `execve`, `waitpid`, `exit`, `kill`), arquivos (`open`, `read`, `write`, `lseek`, `close`, `stat`), diretórios (`mkdir`, `rmdir`, `link`, `unlink`, `chdir`, `mount`).

## Processos
- Processo é um **programa em execução**. Tem associados:
  - Espaço de endereçamento (código, dados, pilha).
  - Registradores, incluindo contador de programa e ponteiro de pilha.
- Em tempo compartilhado o SO troca periodicamente o processo em execução, então precisa salvar o estado dos suspensos.
- Informações do processo que não estão no seu espaço de endereçamento ficam na **tabela de processos**.
- Há chamadas de sistema para criar e terminar processos. Isso gera uma **árvore de processos** (pai e filho).
- Processos que cooperam precisam de **comunicação interprocessos** (IPC).
- **UID**: identifica o usuário. O processo recebe o UID de quem o iniciou e o filho herda o do pai.
- **PID**: identificador único do processo.
- Um processo tem uma ou mais linhas de execução (**threads**), que compartilham os recursos do processo.

## Deadlocks
- Quando processos compartilham recursos de uso exclusivo, podem entrar em situação da qual não saem. Analogia: cruzamento travado no trânsito.
- Exemplo com unidade de fita e CD-ROM:
  1. A pega a fita.
  2. B pega o CD-ROM.
  3. B pede a fita e bloqueia.
  4. A pede o CD-ROM e bloqueia.
  - Ambos esperam para sempre. Ver [aula 9](09-deadlocks.md).

## Memória
- Guarda os programas em execução. SOs simples: um programa por vez. Sofisticados: vários.
- Com vários programas é preciso proteção: mecanismo de **hardware controlado pelo SO**.
- Endereçamento: se o processo precisa de mais espaço que a memória física, computadores antigos não o executavam. Hoje há **memória virtual**: parte fica na RAM e parte no disco, com trocas sob demanda.

## Entrada e saída
- O subsistema de E/S do SO tem uma parte **independente de dispositivo** e uma parte **específica** (o *driver*).

## Arquivos
- O SO oculta peculiaridades dos dispositivos e oferece abrir, ler, escrever e fechar.
- **Diretórios** agrupam arquivos. Suas entradas são arquivos ou outros diretórios, formando um sistema hierárquico.
- Há chamadas para criar e remover diretórios e para colocar e remover arquivos.
- Caminho **absoluto** (a partir da raiz) ou **relativo** (a partir do diretório de trabalho, que o processo pode mudar).
- O acesso usa um **descritor de arquivo**, devolvido na abertura se o arquivo existe e o usuário tem permissão.
- **Arquivos especiais** (Unix, em `/dev`) fazem dispositivos parecerem arquivos:
  - **De bloco**: blocos endereçáveis aleatoriamente (discos).
  - **De caracteres**: fluxo serial (impressoras).

## Pontos de atenção para prova
- Saber dar as duas visões do SO e um exemplo de cada.
- CPU é multiplexada no tempo; memória, no espaço.
- Chamada de sistema ≠ chamada de função comum: envolve TRAP e mudança de modo.
- Programa (passivo, no disco) ≠ processo (ativo, com estado).

## [+] Perguntas de revisão
1. Por que as instruções de E/S são privilegiadas?
   *Para que um processo não acesse dispositivos diretamente, burlando permissões ou interferindo em outros processos.*
2. O que acontece quando um programa de usuário tenta executar uma instrução privilegiada?
   *O hardware gera uma exceção e o controle passa ao SO, que normalmente encerra o processo.*
3. Dê um recurso multiplexado no tempo e no espaço.
   *Disco: o espaço é dividido entre arquivos e o acesso à cabeça é intercalado no tempo.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed., cap. 1.
