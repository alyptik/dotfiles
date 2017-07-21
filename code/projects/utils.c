/*
 * --------------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <tomenglund26@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return. Tom Englund
 * --------------------------------------------------------------------------------
 */

#include <assert.h>
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#include "utils.h"

char *str_combine(char *str1, char *str2) {
  size_t l = (strlen(str1) + strlen(str2) + 1);
  char *str = malloc(l);

  strcpy(str, str1);
  strcat(str, str2);

  return str;
}

bool str_contains(char *str, char *occ) {
  if(str != NULL && occ != NULL) {
    if (strstr(str, occ) != NULL) {
      return true;
    }
  }

  return false;
}

bool str_empty(char *str) {
  if(str == NULL) {
    return true;
  }

  bool rval = false;
  char *str1 = malloc(strlen(str) + 1);
  strcpy(str1, str);
  str_remove_spaces(str1, str);

  if(strlen(str1) == 0) {
    rval = true;
  }

  safefree((void **)&str1);
  return rval;
}

void str_remove_spaces(char *restrict trim, const char *restrict untrim) {
  while(*untrim != '\0') {
    if(!isspace(*trim)) {
      *trim = *untrim;
      trim++;
    }

  untrim++;
  }

  *trim = '\0';
}

char **str_split(char *str, const char *delim, int max_splits, int *num_splits) {
  if(str_empty(str)) {
    if(num_splits != NULL) {
      *num_splits = 0;
    }

    return NULL;
  }

  int found = 0;
  char **ret = malloc(max_splits * sizeof(char *));
  char *saveptr;
  char *tok = strdup(str);
  char *tmp = strtok_r(tok, delim, &saveptr);

  while(tmp != NULL && found < max_splits) {
    ret[found] = strdup(tmp);
    tmp = strtok_r(NULL, delim, &saveptr);
    found++;
  }
  safefree((void **)&tok);
  *num_splits = found;
  return ret;
}

void safefree(void **pp) {
  assert(pp);
  if(pp != NULL) {
    free(*pp);
    *pp = NULL;
  }
}
