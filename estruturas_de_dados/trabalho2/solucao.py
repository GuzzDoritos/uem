import time
import random
from tabela_hash import TabelaHash
from arvore_avl import ArvoreAVL

class Solucao:
    def soma_dois_bruta(self, nums: list[int], k: int) -> bool:
        """
        Solução Força Bruta: O(n^2).
        Verifica todos os pares possíveis com dois loops.
        """
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == k:
                    return True
        return False

    def soma_dois_hash(self, nums: list[int], k: int) -> bool:
        """
        Solução O(n) usando Tabela Hash (Conjunto).
        Para cada número x, verifica se (k - x) já está no conjunto.
        """
        # Cria a tabela com capacidade um pouco maior que N para evitar muitas colisões
        conjunto = TabelaHash(capacidade=len(nums) * 2)
        
        for x in nums:
            complemento = k - x
            if conjunto.contem(complemento):
                return True
            conjunto.inserir(x)
            
        return False

    def soma_dois_avl(self, nums: list[int], k: int) -> bool:
        """
        Solução O(n log n) usando Árvore AVL (Conjunto).
        Para cada número x, verifica se (k - x) já está no conjunto.
        """
        conjunto = ArvoreAVL()
        
        for x in nums:
            complemento = k - x
            if conjunto.contem(complemento):
                return True
            conjunto.inserir(x)
            
        return False

if __name__ == "__main__":
    sol = Solucao()

    # 1. Configuração do Teste
    # Tamanho da lista (N). 
    N = 10000 
    print(f"--- Gerando lista com {N} elementos ---")
    
    # Gera lista aleatória
    nums = [random.randint(-100000, 100000) for _ in range(N)]
    
    # Define um K arbitrário que provavelmente não existe (para forçar o pior caso)
    k = 999_999 

    # 2. Teste Força Bruta
    print("Rodando Força Bruta (O(n^2))...")
    inicio = time.time()
    res_bruta = sol.soma_dois_bruta(nums, k)
    fim = time.time()
    print(f"Força Bruta: {fim - inicio:.4f} segundos (Resultado: {res_bruta})")

    # 3. Teste Tabela Hash
    print("Rodando Tabela Hash (O(n))...")
    inicio = time.time()
    res_hash = sol.soma_dois_hash(nums, k)
    fim = time.time()
    print(f"Tabela Hash: {fim - inicio:.4f} segundos (Resultado: {res_hash})")

    # 4. Teste Árvore AVL
    print("Rodando Árvore AVL (O(n log n))...")
    inicio = time.time()
    res_avl = sol.soma_dois_avl(nums, k)
    fim = time.time()
    print(f"Árvore AVL:  {fim - inicio:.4f} segundos (Resultado: {res_avl})")
    
    print("\n--- Fim dos Testes ---")