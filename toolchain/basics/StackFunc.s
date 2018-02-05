	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 13
	.globl	_push
	.p2align	4, 0x90
_push:                                  ## @push
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
	subq	$16, %rsp
	movq	_top@GOTPCREL(%rip), %rax
	movl	%edi, -4(%rbp)
	cmpl	$100, (%rax)
	setl	%cl
	xorb	$-1, %cl
	andb	$1, %cl
	movzbl	%cl, %edi
	movslq	%edi, %rax
	cmpq	$0, %rax
	je	LBB0_2
## BB#1:
	leaq	L___func__.push(%rip), %rdi
	leaq	L_.str(%rip), %rsi
	movl	$5, %edx
	leaq	L_.str.1(%rip), %rcx
	callq	___assert_rtn
LBB0_2:
	jmp	LBB0_3
LBB0_3:
	movq	_stack@GOTPCREL(%rip), %rax
	movq	_top@GOTPCREL(%rip), %rcx
	movl	-4(%rbp), %edx
	movl	(%rcx), %esi
	movl	%esi, %edi
	addl	$1, %edi
	movl	%edi, (%rcx)
	movslq	%esi, %rcx
	movl	%edx, (%rax,%rcx,4)
	addq	$16, %rsp
	popq	%rbp
	retq
	.cfi_endproc

	.globl	_pop
	.p2align	4, 0x90
_pop:                                   ## @pop
	.cfi_startproc
## BB#0:
	pushq	%rbp
Lcfi3:
	.cfi_def_cfa_offset 16
Lcfi4:
	.cfi_offset %rbp, -16
	movq	%rsp, %rbp
Lcfi5:
	.cfi_def_cfa_register %rbp
	movq	_top@GOTPCREL(%rip), %rax
	cmpl	$0, (%rax)
	setg	%cl
	xorb	$-1, %cl
	andb	$1, %cl
	movzbl	%cl, %edx
	movslq	%edx, %rax
	cmpq	$0, %rax
	je	LBB1_2
## BB#1:
	leaq	L___func__.pop(%rip), %rdi
	leaq	L_.str(%rip), %rsi
	movl	$10, %edx
	leaq	L_.str.2(%rip), %rcx
	callq	___assert_rtn
LBB1_2:
	jmp	LBB1_3
LBB1_3:
	movq	_stack@GOTPCREL(%rip), %rax
	movq	_top@GOTPCREL(%rip), %rcx
	movl	(%rcx), %edx
	addl	$-1, %edx
	movl	%edx, (%rcx)
	movslq	%edx, %rcx
	movl	(%rax,%rcx,4), %eax
	popq	%rbp
	retq
	.cfi_endproc

	.section	__TEXT,__cstring,cstring_literals
L___func__.push:                        ## @__func__.push
	.asciz	"push"

L_.str:                                 ## @.str
	.asciz	"StackFunc.c"

L_.str.1:                               ## @.str.1
	.asciz	"top < STACK_SIZE"

L___func__.pop:                         ## @__func__.pop
	.asciz	"pop"

L_.str.2:                               ## @.str.2
	.asciz	"top > 0"


.subsections_via_symbols
