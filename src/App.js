import React, { Component } from 'react';
import './App.css';
import {
    Route,
    NavLink,
    BrowserRouter
    } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import HomePage from "./HomePage";
import MoviesPage from "./MoviesPage";
import CharacterList from "./CharacterList";
import CharacterPage from "./CharacterPage";

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://swapi.apis.guru/' }),
    cache: new InMemoryCache()
});

var root = 'http://www.melissadagley.com/starwarsapp';

class App extends Component {
    displayName: 'App';
  render() {
        return (
           <ApolloProvider client={client}>
              <BrowserRouter>
               <div id="wrapper">
                  <div id="menubar">
                     <ul>
                        <li><NavLink exact to={root+"/"}>Home</NavLink></li>
                        <li><NavLink exact to={root+"/movies"}>Browse Movies</NavLink></li>
                     </ul>
                  </div>
                  <Route exact path="/" component={HomePage}/>
                  <Route exact path="/movies" component={MoviesPage}/>
                  <Route exact path="/movies/:movieId/characters" component={CharacterList}/>
                  <Route exact path="/movies/:movieId/characters/:characterId" component={CharacterPage}/>
                </div>
            </BrowserRouter>
        </ApolloProvider>
    );
  }
}

export default App;
