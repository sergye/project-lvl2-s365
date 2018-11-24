import _ from 'lodash';

const stringify = (value, depth = 1, tab = 4) => {
  const indent = depth * tab;
  if (!_.isObject(value)) {
    return value;
  }
  const body = Object.keys(value)
    .map(key => `${' '.repeat(indent)}${key}: ${stringify(value[key], depth + 1)}`)
    .join('\n');
  return `{\n${body}\n${' '.repeat(indent - tab)}}`;
};

const treeRender = (ast, depth = 1, tab = 4) => {
  const indent = depth * tab;

  const getStr = (name, value, symb = ' ') => (
    `${' '.repeat(indent - 2)}${symb} ${name}: ${stringify(value, depth + 1)}`);

  const cases = {
    added: node => getStr(node.key, node.value, '+'),
    removed: node => getStr(node.key, node.value, '-'),
    unchanged: node => getStr(node.key, node.value),
    modified: node => [getStr(node.key, node.after, '+'), getStr(node.key, node.before, '-')],
    nested: node => `${' '.repeat(indent)}${node.key}: ${treeRender(node.children, depth + 1)}`,
  };

  const output = _.flatten(ast.map(node => cases[node.nodeType](node))).join('\n');
  return `{\n${output}\n${' '.repeat(indent - tab)}}`;
};

export default treeRender;
