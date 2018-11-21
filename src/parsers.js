import yaml from 'js-yaml';

const selector = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default format => (data) => {
  const parse = selector[format];
  return parse(data);
};
