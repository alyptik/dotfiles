#include <stdio.h>
#include <stddef.h>
#include <stdint.h>
#include <complex.h>

/* Get the name of a type */
#define typename(x) _Generic((x), \
	_Bool: "_Bool",	\
	unsigned char: "unsigned char", \
	char: "char",	 \
	signed char: "signed char", \
	short int: "short int",	 \
	unsigned short int: "unsigned short int", \
	int: "int",	 \
	unsigned int: "unsigned int", \
	long int: "long int",	 \
	unsigned long int: "unsigned long int", \
	long long int: "long long int",	 \
	unsigned long long int: "unsigned long long int", \
	float: "float",	 \
	double: "double", \
	long double: "long double",	 \
	char *: "pointer to char", \
	void *: "pointer to void",	 \
	int *: "pointer to int", \
	default: "other")

#define fmt "%30s is '%s'\n"

#define printf_dec_format(x) _Generic((x), \
	char: "'%c'", \
	signed char: "'%hhd'", \
	unsigned char: "'%hhu'", \
	signed short: "'%hd'", \
	unsigned short: "'%hu'", \
	signed int: "'%d'", \
	unsigned int: "'%u'", \
	long int: "'%ld'", \
	unsigned long int: "'%lu'", \
	long long int: "'%lld'", \
	unsigned long long int: "'%llu'", \
	float: "'%f'", \
	double: "'%f'", \
	long double: "'%Lf'", \
	char *: "'%s'", \
	void *: "'%p'", \
	complex: "'%llfi'", \
	default: "'%lld")
#define print(x) printf(printf_dec_format(x), x)
#define printnl(x) printf(printf_dec_format(x), x), printf("\n");

int main(int argc, char **argv) {
	size_t s;
	ptrdiff_t p;
	intmax_t i;
	int ai[3] = {0};
	double complex z = 4.0F + 3.0F * I;

	printf(fmt fmt fmt fmt fmt fmt fmt fmt "\n",
		"\"size_t\" s", typename(s),
		"\"ptrdiff_t\" p", typename(p),
		"\"intmax_t\" i", typename(i),
		"\"character\" constant '0'", typename('0'),
		"\"0x7FFFFFFF\"", typename(0x7FFFFFFF),
		"\"0xFFFFFFFF\"", typename(0xFFFFFFFF),
		"\"0x7FFFFFFFU\"", typename(0x7FFFFFFFU),
		"\"array of int\" ai[3]", typename(ai));

	printf("%30s is ", "\"4.0 + 3.0i\"");
	printnl(cimagl(z));

	return 0;
}
