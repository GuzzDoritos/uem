def somador_numeros(numeros: list[int]) -> int:
    '''
    Soma todos os elementos de uma lista de números inteiros.
    Exemplos:
    >>> somador_numeros([2, 5, 1, 7])
    15
    '''

    soma: int = 0
    for num in numeros:
        soma = soma + num

    return soma

def maior_numero(numeros: list[int]) -> int:
    '''
    Itera uma lista de números inteiros, e informa o maior deles.
    Exemplos:
    >>> maior_numero([4, 2, 6, 7, 1])
    7
    '''
    
    max: int = 0
    for num in numeros:
        if num > max:
            max = num
    
    return max
