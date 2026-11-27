#lang racket
(require rackunit)

;; Uso de IA: o Claude (Anthropic) revisou este arquivo em relação ao enunciado
;; e ao estilo da disciplina. A partir da revisão, ele criou um exemplo com
;; lista de um elemento para a multiplicação e ajustou os comentários. A
;; implementação da função não foi alterada nessa revisão.

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

;; Exemplos do enunciado (Trabalho 2)
(check-equal? (scan + 0 (list))
              empty)
(check-equal? (scan + 2 (list 9 3 1 7))
              (list 11 14 15 22))
(check-equal? (scan * 1 (list 2 3 5))
              (list 2 6 30))
(check-equal? (scan append (list) (list (list 1 2) (list 3) (list 4 5)))
              (list (list 1 2) (list 1 2 3) (list 1 2 3 4 5)))
(check-equal? (scan append (list 0) (list (list 1 2) (list 3) (list 4 5)))
              (list (list 0 1 2) (list 0 1 2 3) (list 0 1 2 3 4 5)))

;; Exemplos adicionais
(check-equal? (scan + 10 (list 5))
              (list 15))
(check-equal? (scan * 4 (list 3))
              (list 12))
(check-equal? (scan - 100 (list 10 20 30))
              (list 90 70 40))
(check-equal? (scan string-append "a" (list "b" "c" "d"))
              (list "ab" "abc" "abcd"))
(check-equal? (scan max 0 (list 3 1 4 1 5 9 2))
              (list 3 3 4 4 5 9 9))
