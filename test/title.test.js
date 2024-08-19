import { describe, expect, test } from 'vitest';
import { getTitle } from "../src/title.js";

describe("title.js", () => {
  test('gets title', async () => {
    expect(await getTitle('https://www.google.com')).toBe('Google');
  });
});
