import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import PriorityQueue from "../structures/PriorityQueue.ts";

Deno.test("PriorityQueue - methods", () => {
  const queue = new PriorityQueue<string>();
  queue.enqueue("John");
  queue.enqueue("Smith");
  assertEquals(queue.front?.priority, 1);
  assertEquals(queue.front?.value, "John");
  assertEquals(queue.list.head?.next?.value.value, "Smith");

  queue.enqueue("Eric", 100);
  assertEquals(queue.front?.value, "Eric");
  assertEquals(queue.front?.priority, 100);
  assertEquals(queue.size, 3);

  const dequeued = queue.dequeue();
  assertEquals(dequeued, "Eric");
  assertEquals(queue.size, 2);
});