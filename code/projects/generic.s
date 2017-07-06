	.file	"generic.c"
	.section	.rodata
.LC1:
	.string	"\"intmax_t\" i"
.LC2:
	.string	"long int"
.LC3:
	.string	"\"ptrdiff_t\" p"
.LC4:
	.string	"unsigned long int"
.LC5:
	.string	"\"size_t\" s"
	.align 8
.LC6:
	.string	"%30s is '%s'\n%30s is '%s'\n%30s is '%s'\n%30s is '%s'\n%30s is '%s'\n%30s is '%s'\n%30s is '%s'\n%30s is '%s'\n\n"
.LC7:
	.string	"pointer to int"
.LC8:
	.string	"\"array of int\" ai[3]"
.LC9:
	.string	"unsigned int"
.LC10:
	.string	"\"0x7FFFFFFFU\""
.LC11:
	.string	"\"0xFFFFFFFF\""
.LC12:
	.string	"int"
.LC13:
	.string	"\"0x7FFFFFFF\""
.LC14:
	.string	"\"character\" constant '0'"
.LC15:
	.string	"\"4.0 + 3.0i\""
.LC16:
	.string	"%30s is "
.LC17:
	.string	"'%Lf'"
	.align 8
.LC0:
	.long	0
	.long	1074790400
	.long	0
	.long	1074266112
	.text
	.globl	main
	.type	main, @function
main:
.LFB0:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$64, %rsp
	movl	%edi, -36(%rbp)
	movq	%rsi, -48(%rbp)
	movq	$0, -28(%rbp)
	movl	$0, -20(%rbp)
	movsd	.LC0(%rip), %xmm0
	movsd	%xmm0, -16(%rbp)
	movsd	.LC0+8(%rip), %xmm0
	movsd	%xmm0, -8(%rbp)
	subq	$8, %rsp
	pushq	$.LC7
	pushq	$.LC8
	pushq	$.LC9
	pushq	$.LC10
	pushq	$.LC9
	pushq	$.LC11
	pushq	$.LC12
	pushq	$.LC13
	pushq	$.LC12
	pushq	$.LC14
	pushq	$.LC2
	movl	$.LC1, %r9d
	movl	$.LC2, %r8d
	movl	$.LC3, %ecx
	movl	$.LC4, %edx
	movl	$.LC5, %esi
	movl	$.LC6, %edi
	movl	$0, %eax
	call	printf
	addq	$96, %rsp
	movl	$.LC15, %esi
	movl	$.LC16, %edi
	movl	$0, %eax
	call	printf
	movsd	-8(%rbp), %xmm0
	movsd	%xmm0, -56(%rbp)
	fldl	-56(%rbp)
	leaq	-16(%rsp), %rsp
	fstpt	(%rsp)
	movl	$.LC17, %edi
	movl	$0, %eax
	call	printf
	addq	$16, %rsp
	movl	$10, %edi
	call	putchar
	movl	$0, %eax
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE0:
	.size	main, .-main
	.ident	"GCC: (GNU) 7.1.1 20170528"
	.section	.note.GNU-stack,"",@progbits
