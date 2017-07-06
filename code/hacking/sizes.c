#include <stdio.h>
#include <limits.h>

int main(int argc, char** argv)
{
	//char  hello[20] = "hello";
	//hello[3] = 0;
	int (*foobar)(const char *,...) = printf;
	foobar("%s","Hello World\n");
	printf("%s","Hello World\n");
	printf("Char is: %d\n bytes",sizeof(char));
	printf("Char is: %d\n bits",CHAR_BIT);
	//printf("%s",hello);
	return 0;
}
