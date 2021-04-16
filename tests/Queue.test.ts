import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import Queue from '../structures/Queue.ts';

Deno.test("Queue - methods", () => {
  const queue = new Queue<string>();
  queue.enqueue('first in queue');
  const first = queue.dequeue();
  queue.enqueue('second in queue');
  queue.enqueue('third in queue');
  assertEquals(queue.front, 'second in queue');
  assertEquals(queue.size, 2);
  const second = queue.dequeue();

  assertEquals(first, 'first in queue');
  assertEquals(second, 'second in queue');
  assertEquals(queue.front, 'third in queue');
  assertEquals(queue.size, 1);
  
});