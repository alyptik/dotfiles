#include <unistd.h>
 
int main(int argc, char*argv[ ])
{
   char *shell[2];
 
   shell[0] = "/bin/sh";
   shell[1] = NULL;
   execve(shell[0], shell, NULL);
   return 0;
}
