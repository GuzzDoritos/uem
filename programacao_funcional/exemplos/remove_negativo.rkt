#lang racket
(require rackunit)

(define (remove-negativo lst)
  (cond
    [(empty? lst)
     empty]
    [(< (first lst) 0) ; (negative? (first lst)
     (remove-negativo (rest lst))]
    [else
     (cons (first lst) (remove-negativo (rest lst)))]))

(check-equal? (remove-negativo (list 5 8 -3 7 0 -4 -10))
              (list 5 8 7 0))
(check-equal? (remove-negativo (list -2 6 4 -5 1))
              (list 6 4 1))
(check-equal? (remove-negativo (list -7 -2 -4))
              empty)