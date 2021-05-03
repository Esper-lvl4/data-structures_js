import { assertEquals, assertNotEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import BinarySearchTree from "../structures/BinarySearchTree.ts";

Deno.test("BinarySearchTree - methods", () => {
  const tree: BinarySearchTree<number> = new BinarySearchTree(45);
  assertEquals(tree.root?.value, 45);
  assertEquals(tree.size, 1);

  tree.insert(31);
  assertEquals(tree.size, 2);
  assertEquals(tree.root?.left?.value, 31);
  assertNotEquals(tree.root?.right?.value, 31);

  tree.insert(38);
  assertEquals(tree.size, 3);
  assertEquals(tree.root?.left?.right?.value, 38);

  tree.insert(28);
  assertEquals(tree.size, 4);
  assertEquals(tree.root?.left?.left?.value, 28);

  tree.insert(31);
  assertEquals(tree.size, 4);
  assertEquals(tree.root?.left?.count, 2);

  tree.remove(31);
  assertEquals(tree.size, 4);
  assertEquals(tree.root?.left?.count, 1);

  tree.insert(35);
  tree.insert(33);
  tree.insert(34);
  tree.insert(50);
  tree.insert(52);
  tree.insert(47);

  assertEquals(tree.find(33)?.value, 33);
  assertEquals(tree.findParent(33)?.value, 35);

  tree.remove(31);
  assertEquals(tree.size, 9);
  assertEquals(tree.root?.left?.value, 33);

  tree.remove(33);
  assertEquals(tree.size, 8);
  assertEquals(tree.root?.left?.value, 34);

  assertEquals(tree.findMinimum(), 28);
  assertEquals(tree.findMaximum(), 52);

  const values = [28, 34, 35, 38, 45, 47, 50, 52];
  let i = 0;
  for (const value of tree.traverseInOrder()) {
    assertEquals(value, values[i]);
    i++;
  }

  i = 0;
  const reverseValues = values.reverse();
  for (const value of tree.traverseInReverseOrder()) {
    assertEquals(value, reverseValues[i]);
    i++;
  }

  i = 0;
  const preOrderValues = [45, 34, 28, 38, 35, 50, 47, 52];
  for (const value of tree.traversePreOrder(tree.root)) {
    assertEquals(value, preOrderValues[i]);
    i++;
  }

  i = 0;
  const postOrderValues = [28, 35, 38, 34, 47, 52, 50, 45];
  for (const value of tree.traversePostOrder(tree.root)) {
    assertEquals(value, postOrderValues[i]);
    i++;
  }
});