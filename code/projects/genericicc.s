# mark_description "Intel(R) C Intel(R) 64 Compiler for applications running on Intel(R) 64, Version 17.0.4.196 Build 20170411";
# mark_description "-S -no-intel-extensions -no-icc -gcc -o genericicc.s";
	.file "generic.c"
	.text
..TXTST0:
# -- Begin  main
	.text
# mark_begin;
       .align    16,0x90
	.globl main
# --- main(int, char **)
main:
# parameter 1: %edi
# parameter 2: %rsi
..B1.1:                         # Preds ..B1.0
                                # Execution count [1.00e+00]
	.cfi_startproc
..___tag_value_main.1:
..L2:
                                                          #52.33
        pushq     %rbp                                          #52.33
	.cfi_def_cfa_offset 16
        movq      %rsp, %rbp                                    #52.33
	.cfi_def_cfa 6, 16
	.cfi_offset 6, -16
        andq      $-128, %rsp                                   #52.33
        subq      $128, %rsp                                    #52.33
        xorl      %esi, %esi                                    #52.33
        movl      $3, %edi                                      #52.33
        call      __intel_new_feature_proc_init                 #52.33
                                # LOE rbx r12 r13 r14 r15
..B1.9:                         # Preds ..B1.1
                                # Execution count [1.00e+00]
        stmxcsr   12(%rsp)                                      #52.33
        xorl      %eax, %eax                                    #56.12
        orl       $32832, 12(%rsp)                              #52.33
        ldmxcsr   12(%rsp)                                      #52.33
        movq      %rax, (%rsp)                                  #56.12
        movl      %eax, 8(%rsp)                                 #56.12
                                # LOE rbx r12 r13 r14 r15
..B1.2:                         # Preds ..B1.9
                                # Execution count [1.00e+00]
        addq      $-96, %rsp                                    #59.2
        movl      $.L_2__STRING.0, %edi                         #59.2
        movl      $.L_2__STRING.1, %esi                         #59.2
        movl      $.L_2__STRING.2.0.1, %edx                     #59.2
        movl      $.L_2__STRING.3, %ecx                         #59.2
        movl      $.L_2__STRING.4.0.1, %r8d                     #59.2
        movl      $.L_2__STRING.5, %r9d                         #59.2
        xorl      %eax, %eax                                    #59.2
        movq      $.L_2__STRING.6.0.1, (%rsp)                   #59.2
        movq      $.L_2__STRING.7, 8(%rsp)                      #59.2
        movq      $.L_2__STRING.8.0.1, 16(%rsp)                 #59.2
        movq      $.L_2__STRING.9, 24(%rsp)                     #59.2
        movq      $.L_2__STRING.10.0.1, 32(%rsp)                #59.2
        movq      $.L_2__STRING.11, 40(%rsp)                    #59.2
        movq      $.L_2__STRING.12.0.1, 48(%rsp)                #59.2
        movq      $.L_2__STRING.13, 56(%rsp)                    #59.2
        movq      $.L_2__STRING.14.0.1, 64(%rsp)                #59.2
        movq      $.L_2__STRING.15, 72(%rsp)                    #59.2
        movq      $.L_2__STRING.16.0.1, 80(%rsp)                #59.2
..___tag_value_main.6:
#       printf(const char *__restrict__, ...)
        call      printf                                        #59.2
..___tag_value_main.7:
                                # LOE rbx r12 r13 r14 r15
..B1.10:                        # Preds ..B1.2
                                # Execution count [1.00e+00]
        addq      $96, %rsp                                     #59.2
                                # LOE rbx r12 r13 r14 r15
..B1.3:                         # Preds ..B1.10
                                # Execution count [1.00e+00]
        movl      $.L_2__STRING.17, %edi                        #69.2
        movl      $.L_2__STRING.18, %esi                        #69.2
        xorl      %eax, %eax                                    #69.2
..___tag_value_main.8:
#       printf(const char *__restrict__, ...)
        call      printf                                        #69.2
..___tag_value_main.9:
                                # LOE rbx r12 r13 r14 r15
..B1.4:                         # Preds ..B1.3
                                # Execution count [1.00e+00]
        fldt      .L_2il0floatpacket.0(%rip)                    #70.2
        addq      $-16, %rsp                                    #70.2
        movl      $.L_2__STRING.19.0.1, %edi                    #70.2
        xorl      %eax, %eax                                    #70.2
        fstpt     (%rsp)                                        #70.2
..___tag_value_main.10:
#       printf(const char *__restrict__, ...)
        call      printf                                        #70.2
..___tag_value_main.11:
                                # LOE rbx r12 r13 r14 r15
..B1.11:                        # Preds ..B1.4
                                # Execution count [1.00e+00]
        addq      $16, %rsp                                     #70.2
                                # LOE rbx r12 r13 r14 r15
..B1.5:                         # Preds ..B1.11
                                # Execution count [1.00e+00]
        movl      $10, %edi                                     #70.2
        call      putchar                                       #70.2
                                # LOE rbx r12 r13 r14 r15
..B1.6:                         # Preds ..B1.5
                                # Execution count [1.00e+00]
        xorl      %eax, %eax                                    #72.9
        movq      %rbp, %rsp                                    #72.9
        popq      %rbp                                          #72.9
	.cfi_def_cfa 7, 8
	.cfi_restore 6
        ret                                                     #72.9
        .align    16,0x90
                                # LOE
	.cfi_endproc
# mark_end;
	.type	main,@function
	.size	main,.-main
	.section .rodata.str1.4, "aMS",@progbits,1
	.align 4
	.align 4
.L_2__STRING.2.0.1:
	.long	1769172597
	.long	1684368999
	.long	1852795936
	.long	1852383335
	.word	116
	.space 2, 0x00 	# pad
	.align 4
.L_2__STRING.4.0.1:
	.long	1735290732
	.long	1953392928
	.byte	0
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.6.0.1:
	.long	1735290732
	.long	1953392928
	.byte	0
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.8.0.1:
	.long	7630441
	.align 4
.L_2__STRING.10.0.1:
	.long	7630441
	.align 4
.L_2__STRING.12.0.1:
	.long	1769172597
	.long	1684368999
	.long	1953392928
	.byte	0
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.14.0.1:
	.long	1769172597
	.long	1684368999
	.long	1953392928
	.byte	0
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.16.0.1:
	.long	1852403568
	.long	544367988
	.long	1763733364
	.word	29806
	.byte	0
	.space 1, 0x00 	# pad
	.align 4
.L_2__STRING.19.0.1:
	.long	1716266279
	.word	39
	.data
# -- End  main
	.section .rodata, "a"
	.align 16
	.align 16
.L_2il0floatpacket.0:
	.byte	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xc0,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00
	.type	.L_2il0floatpacket.0,@object
	.size	.L_2il0floatpacket.0,16
	.section .rodata.str1.4, "aMS",@progbits,1
	.space 2, 0x00 	# pad
	.align 4
.L_2__STRING.1:
	.long	2053731106
	.long	578051941
	.word	29472
	.byte	0
	.type	.L_2__STRING.1,@object
	.size	.L_2__STRING.1,11
	.space 1, 0x00 	# pad
	.align 4
.L_2__STRING.3:
	.long	1920233506
	.long	1717987684
	.long	539128927
	.word	112
	.type	.L_2__STRING.3,@object
	.size	.L_2__STRING.3,14
	.space 2, 0x00 	# pad
	.align 4
.L_2__STRING.5:
	.long	1953392930
	.long	1601724781
	.long	1763713652
	.byte	0
	.type	.L_2__STRING.5,@object
	.size	.L_2__STRING.5,13
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.7:
	.long	1634231074
	.long	1952670066
	.long	539128421
	.long	1936617315
	.long	1953390964
	.long	657467168
	.byte	0
	.type	.L_2__STRING.7,@object
	.size	.L_2__STRING.7,25
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.9:
	.long	930623522
	.long	1179010630
	.long	575030854
	.byte	0
	.type	.L_2__STRING.9,@object
	.size	.L_2__STRING.9,13
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.11:
	.long	1182281762
	.long	1179010630
	.long	575030854
	.byte	0
	.type	.L_2__STRING.11,@object
	.size	.L_2__STRING.11,13
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.13:
	.long	930623522
	.long	1179010630
	.long	1430668870
	.word	34
	.type	.L_2__STRING.13,@object
	.size	.L_2__STRING.13,14
	.space 2, 0x00 	# pad
	.align 4
.L_2__STRING.15:
	.long	1920098594
	.long	1864399201
	.long	1852383334
	.long	1629495924
	.long	1563646825
	.byte	0
	.type	.L_2__STRING.15,@object
	.size	.L_2__STRING.15,21
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.17:
	.long	1932538661
	.long	544434464
	.byte	0
	.type	.L_2__STRING.17,@object
	.size	.L_2__STRING.17,9
	.space 3, 0x00 	# pad
	.align 4
.L_2__STRING.18:
	.long	808334370
	.long	857746208
	.long	577318958
	.byte	0
	.type	.L_2__STRING.18,@object
	.size	.L_2__STRING.18,13
	.section .rodata.str1.32, "aMS",@progbits,1
	.align 32
	.align 32
.L_2__STRING.0:
	.long	1932538661
	.long	544434464
	.long	661857575
	.long	808658186
	.long	1936269427
	.long	1931814688
	.long	858065447
	.long	1763734320
	.long	623321203
	.long	621422451
	.long	544419891
	.long	656438121
	.long	170357541
	.long	1932538661
	.long	544434464
	.long	661857575
	.long	808658186
	.long	1936269427
	.long	1931814688
	.long	858065447
	.long	1763734320
	.long	623321203
	.long	621422451
	.long	544419891
	.long	656438121
	.long	170357541
	.word	10
	.type	.L_2__STRING.0,@object
	.size	.L_2__STRING.0,106
	.data
	.section .note.GNU-stack, ""
// -- Begin DWARF2 SEGMENT .eh_frame
	.section .eh_frame,"a",@progbits
.eh_frame_seg:
	.align 8
# End
