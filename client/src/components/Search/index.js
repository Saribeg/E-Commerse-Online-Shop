import React, {Component} from 'react'
import './Search.scss'

class Search extends Component{
    state = {
        search: ''
    }

    onChangeSearch = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    render() {
        return(
            <>
                <input
                    type="text"
                    className="main-search"
                    name="search"
                    placeholder="Search"
                    value={this.state.search}
                    onChange={this.onChangeSearch}
                />
            </>
        )
    }
}

export default Search;