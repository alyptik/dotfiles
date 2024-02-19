 #!/usr/bin/perl -- -export-a-crypto-system-sig Diffie-Hellman-2-lines
 ($g,$e,$m) =map { "\U$_" } @ARGV;
$m||die"$0 gen exp mod\n";
 print`echo "16dio1[d2%Sa2/d0<X+d*La1=z\U$m%0]SX$e"[$g*]\EszlXx+p|dc`;
