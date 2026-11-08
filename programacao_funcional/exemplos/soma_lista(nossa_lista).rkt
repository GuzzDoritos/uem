#lang racket
(require rackunit)
(struct lista (primeiro resto) #:transparent)
(struct vazia () #:transparent)
(define (soma-lista lst)
  (cond
    [(vazia? lst)
     0]
    [else
     (+ (lista-primeiro lst)
        (soma-lista (lista-resto lst)))]))

(define lv (vazia))
(define l1 (lista 6 (lista 2 (lista 3 (vazia)))))
(define l2 (lista 9 (vazia)))
(check-equal? (soma-lista lv) 0)
(check-equal? (soma-lista l1) 11)
(check-equal? (soma-lista l2) 9)
(check-equal? (soma-lista (lista 1 (lista 2 (lista 3 (vazia))))) 6)