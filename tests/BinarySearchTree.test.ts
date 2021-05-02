import { assertEquals, assertNotEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import BinarySearchTree from "../structures/BinarySearchTree.ts";

Deno.test("BinarySearchTree - methods", () => {
  const tree: BinarySearchTree<number> = new BinarySearchTree(45);
  assertEquals(tree.root?.value, 45);
  assertEquals(tree.size, 1);

  tree.insert(31);
  assertEquals(2, tree.size);
  assertEquals(31, tree.root?.left?.value);
  assertNotEquals(31, tree.root?.right?.value);

  tree.insert(38);
  assertEquals(3, tree.size);
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
});