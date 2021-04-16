import { assertEquals, assertNotEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import Stack from "../structures/Stack.ts";

Deno.test("Stack - methods", () => {
  const stack = new Stack<number>();
  stack.push(77);
  stack.push(100);
  stack.push(91);
  assertEquals(stack.size, 3);
  assertEquals(stack.front, 91);

  const removed = stack.pop();
  assertEquals(removed, 91);
  assertEquals(stack.front, 100);

  stack.pop();
  stack.pop();
  assertEquals(stack.front, undefined);
  assertEquals(stack.size, 0);
});