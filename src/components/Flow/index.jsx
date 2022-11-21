import { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'reactflow'
import Settings from '../Settings/Settings'
import Sidebar from '../Sidebar/Sidebar'
import CustomNode from '../CustomNode/CustomNode'

// this is important! You need to import the styles from the lib to make it work
// import 'reactflow/dist/style.css'

import './Flow.css'
const nodeRecord = {
  custom: CustomNode
}
let id = 0;
const getId = () => `dndnode_${id++}`;

function Flow({ selectedNodeData, setSelectedNodeData, enableSettings }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodeTypes, setNodeTypes] = useState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null)

  const handleNodesChange = (changedNodes) => {
    changedNodes.forEach((node) => {
      if (node.selected) {
        const selectedNodeAvailable = nodes.filter((n) => n.id === id)[0]
        setSelectedNodeData(selectedNodeAvailable);
      }
    })
    onNodesChange(changedNodes);
  }
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const handleSettingsSubmit = (...vals) => {
    nodes.map((n) => {
      if (n.id !== selectedNodeData.id) {
        return n
      }
      return { ...n, ...vals }

    })
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop =
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow/type')
      const value = event.dataTransfer.getData('application/reactflow/value')
      const other = event.dataTransfer.getData('application/reactflow/handles')

      console.log({ type, value, other, c: JSON.parse(other) })
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: { label: value, handles: JSON.parse(other) },
      }

      setNodes((nds) => nds.concat(newNode))
    }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            onNodesChange={handleNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            nodeTypes={nodeRecord}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        {enableSettings ?
          <Settings selectedNodeData={selectedNodeData} onSubmit={handleSettingsSubmit} /> :
          <Sidebar nodeTypes={nodeTypes} setNodeTypes={setNodeTypes} />}
      </ReactFlowProvider>
    </div>
  )
}

export default Flow
