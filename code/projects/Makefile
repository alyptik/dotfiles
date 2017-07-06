#
# foobar
#
# See LICENSE file for copyright and license details.

CC ?= gcc
LD ?= $(CC)
CFLAGS = -O2 -pipe -MMD -I. -fPIC -fstack-protector-strong -Wall -Wextra -std=c11 -pedantic-errors
PREFIX ?= $(DESTDIR)/usr/local
LDFLAGS = -Wl,-O1,--sort-common,--as-needed,-z,relro -Wl,-z,now
# LDLIBS = $(shell pkg-config --cflags --libs tap)
TESTS = $(patsubst %.c, %, $(wildcard t/*.c))
HDR = $(wildcard *.h)
SRC = $(wildcard *.c)
OBJ = $(patsubst %.c, %.o,$(wildcard *.c))
TOBJ = $(patsubst %, %.o, $(TESTS))

TARGET = "foobar"

%:
	$(CC) $(LDFLAGS) $(TARGET_ARCH) $(filter %.o, $^) $(LDLIBS) -o $@

%.o:
	$(CC) $(CFLAGS) $(CPPFLAGS) $(TARGET_ARCH) -c $(filter %.c, $^) $(LDLIBS) -o $@

all: $(TARGET) tests

$(TARGET): $(OBJ)

$(OBJ): %.o: %.c $(HDR)

tests: $(TESTS)

$(TESTS): %: %.o $(OBJ)

$(TOBJ): %.o: %.c $(HDR)

install: $(TARGET)
	@printf "\n\t%s\n\n" "installing"
	mkdir -p $(PREFIX)/bin
	install -c $(TARGET) $(prefix)/bin

uninstall:
	rm $(PREFIX)/bin/$(TARGET)

dist: clean
	@printf "\n\t%s\n\n" "creating dist tarball"
	mkdir -p $(TARGET)
	cp -R LICENSE Makefile README.md ${HDR} ${SRC} $(TARGET)
	tar -cvzf $(TARGET).tar.gz $(TARGET)
	rm -rfv $(TARGET)

check test: all
	./t/test

clean:
	printf "\n\t%s\n\n" "cleaning"
	rm -fv $(TARGET) $(OBJ) $(TOBJ) $(TESTS) ftree.tar.gz $(wildcard *.d)

-include $(wildcard *.d)
.PHONY: all clean install uninstall dist check test tests
