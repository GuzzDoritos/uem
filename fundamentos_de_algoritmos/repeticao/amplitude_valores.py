def amplitude_valores(valores: list[int]) -> int:
    '''
    Calcula a amplitude de uma lista não vazia de números, ou seja, a diferença entre o menor 
    e maior valor da lista.
    Exemplo:
    >>> amplitude_valores([23, 12, 15, 36, 21, 41])
    29
    '''

    valor_min: int = valores[0]
    valor_max: int = valores[0]

    for i in (1, len(valores) - 1):
        if valores[i] < valor_min:
            valor_min = valores[i]
        elif valores[i] > valor_max:
            valor_max = valores[i]

    return valor_max - valor_min