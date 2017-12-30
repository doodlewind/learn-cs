	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 13
	.globl	_main
	.p2align	4, 0x90
_main:                                  ## @main
	.cfi_startproc
## BB#0:
	pushq	%rbp
Lcfi0:
	.cfi_def_cfa_offset 16
Lcfi1:
	.cfi_offset %rbp, -16
	movq	%rsp, %rbp
Lcfi2:
	.cfi_def_cfa_register %rbp
	subq	$64, %rsp
	leaq	L_.str(%rip), %rsi
	movl	$10, %eax
	movl	%eax, %edx
	leaq	-18(%rbp), %rdi
	movq	___stack_chk_guard@GOTPCREL(%rip), %rcx
	movq	(%rcx), %rcx
	movq	%rcx, -8(%rbp)
	movl	$0, -24(%rbp)
	callq	___strcpy_chk
	leaq	L_.str.1(%rip), %rdi
	leaq	-18(%rbp), %rcx
	movl	$4, -40(%rbp)
	movq	%rcx, -32(%rbp)
	movl	-40(%rbp), %esi
	movq	-32(%rbp), %rdx
	movq	%rax, -48(%rbp)         ## 8-byte Spill
	movb	$0, %al
	callq	_printf
	movq	___stack_chk_guard@GOTPCREL(%rip), %rcx
	movq	(%rcx), %rcx
	movq	-8(%rbp), %rdx
	cmpq	%rdx, %rcx
	movl	%eax, -52(%rbp)         ## 4-byte Spill
	jne	LBB0_2
## BB#1:
	xorl	%eax, %eax
	addq	$64, %rsp
	popq	%rbp
	retq
LBB0_2:
	callq	___stack_chk_fail
	.cfi_endproc

	.section	__TEXT,__cstring,cstring_literals
L_.str:                                 ## @.str
	.asciz	"demo"

L_.str.1:                               ## @.str.1
	.asciz	"%d\n%s\n"


.subsections_via_symbols
