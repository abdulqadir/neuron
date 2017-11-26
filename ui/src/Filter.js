import React, {Component} from 'react';
import './Filter.css';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.refilter = this.refilter.bind(this);
    }

    update() {
        if (this.props.counts.documents > 0) {
            if (this.props.filter.documents) {
                this.showDocuments.setAttribute('checked', true);
            }
        }
        else {
            this.showDocuments.setAttribute('disabled', true);
        }
        if (this.props.counts.business > 0) {
            if (this.props.filter.business) {
                this.showBusiness.setAttribute('checked', true);
            }
        }
        else {
            this.showBusiness.setAttribute('disabled', true);
        }
        if (this.props.counts.tech > 0) {
            if (this.props.filter.tech) {
                this.showTech.setAttribute('checked', true);
            }
        }
        else {
            this.showTech.setAttribute('disabled', true);
        }
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    refilter(e) {
        var filter = this.props.filter;
        if (e.target === this.showDocuments) {
            filter.documents = !filter.documents
        }
        if (e.target === this.showBusiness) {
            filter.business = !filter.business
        }
        if (e.target === this.showTech) {
            filter.tech = !filter.tech
        }
        this.props.results.setState({filter: filter});
    }

    render() {
        return (
            <div className="filter row mt-5">
                <div className="col-12 form-check form-check-inline">
                    <span style={{verticalAlign:'middle', marginRight: '0.53rem'}}>Show</span>
                    <label htmlFor="filterDocuments" className="form-check-label"><input type="checkbox" onClick={this.refilter} ref={(s)=>this.showDocuments=s} className="form-check-input" id="filterDocuments"/>Documents<span className="badge badge-warning">{this.props.counts.documents}</span></label>
                    <label htmlFor="filterBusiness" className="form-check-label"><input type="checkbox" onClick={this.refilter} ref={(s)=>this.showBusiness=s} className="form-check-input" id="filterBusiness"/>Business<span className="badge badge-warning">{this.props.counts.business}</span></label>
                    <label htmlFor="filterTech" className="form-check-label"><input type="checkbox" onClick={this.refilter} ref={(s)=>this.showTech=s} className="form-check-input" id="filterTech"/>Tech<span className="badge badge-warning">{this.props.counts.tech}</span></label>
                </div>
            </div>
        );
    }
}
