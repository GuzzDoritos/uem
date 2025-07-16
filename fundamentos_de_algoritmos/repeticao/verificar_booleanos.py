def verificar_booleanos(booleanos: list[bool]) -> bool:
    '''
    Verifica se todos os elementos de uma lista de booleano são falsos.
    Exemplo:
    >>> valores: list[bool] = [False, False, False, False]
    >>> verificar_booleanos(valores)
    True
    >>> valores: list[bool] = [False, True, False, False]
    >>> verificar_booleanos(valores)
    False
    '''

    resultado: bool = True
    for booleano in booleanos:
        if booleano:
            resultado = False

    return resultado