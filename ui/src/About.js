import React, { Component } from 'react';
import undesa from './img/UNDESA.png';
import unite from './img/unite.png';

export default class About extends Component {
    render() {
        return (
            <div className="navbar fixed-bottom" style={{fontSize: '0.72rem'}}>
                <div className="mb-4 mx-auto">
                <div>By <a href="mailto:abdulqadir.rashik@gmail.com">Abdulqadir Rashik</a> for <a href="https://scitechmatcher.uniteideas.spigit.com/">#SciTechMatcher</a> by</div><div style={{textAlign:'center'}}><img alt="UN DESA" src={undesa} /> and <img alt="UN Unite Ideas" src={unite} /></div>
                </div>
            </div>
        );
    }
}
