import LinkedList, {LinkedListPart} from "./structures/LinkedList.ts";
export function mergeSortLinkedList(list: LinkedList): LinkedList {
  if (!list.head || list.head === list.tail) return list;
  const splitted = splitLinkedList(list);
  let i = 0;
  console.log(splitted.map(el => el.head));
  while (splitted.length !== 1) {
    console.log('thats length: ', splitted.length);
    const left = splitted[i];
    const right = splitted[i + 1];
    if (!right) {
      splitted.splice(i, 1, mergeLinkedList(left, new LinkedList()));
    } else {
      splitted.splice(i, 2, mergeLinkedList(left, right));
    }
    i += 2;
    console.log('thats i: ', i);
    if (i >= splitted.length) i = 0;
  }
  return splitted[0];
}

function splitLinkedList(list: LinkedList): LinkedList[] {
  const result: LinkedList[] = [];
  let current: LinkedListPart | undefined = list.head;
  while (current) {
    result.push(new LinkedList(current));
    current = current.next;
  }
  return result;
}

function mergeLinkedList(left: LinkedList, right: LinkedList): LinkedList {
  let result = new LinkedList();
  let leftCurrent: LinkedListPart | undefined = left.head;
  let rightCurrent: LinkedListPart | undefined = right.head;
  while (leftCurrent && rightCurrent) {
    const next = [leftCurrent.next, rightCurrent.next];
    if (leftCurrent.value < rightCurrent.value) {
      result.add(leftCurrent);
      result.add(rightCurrent);
    } else {
      result.add(rightCurrent);
      result.add(leftCurrent);
    }
    leftCurrent = next[0];
    rightCurrent = next[1];
  }
  console.log('before second loop.');
  while (leftCurrent) {
    console.log(leftCurrent.value);
    const next = leftCurrent.next
    result.add(leftCurrent);
    leftCurrent = next;
  }
  console.log('before third loop.');
  while (rightCurrent) {
    const next = rightCurrent.next
    result.add(rightCurrent);
    rightCurrent = next;
  }
  return result;
}