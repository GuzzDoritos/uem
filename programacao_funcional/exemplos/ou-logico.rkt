;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname ou-logico) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
(define (ou-logico a b)
  (if (equal? a #t)
      #t
      b))
(ou-logico #f #f)
(ou-logico #f #t)
(ou-logico #t #f)
(ou-logico #t #t)