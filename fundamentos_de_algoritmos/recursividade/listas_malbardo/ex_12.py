def verificar_binaria(lista: list[int]) -> bool:
    if lista == [] or lista[0] < 0 or lista[0] > 1:
        return False
    elif len(lista) == 1 and (lista[0] == 0 or lista[0] == 1):
        return True
    else:
        return verificar_binaria(lista[1:])
    
print(verificar_binaria([1, 0, 0, 1, 1]))
print(verificar_binaria([1, 0, 2, 1, 3]))
print(verificar_binaria([]))
print(verificar_binaria([2, 4, 5, 1, 123, 4]))
print(verificar_binaria([0, 1, 0, 0, 1, 1, 0, 1]))