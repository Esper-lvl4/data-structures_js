function arrayItemSwap<T>(list: T[], first: number, second: number): boolean {
  if (first >= 0 && first < list.length && second >= 0 && second < list.length) {
    const [firstItem] = list.splice(first, 1, list[second]);
    list.splice(second, 1, firstItem);
    return true;
  }
  return false;
}

export function maxHeapify<T>(list: T[], i: number) {
  const left = i * 2 + 1;
  const right = i * 2 + 2;

  let largest = i;
  if (left < list.length && list[left] > list[i]) {
    largest = left;
  }
  if (right < list.length && list[right] > list[largest]) {
    largest = right;
  }

  if (largest !== i) {
    arrayItemSwap(list, largest, i);
    maxHeapify(list, largest);
  }
}

export function minHeapify<T>(list: T[], i: number) {
  const left = i * 2 + 1;
  const right = i * 2 + 2;

  let smallest = i;
  if (left < list.length && list[left] < list[i]) {
    smallest = left;
  }
  if (right < list.length && list[right] < list[smallest]) {
    smallest = right;
  }
  if (smallest !== i) {
    arrayItemSwap(list, smallest, i);
    minHeapify(list, smallest);
  }
}

export class BinaryHeap<T> {
  list: T[];
  constructor(array: T[], min = false) {
    const func = min ? minHeapify : maxHeapify;
    for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
      func(array, i);
    }
    this.list = array;
  }
}

export default BinaryHeap;