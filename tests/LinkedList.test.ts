import { assertEquals, assertNotEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import { LinkedList, LinkedListPart} from "../structures/LinkedList.ts";
import { mergeSortLinkedList } from "../sorting.ts";

Deno.test("LinkedList - methods", () => {
  const list = new LinkedList();
  list.add(new LinkedListPart('second'));
  list.prepend(new LinkedListPart('first'));
  list.add(new LinkedListPart('seventh'));
  list.remove('seventh');
  list.add(new LinkedListPart('third'));
  list.add(new LinkedListPart('forth'));
  list.add(new LinkedListPart('fifth'));

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

  const values = ['first', 'second', 'third', 'forth', 'fifth'];
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
  let values = ['cbs', 'wow', 'ads', 'kek', 'whatever'];
  const list = new LinkedList();
  values.forEach(value => {
    list.add(new LinkedListPart(value));
  });
  let sortedList = mergeSortLinkedList(list);
  let i = 0;
  let current = sortedList.head;
  assertNotEquals(current, undefined);
  while (current && i < values.length) {
    assertEquals(current.value, values[i]);
    current = current.next;
    i++;
  }
});