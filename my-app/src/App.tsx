import React, { useState } from "react";
import Hello from "./components/Hello";
import WithLoader from "./components/hoc";
import useURLLoader from "./hooks/useUrlLoader";

interface IShowResult {
  message: string;
  status: string;
}

const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <>
      <h2>{data.status}</h2>
      <img style={{ width: "100px" }} src={data.message} alt="" />
    </>
  );
};

function App() {
  const [number, setNumber] = useState(0);
  const WrappedDogShow = WithLoader(
    DogShow,
    "https://dog.ceo/api/breeds/image/random"
  );
  const [data, loading] = useURLLoader(
    "https://dog.ceo/api/breeds/image/random",
    [number]
  );
  const resultDogData = data as IShowResult;
  return (
    <div className="App">
      <h2 onClick={() => setNumber(number + 1)}>test-{number}</h2>
      <Hello message="Hello" />
      {/* <WrappedDogShow /> */}
      <div>
        {loading ? (
          <h2>加载狗...</h2>
        ) : (
          <img
            style={{ width: "100px" }}
            src={resultDogData && resultDogData.message}
            alt=""
          />
        )}
      </div>
    </div>
  );
}

export default App;
