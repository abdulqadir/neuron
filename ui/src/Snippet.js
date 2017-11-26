import React, {Component} from 'react';
import './Snippet.css';
import Details from './Details';

export default class Snippet extends Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
        this.more = this.more.bind(this);
        this.less = this.less.bind(this);
    }

    componentDidMount() {
        this.snippetDiv.innerHTML = (this.props.snippet.snippet);
    }

    more(e) {
        e.preventDefault();
        this.setState({expanded: true});
    }

    less(e) {
        e.preventDefault();
        this.setState({expanded: false});
    }

    smallType() {
        if (this.props.snippet.type === 'Document') {
            return <div className="type-small bg-document"><i className="fa fa-map-o mr-2"></i>Document</div>;
        }
        if (this.props.snippet.type.substring(0,3) === 'Bus') {
            return <div className="type-small bg-business"><i className="fa fa-handshake-o mr-2"></i>Business</div>;
        }
        return <div className="type-small bg-tech"><i className="fa fa-rocket mr-2"></i>Tech</div>;
    }

    bigType() {
        if (this.props.snippet.type === 'Document') {
            return <div className="type bg-document"><i className="fa fa-map-o fa-2x"></i><br/>Document</div>;
        }
        if (this.props.snippet.type.substring(0,3) === 'Bus') {
            return <div className="type bg-business"><i className="fa fa-handshake-o fa-2x"></i><br/>Business</div>;
        }
        return <div className="type bg-tech"><i className="fa fa-rocket fa-2x"></i><br/>Tech</div>;
    }

    load() {
        var snippet = this;
        window.fetch(this.props.app.apiserver + 'data?id=' + window.encodeURIComponent(this.props.snippet.id))
        .then(function(resp) {
            if (resp.status === 200) {
                return resp.json();
            }
            snippet.setState({error:true});
        }).then(function(json) {
            snippet.setState({data: json});
        }).catch(function() {
            snippet.setState({error:true});
        });
    }

    expand() {
        if (typeof this.state.data === 'undefined') {
            this.load();
            return <div className="col-12">
                <i className="fa fa-pulse fa-spinner fa-fw fa-2x mx-auto mt-4 mb-4" style={{display:'block'}}></i>
            </div>;
        }
        return <Details data={this.state.data} />
    }

    render() {
        return (
            <div className="snippet row mt-4 mb-3" style={this.props.style}>
                <div className="col-12 d-md-none">{this.smallType()}</div>
                <div className="col-12 col-md-10">
                    <div className="col-12 title">{this.props.snippet.title}</div>
                    <div className="col-12 quote mt-2 mb-2" ref={s=>this.snippetDiv=s}></div>
                </div>
                <div className="d-none d-md-block col-md-2">{this.bigType()}</div>
                {this.state.expanded && this.expand()}
                <div className="col-12 more">
                    {this.state.expanded?
                    <a href="#less" onClick={this.less}>Less...</a>
                    :
                    <a href="#more" onClick={this.more}>More...</a>
                    }
                </div>
            </div>
        );
    }
}
