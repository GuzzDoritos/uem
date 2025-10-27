import random
import time
from ineficiente_janelaDeslizanteMaxima import SolucaoIneficiente
from janelaDeslizanteMaxima import Solucao

# gera uma lista com 200_000 números aleatórios entre -10⁶ e 10⁶
nums = [random.randint(-10**6, 10**6) for _ in range(200_000)]
k = 500  # tamanho da janela

# teste com versão ineficiente
inicio = time.time()
s1 = SolucaoIneficiente()
s1.i_janelaDeslizanteMaxima(nums, k)
print("Ineficiente:", time.time() - inicio, "segundos")

# teste com versão eficiente
inicio = time.time()
s2 = Solucao()
s2.janelaDeslizanteMaxima(nums, k)
print("Eficiente:", time.time() - inicio, "segundos")