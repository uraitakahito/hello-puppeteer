import { describe, expect, test } from 'vitest';
import { getTitle } from "../src/title.mjs";

describe("title.mjs", () => {
  test('gets title', async () => {
    expect(await getTitle('https://www.google.com')).toBe('Google');
  });
});
