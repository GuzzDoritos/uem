#lang racket
(require rackunit)

(define (soma-ate n)
  (cond
    [(zero? n) 0]
    [else
     (+ n
        (soma-ate (sub1 n)))]))

(check-equal? (soma-ate 10) 55)
(check-equal? (soma-ate 0) 0)
(check-equal? (soma-ate 5) 15)
(check-equal? (soma-ate 1) 1)
