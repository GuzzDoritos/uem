# Lista 8

> Fonte: `../listas/lista 8.pdf`. As respostas são **sugestões**, não são gabarito do professor. Não há slide sobre este assunto na pasta, então nenhuma foi marcada como recomendada e o material de apoio é um complemento.

### 1
Como são organizados os dados em um disco rígido?

Material: 19-discos-e-relogios#organizacao-do-disco-rigido

#### Resposta
Em **pratos** com superfícies divididas em **trilhas** concêntricas, cada uma dividida em **setores** (com preâmbulo, dados e ECC). As trilhas de mesmo raio formam um **cilindro**. Cada superfície tem uma cabeça no mesmo braço. Discos atuais usam zonas e endereçamento lógico de blocos.

### 2
O que são RAIDs e qual a justificativa para seu uso?

Material: 19-discos-e-relogios#raid

#### Resposta
Conjunto de discos vistos como um só. Justificativa: **desempenho**, por acessos paralelos, e **confiabilidade**, por redundância (espelho ou paridade).

### 3
Quais as diferenças entre RAID 0, 1, 4 e 5?

Material: 19-discos-e-relogios#raid

#### Resposta
- **0**: divisão em faixas, sem redundância.
- **1**: espelhamento; metade da capacidade.
- **4**: faixas com paridade em **um disco dedicado**, que vira gargalo de escrita.
- **5**: faixas com paridade **distribuída** entre os discos, eliminando o gargalo.

4 e 5 toleram a falha de um disco.

### 4
O que é torção cilíndrica e qual seu objetivo?

Material: 19-discos-e-relogios#torcao-cilindrica-cylinder-skew

#### Resposta
Deslocamento do setor inicial de uma trilha em relação ao da vizinha, para que, após mover o braço, o próximo setor esteja chegando sob a cabeça, evitando esperar uma rotação inteira em leituras contínuas.

### 5
Quais elementos influenciam o tempo de leitura e escrita no disco? Qual o mais custoso e como amenizar?

Material: 19-discos-e-relogios#tempo-de-acesso

#### Resposta
**Tempo de busca**, **latência rotacional** e **tempo de transferência**. O mais custoso costuma ser a **busca**. Ameniza-se com algoritmos de escalonamento do braço, cache de trilhas e colocação de blocos relacionados próximos.

### 6
Como funciona o escalonamento de braço First Come First Served?

Material: 19-discos-e-relogios#escalonamento-do-braco

#### Resposta
Atende os pedidos **na ordem de chegada**. Simples e justo, mas pode mover muito o braço. No exemplo (cabeça em 11; pedidos 1, 36, 16, 34, 9, 12) percorre 111 cilindros.

### 7
Como funciona o Shortest Seek First?

Material: 19-discos-e-relogios#escalonamento-do-braco

#### Resposta
Atende sempre o pedido **mais próximo** da posição atual. No exemplo: 12, 9, 16, 1, 34, 36 (61 cilindros). Reduz o movimento, mas pedidos distantes podem sofrer inanição.

### 8
Como funciona o algoritmo do elevador?

Material: 19-discos-e-relogios#escalonamento-do-braco

#### Resposta
Move-se em um sentido atendendo todos os pedidos no caminho; quando não há mais naquele sentido, **inverte**. No exemplo, subindo: 12, 16, 34, 36, 9, 1 (60 cilindros). Evita inanição.

### 9
Quais as duas abordagens para substituir setores defeituosos?

Material: 19-discos-e-relogios#setores-defeituosos

#### Resposta
**Substituição**: o setor ruim é remapeado para um setor reserva. **Deslocamento**: os setores seguintes são empurrados uma posição até o reserva, preservando a sequência física. Pode ser feito pelo controlador ou pelo SO.

### 10
Do que é composto o hardware de um relógio e como funciona?

Material: 19-discos-e-relogios#relogio

#### Resposta
**Oscilador de cristal**, **contador** e **registrador de apoio**. Cada pulso do cristal decrementa o contador; ao zerar, há uma interrupção. No modo de disparo único ele espera novo comando; no modo de onda quadrada, o contador é recarregado pelo registrador e gera interrupções periódicas (*ticks*).
