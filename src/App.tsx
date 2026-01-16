import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CodeRunner from './pages/CodeRunner';
import './App.css';

function App() {
  return (
    <Router basename="/ai-project">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools/code-runner" element={<CodeRunner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
