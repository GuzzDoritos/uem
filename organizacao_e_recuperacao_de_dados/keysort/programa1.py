from sys import argv

def leia_registros(nome_arq_entrada: str) -> list[tuple[int, bytes]]:
    arquivo = open(nome_arq_entrada, "rb")

    QTD_REG = int.from_bytes(arquivo.read(4), "little")

    tuplas = []

    for i in range(QTD_REG):
        TAM = int.from_bytes(arquivo.read(2), "little")
        REG = arquivo.read(TAM)
        REG_STR = REG.decode().split("|")
        ID = int(REG_STR[0])
        TUPLA = (ID, (TAM.to_bytes(2, 'little') + REG))
        tuplas.append(TUPLA)

    arquivo.close()

    return tuplas

def ordena_lista_tuplas(lista):
    lista.sort()

def escreve_registros(nome_arq_entrada: str, lista_tuplas: list[tuple[int, bytes]]) -> None:
    TAM = len(lista_tuplas).to_bytes(4, 'little')

    arq = open(nome_arq_entrada, 'wb')

    arq.write(TAM)
    for tuple in lista_tuplas:
        arq.write(tuple[1])
    
    arq.close()


tuplas = leia_registros("dados.dat")

ordena_lista_tuplas(tuplas)

# print(tuplas)
    
escreve_registros("dados_ordenados.dat", tuplas)

print(leia_registros("dados_ordenados.dat"))
