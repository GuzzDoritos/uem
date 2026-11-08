#lang racket
(define (media-arit x y)
  (exact->inexact (/ (+  x y) 2)))

(media-arit 3 5)