import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = {
  root: {
    fontWeight: "bold"
  },
  brand: {
    flex: 1,
    color: "pink"
  },
  p: {
    fontSize: "20px"
  },
  p1: {
    backgroundColor: "#ccc"
  },
  p2: {
    width: "200px",
    height: "200px",
    display: "inline-block",
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
};

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.p2Tag = React.createRef();
  }

  componentDidMount() {
    // console.log(this.props);
    // console.log(this.p1Tag);
    // console.log(this.p2Tag.current);

    let element = this.p2Tag.current,
      start,
      i = 0;

    function step(timestamp) {
      console.log("timestamp", timestamp, i++);
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      console.log("elapsed", elapsed);

      //这里使用`Math.min()`确保元素刚好停在200px的位置。
      element.style.transform =
        "translateX(" + Math.min(0.1 * elapsed, 200) + "px)";

      if (elapsed < 2000) {
        // 在两秒后停止动画
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  handleFunc1 = () => {};

  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.root} ${classes.brand}`}>
        <p
          ref={(p) => {
            this.p1Tag = p;
          }}
          className={[classes.p, classes.p1].join(" ")}
        >
          <em>乐乐-p1</em>
        </p>
        <p ref={this.p2Tag} className={classes.p2}>
          乐乐-p2
        </p>
      </div>
    );
  }
}

export default withStyles(styles)(Test);
