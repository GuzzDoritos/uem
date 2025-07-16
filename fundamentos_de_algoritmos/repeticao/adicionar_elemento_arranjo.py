def adicionar_elemento(arranjo: list, posicao: int, numero: int) -> list:
    '''
    Recebe um arranjo, uma posição e um número. A partir da posição, define
    qual elemento terá um número adicionado antes dele. Com isso, o número
    é inserido, e todos os elementos após ele são movidos um índice.
    Exemplos:
    >>> adicionar_elemento([3, 4, 5, 7, 8], 3, 6)
    [3, 4, 5, 6, 7, 8]
    >>> adicionar_elemento([5, 4, 8, 1, 7, 9], 4, 2)
    [5, 4, 8, 1, 2, 7, 9]'''

    novo_arranjo: list = []

    for i in range(0, posicao):
        novo_arranjo.append(arranjo[i])
    
    novo_arranjo.append(numero)

    for i in range(posicao, len(arranjo)):
        novo_arranjo.append(arranjo[i])
        
    
    return novo_arranjo