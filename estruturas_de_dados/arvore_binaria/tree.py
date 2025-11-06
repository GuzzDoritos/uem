from __future__ import annotations
from dataclasses import dataclass

@dataclass
class No:
    chave: int
    esq: No | None = None
    dir: No | None = None
#                           [ a ]  [ b ]  [ c ]  [ d ]  [ e ]  [ f ]  [ g ]  [ h ]
[a, b, c, d, e, f, g, h] = [No(8), No(9), No(6), No(5), No(3), No(1), No(7), No(2)]

###########->  +------le tree------+  +------le nums------+
a.esq = b #->  |         a         |  |         8         |
a.dir = c #->  |      /     \      |  |      /     \      |
c.dir = f #->  |     b       c     |  |     9       6     | 
b.esq = d #->  |   /   \      \    |==|   /   \      \    |
b.dir = e #->  |  d     e      f   |  |  5     3      1   | 
e.esq = g #->  |       / \         |  |       / \         |
e.dir = h #->  |      g   h        |  |      7   2        |  
###########->  +-------------------+  +-------------------+

def em_ordem(raiz: No) -> str:
    if raiz is None:
        return ""
    else:
        return f"({em_ordem(raiz.esq)}{str(raiz.chave)}{em_ordem(raiz.dir)})"
    
def num_folhas(no: No) -> int:
    if no is None:
        return 0
    if no.dir is None and no.esq is None:
        return 1
    return num_folhas(no.dir) + num_folhas(no.esq)

def altura(no: No) -> int:
    if no is None:
        return -1
    return 1 + max(altura(no.esq), altura(no.dir))

def nos_nivel(no: No, nivel: int) -> list[int]:
    if no is None:
        return[]
    if nivel == 0:
        return [no.chave]
    return nos_nivel(no.esq, nivel - 1) + nos_nivel(no.dir, nivel - 1)

def insere(no: No, chave: int) -> No:
    if no is None:
        return No(chave)
    if no.chave < chave:
        no.direita = insere(no.direita, chave)
    if no.chave > chave:
        no.esquerda = insere(no.esquerda, chave)
    else:
        pass
    return

print(num_folhas(a))
print(nos_nivel(a, 3))