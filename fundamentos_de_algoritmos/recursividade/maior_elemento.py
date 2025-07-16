def maior_elemento(lista1: list[int]) -> int:
    '''Encontra o maior elemento em *lista1*
    Exemplos:
    >>> maior_elemento([3,8,5,2])
    8
    >>> maior_elemento([1,2,3])
    3
    '''

    if len(lista1) == 1:
        return lista1[0]
    else:
        maior:int = maior_elemento(lista1[1:])
        if lista1[0] > maior:
            return lista1[0]
        else:
            return maior
