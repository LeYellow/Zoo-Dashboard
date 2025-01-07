import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WelcomePage from './pages/welcome';
import HomePage from './pages/home';
import AboutPage from './pages/about';

function App() {
  const [view, setView] = useState('HOME');
  document.title = 'Zoo Dashboard';
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
