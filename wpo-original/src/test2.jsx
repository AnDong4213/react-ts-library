import React from "react";
import { withStyles } from "@material-ui/core/styles";
import "./test2.css";
import PIc from "../img/me0.jpg";

const styles = {
  root: {
    fontWeight: "normal"
  }
};

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const d = new Date();
    const timeStamp = d.getTime() - 2 * 24 * 60 * 60 * 1000;
    console.log(timeStamp);
    d.setTime(timeStamp);
    console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }

  handleFunc1 = () => {};

  render() {
    const { classes } = this.props;

    return (
      <div className={`${classes.root}`}>
        <div className="box2">
          <div className="float2">I am a floated box!</div>
          <p className="box2p">I am content inside the container.</p>
        </div>

        {/* <section>
          <div className="float">Try to resize this outer float</div>
          <div className="box">
            <p>Normal</p>
          </div>
        </section>
        <section>
          <div className="float">Try to resize this outer float</div>
          <div className="box" style={{ display: "flow - root" }}>
            <p>
              <code>display:flow-root</code>
            </p>
          </div>
        </section> */}

        <h1>My blog</h1>
        <article>
          <h2>Heading of a nice article</h2>
          <p>Content here.</p>
        </article>
        <article>
          <h2>Another heading of another article</h2>
          <img src={PIc} alt="photo" />
          <p>More content here.</p>
        </article>
      </div>
    );
  }
}

export default withStyles(styles)(Test);
