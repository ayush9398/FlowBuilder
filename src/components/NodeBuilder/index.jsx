import React, { useEffect, useState } from 'react';
import { Button, Input, Checkbox } from 'antd';
import { Position } from 'reactflow'

export default ({ nodeTypes, handleSubmit }) => {

  const [name, setName] = useState("");
  const [defaultValue, setDefaultValue] = useState();
  const [selectedSourceHandles, setSelectedSourceHandles] = useState([]);
  const [selectedTargetHandles, setSelectedTargetHandles] = useState([]);

  const handleFormSubmit = () =>{
    handleSubmit(name, defaultValue, selectedSourceHandles, selectedTargetHandles)
  }


  return (
    <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
      <Input placeholder="Enter type name" value={name} onChange={(e) => setName(e.target.value)} />
      {nodeTypes.map((n)=> n.name).includes(name) && <span style={{color: "red"}}> This name is already taken.</span>}
      <Input placeholder="Enter default value" value={defaultValue} onChange={(e)=>setDefaultValue(e.target.value)} />
      <p>Select Source Handles</p>
      <Checkbox.Group options={["Left", "Right", "Top", "Bottom"].filter((t) => !selectedTargetHandles.includes(t)).map((handleType) => ({ label: handleType, value: handleType }))} onChange={setSelectedSourceHandles} />
      <p>Select Target Handles</p>
      <Checkbox.Group options={["Left", "Right", "Top", "Bottom"].filter((t) => !selectedSourceHandles.includes(t)).map((handleType) => ({ label: handleType, value: handleType }))} onChange={setSelectedTargetHandles} />
      <Button type="primary" onClick={handleFormSubmit} disabled={!name || nodeTypes.map((n)=> n.name).includes(name) || selectedSourceHandles.length === 0 || selectedTargetHandles.length === 0}>Submit</Button>

    </div>
  );
};
