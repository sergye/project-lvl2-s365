import yaml from 'js-yaml';
import ini from 'ini';

const selector = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default format => (data) => {
  const parse = selector[format];
  return parse(data);
};
