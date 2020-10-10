import {
  NodeVisibility,
  StrictNodeSvgShape,
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
 * Style for a 'plus' node. Friendly reminder to deep clone
 * the constant to avoid any accidental updates.
 */
export const PLUS_NODE_SVG_STYLE: Readonly<StrictNodeSvgShape> = {
  shape: 'circle',
  shapeProps: {
    r: 20,
    strokeWidth: 1,
    fill: '#FFFFFF',
    visibility: NodeVisibility.Visible,
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
    stroke: 'red', // CHANGE_ME
    strokeWidth: 10,
    fill: '#FFFFFF',
    visibility: NodeVisibility.Visible,
  },
};
