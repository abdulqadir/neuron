import React, { Component } from 'react';
import './Results.css'
import Filter from './Filter';
import Snippet from './Snippet';

export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {query: this.props.query, loading: true, error: false,
            filter: {
                documents:true,
                business:true,
                tech:true
            }
        };
    }

    componentDidMount() {
        this.load();
    }

    load() {
        var results = this;
        var counts = {documents:0, business: 0, tech: 0};
        window.fetch(this.props.app.apiserver + 'search?query=' + window.encodeURIComponent(this.props.query)
        ).then(function(resp) {
            if (resp.status === 200) {
                return resp.json();
            }
            results.setState({loading: false, error: true, counts: undefined});
        }).then(function(json) {
            json.forEach((r)=>{
                if (r.type === 'Document') {
                    counts.documents += 1;
                }
                else if (r.type.substring(0,3) === 'Bus') {
                    counts.business += 1;
                }
                else {
                    counts.tech += 1;
                }
            });
            results.setState({loading: false, query: results.props.query, results:json, counts: counts});
        }).catch( function(e) {
            results.setState({loading: false, error: true, counts: undefined});
        });
    }

    componentDidUpdate() {
        if (this.props.query !== this.state.query) {
            this.setState({query: this.props.query, loading: true, error: false, results:null});
            this.load();
        }
    }

    visibility(type) {
        var v;
        if (type === 'Document') {
            v = this.state.filter.documents;
        }
        else if (type.substring(0,3) === 'Bus') {
            v = this.state.filter.business;
        }
        else {
            v = this.state.filter.tech;
        }
        return v?'flex':'none';
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="results-loading mt-5 mx-auto">
                    <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                </div>
            );
        }
        return (
            <div>
            {this.state.counts &&
            <Filter filter={this.state.filter} counts={this.state.counts} results={this}/>
            }
            <div className="results mt-5">
                {this.state.results && this.state.results.map(r=><Snippet key={r.id} snippet={r} app={this.props.app} style={{display:this.visibility(r.type)}}/>)}
                {this.state.results && this.state.results.length === 0 &&
                    <div className="no-results mt-5 mx-auto">
                        No results found
                    </div>
                }
                {this.state.error &&
                    <div className="no-results mt-5 mx-auto">
                        Server error. Please try again.
                    </div>
                }
            </div>
            </div>
        );
    }
}
