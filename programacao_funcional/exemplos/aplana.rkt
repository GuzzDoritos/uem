#lang racket
(require rackunit)
(define (aplana lst)
  (cond
    [(empty? lst)
     empty]
    [(list? (first lst))
     (append (aplana (first lst)) (aplana (rest lst)))]
    [else
     (cons (first lst) (aplana (rest lst)))]))

(check-equal? (aplana (list 1 2 3 4))
              (list 1 2 3 4))
(check-equal? (aplana empty)
              empty)
(check-equal? (aplana (list 1 2 (list 3 4 (list 5 6) 7) 8 9 (list 10 11 12 13)))
              (list 1 2 3 4 5 6 7 8 9 10 11 12 13))