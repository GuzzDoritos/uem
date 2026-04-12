nomeArq = input("Digite o nome do arquivo: ")
arq = open(nomeArq, 'w', encoding='utf-8')
campos = []
campo = input("Digite uma linha: ")
while campo:
    campos.append(f"{campo}\n")
    campo = input("Digite uma linha: ")
campos[-1] = campos[-1][:-2]
arq.writelines(campos)
arq.close()