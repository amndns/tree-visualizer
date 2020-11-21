import React from 'react';

import addNodeVideo from 'assets/videos/tutorials/addNode.mp4';
import deleteNodeVideo from 'assets/videos/tutorials/deleteNode.mp4';
import deleteTreeVideo from 'assets/videos/tutorials/deleteTree.mp4';
import editNodeVideo from 'assets/videos/tutorials/editNode.mp4';
import copyTreeVideo from 'assets/videos/tutorials/copyTree.mp4';
import traversalAlgorithmsVideo from 'assets/videos/tutorials/traversalAlgorithms.mp4';
import visualizingAlgorithmsVideo from 'assets/videos/tutorials/visualizingAlgorithms.mp4';

import './TutorialContent.scss';

const CONTENT_VIDEO_HEIGHT = 273; // in pixels

const ADD_NODE_CONTENT = (
  <div className="tutorial-content">
    <ol>
      <li>Click on a leaf node or a node with incomplete children.</li>
      <li>
        Click on the <strong>&quot;+&quot;</strong> node under the selected
        node.
      </li>
      <li>Voila! A new node has been created.</li>
    </ol>
    <div className="tutorial-content-video">
      <div className="tutorial-content-video-background" />
      <video key="add-node" loop autoPlay muted height={CONTENT_VIDEO_HEIGHT}>
        <source src={addNodeVideo} type="video/mp4" />
      </video>
    </div>
  </div>
);

const EDIT_NODE_CONTENT = (
  <div className="tutorial-content">
    <ol>
      <li>Click on the node you want to edit.</li>
      <li>
        Type a new number in the input on the top right corner of the screen.
      </li>
      <li>
        Click <strong>&quot;Edit Node&quot;</strong> on the top left corner of
        the screen.
      </li>
      <li>Voila! The node value has been updated.</li>
    </ol>
    <div className="tutorial-content-video">
      <div className="tutorial-content-video-background" />
      <video key="edit-node" loop autoPlay muted height={CONTENT_VIDEO_HEIGHT}>
        <source src={editNodeVideo} type="video/mp4" />
      </video>
    </div>
  </div>
);

const DELETE_NODE_CONTENT = (
  <div className="tutorial-content">
    <ol>
      <li>Click on the node you want to delete.</li>
      <li>
        Click <strong>&quot;Delete Node&quot;</strong>on the top left corner of
        the screen.
      </li>
      <li>Voila! The node and its descendants has been deleted.</li>
    </ol>
    <div className="tutorial-content-video">
      <div className="tutorial-content-video-background" />
      <video
        key="delete-node"
        loop
        autoPlay
        muted
        height={CONTENT_VIDEO_HEIGHT}
      >
        <source src={deleteNodeVideo} type="video/mp4" />
      </video>
    </div>
  </div>
);

const COPY_TREE_CONTENT = (
  <div className="tutorial-content">
    <ol>
      <li>Click the copy icon button on the top right corner of the screen.</li>
      <li>
        Voila! A LeetCode version of the tree has been copied to your clipboard.
        You can directly paste it on any of the LeetCode tree problems.
      </li>
    </ol>
    <div className="tutorial-content-video">
      <div className="tutorial-content-video-background" />
      <video key="save-tree" loop autoPlay muted height={CONTENT_VIDEO_HEIGHT}>
        <source src={copyTreeVideo} type="video/mp4" />
      </video>
    </div>
  </div>
);

const DELETE_TREE_CONTENT = (
  <div className="tutorial-content">
    <ol>
      <li>
        Click the delete icon button on the top right corner of the screen.
      </li>
      <li>
        Voila! The tree has been destroyed and has been reset into a single root
        node.
      </li>
      <li>
        Note that you can achieve the same behavior when you delete the root
        node of your tree.
      </li>
    </ol>
    <div className="tutorial-content-video">
      <div className="tutorial-content-video-background" />
      <video
        key="delete-tree"
        loop
        autoPlay
        muted
        height={CONTENT_VIDEO_HEIGHT}
      >
        <source src={deleteTreeVideo} type="video/mp4" />
      </video>
    </div>
  </div>
);

const TRAVERSAL_ALGORITHMS_CONTENT = (
  <div className="tutorial-content">
    <ul>
      <li>
        <strong>Level-order</strong> - process nodes per depth from left to
        right
      </li>
      <li>
        <strong>Pre-order</strong> - process node, traverse left subtree,
        traverse right subtree
      </li>
      <li>
        <strong>In-order</strong> - traverse left subtree, process node,
        traverse right subtree
      </li>
      <li>
        <strong>Post-order</strong> - traverse left subtree, traverse right
        subtree, process node
      </li>
    </ul>
    <div className="tutorial-content-video">
      <div className="tutorial-content-video-background" />
      <video
        key="traversal-algorithms"
        loop
        autoPlay
        muted
        height={CONTENT_VIDEO_HEIGHT}
      >
        <source src={traversalAlgorithmsVideo} type="video/mp4" />
      </video>
    </div>
  </div>
);

const VISUALIZING_ALGORITHMS_CONTENT = (
  <div className="tutorial-content">
    <ol>
      <li>
        Select the traversal algorithm and the algorithm speed via the dropdowns
        on the top left corner of the screen.
      </li>
      <li>
        To start the animation, simply click on the{' '}
        <strong>&quot;Visualize ...&quot;</strong> button.
      </li>
      <li>
        Voila! The animation is now playing! You can also find more about the
        animation colors on the bottom left corner of the screen.
      </li>
    </ol>
    <div className="tutorial-content-video">
      <div className="tutorial-content-video-background" />
      <video
        key="visualizing-algorithms"
        loop
        autoPlay
        muted
        height={CONTENT_VIDEO_HEIGHT}
      >
        <source src={visualizingAlgorithmsVideo} type="video/mp4" />
      </video>
    </div>
  </div>
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
  {
    title: 'Delete a Node and its Children',
    content: DELETE_NODE_CONTENT,
  },
  {
    title: 'Copy the Tree',
    content: COPY_TREE_CONTENT,
  },
  {
    title: 'Delete the Tree',
    content: DELETE_TREE_CONTENT,
  },
  {
    title: 'Traversal Algorithms',
    content: TRAVERSAL_ALGORITHMS_CONTENT,
  },
  {
    title: 'Visualizing the Algorithms',
    content: VISUALIZING_ALGORITHMS_CONTENT,
  },
];

export const MAX_PAGE = TUTORIAL_CONTENT.length - 1;
