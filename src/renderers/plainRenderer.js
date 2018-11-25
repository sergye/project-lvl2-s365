import _ from 'lodash';

const getValue = (arg) => {
  const types = {
    boolean: (`'${arg}'`),
    string: (`'${arg}'`),
    object: 'complex value',
  };
  return types[typeof arg];
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
