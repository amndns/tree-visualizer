// // Component Heirarchy

// <App>
//   <EmptyPlayground></EmptyPlayground>
//   <TreePlayground>
//     <OverlayComponent>
//       <DefaultView></DefaultView>
//       <VisualizationView></VisualizationView>
//       <NodeUpdateView></NodeUpdateView>
//     </OverlayComponent>
//     <TreeView>
//       <Tree></Tree>
//     </TreeView>
//   </TreePlayground>
// </App>

// Datastore Models
// store = {
//   Object Tree,
//   Object Visualization,
// }

// Tree Store

// interface Tree {
//   status: TreeStatus('idle', 'edit', 'visualizing'),
//   data: TreeData,
//   selectedNodeLocation?: String,
// }

// interface TreeData {
//   name: String,
//   location: String,
//   type: NodeType('node', 'plus'),
//   nodeSvgShape: {
//     shape: String,
//     shapeProps: {
//       r: Number,
//       strokeWidth: Number,
//       fill: String,
//       visibility: Visibility('hidden', 'visible')
//     }
//   },
//   children: Tree[]
// }

// Tree Actions

// LOAD_TREE_DATA
// SAVE_TREE_DATA
// UPDATE_TREE (status, data, selectedNodeLocation)

// Tree Helpers

// serializeTree
// deserializeTree

// checkNodeOpenStatus
// deselectNode
// deselectNodeByPath?
// deselectAllNodes?

// selectNode
// deleteNode

// interface Visualization {
//   status: VisualizationStatus('running', 'paused', 'idle'),
//   traversalPath: Traversal[],
//   traversalPathIndex: Number,
// }

// interface Traversal {
//   location: String,
//   action: TraversalAction('traverse', 'visit'),
// }

// UPDATE_VISUALIZATION (status, traversalPath, traversalPathIndex)

// Visualiztion Helpers

// traverseNode
// visitNode

// Algorithms

// visualizeBFS
// visualizePreorder
// visualizeInorder
// visualizePostorder
