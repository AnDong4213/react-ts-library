import React from "react";
import { withStyles } from "@material-ui/core/styles";
import "./test2.css";

const styles = {
  root: {
    fontWeight: "bold"
  }
};

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleFunc1 = () => {};

  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.root}`}>
        <div className="blue"></div>
        <div className="red-outer">
          <div className="red-inner">red inner</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Test);
