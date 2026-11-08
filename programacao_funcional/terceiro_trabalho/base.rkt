#lang racket

;; =============================================================================
;; Definições de Tipos de Dados (Memória Principal)
;; =============================================================================

(struct no-palavra (palavra cont esq dir) #:transparent)
;; Representa um nó de uma Árvore Binária de Busca (ABB) de palavras
;;   palavra : String      - a palavra armazenada no nó
;;   cont    : Natural     - quantidade de ocorrências da palavra no texto
;;   esq     : ABB-Palavra - subárvore esquerda (palavras alfabeticamente menores)
;;   dir     : ABB-Palavra - subárvore direita (palavras alfabeticamente maiores)

;; ABB-Palavra é um dos dois valores:
;; - empty (árvore vazia)
;; - (no-palavra palavra cont esq dir)

(struct par-palavra (palavra cont) #:transparent)
;; Representa um par contendo uma palavra e sua respectiva contagem total
;;   palavra : String  - a palavra encontrada no texto
;;   cont    : Natural - quantidade de vezes que a palavra apareceu

;; =============================================================================
;; Funções Auxiliares de Contagem (Árvore Binária de Busca)
;; =============================================================================

;; String ABB-Palavra -> ABB-Palavra
;; Insere uma palavra na ABB de palavras. Caso a palavra já exista na árvore,
;; incrementa sua contagem em 1; caso contrário, cria um novo nó com contagem 1.
(define (insere-palavra palavra t)
  (cond
    [(empty? t)
     (no-palavra palavra 1 empty empty)]
    [(equal? palavra (no-palavra-palavra t))
     (struct-copy no-palavra t [cont (add1 (no-palavra-cont t))])]
    [(string<? palavra (no-palavra-palavra t))
     (struct-copy no-palavra t [esq (insere-palavra palavra (no-palavra-esq t))])]
    [else
     (struct-copy no-palavra t [dir (insere-palavra palavra (no-palavra-dir t))])]))

;; Lista(String) -> ABB-Palavra
;; Constrói uma ABB-Palavra a partir de uma lista de palavras usando foldr.
(define (constroi-abb-palavras lst-palavras)
  (foldr insere-palavra empty lst-palavras))

;; ABB-Palavra -> Lista(par-palavra)
;; Converte uma ABB-Palavra em uma lista de estruturas par-palavra.
(define (abb->lista t)
  (cond
    [(empty? t)
     empty]
    [else
     (cons (par-palavra (no-palavra-palavra t)
                        (no-palavra-cont t))
           (append (abb->lista (no-palavra-esq t))
                   (abb->lista (no-palavra-dir t))))]))

;; =============================================================================
;; Funções Auxiliares de Ordenação e Seleção (Quicksort - Slide 07)
;; =============================================================================

;; par-palavra par-palavra -> Booleano
;; Verifica se o par a deve preceder o par b na ordenação:
;; 1. Ordem decrescente de contagem (maior cont vem primeiro);
;; 2. Em caso de empate na contagem, ordem alfabética crescente (string<?).
(define (precede? a b)
  (or (> (par-palavra-cont a) (par-palavra-cont b))
      (and (= (par-palavra-cont a) (par-palavra-cont b))
           (string<? (par-palavra-palavra a) (par-palavra-palavra b)))))

;; Lista(par-palavra) -> Lista(par-palavra)
;; Ordena uma lista de par-palavra (sem palavras repetidas) utilizando Quicksort,
;; conforme apresentado no Slide 07.
(define (quicksort lst)
  (if (empty? lst)
      empty
      (let ([pivo (first lst)])
        (append (quicksort (filter (curryr precede? pivo) lst))
                (list pivo)
                (quicksort (filter (curry precede? pivo) lst))))))

;; Lista(Qualquer) Inteiro -> Lista(Qualquer)
;; Retorna uma lista com os primeiros n elementos de lst (ou toda a lista
;; caso n seja maior ou igual ao tamanho de lst).
(define (primeiros-n lst n)
  (cond
    [(or (<= n 0) (empty? lst))
     empty]
    [else
     (cons (first lst)
           (primeiros-n (rest lst) (sub1 n)))]))

;; =============================================================================
;; Formatação e Função Principal conta-palavras
;; =============================================================================

;; par-palavra -> String
;; Formata um par-palavra como uma linha no padrão "palavra contagem\n".
(define (formata-par par)
  (format "~a ~a\n" (par-palavra-palavra par) (par-palavra-cont par)))

;;funcao que recebe a string contendo as palavras a serem contados e retorna
;;a string a ser escrita no arquivo de saida, onde essa string eh formada
;;por n linhas, onde cada linha contem uma palavra e sua contagem de aparicao na
;;string de entrada.
;; String Inteiro -> String
(define (conta-palavras text n)
  (define palavras (string-split text))
  (define arv (constroi-abb-palavras palavras))
  (define lista-unica (abb->lista arv))
  (define lista-ordenada (quicksort lista-unica))
  (define selecionadas (primeiros-n lista-ordenada n))
  (foldr string-append "" (map formata-par selecionadas)))



;;Parser de argumentos da linha de comando
(define output-function (make-parameter "output.txt"))
(define number-of-words (make-parameter "5"))
(define input-function (make-parameter "texto.txt"))

(define args (command-line #:program "contador-palavras"
                           #:once-each
                           [("-i" "--input") if
                             "nome do arquivo de entrada (default: texto.txt)"
                             (input-function if)]
                           [("-o" "--output") of
                             "nome do arquivo de saida (default: output.txt)"
                             (output-function of)]
                           [("-n") n
                             "numero de palavras (default: 5)"
                             (number-of-words n)]
                           #:args ()
                           (list (input-function) (output-function) (number-of-words))))

(define arg-lst args)

(define input-file (first arg-lst))  
(define output-file (second arg-lst))
(define number-words (third arg-lst))

;;leitura do arquivo de entrada
(define in-port (open-input-file input-file))
(define input-text (port->string in-port))
(close-input-port in-port)

;;criacao do texto de saida
;;Essa criacao eh feita pela chamada da funcao conta palavras
(define output-text (conta-palavras input-text (string->number number-words)))
;;escrita do resultado no arquivo de saida.
(define out-port (open-output-file output-file #:exists 'replace))
(display output-text out-port)
(close-output-port out-port)
