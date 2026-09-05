from sys import argv

def main():
    if len(argv) > 1:
        if type(argv[1]) == int and argv[1] >= 0:
            busca_id(argv[1])
        else:
            raise TypeError("Precisa ser um número inteiro não negativo.") 
    else:
        raise SyntaxWarning("Está faltando o argumento de id para busca.")

def busca_id(id):
    ENTRADA = open('pessoasGOT.dat', 'rb')

if __name__ == "__main__":
    main()