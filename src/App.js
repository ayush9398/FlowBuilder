import Flow from './components/Flow'
import { ReactFlowProvider } from 'reactflow'
import Sidebar from './components/Sidebar/Sidebar';
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">FlowBuilder</header>
      <Flow />
    </div>
  )
}

export default App
