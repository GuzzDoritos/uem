# Lista 6

> Fonte: `../listas/lista 6.pdf`. As respostas são **sugestões**, não são gabarito do professor. `★` = recomendada para a prova (critério sugerido, não do professor).

### 1
Quais são os três requisitos para armazenamento de longo prazo?

Material: 16-sistemas-de-arquivos#motivacao

#### Resposta
Armazenar **grandes volumes** de informação; a informação **persistir** após o fim do processo; permitir **acesso concorrente** por vários processos.

### 2
O que é um arquivo?

Material: 16-sistemas-de-arquivos#arquivos

#### Resposta
Um **mecanismo de abstração** para armazenar e recuperar informações em dispositivos de armazenamento, identificado por nome, que esconde do usuário onde e como os dados estão guardados.

### 3
Cite e explique três maneiras de estruturar arquivos. Qual é a mais comum?

Material: 16-sistemas-de-arquivos#estrutura

#### Resposta
- **Sequência de bytes**: o SO não interpreta o conteúdo. É a **mais comum**.
- **Registros de tamanho fixo**: leituras e escritas por registro.
- **Árvore de registros**: cada registro tem uma chave, usada no acesso.

### 4
Cite e explique três tipos de arquivo suportados pelo SO.

Material: 16-sistemas-de-arquivos#tipos-unix

#### Resposta
**Regulares** (dados do usuário, ASCII ou binários), **diretórios** (mantêm a estrutura do sistema de arquivos) e **especiais de caracteres ou de bloco** (modelam dispositivos de E/S, como impressoras e discos).

### 5
O que são diretórios?

Material: 16-sistemas-de-arquivos#diretorios

#### Resposta
Estruturas (em geral também arquivos) usadas para **organizar** os arquivos. Suas entradas mapeiam nomes para as informações necessárias para localizar os dados, e podem conter outros diretórios.

### 6
Como funciona um sistema de diretórios hierárquico? Cite exemplos.

Material: 16-sistemas-de-arquivos#diretorios

#### Resposta
É uma **árvore** a partir de um diretório raiz; cada diretório contém arquivos e outros diretórios, e cada usuário cria os que quiser. Ex.: Unix, com raiz `/` (como `/home/ana/notas.txt`); Windows, com uma raiz por unidade (`C:\Users\ana`).

### 7
Qual a diferença entre caminho relativo e absoluto? Exemplifique.

Material: 16-sistemas-de-arquivos#caminhos

#### Resposta
O **absoluto** parte da raiz e vale em qualquer lugar: `/home/nilton/arq.txt`. O **relativo** parte do diretório de trabalho atual: estando em `/home/nilton`, `txts/arq.txt` se refere a `/home/nilton/txts/arq.txt`. `.` é o atual e `..` o pai.

### 8
Qual o layout de um sistema de arquivos dentro de uma partição do disco?

Material: 16-sistemas-de-arquivos#layout-do-disco

#### Resposta
Em geral: **bloco de boot**, **superbloco** (parâmetros do sistema de arquivos), **gerenciamento de espaço livre**, **i-nodes**, **diretório raiz** e **arquivos e diretórios**. Apenas o bloco de boot é comum a todos; o resto varia com o sistema de arquivos.

### 9 ★
Explique alocação contígua, lista encadeada, lista com tabela em memória e i-nodes, com vantagens e desvantagens.

Por que cai: é a questão principal de sistemas de arquivos.

Material: 16-sistemas-de-arquivos#alocacao-de-arquivos; 16-sistemas-de-arquivos#comparacao

#### Resposta
| Método | Como funciona | Vantagens | Desvantagens |
|---|---|---|---|
| **Contígua** | Blocos consecutivos; guarda início e tamanho | Simples; leitura muito rápida | Fragmentação externa; compactação; difícil crescer |
| **Lista encadeada** | Cada bloco aponta o próximo | Sem fragmentação externa | Acesso aleatório lento; ponteiro ocupa espaço do bloco |
| **Tabela em memória (FAT)** | Os ponteiros ficam em uma tabela na RAM | Bloco inteiro para dados; acesso aleatório sem ler o disco | Tabela inteira na memória, proporcional ao disco |
| **I-node** | Estrutura por arquivo com atributos e endereços dos blocos | Só ocupa memória com o arquivo aberto; acesso direto | Limite de endereços, exigindo blocos indiretos |
