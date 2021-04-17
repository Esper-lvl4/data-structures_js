import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import HashMap from "../structures/HashMap.ts";

Deno.test("HashMap - methods", () => {
  const hashMap = new HashMap<number>();
  hashMap.set("testingOut", 77);
  assertEquals(hashMap.get("testingOut"), 77);
  hashMap.set("testingOut", 10);
  assertEquals(hashMap.get("testingOut"), 10);

  const imperfectHashMap = new HashMap<number>(true);
  imperfectHashMap.set("testingOut", 77);
  imperfectHashMap.set("testingOut", 10);
  const list = hashMap.get("testingOut");
  if (Array.isArray(list)) {
    assertEquals(list[0], 77);
    assertEquals(list[1], 10);
  }
});