import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
 
import './profile.css';

function getSpecies(props){
if(props !== null) {
    return(props.name);
    }
    else{
        return("Human");
    }
}

class CharacterPage extends Component {

    displayName: "Character Page";
    render() {

        let {data} = this.props;
        let movieId = this.props.match.params.movieId;

        if(data.loading){
            return <div>Loading...</div>
        }
        else{

            const ProfileCard = (
            <div className="profilecard">
                            <div className="leftsidebar">
                            <img src="/img/profile-placeholder-image.jpg" alt="profile placeholder" className="profileimg" />
                            <h3 className="nofloat">ID: {data.person.id}</h3>
                            </div>
                            <div className="characterinfo">
                                <div className="left">
                                <ul>
                                <li><h2>Name:</h2><span className="profile"> {data.person.name}</span></li>
                                <li className="even"><h2>Birth Year:</h2><span className="profile"> {data.person.birthYear}</span></li>
                                <li><h2>Gender:</h2><span className="profile"> {data.person.gender}</span></li>
                                <li className='even'><h2>Species:</h2><span className="profile"> {getSpecies(data.person.species)}</span></li>
                                <li><h2>Homeworld:</h2><span className="profile"> {data.person.homeworld.name}</span></li>
                                </ul>
                                </div>
                                <div className="right">
                                <ul>
                                    <li><h4>Height:</h4><span className="profile"> {data.person.height} cm</span></li>
                                    <li><h4>Eye Color:</h4><span className="profile"> {data.person.eyeColor} </span></li>
                                    <li><h4>Hair Color:</h4><span className="profile"> {data.person.hairColor} </span></li>
                                    <li><h4>Mass:</h4><span className="profile"> {data.person.mass} kg </span></li>
                                    <li><h4>Skin Color:</h4><span className="profile"> {data.person.skinColor} </span></li>
                                </ul>
                                </div>
                            </div>
                        </div>
                );

                                return(
                                    <div className="content">
                                     <h1>Character Profile</h1>
                                        <div className="wrapper">
                   
                                            <div className="arrowwrapper">
                                                <NavLink exact to={"/movies/:"+movieId+"/characters"}>
                                                    <div className="arrow"></div>
                                                </NavLink>
                                            </div>
                                {ProfileCard}
                                            <div className="spacer"></div>

                                        </div>
                                    </div>

                                    );
                                            }
                                        }
                            }

const characterQuery = gql`
  query characterProfile($characterid: ID) {
  person(id: $characterid) {
    name,
    birthYear,
    eyeColor,
    gender,
    hairColor,
    height,
    mass,
    skinColor,
    id,
    homeworld {
      name
}
    species {
      name
}
}
}
`;

const CharacterPageWithData = graphql(characterQuery, {
    options: (props) => ({
        variables: {
            characterid: props.match.params.characterId,
            filmid: props.match.params.movieId
        }
    })
})(CharacterPage);
 
export default CharacterPageWithData;