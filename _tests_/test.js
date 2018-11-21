import fs from 'fs';
import genDiff from '../src';

describe('show diff', () => {
  it('tree', () => {
    const actual = genDiff('_tests_/_fixtures_/before.json', '_tests_/_fixtures_/after.json');
    const expected = fs.readFileSync('_tests_/_fixtures_/diffOut', 'utf8');
    expect(actual).toBe(expected);
  });
});
