import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Test from "./test";

const primary = "#30929b";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: "#fff"
    },
    secondary: {
      main: "#000000",
      contrastText: primary
    }
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.calculatePi(1500); // 测试密集计算对性能的影响
  }

  calculatePi(duration) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + duration) {
      // TODO(Dereck): figure out the Math problem
    }
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div>
            {/* <Header /> */}
            <Route exact path="/" component={Home} />
            <Route path="/test" component={Test} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
