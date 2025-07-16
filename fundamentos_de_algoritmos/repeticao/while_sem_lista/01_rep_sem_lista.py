def verificar_triangular(n: int) -> bool:
    '''
    Confere se um determinado número inteiro *n* é triangular ou não.
    Retorna False se não for, e True se for.
    Exemplos:
    >>> verificar_triangular(120)
    True
    >>> verificar_triangular(6)
    True
    >>> verificar_triangular(9)
    False
    >>> verificar_triangular(16974336)
    True
    >>> verificar_triangular(4471)
    False'''

    res: bool = False
    i: int = 1
    while not res and i <= n:
        if (n % i) == 0: 
            consec: int = i * (i + 1) * (i + 2)
            if consec == n:
                res = True
        i = i + 1

    return res