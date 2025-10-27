from __future__ import annotations
from deque import Deque

class Solucao:
    def janelaDeslizanteMaxima(self, nums: list[int], k: int) -> list[int]:
        '''
        Resolve o problema da Janela Deslizante Máxima.
        Percorre uma janela de tamanho *k* através de uma lista, e a cada posição da janela, insere o valor máximo em uma outra lista.
        Essa lista é retornada pela função.
        Exemplo:
        >>> nums = [2, 1, -1, 3, 4, 6, -2, 5]
        >>> k = 3
        >>> s = Solucao()
        >>> s.janelaDeslizanteMaxima(nums, k)
        [2, 3, 4, 6, 6, 6]'''
        d = Deque()
        maximos = []
        
        for i in range(len(nums)):
            if not d.vazia() and d.esquerda() < i - k + 1:
                d.remove_esquerda()
            while not d.vazia() and nums[i] > nums[d.direita()]:
                d.remove_direita()
            d.insere_direita(i)

            if i >= k - 1:
                max_atual = nums[d.esquerda()]
                maximos.append(max_atual)
        
        return maximos