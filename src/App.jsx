import { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import SearchReposAccordion from './components/molecules/Accordion/SearchRepostAccordion/SearchReposFormAccordion';

// COMPONENTS
import SearchReposForm from './components/molecules/forms/SearchReposForm/SearchReposForm';


class App extends Component {

  componentDidMount() {
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
  }

  render(){
    return (
      <div className='container'>

        <div className='row searchform-container'>
          <SearchReposForm />
        </div>

        {(() => {
          if(this.props.datas.length != 0){
            return (
              <div className='row searchaccordion-container'>
                <SearchReposAccordion />
             </div>
            )
          }
        })()}
        
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

export default connect(mapStateToProps, null)(App);
