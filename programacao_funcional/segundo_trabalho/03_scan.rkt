#lang racket
(require rackunit)

;; =============================================================================
;; Problema 3 - Função de Alta Ordem scan
;; =============================================================================

;; (X Y -> X) X Lista(Y) -> Lista(X)
;; Recebe uma função binária f, um valor inicial ini e uma lista lst, e produz
;; uma lista S onde o i-ésimo elemento é o resultado de aplicar f acumuladamente
;; desde ini até o i-ésimo elemento de lst, sem realizar recomputações.
(define (scan f ini lst)
  (cond
    [(empty? lst)
     empty]
    [else
     (define proximo (f ini (first lst)))
     (cons proximo
           (scan f proximo (rest lst)))]))

;; =============================================================================
;; Testes
;; =============================================================================

;; Exemplos do enunciado (Trabalho 2)
(check-equal? (scan + 0 (list))
              '())
(check-equal? (scan + 2 (list 9 3 1 7))
              '(11 14 15 22))
(check-equal? (scan * 1 (list 2 3 5))
              '(2 6 30))
(check-equal? (scan append (list) (list (list 1 2) (list 3) (list 4 5)))
              '((1 2) (1 2 3) (1 2 3 4 5)))
(check-equal? (scan append (list 0) (list (list 1 2) (list 3) (list 4 5)))
              '((0 1 2) (0 1 2 3) (0 1 2 3 4 5)))

;; Testes adicionais
(check-equal? (scan + 10 (list 5))
              '(15))
(check-equal? (scan - 100 (list 10 20 30))
              '(90 70 40))
(check-equal? (scan string-append "a" (list "b" "c" "d"))
              '("ab" "abc" "abcd"))
(check-equal? (scan max 0 (list 3 1 4 1 5 9 2))
              '(3 3 4 4 5 9 9))
