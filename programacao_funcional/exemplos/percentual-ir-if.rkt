;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname percentual-ir-if) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
(define (percentual-ir salario)
  (if (<= salario 5000)
      0
      (if (<= salario 10000)
          0.1
          (if (<= salario 15000)
              0.2 
              0.3))))
(percentual-ir 3000)
(percentual-ir 8000)
(percentual-ir 13000)
(percentual-ir 18000)