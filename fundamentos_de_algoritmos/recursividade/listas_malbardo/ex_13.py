def encontrar_max(lista: list[int] = [0]) -> int:
    if len(lista) == 1:
        return lista[0]
    elif lista[0] > lista[1]:
        lista = lista.append(lista[0])
    else:
        return encontrar_max(lista[1:])

print(encontrar_max([1, 5, 2, 8, 0, 2, 9]))
print(encontrar_max([1, 5, 2, 8, 0, 2, 0]))