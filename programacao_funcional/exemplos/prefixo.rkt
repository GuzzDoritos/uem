#lang racket
(require rackunit)

(define (prefixo? lst1 lst2)
  (cond
    [(empty? lst1)
     #t]
    [(empty? lst2)
     #f]
    [else ; (and (cons? lst1) (cons? lst2))
     (and (= (first lst1) (first lst2))
          (prefixo? (rest lst1) (rest lst2)))]))

(check-equal? (prefixo? empty empty) #t)
(check-equal? (prefixo? empty (list 3 2 1)) #t)
(check-equal? (prefixo? (list 3 2 1) empty) #f)
(check-equal? (prefixo? (list 3 4) (list 3 4)) #t)
(check-equal? (prefixo? (list 3 4) (list 3 5)) #f)
(check-equal? (prefixo? (list 3 4) (list 3 4 6 8)) #t)
(check-equal? (prefixo? (list 3 5) (list 3 4 6 8)) #f)
(check-equal? (prefixo? (list 3 4 5) (list 3 4)) #f)