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
  const getFromTo = node => `. From ${getValue(node.before)} to ${getValue(node.after)}`;
  const getAddStr = node => (_.isObject(node.value) ? ' with complex value' : ` with value: ${getValue(node.value)}`);
  const cases = {
    nested: node => `${plainRender(node.children, `${parent}${node.key}.`)}`,
    modified: node => `Property '${parent}${node.key}' was ${node.nodeType}${getFromTo(node)}`,
    added: node => `Property '${parent}${node.key}' was ${node.nodeType}${getAddStr(node)}`,
    removed: node => `Property '${parent}${node.key}' was ${node.nodeType}`,
  };

  const filtered = ast.filter(node => node.nodeType !== 'unchanged');
  return filtered.map(node => cases[node.nodeType](node)).join('\n');
};

export default plainRender;
