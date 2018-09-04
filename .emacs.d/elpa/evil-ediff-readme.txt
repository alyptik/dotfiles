Make ediff a little evil. This configures ediff to be friendlier to users
of vim-like keybindings. Consult the help buffer (=?=) for more info.

Here's a table describing the bindings

| Command                     | Original Binding | Evil-ediff  |
|-----------------------------+------------------+-------------|
| ediff-next-difference       | n,SPC            | C-j,n,SPC   |
| ediff-previous-difference   | p,DEL            | C-k,N,p,DEL |
| ediff-jump-to-difference    | j                | d           |
| jump to first difference    | 1j               | gg (or 1d)  |
| jump to last difference     | N/A              | G           |
| copy region A to region B   | a                | a,l         |
| copy region B to region A   | b                | b,h         |
| scroll down 1 line          | C-u 1 v          | j           |
| scroll up 1 line            | C-u 1 V          | k           |
| scroll down half page       | v,C-v            | C-d,v,C-v   |
| scroll up half page         | V,M-v            | C-u,V,M-v   |
| scroll left                 | >                | zh          |
| scroll right                | <                | zl          |
| toggle highlighting         | h                | H           |
| ediff-suspend               | z                | C-z         |

Not implemented yet
| restore old diff            | ra,rb,rc         | u           |
