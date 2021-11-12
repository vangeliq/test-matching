import React from 'react';
import './css/AutoSuggest.css';


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

    renderSuggestions () {
        console.log("button clicked render");
        const {suggestion} = this.state;
        if (suggestion.length === 0){
            return <div className="container-fluid suggestion-text-header">
                <h4> Please write more so we can suggest more things!</h4>
            </div>;
        }
        return (
            <div className="container-fluid suggestions">
                <h4 className="mx-auto suggestion-text-header">do you mean:</h4>
                <ul className="temp-no-bullets">    
                    {suggestion.map((item) => <li> 
                        <button type="button" className="btn temp-button-suggestion" data-bs-toggle="button" autocomplete="off">
                            {item}
                        </button>
                        </li>)}
                </ul>
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
                            <button onClick={this.handleSubmit} type="button" className="btn btn-dark btn-submit mt-3">Submit</button>
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

