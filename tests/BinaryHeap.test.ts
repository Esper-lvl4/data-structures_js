import { assertEquals, assert } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import BinaryHeap from "../structures/BinaryHeap.ts"

Deno.test("BinaryHeap - building", () => {
  const maxHeap = new BinaryHeap([1, 2, 3, 4, 5, 6, 7, 8]);

  for (let i = Math.floor(maxHeap.list.length / 2 - 1); i >= 0; i--) {
    const left = maxHeap.list[i * 2 + 1];
    const right = maxHeap.list[i * 2 + 2];
    const elem = maxHeap.list[i];
    if (left !== undefined) assert(left < elem);
    if (right !== undefined) assert(right < elem);
  }

  const minHeap = new BinaryHeap([8, 7, 6, 5, 4, 3, 2, 1], true);

  for (let i = Math.floor(minHeap.list.length / 2 - 1); i >= 0; i--) {
    const left = minHeap.list[i * 2 + 1];
    const right = minHeap.list[i * 2 + 2];
    const elem = minHeap.list[i];
    if (left !== undefined) assert(left > elem);
    if (right !== undefined) assert(right > elem);
  }
});