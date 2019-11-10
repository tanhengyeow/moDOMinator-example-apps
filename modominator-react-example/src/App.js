import React from "react";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    let defaultImg = "";
    this.state = { value: defaultImg };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>Show your favorite image</h1>
        <input
          placeholder="Paste your favorite image URL, like https://placeimg.com/320/320/any"
          value={this.state.value}
          onChange={this.handleChange}
        />
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
