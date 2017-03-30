import React from 'react'
import Button from './Button.jsx';
import List from './List.jsx'
import AppActions from '../lib/AppActions';
import AppStore from '../lib/AppStore'


class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = { articles: [], articlesApproved: [], message: '' };
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    handleClick() {
        if (document.getElementById('simpletext').value.length > 0 && this.state.articles.length < 10) {
            AppActions.submitArticle(document.getElementById('simpletext').value)
            document.getElementById('simpletext').value = ''
        }
    }

    componentDidMount() {
        AppStore.addChangeListener('STORE_SUBMIT_ARTICLE', this.onSubmit);
        AppStore.addChangeListener('STORE_REMOVE_ARTICLE', this.onRemove);
    }

    onRemove() {
        this.listArticles()
    }


    onSubmit() {
         this.listArticles()
    }

    listArticles()
    {
        let usermessage = ''

        if (this.state.articles.length > 9) {
            usermessage = 'You have exceeded the number of articles you can submit,You cannot add more articles'
        }

        this.setState({
            articles: AppStore.getAll(),
            articlesApproved: AppStore.getApproved(),
            message: usermessage
        })
    }

    componentWillUnmount() {
        AppStore.removeChangeListener('STORE_SUBMIT_ARTICLE', this.onChange)
         AppStore.removeChangeListener('STORE_REMOVE_ARTICLE', this.onRemove)
    }

    render() {
        var simpleContent =
            <div>
                {this.props.text}
                <br />
                Enter text : <input type="text" name="simpletext" id="simpletext" />
                <Button handleClick={this.handleClick} text="SUBMIT" />
                <br />
                <List articles={this.state.articles} listHeader="Submitted Articles" />
                {this.state.message}
                <List articles={this.state.articlesApproved} listHeader="Approval Status" />
            </div>;

        return simpleContent;
    }

}

export default Content;