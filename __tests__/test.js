import fs from 'fs';
import genDiff from '../src';

const expected = fs.readFileSync('__tests__/__fixtures__/diffOut', 'utf8');

describe('show diff', () => {
  it('tree', () => {
    const actual = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
    expect(actual).toBe(expected);
  });
  it('YAML', () => {
    const actual = genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml');
    expect(actual).toBe(expected);
  });
  it('ini', () => {
    const actual = genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini');
    expect(actual).toBe(expected);
  });
});
