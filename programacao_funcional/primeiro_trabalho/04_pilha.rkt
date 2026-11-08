#lang racket
(require rackunit)

;; =============================================================================
;; Definição de Dados - Estrutura de Pilha (Sem listas prontas do Racket)
;; =============================================================================

(struct pilha-vazia () #:transparent)
;; Representa uma pilha vazia (sem elementos).

(struct pilha (topo resto) #:transparent)
;; Representa uma pilha não vazia
;;   topo  : Qualquer - elemento armazenado no topo da pilha
;;   resto : Pilha    - subpilha contendo os demais elementos (pilha ou pilha-vazia)

;; Pilha é um dos dois valores:
;; - (pilha-vazia)
;; - (pilha elem p), onde p é uma Pilha

;; =============================================================================
;; Operações Básicas de Pilha
;; =============================================================================

;; Qualquer Pilha -> Pilha
;; Insere o elemento elem no topo da pilha p.
(define (empilhar elem p)
  (pilha elem p))

;; Pilha -> Pilha
;; Remove o elemento do topo da pilha p, retornando a subpilha restante.
;; Caso a pilha esteja vazia, retorna (pilha-vazia).
(define (desempilhar p)
  (cond
    [(pilha-vazia? p)
     (pilha-vazia)]
    [else
     (pilha-resto p)]))

;; Pilha -> Qualquer
;; Retorna o elemento que está no topo da pilha p sem removê-lo.
;; Caso a pilha esteja vazia, retorna (pilha-vazia).
(define (consultar-topo p)
  (cond
    [(pilha-vazia? p)
     (pilha-vazia)]
    [else
     (pilha-topo p)]))

;; =============================================================================
;; Testes
;; =============================================================================

(define pv (pilha-vazia))
(define p1 (empilhar 10 pv))
(define p2 (empilhar 20 p1))
(define p3 (empilhar 30 p2))

;; Testes de empilhar
(check-equal? p1 (pilha 10 (pilha-vazia)))
(check-equal? p2 (pilha 20 (pilha 10 (pilha-vazia))))
(check-equal? p3 (pilha 30 (pilha 20 (pilha 10 (pilha-vazia)))))

;; Testes de consultar-topo
(check-equal? (consultar-topo pv) (pilha-vazia))
(check-equal? (consultar-topo p1) 10)
(check-equal? (consultar-topo p2) 20)
(check-equal? (consultar-topo p3) 30)

;; Testes de desempilhar (comportamento LIFO - último a entrar é o primeiro a sair)
(check-equal? (desempilhar pv) (pilha-vazia))
(check-equal? (desempilhar p1) (pilha-vazia))
(check-equal? (desempilhar p2) p1)
(check-equal? (desempilhar p3) p2)
(check-equal? (consultar-topo (desempilhar p3)) 20)
(check-equal? (consultar-topo (desempilhar (desempilhar p3))) 10)
(check-equal? (desempilhar (desempilhar (desempilhar p3))) (pilha-vazia))
