---
aula: 16
titulo: Sistemas de arquivos
fonte: "../slides/16 - Sistemas de arquivo.pdf"
topicos: [arquivo, nomeação, extensão, estrutura de arquivo, tipos, acesso sequencial e aleatório, atributos, operações, diretórios, caminhos, MBR, partições, superbloco, alocação contígua, lista encadeada, FAT, i-node, implementação de diretórios]
prerequisitos: [2]
---

# Aula 16: Sistemas de arquivos

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
O sistema de arquivos oferece armazenamento persistente com nomes e diretórios e, internamente, decide como mapear arquivos em blocos de disco (contígua, encadeada, FAT ou i-node).

## Motivação
- O espaço de endereçamento de um processo é limitado e some quando ele termina.
- Requisitos do armazenamento de longo prazo: (1) grande volume; (2) persistir após o processo; (3) acesso concorrente por vários processos.
- Solução: **arquivos**, tratados pelo **sistema de arquivos** (nomes, organização, acesso, proteção).
- Duas visões: a do **usuário** (o que é um arquivo, nomes, proteção) e a do **projetista** (estruturas e algoritmos sobre o disco).

## Arquivos
- Abstração que isola o usuário de onde e como a informação está armazenada.
- **Nomeação**: caracteres e tamanho dependem do SO. Alguns são *case sensitive*. Nome geralmente em duas partes, `nome.extensão`; a extensão pode ter tamanho fixo ou livre.
  - **[+]** MS-DOS usava 8.3 e ignorava maiúsculas; no Unix a extensão é convenção.

### Estrutura
| Modelo | Descrição |
|---|---|
| **Sequência de bytes** | O SO não interpreta o conteúdo; **mais comum** (Unix, Windows) |
| **Registros de tamanho fixo** | Leitura e escrita por registro |
| **Árvore de registros** | Cada registro tem chave; acesso por chave (**[+]** mainframes) |

### Tipos (Unix)
- **Regulares**: dados do usuário.
- **Diretórios**: mantêm a estrutura.
- **Especiais de caracteres** e **de bloco**: modelam E/S e discos.

Regulares se dividem em **ASCII** (linhas de texto) e **binários** (estrutura conhecida pelo programa):
- **Executável**: cabeçalho (número mágico, tamanhos de texto, dados, dados não inicializados e tabela de símbolos, ponto de entrada, flags) + texto, dados, bits de realocação, tabela de símbolos.
- **Archive** (biblioteca): módulos objeto compilados e não ligados, cada um com cabeçalho (nome, data, proprietário, proteção, tamanho).

### Acesso
| Sequencial | Aleatório |
|---|---|
| Não salta posições | Lê fora de ordem, com **seek** |
| Conveniente para fitas | Usado em discos |

### Atributos (variam por sistema)
Proteção, senha, criador, proprietário, flag de oculto, tamanho atual, criação, último acesso, última modificação etc.

### Operações
`create`, `delete`, `open`, `close`, `read`, `write`, `append`, `seek`, `get attributes`, `set attributes`, `rename`.

> **[+]**
> ```c
> int in  = open("origem", O_RDONLY);
> int out = open("destino", O_WRONLY | O_CREAT | O_TRUNC, 0644);
> char buf[4096];
> ssize_t n;
> while ((n = read(in, buf, sizeof buf)) > 0) write(out, buf, n);
> close(in); close(out);
> ```
> (sem tratamento de erros)

## Diretórios
Em geral também são arquivos.

| Sistema | Organização |
|---|---|
| **Um nível** | Um único diretório para tudo |
| **Dois níveis** | Um diretório privado por usuário, sem subdivisão (pode haver compartilhamento) |
| **Hierárquico** | Árvore a partir da raiz; cada usuário cria os diretórios que quiser |

- Raiz: `/` no Unix; letras de unidade (`C:`, `D:`) no Windows.

### Caminhos
- **Absoluto**: desde a raiz, vale em qualquer diretório. `cp /home/nilton/arquivo.txt /home/nilton/txts`
- **Relativo**: a partir do diretório de trabalho. `cd /home/nilton` e `cp arq.txt txts/arq.txt`
- Entradas especiais: `.` (atual) e `..` (pai).

### Operações (Unix)
`create`, `delete`, `opendir`, `closedir`, `readdir`, `rename`, `link`, `unlink`.

> **[+]** **Link físico**: outra entrada apontando para o mesmo i-node (há contador de links). **Link simbólico**: arquivo que guarda um caminho e pode ficar quebrado.

## Implementação
Questões: como armazenar arquivos e diretórios, como gerir o espaço e como ter eficiência e confiabilidade.

### Layout do disco
- Disco → uma ou mais **partições**, cada uma com seu sistema de arquivos.
- **Setor 0: MBR**, com a **tabela de partições** (início e fim). O BIOS lê e executa o MBR, que localiza a partição **ativa**, lê seu **bloco de boot** e o executa; este carrega o SO.
- Toda partição tem bloco de boot, mesmo sem SO.

```
Disco:    | MBR | tabela | partição 1 | partição 2 | ... |
Partição: | Boot | Superbloco | Espaço livre | I-nodes | Raiz | Arquivos e diretórios |
```

| Área | Conteúdo |
|---|---|
| Superbloco | Parâmetros do sistema de arquivos, carregados em memória |
| Espaço livre | Quais blocos estão livres |
| I-nodes | Uma estrutura por arquivo, que diz tudo sobre ele |
| Diretório raiz | Topo da árvore |
| Demais | Arquivos e diretórios |

> **[+]** Espaço livre costuma ser controlado por **mapa de bits** ou **lista encadeada de blocos livres**. UEFI/GPT substituem BIOS/MBR em máquinas atuais.

## Alocação de arquivos
Exemplo das figuras: arquivo A nos blocos **4 → 7 → 2 → 10 → 12**; B nos blocos **6 → 3 → 11 → 14**.

### 1. Contígua
- Blocos consecutivos. Guarda só **início e número de blocos**.
- ✅ Simples; leitura do arquivo inteiro em uma operação sequencial (ótimo desempenho).
- ❌ **Fragmentação externa**; exige compactação. **[+]** Precisa saber o tamanho final; ideal para CD/DVD.

### 2. Lista encadeada
- Cada bloco: ponteiro para o próximo + dados.
- ✅ Sem fragmentação externa.
- ❌ **Acesso aleatório lento** (para chegar ao bloco n, lê n blocos antes); o ponteiro rouba espaço do bloco (**[+]** o dado deixa de ser potência de 2).

> ⚠️ O slide diz "o acesso não é sequencial". A leitura **sequencial** funciona; o problema é o **acesso aleatório**.

### 3. Lista encadeada com tabela em memória (FAT)
- Uma entrada por bloco do disco, contendo o próximo bloco (**-1** = fim). MS-DOS, Windows 95/98/ME.

| Bloco | 2 | 3 | 4 | 6 | 7 | 10 | 11 | 12 | 14 |
|---|---|---|---|---|---|---|---|---|---|
| Próximo | 10 | 11 | 7 | 3 | 2 | 12 | 14 | -1 | -1 |

- ✅ Sem fragmentação externa; bloco inteiro para dados; acesso aleatório segue a cadeia **sem ir ao disco**.
- ❌ Tabela **inteira na memória** o tempo todo.
- **[+]** Disco de 1 TB, blocos de 1 KB, entradas de 4 B: 2³⁰ entradas = **4 GB** de tabela. Há fragmentação **interna** no último bloco (vale para todos os métodos com blocos).

### 4. I-node
- Uma estrutura por arquivo com **atributos e endereços dos blocos**. Usado em Unix-like.
- ✅ Só ocupa memória quando o arquivo está **aberto**.
- Problema: arquivo com mais blocos que cabem no i-node → entradas que apontam para **blocos de endereços** (indiretos).

```
i-node: [atributos][bloco 0]...[bloco 7][ponteiro p/ bloco de ponteiros] ─▶ [mais endereços]
```

> **[+]** Estilo ext2: 12 diretos + indireto simples, duplo e triplo. Blocos de 4 KB e ponteiros de 4 B (1024 por bloco): máximo ≈ (12 + 1024 + 1024² + 1024³) × 4 KB ≈ **4 TB**. O i-node **não** guarda o nome do arquivo.

### Comparação
| Método | Fragmentação externa | Acesso aleatório | Memória |
|---|---|---|---|
| Contígua | Sim | Rápido | Mínima |
| Encadeada | Não | Lento | Mínima |
| FAT | Não | Bom | Proporcional ao **disco** |
| I-node | Não | Bom | Proporcional aos **arquivos abertos** |

## Implementação de diretórios
- Função: mapear **nome → informação para achar os dados**: número do i-node, primeiro bloco (listas) ou endereço inicial (contígua).
- Entradas com nome e atributos; ou, com i-nodes, nome + número do i-node (atributos ficam no i-node).
- **Nomes de tamanho variável**: cada entrada tem um ponteiro para o primeiro caractere do nome, guardado numa área (*heap*) no fim do diretório, junto dos atributos ou do número do i-node.

> **[+] Resolução de `/usr/ast/mbox`**: lê o i-node da raiz → bloco do diretório raiz → acha `usr` → i-node de usr → seu bloco → acha `ast` → i-node → bloco → acha `mbox` → i-node do arquivo.

> **[+] Fora dos slides, mas comum na disciplina**: tamanho de bloco (desempenho × desperdício), *cache* de blocos, **journaling** (ext4, NTFS), verificação de consistência (`fsck`), permissões Unix `rwx`.

## Pontos de atenção para prova
- Vantagens e desvantagens dos 4 métodos.
- Calcular tamanho de FAT e tamanho máximo de arquivo com i-node.
- Contar acessos a disco na resolução de um caminho.

## [+] Perguntas de revisão
1. Para ler o 5º bloco de um arquivo (i-node já em memória, ponteiro direto), quantos acessos? *1. Na lista encadeada em disco: 5.*
2. Por que a FAT escala mal? *Cresce com o tamanho do disco, mesmo sem arquivos abertos.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 6) e 3ª ed. (cap. 4).
- Material baseado também no do prof. Rodolfo Miranda Pereira.
