---
aula: 19
titulo: "Complemento: discos e relógio"
topicos: [disco rígido, trilha, setor, cilindro, RAID, torção cilíndrica, tempo de busca, latência rotacional, FCFS, SSF, elevador, setores defeituosos, relógio]
prerequisitos: [17, 18]
---

# Complemento: discos e relógio

> ⚠️ **Esta página inteira é complemento.** Não há slide sobre este assunto na pasta; o texto foi escrito com base em conhecimento geral (Tanenbaum, cap. de E/S) para apoiar a Lista 8. Confira com o material do professor.

## Organização do disco rígido
- **Pratos** que giram juntos; cada **superfície** tem uma cabeça de leitura e escrita, todas presas ao mesmo **braço**.
- **Trilha**: círculo concêntrico em uma superfície. **Setor**: fatia da trilha, unidade mínima de acesso (512 B ou 4 KB). **Cilindro**: conjunto das trilhas de mesmo raio em todas as superfícies.
- Cada setor tem preâmbulo, dados e ECC.
- Discos modernos usam **gravação por zonas** (trilhas externas têm mais setores) e expõem endereços lógicos de bloco (**LBA**).

## RAID
**Redundant Array of Independent (ou Inexpensive) Disks**: vários discos vistos pelo SO como um só, para ganhar **desempenho** (acesso paralelo) e **confiabilidade** (redundância).

| Nível | Organização | Capacidade útil (N discos) | Tolera falha | Característica |
|---|---|---|---|---|
| 0 | Faixas (*striping*) entre os discos | N | Nenhuma | Máximo desempenho; menos confiável que um disco |
| 1 | Espelhamento | N/2 | 1 por par | Leitura rápida; escrita em dois discos |
| 4 | Faixas + **um disco só de paridade** | N − 1 | 1 | Disco de paridade vira gargalo nas escritas |
| 5 | Faixas + **paridade distribuída** | N − 1 | 1 | Elimina o gargalo; reconstrução trabalhosa |

- Paridade = XOR das faixas de uma linha. Um disco perdido é recuperado pelo XOR dos demais.
- Escrita pequena em RAID 4 ou 5: ler dado antigo e paridade antiga, escrever dado novo e paridade nova (4 acessos).

## Torção cilíndrica (*cylinder skew*)
- O setor 0 de cada trilha é **deslocado** em relação ao da trilha vizinha.
- Objetivo: após ler uma trilha e mover o braço para a próxima, o setor seguinte ainda não ter passado sob a cabeça, permitindo leitura contínua sem esperar uma volta inteira.
- Torção ≈ tempo de busca entre trilhas ÷ tempo de um setor. Ex.: 10.000 rpm (6 ms por volta), 300 setores (20 µs cada) e busca de 800 µs → **40 setores**.

## Tempo de acesso
| Componente | O que é |
|---|---|
| **Busca (*seek*)** | Mover o braço até o cilindro. Normalmente o **maior** |
| **Latência rotacional** | Esperar o setor passar sob a cabeça (em média meia volta) |
| **Transferência** | Ler ou escrever os bits |

Para reduzir: escalonar o braço, guardar em cache a trilha lida, colocar blocos de um arquivo próximos.

## Escalonamento do braço
Exemplo: cabeça no cilindro **11**; pedidos, na ordem de chegada: 1, 36, 16, 34, 9, 12.

| Algoritmo | Regra | Ordem atendida | Cilindros percorridos |
|---|---|---|---|
| **FCFS** | Ordem de chegada | 1, 36, 16, 34, 9, 12 | 10+35+20+18+25+3 = **111** |
| **SSF** (busca mais curta) | O pedido mais próximo | 12, 9, 16, 1, 34, 36 | 1+3+7+15+33+2 = **61** |
| **Elevador** (subindo) | Segue num sentido até acabar, depois inverte | 12, 16, 34, 36, 9, 1 | 1+4+18+2+27+8 = **60** |

- **FCFS**: simples e justo, mas move muito o braço.
- **SSF**: reduz o movimento, mas pedidos distantes (nas bordas) podem sofrer **inanição**.
- **Elevador (SCAN)**: um bit guarda o sentido; o movimento total é limitado a duas vezes o número de cilindros. Variante **C-SCAN** atende sempre no mesmo sentido, uniformizando a espera.

## Setores defeituosos
Há sempre setores reservas. Duas abordagens:
1. **Substituição**: o setor ruim é remapeado para um reserva. Rápido de fazer, mas quebra a sequência física.
2. **Deslocamento**: todos os setores entre o ruim e o reserva são empurrados uma posição, mantendo a ordem. Exige mais cópias.

O remapeamento pode ser feito pelo **controlador** (transparente) ou pelo **SO**.

## Relógio
- **Hardware**: um **oscilador de cristal**, um **contador** e um **registrador de apoio** (carga).
- O cristal gera pulsos de frequência precisa; a cada pulso o contador é decrementado; ao chegar a zero gera uma **interrupção**.
- **Modo disparo único**: para após zerar, até o software recarregar. **Modo onda quadrada**: o registrador recarrega o contador automaticamente, gerando interrupções periódicas (**ticks**).
- Usos pelo software: hora do dia, fim do quantum, contabilização de CPU, alarmes, temporizadores de vigilância.

## Referências
- Tanenbaum, A. S. *Sistemas Operacionais Modernos*, cap. 5.
