from filo_stack import Pilha

# 1) Crie uma função que inverte a ordem dos elementos da 
# pilha, por exemplo, para a pilha [1, 2, 3] <- topo, a 
# função deverá devolver [3, 2, 1] <- topo.

def inverte_pilha(pilha: Pilha) -> None:
    '''
    Inverte a ordem dos elementos da *pilha*
    Exemplos:
    >>> pilha1 = Pilha(3)
    >>> pilha1.empilha(1)
    >>> pilha1.empilha(2)
    >>> pilha1.empilha(3)
    >>> print(pilha1)
    [1, 2, 3] <- topo
    >>> inverte_pilha(pilha1)
    >>> print(pilha1)
    [3, 2, 1] <- topo
    '''
    pilha_aux1 = Pilha(len(pilha))
    pilha_aux2 = Pilha(len(pilha))

    while not pilha.vazia():
        pilha_aux1.empilha(pilha.topo())
        pilha.desempilha()

    while not pilha_aux1.vazia():
        pilha_aux2.empilha(pilha_aux1.topo())
        pilha_aux1.desempilha()
    
    while not pilha_aux2.vazia():
        pilha.empilha(pilha_aux2.topo())
        pilha_aux2.desempilha()
    

# 2) Projete uma função que devolve uma cópia de uma pilha. 

def copia_pilha(pilha: Pilha) -> Pilha:
    '''
    Copia uma *pilha* para outra pilha, devolvendo-a.
    Exemplo:
    >>> pilha1 = Pilha(3)
    >>> pilha1.empilha(1)
    >>> pilha1.empilha(2)
    >>> pilha1.empilha(3)
    >>> pilha2 = copia_pilha(pilha1)
    >>> print(pilha1)
    [1, 2, 3] <- topo
    >>> print(pilha2)
    [1, 2, 3] <- topo
    '''
    pilha_aux1 = Pilha(len(pilha))
    pilha_aux2 = Pilha(len(pilha))

    while not pilha.vazia():
        pilha_aux1.empilha(pilha.topo())
        pilha.desempilha()

    while not pilha_aux1.vazia():
        pilha.empilha(pilha_aux1.topo())
        pilha_aux2.empilha(pilha_aux1.topo())
        pilha_aux1.desempilha()

    return pilha_aux2

# 2) Crie uma função que recebe uma pilha de números inteiros
# e ordena os elementos em pilha em ordem crescente. 
# Restrição: usar apenas uma pilha como auxiliar. 
# def ordena(pilha: Pilha) -> None:

def ordena(pilha: Pilha) -> None:
    '''Ordena uma pilha, em ordem crescente.
    Exemplos:
    >>> pilha1 = Pilha(3)
    >>> pilha1.empilha(2)
    >>> pilha1.empilha(1)
    >>> pilha1.empilha(3)
    >>> print(pilha1)
    [2, 1, 3] <- topo
    >>> ordena(pilha1)
    >>> print(pilha1)
    [1, 2, 3] <- topo
    >>> pilha2 = Pilha(5)
    >>> pilha2.empilha(5)
    >>> pilha2.empilha(1)
    >>> pilha2.empilha(3)
    >>> pilha2.empilha(4)
    >>> pilha2.empilha(2)
    >>> print(pilha2)
    [5, 1, 3, 4, 2] <- topo
    >>> ordena(pilha2)
    >>> print(pilha2)
    [1, 2, 3, 4, 5] <- topo
    >>> pilha3 = Pilha(10)
    >>> lista = [6, 1, 2, 9, 8, 0, 3, 5, 4, 7]
    >>> for i in lista:
    ...     pilha3.empilha(i)
    >>> print(pilha3)
    [6, 1, 2, 9, 8, 0, 3, 5, 4, 7] <- topo
    >>> ordena(pilha3)
    >>> print(pilha3)
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] <- topo
    '''
    p_auxiliar = Pilha(len(pilha))

    temp = pilha.topo()
    pilha.desempilha()

    while not pilha.vazia():
        if pilha.topo() > temp:
            p_auxiliar.empilha(pilha.topo())
            pilha.desempilha()
        else:
            p_auxiliar.empilha(temp)
            temp = pilha.topo()
            pilha.desempilha()

    pilha.empilha(temp)
    temp = p_auxiliar.topo()
    p_auxiliar.desempilha()

    while not p_auxiliar.vazia():
        if p_auxiliar.topo() > temp:
            pilha.empilha(temp)
            temp = p_auxiliar.topo()
            p_auxiliar.desempilha()
        else:
            pilha.empilha(p_auxiliar.topo())
            p_auxiliar.desempilha()
    pilha.empilha(temp)







# 3) Implemente uma estrutura de dados chamada PilhaComMaximo,
# que simula o comportamento de uma pilha tradicional
# (LIFO), mas com uma operação adicional: obter o valor 
# máximo atual da pilha em tempo constante O(1).
# Dica: Use uma pilha auxiliar para guardar o máximo.
# Exemplo:
# pilha = PilhaComMaximo()
# pilha.empilhar(3)
# pilha.empilhar(5)
# pilha.empilhar(2)
# print(pilha.maximo())  # Saída: 5
# pilha.desempilhar()
# print(pilha.maximo())  # Saída: 5
# pilha.desempilhar()
# print(pilha.maximo())  # Saída: 3