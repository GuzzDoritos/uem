#lang racket
(require rackunit)
(define (filtra pred? lst)
  (cond
    [(empty? lst)
     empty]
    [(pred? (first lst))
     (cons (first lst)
           (filtra pred? (rest lst)))]
    [else
     (filtra pred? (rest lst))]))

(check-equal? (filtra positive? (list 1 2 -3 4 5 -6 -7 8))
              (list 1 2 4 5 8))
(check-equal? (filtra positive? (list))
              (list))
(check-equal? (filtra positive? (list 1 2 3 4 5 6 7 8))
              (list 1 2 3 4 5 6 7 8))
(check-equal? (filtra positive? (list -1 -2 -3 -4 -5 -6 -7 -8))
              (list))
(check-equal? (filtra even? (list 1 2 3 4 5 6 7 8))
              (list 2 4 6 8))
(check-equal? (filtra odd? (list 1 2 3 4 5 6 7 8))
              (list 1 3 5 7))