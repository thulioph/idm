import React, { useState } from 'react';
import Head from 'next/head';

import { Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage(props) {
  const [state, setState] = useState({});

  // should be an external file handling this request
  const handleBtnClick = async () => {
    const res = await fetch('http://localhost:3000/api/hello');
    const data = await res.json();

    setState(data);
  };

  return (
    <React.Fragment>
      {/* should be a component that render props.children */}
      <Head>
        <title>In Depth Music | IDM</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* should be a component */}
      <h1>
        Dale, {props.name} - {JSON.stringify(state)}
      </h1>

      {/* should be a component */}
      <Button color="danger" onClick={handleBtnClick}>
        call hello
      </Button>
    </React.Fragment>
  );
}

export default HomePage;

// should be an external file handling this request
export async function getStaticProps() {
  const res = await fetch('https://api.github.com/users/thulioph');
  const user = await res.json();

  return {
    props: {
      ...user,
    },
    revalidate: 1,
  };
}
