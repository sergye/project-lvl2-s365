import _ from 'lodash';

const types = [
  {
    check: arg => (_.isBoolean(arg)),
    process: arg => (`'${arg}'`),
  },
  {
    check: arg => (_.isString(arg)),
    process: arg => (`'${arg}'`),
  },
  {
    check: arg => (_.isObject(arg)),
    process: () => 'complex value',
  },
];

const getTypes = arg => types.find(({ check }) => check(arg));

const getValue = (arg) => {
  const { process } = getTypes(arg);
  return process(arg);
};

const plainRender = (ast, parent = '') => {
  const getStr = (node, body = '') => `Property '${parent}${node.key}' was ${node.nodeType}${body}`;

  const cases = {
    nested: node => `${plainRender(node.children, `${parent}${node.key}.`)}`,
    modified: (node) => {
      const body = `. From ${getValue(node.before)} to ${getValue(node.after)}`;
      return getStr(node, body);
    },
    added: (node) => {
      const stringify = ` with ${_.isObject(node.value)
        ? 'complex value'
        : `value: ${getValue(node.value)}`}`;
      return getStr(node, stringify);
    },
    removed: node => getStr(node),
  };

  const filtered = ast.filter(node => node.nodeType !== 'unchanged');
  return filtered.map(node => cases[node.nodeType](node)).join('\n');
};

export default plainRender;
