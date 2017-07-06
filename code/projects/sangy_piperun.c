/*
 * piperun.c - Run ELF binary code read from standard input.
 *
 * AUTHOR: Joey Pabalinas <alyptik@protonmail.com>
 * See LICENSE file for copyright and license details.
 */

#include <err.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/syscall.h>
#include <linux/memfd.h>
#include <sys/mman.h>
#include <string.h>

#define UNUSED __attribute__ ((unused))
#define STDIN 0

extern char **environ;

int main(int argc UNUSED, char **argv)
{
	int fd;
	ssize_t buf_len;
	unsigned char *buf;
	/* 2MB */
	unsigned count = getpagesize();
    unsigned char *prog = NULL, *progbak;
    unsigned int total = 0;

	/* we will find this guy in the program provided */
	int (*entrypoint)(int, char **) = NULL;

	if ((fd = syscall(SYS_memfd_create, "piperun", MFD_CLOEXEC)) == -1)
		err(EXIT_FAILURE, "%s", "error creating memfd");
	if ((buf = malloc(count)) == NULL)
		err(EXIT_FAILURE, "%s", "error allocating buffer");

	for (;;) {
		if ((buf_len = read(STDIN_FILENO, buf, count)) == -1) {
			free(buf);
			buf = NULL;
			err(EXIT_FAILURE, "%s", "error reading from stdin");
		}

		/* break on EOF */
		if (buf_len == 0)
			break;


		total += buf_len;
		progbak = prog;
		if ((prog = realloc(progbak, sizeof(unsigned int) * total)) == NULL) {
			if (progbak == NULL)
				free(progbak);
			err(EXIT_FAILURE, "%s", "error allocating buffer");
		}

		memcpy(prog + total - buf_len, buf, buf_len);

	}

	free(buf);
	buf = NULL;

	progbak = prog;

	if ((prog = valloc(total)) == NULL){
		free(progbak);
		err(EXIT_FAILURE, "couldn't do the thing :[");
	}
	memcpy(prog, progbak, total);

	free(progbak);

	if (mprotect(prog, total, PROT_EXEC | PROT_READ)){
		free(prog);
		err(EXIT_FAILURE, "failed call to mprotect");

	}
	prog += 0xaad;

	printf("%x%x%x%x\n", prog[0], prog[1], prog[2], prog[3]);
	entrypoint = (int (*)(int, char**))(prog);
	entrypoint(argc, argv);

	free(prog);
}
