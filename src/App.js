import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WelcomePage from './pages/welcome';
import HomePage from './pages/home';
import AnimalsPage from './pages/animals';
import AboutPage from './pages/about';
import MapPage from './pages/map';
import NewsPage from './pages/news';
import NewsTemplate from '../src/news-articles/news-template';

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
        <Route path="/news/:artID/:title" element={<NewsTemplate />} />
      </Routes>
    </Router>
  );
}

export default App;
