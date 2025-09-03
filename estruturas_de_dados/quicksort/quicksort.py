from arranjo import Array

def quicksort(arranjo: Array, inicio: int, fim: int) -> None:
    if inicio < fim:
        pivo: int = particiona(arranjo, inicio, fim)
        quicksort(arranjo, inicio, pivo - 1)
        quicksort(arranjo, pivo + 1, fim)

def particiona(arranjo: Array, inicio, fim) -> int:
    i = inicio - 1

    for j in range(inicio, fim):
        if arranjo[j] < arranjo[fim]:
            i += 1
            arranjo[i], arranjo[j] = arranjo[j], arranjo[i]

    arranjo[fim], arranjo[i + 1] = arranjo[i + 1], arranjo[fim]
    return i + 1

# lista = [4, 3, 5, 6, 1, 2]
# lista = [5, 6, 8, 9, 2, 1, 4, 7, 3]
# lista = [3, 2, 7, 1, 8, 8, 5, 0, 4, 8, 5, 7, 0, 4, 7, 8, 5, 6]
lista = [9, 51, 95, 66, 15, 49, 61, 27,  6, 25, 83, 42,100, 20, 90, 97, 63, 53, 79, 22, 70, 87, 81, 28, 45, 56, 98, 12, 32, 80, 94, 55, 14,  2, 11, 76, 34, 40, 35, 33, 41, 99, 43, 44, 5, 91, 10, 52, 89, 92, 31, 82, 47, 88, 21, 96, 26, 54,  4, 72, 39, 30,  7, 58, 50, 29, 13,  1, 19, 68, 69, 23, 24, 71, 65, 46, 86, 37, 62, 67, 57,  3, 59, 60, 73, 78, 85, 84, 93, 74, 64,  8, 17, 75, 48, 38, 18, 16, 36, 77]
arr = Array(len(lista))
for i in range(len(arr)):
    arr[i] = lista[i]

print(f"Antes da ordenação: {arr}")
quicksort(arr, 0, len(arr) - 1)
print(f"Depois da ordenação: {arr}")
