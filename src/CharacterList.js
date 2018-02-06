import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import './characters.css';

function getClass(props) {
    if(props%2 === 1){
        return "evenCharacter";
    }

    else return "oddCharacter";
}

class CharacterList extends Component {
    displayName: 'Character List';
    render() {

        let { data } = this.props;

        if(data.loading) {
            return <div>Loading...</div>
        }
        else {
            console.log("Character: ", data);

            const characterList = data.film.characterConnection.characters.map((props, i) => (
     
               <NavLink exact to={"/movies/:"+data.film.id+"/characters/"+props.id+""} key={""+props.id+""}>
                   <li >
                       <div className="character">
                           <img src="/img/profile-placeholder-image.jpg" className="smallprofileimg" alt="profile placeholder"/>
                           <h3  className={getClass(i)}>{props.name}</h3>
                       </div>
                   </li>
               </NavLink>
                    
                    
            ));
        return(
            <div className="content">
                <h1>CHARACTERS</h1>

                <div className="wrapper">
                    <div className="arrowwrapper">
                        <NavLink exact to="/movies">
                            <div className="arrow"></div>
                        </NavLink>
                    </div>

                    <div className="characterswrapper">
                        <div className="characters">
                            <h2>{data.film.title}</h2>

                            <ul>
                                {characterList}
                            </ul>
                        </div>
                    </div>

                    <div className="spacer"></div>
                </div>
            </div>


            );
          }
        }
     }

                const charactersQuery = gql`
  query listCharacters($filmid: ID!){ 
    film(id: $filmid) {
    title,
    id
    characterConnection {
      characters {
        name,
        id
            }
        }
    } 
}
`;

        /**
         * Connect the GraphQL query with our MoviesPage component
         */
                const CharacterListWithData = graphql(charactersQuery, {
                    options: (props) => ({
                        variables: {
                            filmid: props.match.params.movieId
                        }
                    })
                })(CharacterList);
       
                

        /**
         * Export our component that is connected to Apollo
         */
export default CharacterListWithData;
