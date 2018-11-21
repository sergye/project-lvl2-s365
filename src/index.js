import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';

const events = [
  {
    eventType: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (obj1, obj2, key) => `+ ${key}: ${obj2[key]}`,
  },
  {
    eventType: 'removed',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: (obj1, obj2, key) => `- ${key}: ${obj1[key]}`,
  },
  {
    eventType: 'unchanged',
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key],
    process: (obj1, obj2, key) => `  ${key}: ${obj1[key]}`,
  },
  {
    eventType: 'changed',
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key],
    process: (obj1, obj2, key) => `+ ${key}: ${obj2[key]}\n- ${key}: ${obj1[key]}`,
  },
];

const genDiff = (file1, file2) => {
  const data1 = fs.readFileSync(file1, 'utf8');
  const data2 = fs.readFileSync(file2, 'utf8');
  const extension = path.extname(file1);
  const obj1 = parse(extension)(data1);
  const obj2 = parse(extension)(data2);
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const getEvent = key => _.find(events, ({ check }) => check(obj1, obj2, key));
  const result = keys.reduce((acc, key) => {
    const build = getEvent(key).process;
    return [...acc, build(obj1, obj2, key)];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
