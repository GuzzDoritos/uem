#lang racket
(require rackunit)

(define (concatena lst1 lst2)
  (cond
    [(empty? lst1)
     lst2]
    [else
     (cons (first lst1) (concatena (rest lst1) lst2))]))

(check-equal? (concatena (list 1 2 3) (list 4 5 6))
              (list 1 2 3 4 5 6))
(check-equal? (concatena empty (list 7 8 9 2 4))
              (list 7 8 9 2 4))
(check-equal? (concatena (list 6 3) empty)
              (list 6 3))
(check-equal? (concatena (list 7 8) (list 3 4 5 6 7))
              (list 7 8 3 4 5 6 7))
(check-equal? (concatena empty empty)
              empty)