
(setenv "ESHELL" (expand-file-name "~/bin/eshell"))

(require 'package)
(add-to-list 'package-archives '("melpa" . "http://melpa.org/packages/"))
(package-initialize)

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(column-number-mode t)
 '(cua-mode t nil (cua-base))
 '(custom-enabled-themes (quote (gruvbox)))
 '(custom-safe-themes
   (quote
    ("d29231b2550e0d30b7d0d7fc54a7fb2aa7f47d1b110ee625c1a56b30fea3be0f" default)))
 '(display-time-mode t)
 '(indicate-empty-lines t)
 '(package-selected-packages
   (quote
    (evil-search-highlight-persist evil-surround evil-commentary gruvbox-theme evil-terminal-cursor-changer evil-leader evil-easymotion evil-multiedit evil)))
 '(save-place t)
 '(save-place-mode t)
 '(show-paren-mode t)
 '(size-indication-mode t))

(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(default ((t (:family "Fira Code" :foundry "CTDB" :slant normal :weight normal :height 80 :width normal)))))

(require 'evil)
(evil-mode 1)
(global-undo-tree-mode)
(unless (display-graphic-p)
     (require 'evil-terminal-cursor-changer)
     (evil-terminal-cursor-changer-activate) ; or (etcc-on)
     )
