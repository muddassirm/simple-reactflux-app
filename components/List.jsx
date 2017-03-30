import React from 'react'
import Button from './Button.jsx'
import AppActions from '../lib/AppActions'

class List extends React.Component {

    handleClick(key) {
        AppActions.removeArticle(key)       
    }

    render() {
        var articles = this.props.articles != undefined ? this.props.articles.map((article,i) => {
            return <li key={i}> Article {i+1}:{article} <Button  handleClick={()=>this.handleClick(i)} text="X"/></li> 
        }) :[];
        
        return (
            <div>
                <h1>{this.props.listHeader}</h1>
                <ul>
                    {articles} 
                </ul>
            </div>
        );
    }
}

export default List;