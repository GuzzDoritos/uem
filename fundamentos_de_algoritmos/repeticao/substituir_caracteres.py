def substituir_caracteres(lista_caracteres: list, caracter1, caracter2) -> list:
    '''
    Recebe uma lista de caracteres, um caracter desejado da lista e um outro caracter a substituir o primeiro.
    Retorna a lista com o caracter original substituído pelo novo.
    Exemplos:
    >>> substituir_caracteres(['a', 'b', 'c', 'a', 'c', 'a'], 'a', 'z')
    ['z', 'b', 'c', 'z', 'c', 'z']
    '''

    for i in range (0, len(lista_caracteres)):
        if lista_caracteres[i] == caracter1:
            lista_caracteres[i] = caracter2
    
    return lista_caracteres