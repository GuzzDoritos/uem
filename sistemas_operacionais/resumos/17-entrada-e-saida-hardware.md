---
aula: 17
titulo: "Entrada e saída: hardware"
fonte: "../slides/17 - Entrada e saída hardware.pdf"
topicos: [dispositivos de bloco e caractere, controlador, registradores, buffer, portas de E/S, E/S mapeada em memória, DMA, interrupções, controlador de interrupção, vetor de interrupção, interrupções precisas e imprecisas]
prerequisitos: [3]
---

# Aula 17: E/S em hardware

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
A CPU controla dispositivos escrevendo em registradores dos controladores (por portas ou memória), delega cópias ao DMA e é avisada do término por interrupções.

## Papel do SO
- **Controlar** dispositivos: emitir comandos, interceptar interrupções, tratar erros.
- Oferecer **interface** simples.
- Dispositivo pode ser visto pelos componentes físicos ou pela **interface** (comandos, funções, erros).

## Categorias de dispositivos
| | Bloco | Caractere |
|---|---|---|
| Unidade | Blocos de tamanho fixo (512 B a 32.768 B) | Fluxo de caracteres |
| Endereçável | Sim (há posicionamento) | Não |
| Acesso | Blocos independentes | Serial |
| Exemplos | Discos | Impressora, rede, mouse |

- Há os que não se encaixam: **relógio**, vídeo mapeado em memória. As duas categorias servem de base ao software independente de dispositivo.
- Taxas variam muitíssimo, e o software precisa lidar com todas:

| Dispositivo | Taxa | Dispositivo | Taxa |
|---|---|---|---|
| Teclado | 10 B/s | Gigabit Ethernet | 125 MB/s |
| Mouse | 100 B/s | Disco SATA 3 | 600 MB/s |
| Modem 56K | 7 KB/s | USB 3.0 | 625 MB/s |
| Blu-ray 4× | 18 MB/s | PCIe 3.0 (1 via) | 985 MB/s |
| USB 2.0 | 60 MB/s | Thunderbolt 2 | 2,5 GB/s |

## Controlador de dispositivo
- Componente eletrônico (**controlador** ou **adaptador**) com interface de nível muito baixo.
- No disco chega um **fluxo serial de bits**: **preâmbulo** (gravado na formatação, com cilindro e setor), dados do setor (os slides citam "geralmente 4096 bits") e **ECC**. O controlador monta o bloco de bytes e corrige erros.

> **[+]** Tamanhos usuais de setor são 512 ou 4096 **bytes** (512 B = 4096 bits, que é o valor do exemplo no Tanenbaum).

- Tem **registradores** (o SO escreve comandos e lê estado) e, em alguns casos, um **buffer** de dados.

## Como a CPU acessa os registradores

### Portas de E/S (espaços separados)
- Cada registrador tem um número de porta; instruções especiais:
  - `IN R, P`: porta P → registrador R.
  - `OUT P, R`: registrador R → porta P.

### E/S mapeada em memória
- Registradores recebem **endereços de memória reservados**, sem RAM associada e indisponíveis para dados.

| Vantagens | Desvantagens |
|---|---|
| Dispensa instruções especiais (**[+]** o driver pode ser todo em C) | **Cache** pode manter valor desatualizado (é preciso desabilitá-la por página) |
| Dispensa mecanismo extra de proteção contra E/S por usuários (basta não mapear essas páginas) | Com **vários barramentos** (um dedicado CPU–memória), dispositivos não veem os endereços; é preciso filtrar/encaminhar |
| Toda instrução que referencia memória serve para o dispositivo | |

> **[+]** Há esquemas **híbridos**: buffers mapeados em memória e registradores de controle em portas (x86).

## DMA (*Direct Memory Access*)
- Pedir dados byte a byte ao controlador desperdiça CPU. O **controlador de DMA** acessa a memória sem passar pela CPU.
- Normalmente há um só, na placa-mãe, com registradores de **endereço de memória**, **contador de bytes** e **controle**.

**Leitura sem DMA**: controladora lê o bloco → verifica erros → interrompe → o SO copia o buffer **byte a byte** em laço.

**Leitura com DMA**
1. A CPU **programa** o DMA (endereço, contagem, controle).
2. O controlador de disco recebe o sinal, lê e verifica os dados no buffer.
3. Com os dados prontos, o DMA **solicita** a transferência.
4. O disco grava uma parte do buffer na memória.
5. O controlador de disco **confirma** ao DMA.
6. O DMA incrementa o endereço e decrementa o contador.
7. Enquanto o contador ≠ 0, volta a solicitar (passo 4).
8. **[+]** Com contador zero, o DMA **interrompe** a CPU.

> ⚠️ A numeração do slide tem a frase truncada no passo 1 ("A CPU envia programa o controlador"): leia "a CPU programa o controlador de DMA".

### Por que o disco precisa de buffer
- Permite **verificar erros antes** de transferir (se houver erro, nada é transferido).
- Os bits chegam em ritmo constante; se o **barramento estiver ocupado**, a controladora precisa guardar os dados enquanto espera.

> **[+]** Modos: **roubo de ciclo** (uma palavra por vez, disputando o barramento) e **rajada** (*burst*, segura o barramento para um bloco).

## Interrupções
Fluxo (figura): (1) o dispositivo conclui e sinaliza o **controlador de interrupção** → (2) o controlador interrompe a CPU → (3) a CPU confirma.

- O dispositivo ativa uma linha no barramento ao terminar.
- O controlador atende imediatamente se estiver livre; se ocupado, a nova é ignorada por ora, mas o dispositivo **mantém o pedido** até ser atendido.
- Simultâneas: maior **prioridade** primeiro (em geral definida pelo tipo de dispositivo).
- O controlador coloca um **número** nas linhas de endereço, usado como índice da tabela (**[+]** **vetor de interrupções**) com o endereço da rotina.
- A rotina **confirma** a interrupção, liberando o controlador para a próxima.
- Antes, salva-se o **contexto** do processo, geralmente na **pilha**.

### Pipeline e execução fora de ordem
- Interrupções descartam instruções no pipeline.
- Com pipeline, o PC não indica quais instruções **terminaram**, só quais **entraram**; o SO precisa reconstruir o que foi executado.
- Com execução fora de ordem, às vezes nem é possível saber.

### Precisas × imprecisas
**Precisa** = deixa a máquina em estado bem definido:
1. O PC é salvo em local conhecido.
2. Todas as instruções **anteriores** à apontada pelo PC terminaram.
3. Nenhuma **posterior** foi executada.
4. O estado da instrução apontada é conhecido.

**Imprecisa** = não cumpre os requisitos. A máquina despeja muito estado interno na pilha e o SO precisa interpretá-lo.

| | Precisa (ex.: x86 superescalar) | Imprecisa |
|---|---|---|
| Hardware | Circuito muito complexo | Mais simples; sobra área para cache etc. |
| SO | Simples | Mais complexo e lento no tratamento |

## Pontos de atenção para prova
- Portas × mapeamento em memória.
- Sequência do DMA e razões do buffer.
- Quatro propriedades da interrupção precisa.

## [+] Perguntas de revisão
1. Por que não usar cache nos registradores mapeados? *O laço de espera leria sempre a cópia antiga do estado.*
2. Quantas interrupções para ler um bloco de 4 KB com DMA? *Uma, ao final.*

## Ver também
[E/S em software](18-entrada-e-saida-software.md) · [Interrupções (aula 3)](03-estruturas-e-interrupcoes.md)

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 5) e 3ª ed. (cap. 5).
