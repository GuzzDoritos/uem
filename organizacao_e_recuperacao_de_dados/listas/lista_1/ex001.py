nomeArq = input("Digite o nome do arquivo: ")
arq = open(nomeArq, 'w', encoding='utf-8')
dados = input("Digite os seus dados:\n")
c = dados
for c in dados:
    arq.write(c)
arq.close()