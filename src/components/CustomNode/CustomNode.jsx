import { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const sourceHandleStyleA = { left: -4 };
const sourceHandleStyleB = {
  right: -4,
  left: 'auto',
};

const CustomNode = ({ data, xPos, yPos }) => {
  console.log({data})
  return (
    <div style={{padding: "8px", border: "1px solid black", borderRadius: "8px"}}>
      {console.log(data.handles)}
      {data.handles && data.handles.targetHandles.map((h) => <Handle type="target" position={Position[h]} style={{ [h]: "-4px"}} isConnectable={true}/>)}
      {data.handles && data.handles.sourceHandles.map((h) => <Handle type="source" position={Position[h]} style={{ [h]: "-4px", background: "white", border: "1px solid black"}} isConnectable={true}/>)}
      <div>
        <div>
          <strong>{data.label}</strong>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomNode);
