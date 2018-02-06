import React, { Component } from 'react';
import './home.css';

class HomePage extends Component {
    displayName: 'Home Page';
    render() {
        return (
            <div className="content home clearfix">
                <h1>Star Wars Movie Explorer</h1>
                <h2>Explore the graphql Star Wars movie database!</h2>
                <a href="/movies">EXPLORE FILMS</a>
            </div>
            );
    }
}

export default HomePage;