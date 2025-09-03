from arranjo import Array
from math import inf


def mergesort(arranjo: Array, inicio: int, fim: int) -> None:
    if inicio < fim:
        meio = (inicio + fim) // 2
        mergesort(arranjo, inicio, meio)
        mergesort(arranjo, meio + 1, fim)
        merge(arranjo, inicio, meio, fim)

def merge(arranjo: Array, inicio: int, meio: int, fim: int) -> None:
    esq = Array(meio - inicio + 1 + 1, inf)
    for i in range(inicio, meio + 1):
        esq[i - inicio] = arranjo[i]
    dir = Array(fim - meio + 1, inf)
    for i in range(meio + 1, fim + 1):
        dir[i - (meio + 1)] = arranjo[i]

    p = 0
    q = 0

    for i in range(inicio, fim + 1):
        if esq[p] < dir[q]:
            arranjo[i] = esq[p]
            p += 1
        else:
            arranjo[i] = dir[q]
            q += 1

arranjo = Array(8)
arranjo[0] = 7
arranjo[1] = 3
arranjo[2] = 8
arranjo[3] = 5
arranjo[4] = 9
arranjo[5] = 2
arranjo[6] = 1
arranjo[7] = 6

mergesort(arranjo, 0, len(arranjo) - 1)

print(arranjo)