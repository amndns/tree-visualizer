import React from 'react';

const ADD_NODE_CONTENT = (
  <ol>
    <li>Click on a leaf node or a node with incomplete children.</li>
    <li>
      Click on the <strong>&quot;+&quot;</strong> node under the selected node.
    </li>
    <li>Voila! A new node has been created.</li>
  </ol>
);

const EDIT_NODE_CONTENT = (
  <ol>
    <li>Click on the node you want to edit.</li>
    <li>
      Type a new number in the input on the top right corner of the screen.
    </li>
    <li>
      Click <strong>&quot;Edit Node&quot;</strong> on the top left corner of the
      screen.
    </li>
    <li>Voila! The node value has been updated.</li>
  </ol>
);

export const TUTORIAL_CONTENT = [
  {
    title: 'Add a new Node',
    content: ADD_NODE_CONTENT,
  },
  {
    title: 'Edit a Node Value',
    content: EDIT_NODE_CONTENT,
  },
];

export const MAX_PAGE = TUTORIAL_CONTENT.length - 1;
