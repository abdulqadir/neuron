import React, { Component } from 'react';
import './App.css';
import Background from './Background';
import Search from './Search';
import Results from './Results';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.apiserver = 'https://neuronapi.aqrashik.com/';
        this.state = {};
        this.pingapi = this.pingapi.bind(this);
    }

    componentDidMount() {
        this.pingapi();
        window.setInterval(this.pingapi, 53 * 1000);
    }

    pingapi() {
        window.fetch(this.apiserver + 'keepalive/').then((r) => r.text());
    }

    search(query) {
        this.setState({query: query});
    }

    render() {
        return (
            <div>
                <Background />
                <div className="container">
                    {this.state.query?
                    (
                        <div className="content">
                            <Search type="bar" app={this}/>
                            <Results query={this.state.query} app={this}/>
                        </div>
                    ):(
                        <Search type="center" app={this}/>
                    )
                    }
                </div>
            </div>
        );
    }
}
