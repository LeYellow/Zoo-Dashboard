import "./NewsCard.css";
import { useNavigate } from 'react-router-dom';
import placePic from "../resources/ph-img-wide.png";

function NewsCard({id, title, subtitle, date, img}) {
    const navigate = useNavigate();
    const handleRedirect = () => {navigate("/news/"+ id + "/" + title)}

    return (
        <div className="news">
            <div className="news-photo">
                <p>{date}</p>
                {img ? (
                    <img src={`http://localhost/ZooDashboard/extResources/News/${img}`} alt="front-pic"/>
                ) : (
                    <img src={placePic} alt="news-pic"/>
                )}
            </div>
            <h1 className="news-title">{title}</h1>
            <p className="news-subtitle">{subtitle}</p>
            <h6 className="news-button" onClick={handleRedirect}>Read More →</h6>
        </div>
    );

}

export default NewsCard;