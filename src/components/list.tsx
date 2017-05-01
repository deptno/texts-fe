import * as React from 'react';
import * as List from 'react-list';
import {TextCell} from './cell';
import {API_URL} from '../constants';

interface P {
    items: Texts;
    onClick(id);
}
interface S {
    items: Texts;
}

export class TextList extends React.Component<P, S> {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.save = this.save.bind(this);
        
        this.state = {items: props.items};
        this.handleIdClicked = this.handleIdClicked.bind(this);
    }

    render() {
        const {items} = this.state;
        return (
            <div>
                <div className="-text row">
                    <strong className="-id col-sm-2 col-md-2">id</strong>
                    <strong className="-text col-sm-8 col-md-8">text</strong>
                    <strong className="-modification col-sm-2 col-md-2">modification</strong>
                </div>
                    <List type="simple" itemRenderer={this.renderItem} length={items.length}/>
                <hr/>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.items !== nextProps.items) {
            this.setState({items: nextProps.items});
        }
    }

    renderItem(index, key) {
        const {items}    = this.props;
        const {id, text} = items[index];
        return (
            <div className="-text row" key={id}>
                <span onClick={this.handleIdClicked} className="-id col-sm-2 col-md-2">{id}</span>
                <TextCell id={id} text={text} update={this.save}/>
                <button className="-button col-sm-2 col-md-2" onClick={_ => this.delete(id)}>delete</button>
            </div>
        );
    }
    async save(id, text) {
        if (!Math.round(Math.random())) {
            throw false;
        }
        
        const items = this.props.items;
        const index = items.findIndex(({id: itemId}) => id === itemId);
        items[index].text = text;
        this.setState({items: items});

        return true;

        // try {
        //     return !!(await fetch([API_URL, id].join('/'), {method: 'post', body: JSON.stringify({text})})).ok;
        // } catch(ex) {
        //     return false;
        // }
    }
    async delete(id) {
        return false;
    }
    handleIdClicked(e) {
        this.props.onClick(e.target.textContent);
    }
}