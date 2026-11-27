---
aula: 3
titulo: Estruturas de sistemas operacionais e interrupções
fonte: "../slides/3 - Estruturas e Interrupções.pdf"
topicos: [monolítico, camadas, microkernel, cliente-servidor, máquinas virtuais, hipervisor tipo 1 e 2, exonúcleo, interrupções, proteção, modo de operação, registrador base e limite]
prerequisitos: [2]
---

# Aula 3: Estruturas de SOs e interrupções

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
A estrutura de um SO define o que roda em modo núcleo e como as partes se comunicam; interrupções são o mecanismo que devolve o controle ao SO e sustenta a proteção.

## Estruturas de SOs

### 1. Monolítico
- O SO inteiro é **um único programa** executando em modo núcleo.
- Coleção de procedimentos com interfaces bem definidas, livres para se chamarem entre si. **Não há ocultação de informação.**
- A forma de tratar chamadas de sistema impõe uma estrutura básica:
  - Programa principal: invoca o serviço pedido.
  - Procedimentos de serviço: executam as chamadas de sistema.
  - Procedimentos utilitários: auxiliam os de serviço.
- ✅ Bom desempenho (sem vários níveis intermediários).
- ❌ Baixa tolerância a falhas: um erro no kernel trava tudo.

> ⚠️ **Erro no slide:** está escrito que "não tem-se uma coleção de rotinas ligadas a um único grande programa". No Tanenbaum é o oposto: o sistema monolítico **é** uma coleção de rotinas ligadas em um único grande binário.

> **[+]** Linux é monolítico, mas com **módulos carregáveis** (drivers inseridos em tempo de execução, ainda em modo núcleo). Windows NT e macOS (XNU) costumam ser chamados de híbridos.

### 2. Em camadas
- Hierarquia de camadas, cada uma oferecendo serviços às demais.
- ✅ Isola componentes, facilita depuração e alteração; camadas internas podem ser protegidas das externas.
- ❌ Requisições atravessam várias camadas, o que pode piorar o desempenho.

**Sistema THE** (organização para facilitar o projeto):

| Camada | Função |
|---|---|
| 5 | Operador |
| 4 | Programas de usuário |
| 3 | Gerenciamento de E/S |
| 2 | Comunicação operador-processo |
| 1 | Gerenciamento de memória |
| 0 | Alocação do processador e multiprogramação |

**MULTICS** (anéis presentes em tempo de execução): anéis internos são mais privilegiados. Do mais externo ao mais interno: Usuário → Supervisor → Executivo → Kernel. Anéis externos fazem "chamadas de sistema" aos internos.

> **[+]** A arquitetura x86 herdou a ideia com 4 anéis (0 a 3); sistemas comuns usam só o 0 (núcleo) e o 3 (usuário).

### 3. Microkernel
- Reduz o núcleo ao mínimo. Motivação: erros no núcleo derrubam o sistema e há cerca de **10 bugs a cada 1000 linhas** de código.
- Driver em modo núcleo com erro: trava o sistema. Driver em modo usuário com erro: só o componente fica indisponível.
- Usado onde se exige alta confiabilidade: tempo real, industrial, aviônica.
- **MINIX**: cerca de 3200 linhas de C e 800 de assembly no núcleo. Fora dele, três camadas em modo usuário: **drivers**, **servidores** e **programas de usuário**.
- Diagrama do MINIX: o micronúcleo trata interrupções, processos, escalonamento e IPC, e hospeda as tarefas de relógio e de sistema. Acima: drivers (disco, TTY, rede, impressora), servidores (sistema de arquivos, processos, reencarnação) e programas (shell, make).
- Princípio **mecanismo × política**: o mecanismo fica no núcleo e a política em modo usuário. Ex.: o núcleo só escolhe e executa o processo de maior prioridade; um processo de usuário atribui as prioridades.

> **[+]** O custo do microkernel é a sobrecarga de troca de mensagens e de contexto. Outros exemplos: QNX, seL4 (formalmente verificado).

### 4. Cliente-servidor
- Variação do microkernel com duas classes de processos: **servidores** prestam serviços e **clientes** os usam.
- Comunicação por **troca de mensagens** (requisição e resposta).
- Nenhum depende da localização do outro: funciona na mesma máquina ou em máquinas em rede.

### 5. Máquinas virtuais
- Um sistema de tempo compartilhado oferece multiprogramação e máquina estendida. A VM **separa completamente** essas duas funções.
- Pioneiro: **IBM VM/370**.
- O **monitor de máquina virtual (hipervisor)** roda sobre o hardware, faz a multiprogramação e entrega várias cópias exatas do hardware (com modos núcleo e usuário, E/S e interrupções). Cada cópia roda qualquer SO.
- Fluxo de uma chamada de sistema: a aplicação faz TRAP, que vai ao SO convidado; o SO emite instruções normais de hardware; estas geram trap para o hipervisor, que as executa simulando o hardware real.
- Exige hardware **virtualizável**.

| | Hipervisor tipo 1 | Hipervisor tipo 2 |
|---|---|---|
| Onde roda | Direto no hardware | Como aplicação sobre um SO hospedeiro |
| [+] Exemplos | VMware ESXi, Xen, Hyper-V | VirtualBox, VMware Workstation |

> **[+]** Virtualizável (critério de Popek e Goldberg): toda instrução sensível executada em modo usuário deve causar trap. O x86 antigo não cumpria isso, o que levou a tradução binária, paravirtualização e depois às extensões Intel VT-x e AMD-V. **Contêineres** (Docker) não são VMs: compartilham o kernel do hospedeiro.

### 6. Exonúcleo
- Em vez de clonar a máquina, **divide os recursos** em subconjuntos e dá um a cada VM.
- O exonúcleo isola as máquinas.
- Dispensa a camada de mapeamento que o hipervisor precisaria fazer.

### [+] Comparação rápida
| Estrutura | Em modo núcleo | Ponto forte | Ponto fraco |
|---|---|---|---|
| Monolítico | Tudo | Desempenho | Uma falha derruba tudo |
| Camadas | Geralmente tudo | Organização | Overhead entre camadas |
| Microkernel | Mínimo | Confiabilidade | Overhead de mensagens |
| Cliente-servidor | Mínimo | Distribuição | Overhead de comunicação |
| VM | Hipervisor | Vários SOs, isolamento | Custo da virtualização |
| Exonúcleo | Isolamento de recursos | Sem remapeamento | Mais trabalho para cada SO/biblioteca |

## Interrupções
- **Sinais de hardware** que informam a ocorrência de um evento e desviam a CPU para a **rotina de tratamento**.

| Tipo (classificação dos slides) | Origem | Exemplos |
|---|---|---|
| Hardware | Eventos externos à instrução | Relógio, pedidos de dispositivos de E/S |
| Software | Solicitada pelo programa | Instrução TRAP |
| Exceção | Uso indevido de instruções ou dados | Divisão por zero, overflow |

- Precisam ser **identificadas**, têm **prioridades** e **rotinas de tratamento**.
- Auxiliam a detectar e tratar erros. O SO deve garantir que um processo defeituoso não afete outro.

> **[+]** Passos típicos: o dispositivo sinaliza → a CPU termina a instrução atual → salva PC e PSW → consulta o **vetor de interrupções** → entra em modo núcleo → a rotina salva registradores e trata o evento → o escalonador escolhe o processo → restaura o estado e retorna. Interrupções de hardware são **assíncronas**; traps e exceções são **síncronas**. Detalhes nas aulas [17](17-entrada-e-saida-hardware.md) e [18](18-entrada-e-saida-software.md).

## Mecanismos de proteção
1. **Modo de operação**: kernel executa todas as instruções; usuário não executa as privilegiadas. Usuário → kernel por **interrupção**; kernel → usuário por **uma instrução**.
2. **Proteção de E/S**: E/S só em modo kernel; processos usam chamadas de sistema.
3. **Proteção de memória**: registradores **base** e **limite**; endereços fora da faixa são protegidos. Ver [aula 10](10-gerencia-de-memoria.md).
4. **Proteção do processador**: **interrupção de tempo**, que permite a multiprogramação e garante que o SO volte a executar.

### Inibição de interrupções
- Instruções permitem ignorar certas interrupções, geralmente durante atividades críticas.
- **[+]** É instrução privilegiada. Como mecanismo de exclusão mútua, ver [aula 6](06-ipc.md).

## Pontos de atenção para prova
- Comparar monolítico × microkernel (desempenho × confiabilidade).
- Mecanismo × política.
- Tipo 1 × tipo 2; VM (clona) × exonúcleo (particiona).
- A interrupção de relógio é o que impede um processo de monopolizar a CPU.

## [+] Perguntas de revisão
1. Por que um erro de driver é menos grave em um microkernel?
   *O driver é um processo de usuário isolado; pode falhar e ser reiniciado sem derrubar o núcleo.*
2. Por que desabilitar interrupções não pode ser permitido em modo usuário?
   *Um processo poderia desligar o relógio e nunca devolver a CPU.*
3. Classifique: tecla pressionada, `syscall`, acesso a endereço inválido.
   *Hardware; software; exceção.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª e 3ª ed., cap. 1.
