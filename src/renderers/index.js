import treeRender from './treeRenderer';
import plainRender from './plainRenderer';

const renderers = {
  tree: treeRender,
  plain: plainRender,
};

const getRenderer = format => renderers[format];

export default getRenderer;
