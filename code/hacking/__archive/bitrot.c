#include <stdint.h>
#include <stdio.h>
#include <limits.h>
#include <assert.h>

static void
print_bits(uint32_t v)
{
   for (uint32_t i = 0; i < sizeof(v) * CHAR_BIT; ++i)
      printf("%u", !!(v & (1<<i)));
   printf("\n");
}

static uint32_t
rotl_mod(uint32_t v, uint32_t shift, uint32_t bits)
{
   assert(bits <= sizeof(v) * CHAR_BIT); // why would you do that
   assert(shift < sizeof(v) * CHAR_BIT); // UB
   const uint32_t mask = (uint64_t)~0 << bits; // avoid branching by shifting 64bit value
   return ((v << shift) | (v >> (bits - shift))) & ~mask;
}

static uint32_t
rotr_mod(uint32_t v, uint32_t shift, uint32_t bits)
{
   assert(bits <= sizeof(v) * CHAR_BIT); // why would you do that
   assert(shift < sizeof(v) * CHAR_BIT); // UB
   const uint32_t mask = (uint64_t)~0 << bits; // avoid branching by shifting 64bit value
   return (v >> shift) | (v << (bits - shift)) & ~mask;
}

static uint32_t
rotl(uint32_t v, int shift)
{
   return rotl_mod(v, shift, sizeof(v) * CHAR_BIT);
}

static uint32_t
rotr(uint32_t v, int shift)
{
   return rotr_mod(v, shift, sizeof(v) * CHAR_BIT);
}

int 
main(void)
{
   {
      uint32_t mask = 1<<0;
      printf("left\n");
      print_bits(mask);
      for (uint32_t i = 0; i < 32; ++i) {
         mask = rotl_mod(mask, 1, 10);
         print_bits(mask);
      }
   }

   {
      uint32_t mask = 1<<0;
      printf("right\n");
      print_bits(mask);
      for (uint32_t i = 0; i < 32; ++i) {
         mask = rotr_mod(mask, 1, 10);
         print_bits(mask);
      }
   }

   {
      uint32_t mask = 1<<0;
      printf("left 32\n");
      print_bits(mask);
      for (uint32_t i = 0; i < 32; ++i) {
         mask = rotl(mask, 1);
         print_bits(mask);
      }
   }

   {
      uint32_t mask = 1<<0;
      printf("right 32\n");
      print_bits(mask);
      for (uint32_t i = 0; i < 32; ++i) {
         mask = rotr(mask, 1);
         print_bits(mask);
      }
   }
}
