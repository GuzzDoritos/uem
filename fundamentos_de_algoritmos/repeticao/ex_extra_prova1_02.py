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

    sobrenome_invertido: str = ""
    conseguiu_sobrenome_invertido = False

    nome_invertido: str = ""

    for i in range(len(nome)):
        if conseguiu_sobrenome_invertido == False:
            if nome[-i - 1] == " ":
                conseguiu_sobrenome_invertido = True
            else:
                sobrenome_invertido = sobrenome_invertido + nome[-i - 1]
        else:
            nome_invertido = nome_invertido + nome[-i -1]
        
    
    sobrenome = inverter_str(sobrenome_invertido)
    primeiro_nome = inverter_str(nome_invertido)

    return sobrenome + ", " + primeiro_nome



def inverter_str(string: str) -> str:
    '''Recebe uma string como entrada, e então inverte os caracteres, retornando a string invertida.
    Exemplos:
    >>> inverter_str(string = "atenaçam")
    'maçaneta'
    '''

    string_invertida: str = ""

    for i in range(len(string)):
        string_invertida = string_invertida + string[-i - 1]

    return string_invertida