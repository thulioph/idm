import fetch from 'node-fetch';
import React, { useState } from 'react';
import Head from 'next/head';

import {
  Button,
  Jumbotron,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import config from '../config';

function HomePage(props) {
  const [state, setState] = useState({});
  const [artist, setArtist] = useState('');

  // should be an external file handling this request
  const handleBtnClick = async () => {
    setState({});

    const res = await fetch(`${config.base.api}/api/artist`, {
      method: 'POST',
      body: JSON.stringify({ artist }),
    });

    const data = await res.json();

    setState(data);
  };

  const handleInputChange = (evt) => {
    const { value } = evt.target;

    setArtist(value);
    setState({});
  };

  return (
    <React.Fragment>
      {/* should be a component that render props.children */}
      <Head>
        <title>In Depth Music | IDM</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Jumbotron>
        <h1 className="display-3">Hello, {props.name}!</h1>

        <p className="lead">
          This is a simple hero unit, a simple Jumbotron-style component for
          calling extra attention to featured content or information.
        </p>

        <hr className="my-2" />

        <p>Search by your favorite artist:</p>

        <p>
          <Input
            value={artist}
            onChange={handleInputChange}
            placeholder="artist name"
          />
        </p>

        <p className="lead">
          <Button color="primary" onClick={handleBtnClick}>
            search
          </Button>
        </p>
      </Jumbotron>

      <Container fluid>
        <Row>
          <Col>
            <code>{JSON.stringify(state)}</code>
          </Col>
        </Row>
      </Container>

    </React.Fragment>
  );
}

export default HomePage;

// should be an external file handling this request
export async function getStaticProps() {
  // const res = await fetch('https://api.github.com/users/thulioph');
  // const user = await res.json();

  return {
    props: {
      name: 'User'
    },
    revalidate: 1,
  };
}
