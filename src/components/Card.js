import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
const Card = (movie) => {
    function nestedDataToString(data) {
        // Kiểm tra data nếu không phải là một mảng hoặc không có giá trị thì trả về chuỗi rỗng
        if (!Array.isArray(data) || data.length === 0) {
            return '';
        }

        // Lặp qua từng phần tử trong mảng data
        return data.map((item) => {
            // Nếu item không có key "name" thì trả về chuỗi rỗng
            if (!item.name) {
                return '';
            }
            // Trả về giá trị của key "name"
            return item.name;
        }).join(', ');
    }
    let genrelist = nestedDataToString(movie.info.genres);
    let productionlist = nestedDataToString(movie.info.production_companies);
    let img_path = "https://image.tmdb.org/t/p/w500";
    const [backgroundImg, setbackgroundImg] = useState("https://thumbs.dreamstime.com/b/end-summer-8267273.jpg")
    let backdropIMG = 'https://image.tmdb.org/t/p/original' + movie.info.poster_path;
    useEffect(() => {
        setbackgroundImg(backdropIMG);
        document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 1) 90%), url(${backgroundImg}) `;
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundSize = 'cover';
    })

    return (
        <>
            <div className="movie">
                <div className="row">
                    <div className="col-md-6 poster">
                        <img src={img_path + movie.info.poster_path} className="poster"></img>
                    </div>
                    <div className="col-md-6">
                        <div className="movie-details">
                            <div className="box">
                                <h4 className="title">{movie.info.title}</h4>
                                <p className="tagline">{movie.info.tagline}</p>
                                <p className="overview">{movie.info.overview}</p>
                                <p className="name">{genrelist}</p>
                                <p className="production">{productionlist}</p>
                            </div>
                            <div className="overview">
                                <div className="row">
                                    <div className="col-md-6">
                                        <span>Original Release:</span>
                                        <p className="release_date">{movie.info.release_date}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <span>Running Time:</span>
                                        <p className="runtime">{movie.info.runtime} mins</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <span>Vote Average:</span>
                                        <p className="vote_average">{movie.info.vote_average}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <span> Box Office:</span>
                                        <p className="vote_average">{movie.info.revenue}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card;