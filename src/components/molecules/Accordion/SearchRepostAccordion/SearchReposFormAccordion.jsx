import { Component } from "react";

// ASSETS
import './SearchReposAccordion.css';
import staricon from '../../../../images/icons/star.png';
import { connect } from "react-redux";

class SearchReposAccordion extends Component {

  render(){
        return (
          <div class="accordion-container">
            <div class="accordion" id="accordionExample">
              {(() => {
                if(this.props.username != ""){
                  return (
                    <div id="accordion-breadcumb-id" class="accordion-breadcumb">{`Showing users for \"${this.props.username}\"`}</div>
                  )
                }
              })()}
                {this.props.datas.map((item, index) => {
                  return (
                    <div class="accordion-item" key={item.username}>
                      <h2 class="accordion-header" id={"heading-" + item.username}>
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + item.username} aria-expanded={index == 0 ? "true" : "false"} aria-controls={"collapse-" + item.username}>
                          {item.username}
                        </button>
                      </h2>
                      <div id={"collapse-" + item.username} class="accordion-collapse collapse" aria-labelledby={"heading-" + item.username} data-bs-parent="#accordionExample">
                        {item.repos.map((repo) => {
                          return (
                            <div class="accordion-body searchaccordion-body-container">
                              <div class="searchaccordion-text">
                                  <h5 class="searchaccordion-headline">{repo.name}</h5>
                                  <h6 class="searchaccordion-subheadline">{repo.description === null ? "No description" : repo.description}</h6>
                              </div>
                              <div class="searchaccordion-stargazers">
                                  <h6 class="stargazers-text">{repo.stargazers_count}</h6>
                                  <img class="stargazers-img" src={staricon} alt="stargazers" />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                  </div>
                  )
                })}
            </div>
          </div>
          
        );
    }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    datas: state.datas
  }
}

export default connect(mapStateToProps, null)(SearchReposAccordion);