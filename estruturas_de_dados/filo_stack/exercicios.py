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
    '''
    temp = 0
    pilha_aux = Pilha(len(pilha))

    while not pilha.vazia():
        temp = pilha.topo()
        pilha.desempilha()
        if pilha.topo() < temp:
            pilha_aux.empilha(temp)
        else:
            pilha_aux.empilha(pilha.topo())
    
    while not pilha_aux.vazia():
        pilha.empilha(pilha_aux.topo())
        pilha_aux.desempilha()




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