import { assertEquals, assertNotEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import DoublyLinkedList from "../structures/DoublyLinkedList.ts";

Deno.test("DoublyLinkedList - methods", () => {
  const list = new DoublyLinkedList([77, 54, 88, 1]);
  if (!list.head || !list.tail) return;
  assertEquals(list.head.value, 77);
  assertEquals(list.tail.value, 1);
  assertEquals(list.size, 4);

  list.add(36);
  list.prepend(100);
  assertEquals(list.head.value, 100);
  assertEquals(list.tail.value, 36);
  assertEquals(list.size, 6);

  list.remove(1);
  assertNotEquals(list.tail, undefined);
  if (list.tail?.prev) assertNotEquals(list.tail.prev.value, 1);
  assertEquals(list.size, 5);

  const correctValues: number[] = [100, 77, 54, 88, 36];
  const factualValues: number[] = [];
  list.forEach(value => {
    factualValues.push(value);
  });
  correctValues.forEach((value, index) => {
    assertEquals(value, factualValues[index]);
  });

  factualValues.splice(0, factualValues.length);
  for (const value of list.traverse()) {
    if (value === undefined) continue;
    factualValues.push(value);
  }
  correctValues.forEach((value, index) => {
    assertEquals(value, factualValues[index]);
  });

  correctValues.reverse();
  factualValues.splice(0, factualValues.length);
  for (const value of list.reverseTraverse()) {
    if (value === undefined) continue;
    factualValues.push(value);
  }
  correctValues.forEach((value, index) => {
    assertEquals(value, factualValues[index]);
  });

});