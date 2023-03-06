import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Card from "./Card";
import Bloodhound from "bloodhound-js";
import $ from "jquery";
import "typeahead.js";
import "./Main.css"
const Main = (props) => {
    const [search, setSearch] = useState("");
    const typeaheadRef = useRef(null);
    const [data, setData] = useState([])
    useEffect(() => {
        const suggests = new Bloodhound({
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url:
                    "https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716",
                replace: function (url, query) {
                    return url.replace("%QUERY", query + "*");
                },
                filter: function (movies) {
                    return $.map(movies.results, function (movie) {
                        return {
                            value: movie.original_title,
                            id: movie.id,
                        };
                    });
                },
            },
        });
        $(typeaheadRef.current)
            .typeahead(
                {
                    hint: true,
                    highlight: true,
                    minLength: 2,
                },
                {
                    source: suggests.ttAdapter(),
                }
            )
            .on("typeahead:selected", function (obj, datum) {
                handleSelectedMovie(datum.id);
            });
    }, []);
    const handleSelectedMovie = (id, name) => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?&api_key=cfe422613b250f702980a3bbf9e90716`)
            .then((response) => {
                setData(response.data);
                // Do something with the movie data
                console.log(response.data);
                setSearch(name || '')
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className='col-md-6'>

                    </div>
                    <div className='col-md-6'>
                        <form className="searchbox" >
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                ref={typeaheadRef}
                                className="searchbox__input typeahead form-control"
                                type="text"
                                placeholder="Search Movie Title..."
                                id="q"
                            />
                        </form>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-ms-12'>
                        {
                            <Card info={data} />
                        }
                    </div>
                </div>
            </div>

        </>
    );
}

export default Main