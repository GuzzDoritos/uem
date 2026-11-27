# Lista 7

> Fonte: `../listas/lista 7.pdf`. As respostas são **sugestões**, não são gabarito do professor. `★` = recomendada para a prova (critério sugerido, não do professor).

### 1
Quais as duas principais categorias de dispositivos de E/S? Explique.

Material: 17-entrada-e-saida-hardware#categorias-de-dispositivos

#### Resposta
**De bloco**: armazenam em blocos de tamanho fixo, endereçáveis e lidos ou escritos independentemente (discos). **De caractere**: enviam ou recebem um fluxo de caracteres, sem endereçamento nem posicionamento (impressora, mouse, rede).

### 2
Como é organizado o fluxo de bits entregue ao controlador de disco?

Material: 17-entrada-e-saida-hardware#controlador-de-dispositivo

#### Resposta
Um **preâmbulo** (gravado na formatação, com número do cilindro e do setor), os **dados** do setor e o **código de correção de erros** (ECC). O controlador converte o fluxo em um bloco de bytes e corrige erros.

### 3
Para que são usados os registradores de um controlador de E/S?

Material: 17-entrada-e-saida-hardware#controlador-de-dispositivo

#### Resposta
Para a comunicação com a CPU: o SO **escreve** neles para enviar comandos e dados e **lê** para conhecer o estado do dispositivo (pronto, ocupado, erro).

### 4 ★
Quais as duas maneiras de o SO se comunicar com os registradores dos controladores? Explique, com vantagens e desvantagens.

Por que cai: comparação central de E/S em hardware.

Material: 17-entrada-e-saida-hardware#como-a-cpu-acessa-os-registradores

#### Resposta
**Portas de E/S**: cada registrador tem um número de porta, em espaço separado, acessado por instruções especiais (`IN`, `OUT`).
- Vantagens: não ocupa endereços de memória; não há problema com cache.
- Desvantagens: exige instruções especiais (geralmente assembly) e proteção própria.

**Mapeada em memória**: registradores ocupam endereços de memória reservados.
- Vantagens: dispensa instruções especiais; toda instrução de memória serve; proteção pelo próprio mecanismo de memória.
- Desvantagens: é preciso desabilitar cache nesses endereços; complica sistemas com vários barramentos; reduz o espaço de endereçamento disponível.

### 5
O que são interrupções?

Material: 17-entrada-e-saida-hardware#interrupcoes

#### Resposta
Sinais enviados à CPU (por exemplo, quando um dispositivo conclui seu trabalho) que a fazem suspender a execução atual, salvar o contexto e executar a rotina de tratamento indicada pelo vetor de interrupções.

### 6
Qual o problema das interrupções em processadores com pipeline?

Material: 17-entrada-e-saida-hardware#pipeline-e-execucao-fora-de-ordem

#### Resposta
Há várias instruções em execução parcial; o **PC não indica quais terminaram**, apenas quais entraram no pipeline. Com execução fora de ordem, pode ser impossível determinar o que foi executado, dificultando retomar o processo, além de desperdiçar trabalho do pipeline.

### 7
Quais são as duas categorias de interrupções? Explique.

Material: 17-entrada-e-saida-hardware#precisas-imprecisas

#### Resposta
**Precisas**: o PC é salvo em lugar conhecido; todas as instruções anteriores foram concluídas; nenhuma posterior foi executada; o estado da instrução apontada é conhecido. Exigem hardware complexo. **Imprecisas**: não cumprem isso; a máquina salva muito estado interno e o SO precisa interpretá-lo.

### 8
Quais tipos de transferência o software de E/S pode oferecer?

Material: 18-entrada-e-saida-software#objetivos-questoes-de-projeto

#### Resposta
**Síncrona (bloqueante)**: quem pede espera a conclusão. **Assíncrona (por interrupção)**: a CPU inicia a transferência e faz outra coisa até ser avisada. O SO costuma apresentar operações assíncronas como bloqueantes ao usuário.

### 9 ★
Quais as três maneiras de realizar E/S? Explique cada uma, com exemplos.

Por que cai: junta hardware, software e desempenho.

Material: 18-entrada-e-saida-software#tres-formas-de-realizar-e-s

#### Resposta
Exemplo: imprimir uma cadeia de caracteres.
- **E/S programada**: a CPU faz tudo; para cada caractere, espera em laço a impressora ficar pronta e o envia. Simples, mas prende a CPU.
- **Por interrupção**: a CPU envia um caractere, bloqueia o processo e executa outro; a cada interrupção da impressora, envia o próximo; ao fim, desbloqueia. Há uma interrupção por caractere.
- **Com DMA**: a CPU programa o controlador de DMA, que alimenta a impressora; há **uma** interrupção ao fim do buffer. Pode não compensar se o DMA for lento ou a CPU não tiver o que fazer.

### 10
O que são drivers de dispositivos e quais suas funções?

Material: 18-entrada-e-saida-software#drivers

#### Resposta
Código específico que controla um tipo de dispositivo, normalmente no núcleo. Funções: receber pedidos abstratos do software independente de dispositivo, verificar parâmetros e disponibilidade, escrever comandos nos registradores, aguardar a conclusão, tratar erros e devolver o status; além de inicializar o dispositivo e gerenciar energia e registros de eventos.

### 11
Por que o uso de buffers é importante para dispositivos de E/S?

Material: 18-entrada-e-saida-software#software-independente-de-dispositivo

#### Resposta
Armazenam dados temporariamente quando não podem ir direto ao destino, **compensam diferenças de velocidade**, evitam acordar o processo a cada caractere, permitem analisar dados antes da entrega (pacotes de rede) e atender prazos de dispositivos de tempo real. O custo são cópias extras.

### 12 ★
Explique as alternativas (a) sem buffer, (b) buffer no usuário, (c) buffer no usuário e um no núcleo, (d) buffer no usuário e dois no núcleo, citando os problemas de a, b e c.

Por que cai: questão detalhada com quatro casos.

Material: 18-entrada-e-saida-software#estrategias-de-buffer-leitura-de-um-modem

#### Resposta
- **a)** Cada caractere interrompe e é entregue ao processo. **Problema**: o processo precisa ser executado a cada caractere.
- **b)** O processo fornece um buffer de n caracteres, preenchido pela rotina de interrupção. **Problema**: a página do buffer pode estar no disco quando chega um caractere; travá-la na memória, se generalizado, degrada o sistema.
- **c)** A interrupção enche um buffer no núcleo, depois copiado ao do usuário. **Problema**: caracteres podem chegar enquanto o buffer do núcleo está cheio e a página do usuário é trazida do disco.
- **d)** Dois buffers no núcleo se alternam: enquanto um é copiado para o usuário, o outro recebe os novos caracteres (buffer duplo).

⚠️ O texto do slide diz "dois em espaço de usuário e um no kernel"; a lista e a figura confirmam **dois no kernel**.
