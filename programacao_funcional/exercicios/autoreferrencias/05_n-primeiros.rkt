#lang racket
(define (n-primeiros l n)
  (cond
    [(zero? n) empty]
    [(empty? l) empty]
    [else (cons (first l) (n-primeiros (rest l) (sub1 n)))]))

(n-primeiros '(4 8 1 3 9 7 5 6) 4)
(n-primeiros '(4 8 1 3 9 7 5 6) 0)
(n-primeiros '(4 8) 4)