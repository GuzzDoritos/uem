from arranjo import Array
import random
import time


def gerar_numeros(n: int, minimo: int = 0, maximo: int = 100) -> list[int]:
    """
    Gera *n* números inteiros aleatórios únicos entre *minimo* e *maximo*
    (inclusive), ordena-os e retorna em uma lista.
    """
    intervalo_disponivel = maximo - minimo + 1
    if n < 0:
        raise ValueError("O número de elementos deve ser não-negativo.")
    if minimo > maximo:
        raise ValueError("O valor mínimo não pode ser maior que o máximo.")
    if n > intervalo_disponivel:
        raise ValueError(f"Não é possível gerar {n} números únicos no intervalo de {minimo} a {maximo}.")

    numeros = random.sample(range(minimo, maximo + 1), n)
    numeros.sort()
    return numeros



def experimento_buscas(arranjo: Array, tentativas=100):
    """Mede o tempo médio para se efetuar busca sequencial e 
    binária em **arranjo**. *tentativas* contém a quantidade
    de vezes que serão realizadas as buscas por um elemento
    aleatório que pode ou não estar em lista, com uma 
    probabilidade de 50%.
    """
    tempos_seq = []
    tempos_bin = []

    for _ in range(tentativas):
        if random.random() < 0.5:
            alvo = random.choice(lista)  # valor que está na lista
        else:
            alvo = len(arranjo) * 2 + 1  # valor que não está na lista


        # Tempo da busca sequencial
        inicio_seq = time.perf_counter()
        #invocar função busca_sequencial
        fim_seq = time.perf_counter()
        tempos_seq.append(fim_seq - inicio_seq)

        # Tempo da busca binária
        inicio_bin = time.perf_counter()
        #invocar função busca_binaria
        fim_bin = time.perf_counter()
        tempos_bin.append(fim_bin - inicio_bin)

    print(f"Tamanho do arranjo: {len(arranjo)}")
    print(f"Tentativas: {tentativas}")
    print(f"Média busca sequencial: {sum(tempos_seq)/tentativas:.8f} segundos")
    print(f"Média busca binária:    {sum(tempos_bin)/tentativas:.8f} segundos")




if __name__ == '__main__':
    lista = gerar_numeros(1000000, 0, 10000000)
    # 1) Crie um arranjo estático com os elementos em lista
    # (use a estrutura de dados vista na aula anterior).
    # 2) Implemente funções de busca sequencial e busca binária.
    # 3) Altere a função experimento_buscas e invoque-a.
    # 4) Em todos os casos busca sequencial é menos eficiente que 
    # busca binária? Busca sequencial ainda serve para alguma coisa?
    # Não seria melhor sempre usar busca binária?
    # 5) Altere os algoritmos de busca para em vez de devolver 
    # o índice do elemento no arranjo, conte o número de 
    # realizadas comparações. Verifique se o comportamento na
    # prática se assemelha à análise teórica.