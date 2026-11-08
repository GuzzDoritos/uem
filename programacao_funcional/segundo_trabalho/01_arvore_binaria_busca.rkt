#lang racket
(require rackunit)

;; =============================================================================
;; Definição de Dados - Árvore Binária de Busca (ABB)
;; =============================================================================

(struct no (chave esq dir) #:transparent)
;; Representa um nó de uma Árvore Binária de Busca (ABB)
;;   chave : Numero - valor da chave armazenada no nó
;;   esq   : ABB    - subárvore esquerda (chaves menores que chave)
;;   dir   : ABB    - subárvore direita (chaves maiores que chave)

;; ABB (Árvore Binária de Busca) é um dos dois valores:
;; - empty (árvore vazia)
;; - (no chave esq dir), onde esq e dir são ABBs

;; =============================================================================
;; Operações da Árvore Binária de Busca
;; =============================================================================

;; ABB Numero -> ABB
;; a. Insere um nó com o valor de chave na árvore binária de busca t.
;; Caso a chave já exista na árvore, retorna a própria árvore sem duplicatas.
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

;; ABB -> Numero
;; Encontra a menor chave presente em uma ABB não vazia (nó mais à esquerda).
(define (menor-chave t)
  (cond
    [(empty? (no-esq t))
     (no-chave t)]
    [else
     (menor-chave (no-esq t))]))

;; ABB Numero -> ABB
;; b. Remove o nó com o valor de chave da árvore binária de busca t.
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

;; ABB Numero -> ABB
;; c. Busca um nó com o valor de chave na árvore binária de busca t.
;; Retorna a subárvore enraizada no nó encontrado, ou empty caso a chave não exista.
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

;; =============================================================================
;; Testes
;; =============================================================================

;; Construção de árvore para testes:
;;         10
;;        /  \
;;       5    15
;;      / \   / \
;;     3   7 12  18
(define arv-vazia empty)
(define arv1 (insere-abb arv-vazia 10))
(define arv2 (insere-abb (insere-abb arv1 5) 15))
(define arv-completa
  (insere-abb
   (insere-abb
    (insere-abb
     (insere-abb arv2 3)
     7)
    12)
   18))

;; Testes de inserção (a)
(check-equal? arv1 (no 10 empty empty))
(check-equal? arv2 (no 10 (no 5 empty empty) (no 15 empty empty)))
(check-equal? arv-completa
              (no 10
                  (no 5 (no 3 empty empty) (no 7 empty empty))
                  (no 15 (no 12 empty empty) (no 18 empty empty))))
;; Inserção de chave já existente mantém a árvore inalterada
(check-equal? (insere-abb arv-completa 7) arv-completa)

;; Testes de busca (c)
(check-equal? (busca-abb arv-vazia 10) empty)
(check-equal? (busca-abb arv-completa 10) arv-completa)
(check-equal? (busca-abb arv-completa 5)
              (no 5 (no 3 empty empty) (no 7 empty empty)))
(check-equal? (busca-abb arv-completa 12)
              (no 12 empty empty))
(check-equal? (busca-abb arv-completa 99) empty)
(check-equal? (busca-abb arv-completa 1) empty)

;; Testes de remoção (b)
;; 1. Remoção em árvore vazia e de chave inexistente
(check-equal? (remove-abb arv-vazia 10) empty)
(check-equal? (remove-abb arv-completa 42) arv-completa)

;; 2. Remoção de nó folha (sem filhos: chave 3)
(check-equal? (remove-abb arv-completa 3)
              (no 10
                  (no 5 empty (no 7 empty empty))
                  (no 15 (no 12 empty empty) (no 18 empty empty))))

;; 3. Remoção de nó com apenas 1 filho à direita (após remover 3, o nó 5 tem apenas filho 7)
(define arv-sem-3 (remove-abb arv-completa 3))
(check-equal? (remove-abb arv-sem-3 5)
              (no 10
                  (no 7 empty empty)
                  (no 15 (no 12 empty empty) (no 18 empty empty))))

;; 4. Remoção de nó com apenas 1 filho à esquerda (após remover 7, o nó 5 tem apenas filho 3)
(define arv-sem-7 (remove-abb arv-completa 7))
(check-equal? (remove-abb arv-sem-7 5)
              (no 10
                  (no 3 empty empty)
                  (no 15 (no 12 empty empty) (no 18 empty empty))))

;; 5. Remoção de nó com 2 filhos (raiz 10 -> sucessor na subárvore direita é 12)
(check-equal? (remove-abb arv-completa 10)
              (no 12
                  (no 5 (no 3 empty empty) (no 7 empty empty))
                  (no 15 empty (no 18 empty empty))))
