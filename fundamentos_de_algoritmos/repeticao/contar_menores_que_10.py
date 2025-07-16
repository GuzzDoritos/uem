def contar_menores_que_10(numeros: list[int]) -> int:
    '''
    Conta quantos números inteiros de uma lista são menores que 10.
    Exemplo:
    >>> contar_menores_que_10([2, 23, 5, 9, 10, 4])
    4
    >>> contar_menores_que_10([12, 23, 42, 21, 63, 125, 1263])
    0
    '''
    contagem: int = 0
    for numero in numeros:
        if numero < 10:
            contagem = contagem + 1
    
    return contagem