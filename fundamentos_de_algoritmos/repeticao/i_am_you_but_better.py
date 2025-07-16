def formatar_sobrenome_nome(nome: str) -> str:
    '''
    Recebe como entrada um nome (podendo conter sobrenome) e então separa o nome e sobrenome (se houver), 
    inserindo no formato "sobrenome, nome" e retornando como str.
    Exemplos:
    >>> formatar_sobrenome_nome(nome = "jose da silva")
    'silva, jose da'
    >>> formatar_sobrenome_nome(nome = "miku hatsune")
    'hatsune, miku'
    >>> formatar_sobrenome_nome(nome = "sonic the hedgehog")
    'hedgehog, sonic the'
    '''

    sobrenome: str = ""
    primeiro_nome: str = ""
    finalizado = False

    for i in range(len(nome)):
        if finalizado == False:
            if nome[-i -1] == " ":
                sobrenome = nome[-i:]
                indice_limite = len(nome) - len(sobrenome)
                primeiro_nome = nome[:indice_limite - 1]
                finalizado = True

    return sobrenome + ", " + primeiro_nome