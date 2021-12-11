import React from "react";
import { withStyles } from "@material-ui/core/styles";
import test from "./test";

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
    // this.p1Tag.className = "nnnnn";
    console.log(this.p1Tag.className.split(" "));
    console.log([...this.p1Tag.classList]);
    // console.log(this.p1Tag.classList.contains("Test-p1-4"));
    // this.p1Tag.classList.remove("Test-p1-4");
    // console.log(this.p2Tag);
    console.log(test(11, 2));

    let element = this.p2Tag.current,
      start,
      i = 0;

    function step(timestamp) {
      // console.log("timestamp", timestamp, i++);
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      // console.log("elapsed", elapsed);

      //这里使用`Math.min()`确保元素刚好停在200px的位置。
      element.style.transform =
        "translateX(" + Math.min(0.1 * elapsed, 200) + "px)";

      if (elapsed < 2000) {
        // 在两秒后停止动画
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);

    /*  const pList = document.querySelectorAll("p");
    console.log(pList);
    console.log(Array.prototype.slice.call(pList));
    console.log(Array.from(pList)); // 尽量使用Array代替array-like对象
    console.log([...pList]); // 使用扩展运算符 */
    // console.log([1, 2, 3, 4].findLast((el) => el % 2 === 0));  // 还未能使用
  }

  handleFunc1 = () => {};

  render() {
    const { classes } = this.props;
    // console.log(classes);

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
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>
    );
  }
}

export default withStyles(styles)(Test);
