import React from "react";
/* interface IHelloProps {
  message: string;
}

const Hello = (props: IHelloProps) => {
  return <h2>{props.message}</h2>;
}; */

interface IHelloProps {
  message: string;
  age?: number;
}

// const Hello: React.FunctionComponent<IHelloProps> = (props) => {
const Hello: React.FC<IHelloProps> = ({ message, age }) => {
  return (
    <div className="kk">
      <h2>
        {message}-{age}
      </h2>
    </div>
  );
};

Hello.defaultProps = {
  age: 80
};

export default Hello;
