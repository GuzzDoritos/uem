def split_string(string: str) -> list:
    '''
    Recebe uma string *str* e separa cada palavra pelos espaços em brancos, devolvendo uma lista
    com cada palavra isolada.
    Exemplos:
    >>> str_01: str = "konnichiwa minna san"
    >>> str_02: str = "jojo bizarre adventure"
    >>> str_03: str = "kirby and the forgotten land"
    
    >>> split_string(str_01)
    ['konnichiwa', 'minna', 'san']
    >>> split_string(str_02)
    ['jojo', 'bizarre', 'adventure']
    >>> split_string(str_03)
    ['kirby', 'and', 'the', 'forgotten', 'land']'''
    
    split_str: list = []

    i: int = 0
    temp_str: str = ""

    while i < len(string):
        if string[i] != " ":
            temp_str = temp_str + string[i]
        
        if string[i] == " " or i == len(string) - 1:
            split_str.append(temp_str)
            temp_str = ""
        
        i = i + 1

    return split_str