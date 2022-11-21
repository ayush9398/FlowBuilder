import React, { useState } from 'react';
import { Button } from 'antd';
import NodeBuilder from '../NodeBuilder';
export default ({ nodeTypes, setNodeTypes }) => {

  const [enableNodeBuild, setEnableNodeBuild] = useState(false)

  const onDragStart = (event, nodeType, nodeValue, handles) => {
    console.log({ nodeValue, nodeType, w: JSON.stringify({ handles }) })
    event.dataTransfer.setData('application/reactflow/value', nodeValue);
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/handles', JSON.stringify(handles));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleBuilderSubmit = (name, value, sourceHandles, targetHandles) => {
    setNodeTypes([...nodeTypes, { name, value, sourceHandles, targetHandles }]);
    setEnableNodeBuild(false)
  }

  return (
    <aside>
      {enableNodeBuild ?
        (
          <>
            <NodeBuilder nodeTypes={nodeTypes} handleSubmit={handleBuilderSubmit} />
          </>
        )
        : (
          <>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            {nodeTypes.map((n) => {
              console.log({n})
              return (<div className="dndnode ddd" onDragStart={(event) => onDragStart(event, n.name, n.value, {sourceHandles: n.sourceHandles, targetHandles: n.targetHandles})} draggable>
                {n.name}
              </div>)
            })}
            <Button onClick={() => setEnableNodeBuild(true)}> Add New Node Type</Button>
          </>
        )}

    </aside>
  );
};
