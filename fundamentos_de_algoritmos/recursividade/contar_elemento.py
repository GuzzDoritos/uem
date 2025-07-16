def contar_elemento(lista1: list, elemento) -> int:
    '''Retorna número de vezes que um determinado elemento aparece em uma *lista1*
    Exemplos:
    >>> contar_elemento([3, "oi", 6, 1, 3, 1.124], 3)
    2
    '''
    if len(lista1) == 0:
        return 0
    else:
        qtd: int = 0
        if elemento == lista1[0]:
            qtd = 1
        qtd = qtd + contar_elemento(lista1[1:], elemento)
    return qtd