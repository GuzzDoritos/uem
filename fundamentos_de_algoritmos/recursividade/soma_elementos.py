def soma_elementos(lista1: list[int]) -> int:
    '''Soma os elementos de *lista1*
    Exemplos:
    >>> soma_elementos([1,7,3,4])
    15
    >>> soma_elementos([3,1])
    4
    '''

    if len(lista1) == 0:
        return 0
    else:
        return soma_elementos(lista1[1:]) + lista1[0]