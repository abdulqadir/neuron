import React, {Component} from 'react';
import './Details.css';

export default class Details extends Component {
    renderEEN() {
        return (
        <div className="details col-12">
            {this.props.data.client.country && this.props.data.client.year_est && <div className="col mt-3"><b>Client: </b>From<b> {this.props.data.client.country} </b>in business since<b> {this.props.data.client.year_est}</b></div>}
            {this.props.data.stage_of_development && <div className="col mt-3"><b>Solution: </b>{this.props.data.stage_of_development}</div>}
            <div className="col mt-3">{this.props.data.description}</div>
        </div>
        );
    }

    renderUNOSSC() {
        return (
        <div className="details col-12">
            {this.props.data.mdg && <div className="col mt-3"><b>MDG: </b>{this.props.data.mdg}</div>}
            {this.props.data.url && <div className="col mt-3"><b>URL: </b><a href={this.props.data.url}>{this.props.data.url}</a></div>}
            <div className="col mt-3">{this.props.data.description}</div>
        </div>
        );
    }

    render() {
        if (this.props.data.source === 'EEN') {
            return this.renderEEN();
        }
        return this.renderUNOSSC();
    }
}