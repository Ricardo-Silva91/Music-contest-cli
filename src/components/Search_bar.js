import React, {Component} from "react"

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term: ''};
    }

    render() {
        return (
            <div className="search-bar">
                <label htmlFor="search-term">Search:&nbsp;&nbsp;</label>
                <input
                    className="search-term"
                    value={this.state.term}
                    onChange={ (event) => this.onInputChange(event.target.value)}
                />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}
