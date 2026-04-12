nome_arq = input("Digite o nome do arquivo a ser lido: ")
arq = open(nome_arq, 'rb')
conteudo = arq.read()

size_bytes = len(conteudo)
num_lines = conteudo.count(b'\n')

print(f"\t Número de linhas: {num_lines}")
print(f"\t Quantidade de bytes: {size_bytes}")