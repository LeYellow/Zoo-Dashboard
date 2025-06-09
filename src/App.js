import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './pages/home';
import AnimalsPage from './pages/animals';
import AboutPage from './pages/about';
import MapPage from './pages/map';
import LocationPage from "./pages/location";
import NewsPage from './pages/news';
import NewsTemplate from '../src/news-articles/news-template';

function App() {
  document.title = 'Zoo Dashboard';
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/animals" element={<AnimalsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:artID/:title" element={<NewsTemplate />} />
      </Routes>
    </Router>
  );
}

export default App;
