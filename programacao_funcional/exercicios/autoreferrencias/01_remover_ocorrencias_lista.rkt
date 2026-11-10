#lang racket
(require rackunit)
(define (remover-ocorrencias lst n)
  (cond
    [(empty? lst)
      empty]
    [(= n (first lst))
      (remover-ocorrencias(rest lst) n)]
    [else
      (cons (first lst)
            (remover-ocorrencias (rest lst) n))]))

(check-equal? (remover-ocorrencias empty 6) empty)
(check-equal? (remover-ocorrencias (list 1 2 3) 6) (list 1 2 3))
(check-equal? (remover-ocorrencias (list 6 6 6) 6) empty)