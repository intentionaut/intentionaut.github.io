// npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const study = readFileSync('src/content/case-studies/cazoo.md', 'utf8');

test('the Cazoo study is open, so the links land on the study', () => {
  assert.doesNotMatch(study.split('---')[1], /^locked:/m);
});

for (const page of ['fractional', 'forward-deployed']) {
  test(`/${page}/ links its Cazoo mention to the study`, () => {
    const src = readFileSync(`src/pages/${page}.astro`, 'utf8');
    assert.match(src, /<a href="\/case-studies\/cazoo\/">Cazoo<\/a>/);
  });
}
