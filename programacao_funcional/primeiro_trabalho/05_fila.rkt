#lang racket
(require rackunit)

;; =============================================================================
;; Definição de Dados - Estrutura de Fila (Sem listas prontas do Racket)
;; =============================================================================

(struct fila-vazia () #:transparent)
;; Representa uma fila vazia (sem elementos).

(struct fila (primeiro resto) #:transparent)
;; Representa uma fila não vazia
;;   primeiro : Qualquer - primeiro elemento da fila (frente da fila)
;;   resto    : Fila     - subfila contendo os elementos seguintes (fila ou fila-vazia)

;; Fila é um dos dois valores:
;; - (fila-vazia)
;; - (fila elem f), onde f é uma Fila

;; =============================================================================
;; Operações Básicas de Fila
;; =============================================================================

;; Qualquer Fila -> Fila
;; Insere o elemento elem no final da fila f.
(define (enfileirar elem f)
  (cond
    [(fila-vazia? f)
     (fila elem (fila-vazia))]
    [else
     (fila (fila-primeiro f)
           (enfileirar elem (fila-resto f)))]))

;; Fila -> Fila
;; Remove o primeiro elemento da fila f, retornando a fila restante.
;; Caso a fila esteja vazia, retorna (fila-vazia).
(define (desenfileirar f)
  (cond
    [(fila-vazia? f)
     (fila-vazia)]
    [else
     (fila-resto f)]))

;; Fila -> Qualquer
;; Retorna o primeiro elemento da fila f sem removê-lo.
;; Caso a fila esteja vazia, retorna (fila-vazia).
(define (consultar-primeiro f)
  (cond
    [(fila-vazia? f)
     (fila-vazia)]
    [else
     (fila-primeiro f)]))

;; =============================================================================
;; Testes
;; =============================================================================

(define fv (fila-vazia))
(define f1 (enfileirar "A" fv))
(define f2 (enfileirar "B" f1))
(define f3 (enfileirar "C" f2))

;; Testes de enfileirar
(check-equal? f1 (fila "A" (fila-vazia)))
(check-equal? f2 (fila "A" (fila "B" (fila-vazia))))
(check-equal? f3 (fila "A" (fila "B" (fila "C" (fila-vazia)))))

;; Testes de consultar-primeiro
(check-equal? (consultar-primeiro fv) (fila-vazia))
(check-equal? (consultar-primeiro f1) "A")
(check-equal? (consultar-primeiro f2) "A")
(check-equal? (consultar-primeiro f3) "A")

;; Testes de desenfileirar (comportamento FIFO - primeiro a entrar é o primeiro a sair)
(check-equal? (desenfileirar fv) (fila-vazia))
(check-equal? (desenfileirar f1) (fila-vazia))
(check-equal? (desenfileirar f2) (fila "B" (fila-vazia)))
(check-equal? (desenfileirar f3) (fila "B" (fila "C" (fila-vazia))))
(check-equal? (consultar-primeiro (desenfileirar f3)) "B")
(check-equal? (consultar-primeiro (desenfileirar (desenfileirar f3))) "C")
(check-equal? (desenfileirar (desenfileirar (desenfileirar f3))) (fila-vazia))
