import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import './movies.css';

function formatDate(props){
    var date = new Date(props);
    return(date.toLocaleDateString("en-US"));
}

class MoviesPage extends Component {
    displayName: 'Movies Page';
    render() {
        let { data } = this.props;

        if(data.loading) {
            return <div>Loading...</div>
        }

        else{

            console.log("Test Data: ", data);

            const movieList = data.allFilms.films.map((props) => (

                <div className="movie" key={props.episodeID}>

                            <div className="movietitle">
                                <NavLink to={"/movies/:"+props.id+""}><h3>{props.title}</h3></NavLink>
                            </div>

                            <img src={"/img/"+props.episodeID+".jpg"} className="moviesimg" alt={""+props.title+""} />

                            <div className="movietitle">
                                <h4>Released: {formatDate(props.releaseDate)}</h4>
                            </div>
        
                            <div className="link">
                                <NavLink to={"/movies/:"+props.id+"/characters"}>
                                    <div className="characterlink">
                                        <h3>Characters</h3>
                                    </div>
                               </NavLink>
                           </div>

                        </div>
                ));

        return(
            <div className="content">
                <h1>STAR WARS MOVIES</h1>
                <div className="wrapper ">
                    <div className="movieswrapper clearfix">
                        {movieList}
                    </div>
                </div>
            </div>
            );
        }
    }

}

                const moviesQuery = gql`
  query listFilms{ 
    allFilms
    {
      films
      {
        title,
        releaseDate,
        id,
        episodeID
        }
    } 
}
`;

        
const MoviesPageWithData = graphql(moviesQuery)(MoviesPage);

       
export default MoviesPageWithData;