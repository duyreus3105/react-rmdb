import React, {Component} from 'react';
import PropTypes from 'prop-types'
//Image
import searchIcon from '../../images/search-icon.svg';
//Styles
import { Wrapper, Content } from './SearchBar.styles';

class SearchBar extends Component {
    state = {value: ''};
    timeout = null;


    componentDidUpdate(_prevProps, prevState){
        if(this.state.value !== prevState.value){
            const {setSearchTerm} = this.props;
            clearTimeout(this.timeout);
            const timer = setTimeout(()=>{
                const {value} = this.state;
                setSearchTerm(value);
            },500);
    
        }
    }
    render(){
        return (
            <Wrapper>
                <Content>
                    <img src = {searchIcon} alt='search-icon'/>
                    <input 
                        type='text' 
                        placeholder = 'Search Movie'
                        onChange={event => this.setState({value : event.currentTarget.value})}
                        value = {this.state.value}
                    />
                </Content>
            </Wrapper>
        );
    }





};
SearchBar.propTypes ={
    callback: PropTypes.func
}
export default SearchBar;