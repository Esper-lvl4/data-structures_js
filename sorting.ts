import LinkedList, {LinkedListPart} from "./structures/LinkedList.ts";

export function mergeSortLinkedList<T>(list: LinkedList<T>): LinkedList<T> {
  if (!list.head || list.head === list.tail) return list;
  const splitted = splitLinkedList(list);
  let i = 0;
  while (splitted.length !== 1) {
    const left = splitted[i];
    const right = splitted[i + 1];
    if (!right) {
      splitted.splice(i, 1, mergeLinkedList(left, new LinkedList()));
    } else {
      splitted.splice(i, 2, mergeLinkedList(left, right));
    }

    i += 1;
    if (i >= splitted.length) i = 0;
  }
  return splitted[0];
}

function splitLinkedList<T>(list: LinkedList<T>): LinkedList<T>[] {
  const result: LinkedList<T>[] = [];
  let current: LinkedListPart<T> | undefined = list.head;
  while (current) {
    result.push(new LinkedList(current.value));
    current = current.next;
  }
  return result;
}

function mergeLinkedList<T>(left: LinkedList<T>, right: LinkedList<T>): LinkedList<T> {
  const result = new LinkedList<T>();
  let leftCurrent: LinkedListPart<T> | undefined = left.head;
  let rightCurrent: LinkedListPart<T> | undefined = right.head;
  while (leftCurrent && rightCurrent) {
    if (leftCurrent.value < rightCurrent.value) {
      result.add(leftCurrent.value);
      leftCurrent = leftCurrent.next;
    } else {
      result.add(rightCurrent.value);
      rightCurrent = rightCurrent.next;
    }
  }

  while (leftCurrent) {
    result.add(leftCurrent.value);
    leftCurrent = leftCurrent.next;
  }

  while (rightCurrent) {
    result.add(rightCurrent.value);
    rightCurrent = rightCurrent.next;
  }
  return result;
}