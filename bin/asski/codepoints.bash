#!/bin/bash
printf 'U+%04X\n' "${@/#/\'}"
