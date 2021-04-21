import { assertEquals, assertNotEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import Trie from "../structures/Trie.ts";

Deno.test("Trie - building", () => {
  const testString = 'test';
  const trie = new Trie();

  const testTrieString = (testTrie: Trie, value: string) => {
    let current = testTrie.root;
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      const childNode = current.children[char];
      assertNotEquals(childNode, undefined);
      assertEquals(childNode.value, char);
      if (i !== 0) {
        assertNotEquals(childNode.parent, undefined);
        assertEquals(childNode.parent?.value, value[i - 1]);
      }
      current = childNode;
    }
  }
  trie.insert(testString);
  testTrieString(trie, testString);
  

  const testStrings = ['wow', 'kappa', 'lel'];
  trie.insertMany(testStrings);
  testStrings.forEach((str: string) => testTrieString(trie, str));
  console.log(trie);
});