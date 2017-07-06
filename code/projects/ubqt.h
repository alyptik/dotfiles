#include <stdio.h>
#include <stdbool.h>
#include <pthread.h>

/* ubqt_win
These files represent the full state of the program
at any given time. Your UI should draw them whenever
they are not-null; using this mutex to lock them.
isblock should be set for parser to know if we're in
a code block or not
*/

extern pthread_mutex_t mutex;

struct Ubqt_win {
	char *main;
	char *input;
	char *title;
	char *tabs;
	char *status;
	char *sidebar;
	char *slideout;
	char *path;
} ubqt_win;

enum {
	UBQT_SUCCESS = 0,
	UBQT_FAILURE = 1,
};

/*  util.h
These functions are provided

ubqt_next(string, char, startingpoint)
	find next occurance of char or return 0

ubqt_substr(string startindex endcount)
	squash string, from 'start' to 'end' chars

ubqt_insert(allocated string other string offset)
	insert char array at point n in string
	returns change in size to string

ubqt_replace|_ch(string, token, index, range)
	replace area at index, range with token
	returns change in size to string

ubqt_input_update(file, buffer
	push buffer to named file

ubqt_data_remove(ubqt_win.arg)
	sets arg to null

ubqt_data_update(data, path)
	threadsafe setter for ubqt_win.path

ubqt_data_destroy()
	clean up all data structures
*/

unsigned ubqt_next(char *, const char, unsigned);
int ubqt_substr(char *, unsigned, unsigned);
int ubqt_insert(char **, const char *, unsigned);
int ubqt_replace(char **, const char *, unsigned, unsigned);
int ubqt_replace_ch(char **, const char, unsigned, unsigned);
int ubqt_input_update(char *, char *);
void ubqt_data_update(char *, char *);
void  ubqt_data_remove(char *);
void  ubqt_data_destroy();

/* Inotify, socket, 9p
ubqt_data_read(name, path)
    reads data from named file in path
    calls ubqt_markup_code ubqt_markup_line as needed
    returns pointer to stack-allocated data
    (data freed in ubqt_data_update, don't free it)

ubqt_data_write(name, string)
    write data to file name

ubqt_data_init(path)
    given a path, load up ubqt_win struct

ubqt_data_loop(path)
    handle all events (seperate thread) firing off
    ubqt_data_update and ubqt_draw_new_data_callback
    on new data
*/
char *ubqt_data_read(char *, char *);
int   ubqt_data_write(char *, char *);
int   ubqt_data_init();
int   ubqt_data_loop(char *);


/* cairo, nuklear, ncurses

ubqt_draw_init(path)
    initialize graphics backend, set title from path

ubqt_draw_loop
    handle all draw events (main loop)

ubqt_draw_destroy
    clean up graphics backend on shutdown

ubqt_draw_new_data_callback
    when data is written in data loop, this function
    will be called so you are able to redraw with
    the new data.
*/

int ubqt_draw_init(char *);
int ubqt_draw_loop();
int ubqt_draw_destroy();
int ubqt_draw_new_data_callback();

struct {
	char *cur; /* Name of window that holds focus */
	int index;
} cursor;

/* vi, leanback

ubqt_input_init
	set up any structures needed

ubqt_input_loop
    listen for callbacks from draw loop update data
	sets with cursor position
	and any other changes (highlighting)
ubqt_input_destroy
    destroy any allocated structures
*/

int ubqt_input_init();
int ubqt_input_handle(char *);
int ubqt_input_destroy();


/* Convert markup for draw backend

ubqt_markup_line(line)
	parse line in to backend specific markup

ubqt_markup_code(line)
	mark up blockquotes, appearing as
    ```
    some code
    ```
    server side; this function is called on only the
    "some code" line.

Tag struct set when we have open tag available
	img/link will be [key](value) pairs to be used in
    the input functions on selection
	underline is reserved for these cases alone
*/

char *ubqt_markup_line(char *, unsigned);
char *ubqt_markup_code(char *);

/* [key](value) index it occurs at */
struct Item {
	char *key;
	char *value;
	unsigned index;
};

struct Tag {
	unsigned in_list;
	struct Item input;
	struct Item image;
	struct Item link;
	bool ex_bold;
	bool ex_em;
	bool strike;
	bool square;
	bool color;
	bool path;
	bool code;
	bool bold;
	bool img;
	bool inp;
	bool lnk;
	bool em;
} tag_open;

 /* When on a mutable buffer that isn't input we send chunk-by-chunk to the server TODO: Define best chunk size char *ubqt_text_chunk; */
