#lang racket
(require rackunit)

(define (contem lst val)
  (cond
    [(empty? lst)
     #f]
    [else
     (if (equal? (first lst) val)
         #t
         (contem (rest lst) val))]))

(define l (list 4 8 3 6 5 0 2))
(check-equal? (contem l 5) #t)
(check-equal? (contem l 4) #t)
(check-equal? (contem l 2) #t)
(check-equal? (contem l 7) #f)
(check-equal? (contem l 9) #f)