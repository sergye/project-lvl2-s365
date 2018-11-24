import _ from 'lodash';

const events = [
  {
    eventType: 'nested',
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])),
    process: (obj1, obj2, func) => ({ children: func(obj1, obj2) }),
  },
  {
    eventType: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (obj1, obj2) => ({ value: obj2 }),
  },
  {
    eventType: 'removed',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: obj1 => ({ value: obj1 }),
  },
  {
    eventType: 'unchanged',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) && (obj1[key] === obj2[key]),
    process: obj1 => ({ value: obj1 }),
  },
  {
    eventType: 'modified',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) && (obj1[key] !== obj2[key]),
    process: (obj1, obj2) => ({ before: obj1, after: obj2 }),
  },
];

const getAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const { eventType, process } = events.find(({ check }) => check(obj1, obj2, key));
    const node = process(obj1[key], obj2[key], getAST);
    return { key, eventType, ...node };
  });
};

export default getAST;
