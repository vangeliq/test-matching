import React from 'react';
import './css/AutoSuggest.css';
import axios from 'axios';


// using code from: 

export default class AutoSuggest extends React.Component {
    constructor(props){
        super(props);
        this.items = [
            'David',
            "someone",
            'ajfnaiof',
            'abcdefg',
            'abcdeesfg',
            'absdfefg',
        ];
        this.state = {
            textBoxValue: "",
            suggestion: [],
            suggestions: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }

    handleChange (e)  {
        this.setState({textBoxValue: e.target.value});
    }

    handleSubmit () {
        let something = [];
        if(this.state.textBoxValue.length > 0){
            const regex = new RegExp(`^${this.state.textBoxValue}`, 'i');
            something = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({suggestion: something}));
    }

    handleSubmitAxios = event => {
        this.setState({ suggestions: []});
        event.preventDefault();
    
        // const url = 'http://localhost:4000/getSuggestions';

        
        const url = `https://jsonplaceholder.typicode.com/users`;
        const reply = {
          userInput: this.state.textBoxValue
        };

        axios.get(url, { params: reply })
            .then(res => {
                const results = res.data;
                this.setState({ suggestions: results });
              });
      }

    renderSuggestions () {
        console.log("button clicked render");
        // const {suggestion} = this.state;
        const {suggestions} = this.state;
        if (suggestions.length === 0){
            return <div className="container-fluid suggestion-text-header">
                <h4> Please write more so we can suggest more things!</h4>
            </div>;
        }
        return (
            <div className="container-fluid suggestions">
                <h4 className="mx-auto suggestion-text-header">do you mean:</h4>
                <ul className="temp-no-bullets">    
                {suggestions.map((item) => <li> 
                        {/* {this.renderSuggestion(item)}
                         */}
                         {this.renderCheckboxes(item)}
                        {/* <button type="button" className="btn temp-button-suggestion" data-bs-toggle="button" autocomplete="off">
                            {item.name}
                        </button> */}
                        </li>)}
                </ul>
            </div>
        )
    }

    renderCheckboxes(suggestion) {
        return(
            <div>
                <label class="checkBoxContainer text-left">{suggestion.name}
                <input type="checkbox"></input>
                <span class="checkmark"></span>
                </label>
            </div>
        )
    }

    renderSuggestion(suggestion) {
        return(
            <div class="form-check text-left temp-button-suggestion">
                <input type="Checkbox" name="blue" className="checkmark hiddenCheckboxes " value={suggestion.name} defaultValue="Search..." Checked></input>
                <label className="ml-2">{suggestion.name}</label>
            </div>
        )
    }

    render () {
        return(
            <div className="AutoSuggestContainer container pt-3 px-5 pb-3">
                <div className="row">
                {/*textbox and  btn*/}
                <div className="col  p-2">
                    {/* textbox */}
                    <form>
                        <div className="row">
                            <h3>Talk to us about your problems: </h3>
                            <textarea onChange={this.handleChange} type = 'text' value={this.state.textBoxValue} className="inputTextBox mb-2 p-4">
                            </textarea>
                            <button onClick={this.handleSubmitAxios} type="button" className="btn btn-dark btn-submit mt-3">Submit</button>
                        </div>
                    </form>
                </div>
                {/* suggestions/NPL/ML results will appear here */}
                <div className="col p-2">
                    {this.renderSuggestions()}
                </div>
                </div>
            </div>
        )
    }
}

