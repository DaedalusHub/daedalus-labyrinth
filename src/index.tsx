import React from 'react';
import ReactDOM from 'react-dom';

interface HelloWorldProps {
  message: string;
}

function HelloWorld(props: HelloWorldProps) {
  return <h1>{props.message}</h1>;
}

ReactDOM.render(
  <HelloWorld message="Hello, World!" />,
  document.getElementById('root')
);
