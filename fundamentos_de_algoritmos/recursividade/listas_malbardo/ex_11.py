def encontrar_numero(lista: list[int], n: int) -> bool:
    if lista == []:
        return False
    elif lista[0] == n:
        return True
    else:
        return encontrar_numero(lista[1:], n)
    
print(encontrar_numero([2, 5, 1, 6, 8, 3, 2], 8))
