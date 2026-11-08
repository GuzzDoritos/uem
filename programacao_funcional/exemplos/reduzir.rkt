#lang racket
(require rackunit)
(define (reduzir f base lst)
  (cond
    [(empty? lst)
     base]
    [else
     (f (first lst)
        (reduzir f base (rest lst)))]))

(check-equal?
 (reduzir + 0 (list 1 2 3 4 5))15)
(check-equal?
 (reduzir + 0 (list )) 0)
(check-equal?
 (reduzir + 0 (list 3 -2 7 4 -1 -9)) 2)
(check-equal?
 (reduzir * 1 (list 1 2 3 4 5)) 120)
(check-equal?
 (reduzir * 1 (list 1 2 3)) 6)
(check-equal?
 (reduzir * 1 (list )) 1 )
