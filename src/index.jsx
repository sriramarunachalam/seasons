import React from "react";
import ReactDom from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   //Initialization is the only time to do direct assignment to state
  //   this.state = {
  //     lat: null,
  //     errorMessage: ""
  //   };
  // }

  //Similar to what we are doing in the above steps
  state = { late: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      //Callback Functions that get executed asynchronously
      position => {
        //Call Set State to update state always
        this.setState({ lat: position.coords.latitude });
      },
      err => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please Accept Location Request.."></Spinner>;
  }

  //We have to define a render method
  render() {
    return <div className="setBorder">{this.renderContent()}</div>;
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
