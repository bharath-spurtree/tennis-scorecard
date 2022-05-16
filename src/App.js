import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddGame from './components/CreateGame/CreateGame';
import GameBoard from './components/GameBoard/GameBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/board" element={<GameBoard />} />
        <Route path="/" element={<AddGame />} />
      </Routes>
    </Router>
  );
}

export default App;
