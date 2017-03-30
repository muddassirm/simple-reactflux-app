
import AppDispatcher from './AppDispatcher';
import { EventEmitter } from 'events';

let _articles = [];
let _articlesApproved = []

class AppStore extends EventEmitter {

    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this))
    }

    emitChange(eventName) {
        this.emit(eventName);
    }

    getAll() {
        return _articles;
    }

    getApproved() {
         return _articlesApproved;
    }

    submitArticle(article) {
        _articles.push(article);
    }

    removeArticle(key)
    {
        _articles.splice(key,1);
        _articlesApproved.splice(key,1)
    }

    approveArticle(article) {
        if (article.length <= 10) {
            _articlesApproved.push('[Approved]:' + article);
        }
        else {
            _articlesApproved.push('[Rejected]:' + article);
        }
    }



    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }

    dispatcherCallback(action) {
        switch (action.actionType) {
            case 'SUBMIT_ARTICLE':
                this.submitArticle(action.value);
                break;
            case 'APPROVE_ARTICLE':
                this.approveArticle(action.value);
                break;
            case 'REMOVE_ARTICLE':
                this.removeArticle(action.value);
        }

        this.emitChange('STORE_' + action.actionType);

        return true;
    }
}

export default new AppStore();

