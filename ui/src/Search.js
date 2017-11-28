import React, {Component} from 'react';
import './Search.css';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.keydown = this.keydown.bind(this);
        this.search = this.search.bind(this);
    }

    keydown(e) {
        if (e.key === 'Enter') {
            this.search();
        }
    }

    search() {
        var query = this.query.value.trim();
        if (query === '') {
            return;
        }
        this.props.app.search(query);
    }

    renderCenter() {
        return (
            <div id="search">
                <h1>Neuron</h1>
                <div className="input-group">
                    <input ref={q=>this.query=q} type="text" className="form-control" onKeyDown={this.keydown}/>
                    <span role="img" aria-label="search" className="input-group-addon">&#x1f50d;</span>
                </div>
                <button className="btn btn-blue" onClick={this.search}>Search</button>
            </div>
        );
    }

    renderBar() {
        return (
            <div id="searchbar" className="navbar fixed-top">
                <div className="input-group">
                <span className="heading input-group-addon">Neuron</span>
                    <input ref={q=>this.query=q} type="text" className="form-control" onKeyDown={this.keydown}/>
                    <span className="input-group-button">
                        <button className="btn btn-blue" onClick={this.search}>Search</button>
                    </span>
                </div>
            </div>
        );
    }

    render() {
        if (this.props.type === 'center') {
            return this.renderCenter();
        } else {
            return this.renderBar();
        }
    }
}
