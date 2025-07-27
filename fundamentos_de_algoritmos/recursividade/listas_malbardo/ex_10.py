def concatenar_lista(lista: list[str]) -> str:
    if lista == []:
        return ""
    else:
        return lista[0] + concatenar_lista(lista[1:])
    
print(concatenar_lista(["hello", "world"]))