#lang racket
(struct no (valor esq dir) #:transparent)
(define (cria-no valor)
  (no valor empty empty))
(define (insere t n lado)
  (cond
    [(equal? lado "dir")
     (struct-copy no t [dir n])]
    [(equal? lado "esq")
     (struct-copy no t [esq n])]
    [else t]))
(define (altura t)
  (cond
    [(empty? t)
     0]
    [else
     (+ 1 (max (altura (no-esq t))
               (altura (no-dir t))))]))
(define t0 (cria-no 10))
(define t1 (no 9 t0 empty))
(define t2 (no 7 (cria-no 8) t1))
(define t3 (no 4 (cria-no 3) empty))
(define raiz (no 3 t3 t2))

(altura raiz)
(altura t0)
(altura t1)
(altura t2)
(altura t3)

