from __future__ import annotations

class SolucaoIneficiente:
    def i_janelaDeslizanteMaxima(self, nums: list[int], k: int) -> list[int]:
        '''
        Resolve o problema da Janela Deslizante Máxima.
        Percorre uma janela de tamanho *k* através de uma lista, e a cada posição da janela, insere o valor máximo em uma outra lista.
        Essa lista é retornada pela função.
        Exemplo:
        >>> nums = [2, 1, -1, 3, 4, 6, -2, 5]
        >>> k = 3
        >>> s = SolucaoIneficiente()
        >>> s.i_janelaDeslizanteMaxima(nums, k)
        [2, 3, 4, 6, 6, 6]'''
        maximos = []
        
        for i in range(len(nums) - k + 1):
            max = nums[i]
            for j in range(i + 1, i + k):
                if nums[j] > max:
                    max = nums[j]
            maximos.append(max)
        
        return maximos