import React from 'react';
import Header from './Header';

export default class Blog extends React.Component {

    componentDidMount() {
        fetch("/api/organism/", { 
            method: 'GET'
        }).then(res => {
            //console.log(res);
            if (res.ok) {
                return res.json(); 
            } else {
                this.props.setError(res.statusText);
            }
        }).then(res => {
            console.log(res)
        })

        fetch("/api/panther/"+"b9e00564-28b8-4522-b076-7863dc940387?organism_id=10090", {
            method: 'GET',
        }).then(res => {
            //console.log(res);
            if (res.ok) {
                return res.json(); 
            } else {
                this.props.setError(res.statusText);
            }
        }).then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className='top'>
                <Header />
            </div>
        )
    }
}