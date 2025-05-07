import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WelcomePage from './pages/welcome';
import HomePage from './pages/home';
import AnimalsPage from './pages/animals';
import AboutPage from './pages/about';
import MapPage from './pages/map';
import NewsPage from './pages/news';

function App() {
  document.title = 'Zoo Dashboard';
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/animals" element={<AnimalsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
