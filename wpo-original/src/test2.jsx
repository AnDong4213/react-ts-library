import React from "react";
import { withStyles } from "@material-ui/core/styles";

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
        <p></p>
      </div>
    );
  }
}

export default withStyles(styles)(Test);
