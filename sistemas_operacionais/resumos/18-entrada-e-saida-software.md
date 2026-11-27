---
aula: 18
titulo: "Entrada e saída: software"
fonte: "../slides/18 - Entrada e Saída Software.pdf"
topicos: [independência de dispositivo, nomeação uniforme, tratamento de erros, síncrono e assíncrono, buffering, E/S programada, E/S por interrupção, DMA, camadas de E/S, tratador de interrupção, driver, software independente de dispositivo, spooling]
prerequisitos: [17]
---

# Aula 18: E/S em software

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
O software de E/S esconde as diferenças entre dispositivos em quatro camadas e pode operar por espera ocupada, por interrupções ou com DMA.

## Objetivos (questões de projeto)
| Questão | Significado |
|---|---|
| **Independência de dispositivo** | O mesmo programa lê de CD, HD ou SSD |
| **Nomeação uniforme** | Nomes não dependem do dispositivo (no Unix, um pendrive é montado num diretório) |
| **Tratamento de erros** | O mais **perto do hardware** possível; muitos são transitórios (a controladora tenta de novo) e só sobem se não resolvidos |
| **Tipo de transferência** | **Assíncrona** (por interrupção, a CPU faz outra coisa) × **síncrona** (bloqueante). O SO faz a assíncrona parecer bloqueante ao usuário, o que facilita programar |
| **Buffers** | Armazenamento temporário (analisar pacotes antes de entregar; atender taxas em tempo real). Cópias custam desempenho |
| **Compartilhamento** | **Compartilhados** (disco) × **dedicados** (impressora; trazem problemas como [deadlock](09-deadlocks.md)) |

## Três formas de realizar E/S

### 1. E/S programada
A CPU faz tudo. Exemplo de impressão: o processo adquire a impressora e faz a chamada de sistema; o SO copia os dados para o núcleo e, para cada caractere, **espera a impressora ficar pronta** e o envia.
```c
copy_from_user(buffer, p, count);        /* p = buffer do núcleo */
for (i = 0; i < count; i++) {
    while (*printer_status_reg != READY);  /* espera ocupada */
    *printer_data_register = p[i];
}
return_to_user();
```
- ❌ Prende a CPU até o fim (*busy waiting*).
- Aceitável se o tempo por caractere é muito curto ou em embarcados sem outra tarefa.

### 2. E/S orientada à interrupção
- Impressora de 100 caracteres/s → **10 ms** por caractere, tempo para outra tarefa.
1. Copia o buffer para o núcleo.
2. Envia o primeiro caractere quando a impressora aceitar.
3. Chama o escalonador; o processo fica bloqueado.
4. A cada caractere impresso há interrupção; o tratador envia o próximo.
5. Sem mais caracteres, desbloqueia o processo.

```c
/* (a) chamada de sistema */             /* (b) tratador de interrupção */
copy_from_user(buffer, p, count);        if (count == 0) {
enable_interrupts();                         unblock_user();
while (*printer_status_reg != READY);    } else {
*printer_data_register = p[0];               *printer_data_register = p[i];
scheduler();                                 count = count - 1;
                                             i = i + 1;
                                         }
                                         acknowledge_interrupt();
                                         return_from_interrupt();
```
> **[+]** O esquema supõe que, depois de enviar `p[0]`, `i` vale 1 e `count` já foi descontado.

- ❌ **Uma interrupção por caractere**, com custo de CPU.

### 3. E/S com DMA
- O controlador de DMA alimenta a impressora; é **E/S programada feita pelo DMA** (ele faz a espera).
- CPU: copia o buffer → programa o DMA → bloqueia o processo e escalona → **uma interrupção** ao fim do buffer → desbloqueia.

```c
/* (a) chamada */                /* (b) tratador  [+] forma do Tanenbaum */
copy_from_user(buffer, p, count);    acknowledge_interrupt();
set_up_DMA_controller();             unblock_user();
scheduler();                         return_from_interrupt();
```
- Pode **não compensar** se o DMA (em geral bem mais lento que a CPU) não acompanhar o dispositivo, ou se a CPU não tiver nada a fazer enquanto espera.

### [+] Comparação
| Forma | Quem copia | Interrupções | CPU durante a E/S |
|---|---|---|---|
| Programada | CPU | 0 | Ocupada esperando |
| Interrupção | CPU | 1 por caractere | Livre entre caracteres |
| DMA | Controlador de DMA | 1 por buffer | Livre |

> **[+]** Ex.: 1000 caracteres a 100/s, tratador de 4 µs: por interrupção gastam-se 4 ms de CPU em 10 s; na programada, os 10 s inteiros.

## Camadas do software de E/S
```
┌─────────────────────────────────────┐
│ E/S em nível de usuário             │ chama E/S, formata, faz spool
│ Software independente de dispositivo│ nomeação, proteção, bloqueio, buffers, alocação
│ Drivers de dispositivo              │ configura registradores, verifica status
│ Tratadores de interrupção           │ acorda o driver ao fim da E/S
├─────────────────────────────────────┤
│ Hardware                            │ executa a operação
└─────────────────────────────────────┘
```

### Tratadores de interrupção
- Normalmente o driver que iniciou a E/S fica **bloqueado** e o tratador o desbloqueia. Detalhes dependem de SO e hardware. Passos gerais:
1. Salvar registradores não salvos pelo hardware.
2. Estabelecer contexto para a rotina (TLB, MMU, tabela de páginas).
3. Estabelecer uma pilha.
4. Sinalizar o controlador de interrupção (sem controlador centralizado, reabilitar interrupções).
5. Copiar os registradores para a tabela de processos.
6. Executar a rotina, lendo os registradores do dispositivo.
7. Escolher o próximo processo.
8. Ajustar TLB e MMU para ele.
9. Carregar seus registradores.
10. Iniciar sua execução.

### Drivers
- Código específico de cada dispositivo; normalmente **no núcleo** (acesso aos registradores), mas podem rodar em **modo usuário** fazendo chamadas de sistema (ver [microkernel](03-estruturas-e-interrupcoes.md)).
- Categorias: de **bloco** e de **caractere**, cada uma com **interface padrão**.
- Funções: executar pedidos abstratos de leitura/escrita, inicializar o dispositivo, tratar energia, registrar eventos.
- Funcionamento típico: verificar parâmetros → verificar se está em uso → escrever comandos nos registradores → bloquear até a interrupção (às vezes não há espera) → verificar erros → devolver status.

> **[+]** Drivers precisam ser **reentrantes** (uma interrupção pode chegar durante a execução) e são a principal fonte de falhas em núcleos.

### Software independente de dispositivo
- Executa funções comuns e dá **interface uniforme** ao nível de usuário. A fronteira com o driver varia.
- **Interface uniforme para drivers**: facilita acoplar novos drivers (depende da colaboração dos desenvolvedores).
- **Nomeação**: Unix usa `/dev` (ex.: `/dev/disk0`). **Proteção**: dispositivos são arquivos, com o mesmo esquema de permissões. **[+]** *Major number* identifica o driver; *minor*, a unidade.
- **Tamanho de bloco lógico** uniforme, escondendo diferenças entre dispositivos (HD, Blu-ray).
- **Buffering**.

#### Estratégias de buffer (leitura de um modem)
| Esquema | Como | Problema |
|---|---|---|
| (a) Sem buffer | Cada caractere interrompe e desbloqueia o processo | Processo executado a **cada caractere** |
| (b) Buffer no usuário (n caracteres) | A interrupção grava no buffer do processo | A página pode estar **em disco**; travar muitas páginas degrada o sistema |
| (c) Buffer no núcleo + no usuário | Enche no núcleo e depois copia | Caracteres chegam enquanto a página do usuário é trazida do disco |
| (d) **Buffer duplo no núcleo** + usuário | Enquanto um é copiado, o outro recebe | Resolve |

> ⚠️ O texto do slide diz "dois em espaço de usuário e um em kernel", mas a **figura** (e o Tanenbaum) mostram **dois no núcleo** e um no usuário. Confirmar com o professor.

> **[+]** Alternativa: **buffer circular**.

### E/S no espaço de usuário
- **Bibliotecas** ligadas aos programas (`printf`, `scanf` formatam e chamam o SO).
- **Spooling**: um **daemon**, único com acesso à impressora, imprime os arquivos de um **diretório de spool**. Também usado em transferência de arquivos em rede.

> **[+] Caminho de um `read`**: biblioteca → chamada de sistema → software independente (permissão, cache) → driver programa o controlador e bloqueia → hardware → interrupção → tratador acorda o driver → dados sobem e o processo vira pronto.

## Pontos de atenção para prova
- Comparar as três formas de E/S.
- Dizer em qual camada fica cada função (verificar permissão: independente; calcular trilha e setor: driver; formatar texto: usuário; acordar driver: tratador).

## [+] Perguntas de revisão
1. Por que tratar erros nas camadas baixas? *Quem está perto do hardware pode repetir a operação sem incomodar as de cima.*
2. Que condição de deadlock o spooling ataca? *Exclusão mútua.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 5) e 3ª ed. (cap. 5).
