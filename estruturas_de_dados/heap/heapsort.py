def descer_inplace(lista: list[int], tam: int, i: int) -> None:
    '''Move o elemento na posição `i` para baixo na árvore do heap,
    trocando-o com o filho de maior valor enquanto a propriedade do
    heap máximo for violada.
    '''
    while True:
        esq = 2 * i + 1
        dir_ = 2 * i + 2
        maior = i
        if esq < tam and lista[esq] > lista[maior]:
            maior = esq
        if dir_ < tam and lista[dir_] > lista[maior]:
            maior = dir_

        if maior == i:
            break
        
        lista[i], lista[maior] = lista[maior], lista[i]

        i = maior

def heapsort(lista: list[int]) -> None:
    for i in range((len(lista) - 1) // 2, -1, -1):
        descer_inplace(lista, len(lista), i)

    for fim in range(len(lista) - 1, -1, -1):
        lista[0], lista[fim] = lista[fim], lista[0]
        descer_inplace(lista, fim, 0)

lista = [14, 6, 19, 4, 1, 20]

heapsort(lista)

print(lista)