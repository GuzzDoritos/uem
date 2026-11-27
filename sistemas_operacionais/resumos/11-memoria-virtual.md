---
aula: 11
titulo: Memória virtual e paginação
fonte: "../slides/11 - Memória virtual.pdf"
topicos: [memória virtual, endereço virtual e físico, MMU, paginação, página, moldura, page fault, tabela de páginas, multinível, bits da entrada, TLB, tempo efetivo de acesso, tabela invertida, fragmentação interna]
prerequisitos: [10]
---

# Aula 11: Memória virtual

> Texto sem marcação vem dos slides. **[+]** indica complemento.

## Resumo em uma frase
Memória virtual permite processos maiores que a RAM mantendo só as partes ativas na memória; a MMU traduz endereços por tabelas de páginas, aceleradas pela TLB.

## Ideia
- Antes, o **programador** dividia programas grandes em módulos (**[+]** *overlays*) trocados com o disco. Com memória virtual, a divisão é do **SO**.
- O SO mantém partes ativas na RAM e o resto na memória secundária, carregando sob necessidade.
- Com multiprogramação, pedaços de vários processos ficam na RAM. Quem espera um pedaço vindo do disco está **bloqueado por E/S**.

## Endereçamento
- Sem memória virtual: o endereço do programa vai direto ao barramento (é físico).
- Com memória virtual: o programa usa **endereços virtuais** (espaço de endereçamento virtual); a **MMU** os converte em físicos. Ex.: em `MOV R, 1000`, o 1000 é virtual.

## Paginação
- Espaço virtual dividido em **páginas**; memória física em **molduras** (*page frames*) do mesmo tamanho. Transferências RAM ↔ disco são sempre em páginas.
- Página ausente → a MMU gera interrupção de **falta de página** (*page fault*); o SO escolhe uma vítima, substitui e atualiza a tabela. Ver [aula 12](12-substituicao-de-paginas.md).

### Tradução
```
endereço virtual (16 bits)
┌────────────┬──────────────────────┐
│ página (4) │ deslocamento (12)    │
└─────┬──────┴──────────┬───────────┘
      ▼ índice          │ copiado
 tabela de páginas      │
      ▼                 ▼
┌────────────┬──────────────────────┐
│ moldura    │ deslocamento (12)    │  endereço físico
└────────────┴──────────────────────┘
```
- Bits **mais significativos**: número da página (índice na tabela). Bits **menos significativos**: deslocamento.
- 4 bits → 16 páginas; 12 bits → páginas de 4 KB.

> **[+] Fórmulas**: `p = endereço div tamanho_página`; `d = endereço mod tamanho_página`; `físico = moldura × tamanho_página + d`.
> Ex.: endereço 8196 com páginas de 4096 → p = 2, d = 4. Se a página 2 está na moldura 6 → físico = 6 × 4096 + 4 = **24580**.

> **[+] Passos de um page fault**: trap → SO salva o estado → verifica se o acesso é válido (senão encerra o processo) → obtém moldura livre ou escolhe vítima (grava se M = 1) → lê a página do disco (processo bloqueado) → atualiza a tabela → **reexecuta** a instrução.

## Tabela de páginas
- Uma por processo. Duas preocupações: pode ser **enorme** (32 bits com páginas de 4 KB → ~1 milhão de entradas) e o mapeamento precisa ser **rápido** (ocorre em todo acesso).

| Implementação | Troca de contexto | Tradução |
|---|---|---|
| Vetor de registradores no hardware | Cara (recarrega a tabela inteira) | Sem acesso à memória |
| Tabela em RAM + registrador de base | Barata (troca um registrador) | 1 ou mais acessos extras por referência |

### Multinível
- N níveis → endereço com **N + 1 campos** (N índices + deslocamento).
- Campo de M bits → tabelas com 2^M entradas.
- Exemplo: 32 bits, N = 2, M = 10 → `10 | 10 | 12` (12 bits de deslocamento).
- Só precisam ficar na memória as tabelas no **caminho** de páginas realmente usadas.
- Além de 3 níveis a complexidade em geral não compensa.

> ⚠️ O slide diz que o nível i tem M^(i−1) tabelas; o correto é **até (2^M)^(i−1) = 2^(M(i−1))** tabelas. No exemplo: 1 tabela no nível 1 e até 1024 no nível 2.

> **[+]** Exemplo: processo com 4 MB de código, 4 MB de dados e 4 MB de pilha (regiões separadas) usa 1 tabela raiz + 3 de segundo nível = 4 × 4 KB = 16 KB, contra 4 MB da tabela de um nível. Hoje x86-64 usa 4 ou 5 níveis.

### Entrada da tabela (formato dependente da máquina)
| Campo | Função |
|---|---|
| **Número da moldura** | Bits altos do endereço físico; é o objetivo do mapeamento |
| **Presente/ausente** | 1 presente; acesso com 0 gera page fault |
| **Proteção** | 1 bit (leitura ou leitura/escrita) ou 3 bits (R, W, X) |
| **Referenciada (R)** | Marcada em qualquer acesso; usada na substituição |
| **Modificada (M)** | Marcada na escrita; se 1, a página precisa ser gravada ao sair (**[+]** *dirty bit*) |
| **Cache desabilitada** | Garante leitura do dispositivo, não de cópia velha (E/S mapeada em memória) |

## TLB (*Translation Lookaside Buffer*)
- Custo sem TLB: sem tabela, 1 acesso; 1 nível, 2 acessos (desempenho −50%); 2 níveis, 3 acessos (−⅔).
- Como quase todas as referências vão a **poucas páginas** (localidade), usa-se um cache de traduções: a **TLB** ou **memória associativa**, com poucas entradas, geralmente na MMU, pesquisada **em paralelo**.
- Entrada: número da página virtual, bit M, proteção, moldura, bit de validade.

| Situação | Resultado |
|---|---|
| Encontrada e acesso permitido (**hit**) | Moldura vem da TLB |
| Encontrada, mas acesso viola proteção | *Protection fault* |
| Não encontrada (**miss**) | Consulta a tabela e substitui uma entrada da TLB |

| Gerência | No miss | Observação |
|---|---|---|
| Hardware | A MMU resolve | MMU mais complexa |
| Software | Interrupção, o SO resolve | Aceitável se a taxa de miss é baixa; simplifica a MMU e libera área do chip |

### Desempenho
Memória 100 ns, TLB 20 ns, acerto de 90%. **Resposta dos slides**: `0,9 × 20 + 0,1 × 100 = 28 ns`.

> ⚠️ **Atenção:** os 28 ns representam só o **custo médio da tradução** no modelo "hit custa a TLB, miss custa um acesso à memória". Não incluem o acesso ao dado (somando-o: 128 ns). No modelo mais comum (Silberschatz), com 1 nível: hit = 20 + 100 = 120; miss = 20 + 100 + 100 = 220; **média = 130 ns**. Em prova do professor, conferir qual modelo ele usa.

> **[+]** Forma geral: `TEA = h·(t_tlb + m) + (1−h)·(t_tlb + (n+1)·m)`, com n níveis. Na troca de contexto a TLB precisa ser invalidada, salvo se as entradas tiverem identificador de processo (ASID/PCID).

## Tabela de páginas invertida
- Problema de tamanho:
  - 32 bits, páginas de 4 KB: 2³²/2¹² = 1.048.576 entradas × 4 B = **4 MB** por processo.
  - 64 bits: 2⁵² ≈ 4,5×10¹⁵ páginas × 8 B ≈ 32.768 TB (os slides dizem "mais de 32.740 TB", cerca de 33 mil discos de 1 TB).
- **Invertida**: **uma entrada por moldura**, informando (processo, página). 1 GB de RAM com 4 KB → 262.144 entradas.
- ❌ Não dá para indexar pela página p: é preciso **procurar** o par (n, p), e isso a cada referência.
- ✅ A **TLB** guarda as mais usadas; no miss, a busca é feita por software, com **hash** do endereço virtual.

> **[+]** Dificulta o compartilhamento de páginas. Usada em PowerPC e IA-64.

## Fragmentação
- Paginação **elimina a fragmentação externa**, mas gera **interna** (última página do processo, em média meia página).

## Pontos de atenção para prova
- Decompor endereço em página e deslocamento; calcular tamanho de tabela.
- Calcular tempo efetivo de acesso.
- Diferenciar TLB miss (tradução ausente no cache) de page fault (página fora da RAM).

## [+] Perguntas de revisão
1. 32 bits, páginas de 8 KB: bits de deslocamento e entradas? *13 bits; 2¹⁹ = 524.288.*
2. Por que o tamanho da página é potência de 2? *Para separar página e deslocamento só dividindo bits.*
3. TLB miss implica page fault? *Não.*

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, 2ª ed. (cap. 4) e 3ª ed. (cap. 3).
