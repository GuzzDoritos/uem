#lang racket
(require rackunit)

;; Uso de IA: o Claude (Anthropic) revisou este arquivo em relação ao enunciado
;; e ao estilo da disciplina. A partir da revisão, ele reorganizou os exemplos
;; (agora após cada função), criou novos exemplos (inclusive para menor-chave),
;; renomeou as árvores de exemplo e ajustou os comentários. A implementação das
;; funções não foi alterada nessa revisão.

;; =============================================================================
;; Definição de Dados - Árvore Binária de Busca (ABB)
;; =============================================================================

(struct no (chave esq dir) #:transparent)
;; Representa um nó de uma Árvore Binária de Busca (ABB)
;;   chave : Número - valor da chave armazenada no nó
;;   esq   : ABB    - subárvore esquerda (chaves menores que chave)
;;   dir   : ABB    - subárvore direita (chaves maiores que chave)

;; ABB (Árvore Binária de Busca) é um dos dois valores:
;; - empty (árvore vazia)
;; - (no chave esq dir), onde esq e dir são ABBs

;; Árvores usadas nos exemplos. A árvore arv-completa é:
;;         10
;;        /  \
;;       5    15
;;      / \   / \
;;     3   7 12  18
(define arv-vazia empty)
(define arv-so-raiz (no 10 empty empty))
(define arv-tres-nos
  (no 10 (no 5 empty empty) (no 15 empty empty)))
(define arv-completa
  (no 10
      (no 5 (no 3 empty empty) (no 7 empty empty))
      (no 15 (no 12 empty empty) (no 18 empty empty))))

;; =============================================================================
;; Operações da Árvore Binária de Busca
;; =============================================================================

;; ABB Número -> ABB
;; a. Insere um nó com o valor de chave na árvore binária de busca t.
;; Caso a chave já exista em t, produz uma árvore igual a t, sem duplicar a
;; chave.
(define (insere-abb t chave)
  (cond
    [(empty? t)
     (no chave empty empty)]
    [(< chave (no-chave t))
     (struct-copy no t [esq (insere-abb (no-esq t) chave)])]
    [(> chave (no-chave t))
     (struct-copy no t [dir (insere-abb (no-dir t) chave)])]
    [else
     t]))

;; Inserção em árvore vazia
(check-equal? (insere-abb arv-vazia 10) arv-so-raiz)
;; Inserção à esquerda e à direita da raiz
(check-equal? (insere-abb arv-so-raiz 5)
              (no 10 (no 5 empty empty) empty))
(check-equal? (insere-abb arv-so-raiz 15)
              (no 10 empty (no 15 empty empty)))
(check-equal? (insere-abb (insere-abb arv-so-raiz 5) 15)
              arv-tres-nos)
;; Inserção em níveis mais profundos
(check-equal? (insere-abb
               (insere-abb
                (insere-abb
                 (insere-abb arv-tres-nos 3)
                 7)
                12)
               18)
              arv-completa)
;; Inserção de chave já existente mantém a árvore inalterada
(check-equal? (insere-abb arv-completa 7) arv-completa)

;; ABB Número -> ABB
;; c. Busca um nó com o valor de chave na árvore binária de busca t.
;; Produz a subárvore enraizada no nó encontrado, ou empty caso a chave não
;; exista.
(define (busca-abb t chave)
  (cond
    [(empty? t)
     empty]
    [(= chave (no-chave t))
     t]
    [(< chave (no-chave t))
     (busca-abb (no-esq t) chave)]
    [else
     (busca-abb (no-dir t) chave)]))

(check-equal? (busca-abb arv-vazia 10) empty)
(check-equal? (busca-abb arv-completa 10) arv-completa)
(check-equal? (busca-abb arv-completa 5)
              (no 5 (no 3 empty empty) (no 7 empty empty)))
(check-equal? (busca-abb arv-completa 12)
              (no 12 empty empty))
(check-equal? (busca-abb arv-completa 99) empty)
(check-equal? (busca-abb arv-completa 1) empty)

;; ABB -> Número
;; Encontra a menor chave presente na árvore t (nó mais à esquerda).
;; Requer que t não seja vazia.
(define (menor-chave t)
  (cond
    [(empty? (no-esq t))
     (no-chave t)]
    [else
     (menor-chave (no-esq t))]))

(check-equal? (menor-chave arv-so-raiz) 10)
(check-equal? (menor-chave arv-tres-nos) 5)
(check-equal? (menor-chave arv-completa) 3)
(check-equal? (menor-chave (no-dir arv-completa)) 12)

;; ABB Número -> ABB
;; b. Remove o nó com o valor de chave da árvore binária de busca t.
;; Caso a chave não exista em t, produz uma árvore igual a t.
;; Caso o nó possua dois filhos, substitui sua chave pelo sucessor em-ordem
;; (menor chave da subárvore direita) e remove o sucessor da subárvore direita.
(define (remove-abb t chave)
  (cond
    [(empty? t)
     empty]
    [(< chave (no-chave t))
     (struct-copy no t [esq (remove-abb (no-esq t) chave)])]
    [(> chave (no-chave t))
     (struct-copy no t [dir (remove-abb (no-dir t) chave)])]
    [else
     (cond
       [(empty? (no-esq t))
        (no-dir t)]
       [(empty? (no-dir t))
        (no-esq t)]
       [else
        (define sucessor (menor-chave (no-dir t)))
        (no sucessor
            (no-esq t)
            (remove-abb (no-dir t) sucessor))])]))

;; 1. Remoção em árvore vazia e de chave inexistente
(check-equal? (remove-abb arv-vazia 10) empty)
(check-equal? (remove-abb arv-completa 42) arv-completa)

;; 2. Remoção da única chave da árvore
(check-equal? (remove-abb arv-so-raiz 10) empty)

;; 3. Remoção de nó folha (sem filhos: chave 3)
(check-equal? (remove-abb arv-completa 3)
              (no 10
                  (no 5 empty (no 7 empty empty))
                  (no 15 (no 12 empty empty) (no 18 empty empty))))

;; 4. Remoção de nó com apenas 1 filho à direita
;; (após remover 3, o nó 5 tem apenas o filho 7)
(define arv-sem-3 (remove-abb arv-completa 3))
(check-equal? (remove-abb arv-sem-3 5)
              (no 10
                  (no 7 empty empty)
                  (no 15 (no 12 empty empty) (no 18 empty empty))))

;; 5. Remoção de nó com apenas 1 filho à esquerda
;; (após remover 7, o nó 5 tem apenas o filho 3)
(define arv-sem-7 (remove-abb arv-completa 7))
(check-equal? (remove-abb arv-sem-7 5)
              (no 10
                  (no 3 empty empty)
                  (no 15 (no 12 empty empty) (no 18 empty empty))))

;; 6. Remoção de nó com 2 filhos em que o sucessor é o próprio filho direito
(check-equal? (remove-abb arv-completa 5)
              (no 10
                  (no 7 (no 3 empty empty) empty)
                  (no 15 (no 12 empty empty) (no 18 empty empty))))

;; 7. Remoção da raiz com 2 filhos (o sucessor 12 está na subárvore direita)
(check-equal? (remove-abb arv-completa 10)
              (no 12
                  (no 5 (no 3 empty empty) (no 7 empty empty))
                  (no 15 empty (no 18 empty empty))))

;; 8. Remoção em que o sucessor (12) possui um filho à direita (13)
(check-equal? (remove-abb (insere-abb arv-completa 13) 10)
              (no 12
                  (no 5 (no 3 empty empty) (no 7 empty empty))
                  (no 15 (no 13 empty empty) (no 18 empty empty))))
