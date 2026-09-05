from sys import argv
from struct import pack, unpack, calcsize

# CONSTANTES
FORMATO_ELEMLISTA = '2i'    # dois inteiros de 4 bytes
FORMATO_HEADER = 'i'        # um inteiro de 4 bytes
FORMATO_TAMREG = 'h'        # um inteiro de 2 bytes
SIZEOF_ELEMLISTA = calcsize(FORMATO_ELEMLISTA)      # 8 bytes
SIZEOF_HEADER = calcsize(FORMATO_HEADER)            # 4 bytes
SIZEOF_TAMREG = calcsize(FORMATO_TAMREG)            # 2 bytes

# passo 1: leia os registros do arquivo de entrada e retorne uma lista de tuplas (chave, valor)
# utilize os formatos FORMATO_HEADER e FORMATO_TAMREG para fazer o unpack dos dados lidos do arquivo de entrada
def leia_registros(nome_arq_entrada: str ) -> list[tuple[int, int]]:
    arq = open(nome_arq_entrada, 'rb')
    total_de_reg_bytes = arq.read(SIZEOF_HEADER)
    total_de_reg = unpack(FORMATO_HEADER, total_de_reg_bytes)[0]
	
    lista = []

    for i in range(total_de_reg):
        tam_reg = unpack(FORMATO_TAMREG, arq.read(SIZEOF_TAMREG))
    

# passo 3: escreva os registros no arquivo de saída de acordo com a ordem dada pela lista ordenada
# lembre-se de manter o mesmo formato do arquivo de entrada
def escreva_registros_ordenados (nome_arq_entrada: str, nome_arq_saida: str, lista: list[tuple[int, int]]) -> None:
	pass

# passo 4: grave a lista de tuplas (chave, valor) no arquivo binário 'lista.dat', usando o formato definido por FORMATO_ELEMLISTA
# lembre-se de gravar a quantidade de elementos da lista no início do arquivo, utilizando o formato definido por FORMATO_HEADER
def grave_lista(lista: list[tuple[int, int]]) -> None:
	pass

# chame as funções acima para implementar os passos 1, 2, 3 e 4
def keysortplusplus(nome_arq_entrada: str, nome_arq_saida: str) -> None:
	leia_registros(nome_arq_entrada)

def main() -> None:
    if len(argv) < 3:
        raise TypeError('Número incorreto de argumentos\nModo de uso: nome_arq_entrada nome_arq_saida')
    keysortplusplus(argv[1], argv[2])

if __name__ == '__main__':
    main() 