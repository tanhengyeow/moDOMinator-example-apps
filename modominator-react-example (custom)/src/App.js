import React from "react";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      buttonVisible: true,
      inputVisible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleButtonClick() {
    this.setState({
      buttonVisible: !this.state.buttonVisible,
      inputVisible: !this.state.inputVisible,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Show your favorite image</h1>
        { this.state.buttonVisible &&
          <button
            onClick={this.handleButtonClick}>
              Click to show input
          </button>
        }
        { this.state.inputVisible &&
          <input
            placeholder="Paste your favorite image URL, like https://placeimg.com/320/320/any"
            value={this.state.value}
            onChange={this.handleChange}
          />
        }
        <div
          dangerouslySetInnerHTML={{
            __html: `<img src="${this.state.value}"/>`
          }}
        />
      </div>
    );
  }
}

export default App;
