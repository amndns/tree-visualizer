import { cloneDeep } from 'lodash-es';

import {
  NodeTypes,
  NodeVisibility,
  StrictNodeSvgShape,
  TreeData,
} from 'datastore/collections/tree/tree.model';

/**
 * Supported character count for tree node value;
 */
export const MAX_NODE_VALUE_CHAR_COUNT = 3;

/**
 * Supported tree is only a binary tree.
 */
export const MAX_TREE_CHILDREN_COUNT = 2;

/**
 * Path to the root node.
 */
export const ROOT_NODE_LOCATION = '';

/**
 * Style for an unselected regular node. Friendly reminder to
 * deep clone the constant to avoid any accidental updates.
 */
export const REGULAR_NODE_SVG_STYLE: Readonly<StrictNodeSvgShape> = {
  shape: 'circle',
  shapeProps: {
    r: 30,
    fill: '#FFFFFF',
  },
};

/**
 * Style for a visible 'plus' node. Friendly reminder to deep
 * clone the constant to avoid any accidental updates.
 */
export const VISIBLE_PLUS_NODE_SVG_STYLE: Readonly<StrictNodeSvgShape> = {
  shape: 'circle',
  shapeProps: {
    r: 20,
    strokeWidth: 1,
    fill: '#FFFFFF',
    visibility: NodeVisibility.Visible,
  },
};

/**
 * Style for a hidden 'plus' node. Friendly reminder to deep
 * clone the constant to avoid any accidental updates.
 */
export const HIDDEN_PLUS_NODE_SVG_STYLE: Readonly<StrictNodeSvgShape> = {
  shape: 'circle',
  shapeProps: {
    r: 20,
    strokeWidth: 1,
    fill: '#FFFFFF',
    visibility: NodeVisibility.Hidden,
  },
};

/**
 * Style indicator that a node has been toggled or selected. Friendly
 * reminder to deep clone the constant to avoid any accidental updates.
 */
export const SELECTED_NODE_SVG_STYLE: Readonly<StrictNodeSvgShape> = {
  shape: 'circle',
  shapeProps: {
    r: 30,
    stroke: '#003a8c',
    strokeWidth: 10,
    fill: '#FFFFFF',
    visibility: NodeVisibility.Visible,
  },
};

/**
 * Initial root node of a tree.
 */
export const INITIAL_ROOT_NODE: TreeData = {
  name: '0',
  location: '',
  type: NodeTypes.Regular,
  nodeSvgShape: cloneDeep(REGULAR_NODE_SVG_STYLE),
};
