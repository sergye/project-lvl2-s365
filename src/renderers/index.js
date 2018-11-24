import treeRender from './treeRenderer';
import plainRender from './plainRenderer';
import jsonRender from './jsonRenderer';

const renderers = {
  tree: treeRender,
  plain: plainRender,
  json: jsonRender,
};

const getRenderer = format => renderers[format];

export default getRenderer;
