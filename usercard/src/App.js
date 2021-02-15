import "./App.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      followers: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/tonyso88")
      .then((res) => {
        this.setState({ user: res.data });
        console.log("user res", res);
      })
      .catch((err) => console.log(err))
      .then(
        axios
          .get("https://api.github.com/users/tonyso88/followers")
          .then((res) => {
            this.setState({ followers: res.data });
            console.log("followers res", res);
          })
          .catch((err) => console.log(err))
      );
  }

  handleChanges = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('submitting form')
    this.searchFollowers(this.state.username)
    this.setState({
      ...this.state,
      username: ""
    })
  }

  searchFollowers = user => {
    console.log('searching', user)
    axios
    .get(`https://api.github.com/users/${user}`)
    .then((res) => {
      this.setState({ user: res.data });
      console.log("user res", res);
    })
    .catch((err) => console.log(err))
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App CDU Running')
if (prevState.user !== this.state.user) {
  console.log('user has changed!')
}
if (prevState.followers !== this.state.followers) {
  console.log('state updated, username', this.state.username)
}
  }
 
  render() {
    return (
      <div className="App">
        <h1>Github Usercard</h1>
        <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleChanges}
        />
        <button>Fetch Users</button>
        </form>
        <img width="200" className="user"  src={this.state.user.avatar_url} />
        {this.state.followers.map((followers) => {
          return (
            <div>
              <h2>{followers.login}</h2>
              <img width="200" src={followers.avatar_url} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
