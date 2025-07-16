def contar_valor_minimo(numeros: list[int]) -> int:
    '''
    Conta quantos vezes o valor mínimo de uma lista de números inteiros aparece em uma lista não vazia.
    >>> contar_valor_minimo([2, 42, 6, 2, 7, 12, 2])
    3
    >>> contar_valor_minimo([23, 64, 35, 21, 19, 75])
    1
    '''

    valor_minimo: int = numeros[0]
    contagem: int = 1

    for i in range(1, len(numeros)):
        if numeros[i] < valor_minimo:
            valor_minimo = numeros[i]
            contagem = 1
        elif numeros[i] == valor_minimo:
            contagem = contagem + 1
    
    return contagem