import { assertEquals, assertNotEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import { LinkedList} from "../structures/LinkedList.ts";
import { mergeSortLinkedList } from "../sorting.ts";

Deno.test("LinkedList - methods", () => {
  const list = new LinkedList(['second', 'forth']);
  list.prepend('first');
  list.add('seventh');
  list.remove('seventh');
  list.add('third');
  list.add('fifth');

  if (list.head) {
    assertEquals(list.head.value, 'first');
    assertNotEquals(list.head.next, list.tail);
  }
  if (list.tail) {
    assertEquals(list.tail.value, 'fifth');
    assertEquals(list.tail.next, undefined);
  }

  assertEquals(list.contains('seventh'), false);
  assertEquals(list.contains('forth'), true);

  const values = ['first', 'second', 'forth', 'third', 'fifth'];
  let i = 0;
  for (const value of list.traverse()) {
    assertEquals(values[i], value);
    i++;
  }

  i = values.length - 1;
  for (const value of list.reverseTraversal()) {
    assertEquals(values[i], value);
    i--;
  }
});

Deno.test("LinkedList - sorting", () => {
  const correctSortOrder = ['ads', 'cbs', 'kek', 'whatever', 'wow'];
  const list = new LinkedList(['cbs', 'wow', 'ads', 'kek', 'whatever']);
  const sortedList = mergeSortLinkedList(list);

  let i = 0;
  let current = sortedList.head;
  assertNotEquals(current, undefined);
  while (current && i < correctSortOrder.length) {
    assertEquals(current.value, correctSortOrder[i]);
    current = current.next;
    i++;
  }

  const numberCorrectSortOrder = [0.1, 5, 12, 77, 304, 1000];
  const numberList = new LinkedList([304, 12, 0.1, 77, 1000, 5]);
  const sordedNumberList = mergeSortLinkedList(numberList);

  let j = 0;
  let currentNumber = sordedNumberList.head;
  assertNotEquals(currentNumber, undefined);
  while (currentNumber && i < numberCorrectSortOrder.length) {
    assertEquals(currentNumber.value, numberCorrectSortOrder[j]);
    currentNumber = currentNumber.next;
    j++;
  }
});