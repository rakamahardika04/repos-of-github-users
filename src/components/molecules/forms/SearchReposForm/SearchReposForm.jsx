import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";

import './SearchReposForm.css';

class SearchReposForm extends Component {

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.emptyStateDatas();

    let username = event.target.getAttribute('data-arg1');
    this.setDatasToState(username);
  }

  setDatasToState = async (username) =>{
    let users;
    let datas = [];

    users = await axios.get(`https://api.github.com/search/users?q=${username}&per_page=5`)
    await Promise.all(users.data.items.map(async(user) => {
    await axios.get(`${user.repos_url}`)
            .then(async (result) => {
              let userRepos = {
                username: "",
                repos: undefined
              }
              userRepos.username = await result.data[0].owner.login;
              userRepos.repos = await result.data;
              datas.push(userRepos);
          })
    }))
    await this.props.setDataToState(datas);
  }

    render(){
        return (
              <form onSubmit={this.handleSubmit} data-arg1={this.props.username} class="form-container needs-validation" noValidate>
        
                <div class="form-group">
                  <input onInput={this.props.handleUsernameChanged} value={this.props.username} type="text" class="form-control input-searchreposform" id="searchreposform" placeholder="Enter username" required/>
                </div>
        
                <button type="submit" class="btn btn-info btn-submit">Submit</button>
              </form>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    datas: state.datas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDataToState: (datas) => dispatch({type: "SET_DATAS", datas: datas}),
    emptyStateDatas: () => dispatch({type: "EMPTY_DATAS"}),
    handleUsernameChanged: (event) => dispatch({type: "SET_USERNAME", username: event.target.value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchReposForm);