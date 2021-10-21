import Button, { ButtonSize, ButtonType } from "components/Button/button";

function App() {
  return (
    <div className="App">
      <Button
        autoFocus
        onClick={(e) => {
          e.preventDefault();
          alert(889);
        }}
      >
        Hello{" "}
      </Button>

      <Button disabled> Disabled Button </Button>

      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Large Primary
      </Button>

      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        Small Danger
      </Button>

      <Button
        btnType={ButtonType.Link}
        href="http://www.baidu.com"
        target="_blank"
      >
        Baidu Link
      </Button>

      <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>
        Disabled Link
      </Button>
    </div>
  );
}

export default App;
