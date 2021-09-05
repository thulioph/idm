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
  Form,
  FormGroup,
  Spinner
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import TableComponent from '../components/table';
import { ListGroupsComponent, ListGroupsComponentTopTracks } from '../components/list-groups';
import MediaComponent from '../components/media';
import NavbarComponent from '../components/navbar';

const LoadingState = () => {
  return (
    <React.Fragment>
      <Spinner color="dark" size="lg" />
    </React.Fragment>
  )
}

function HomePage(props) {
  const [state, setState] = useState({});
  const [artist, setArtist] = useState('');
  const [isLoading, setLoading] = useState(false);

  const requestToAPI = async (payload) => {
    setState({});
    setLoading(true);

    const res = await fetch(`/api/artist`, {
      method: 'POST',
      body: JSON.stringify({ artist: payload }),
    });

    const data = await res.json();

    setState(data);
    setLoading(false);
  }

  const handleBtnClick = async () => {
    await requestToAPI(artist);
  };

  const handleInputChange = (evt) => {
    const { value } = evt.target;

    setArtist(value);
    setState({});
  };

  const handleSimilarArtistClick = async (artistName) => {
    setArtist(artistName);
    await requestToAPI(artistName);
  };

  return (
    <React.Fragment>
      <NavbarComponent />

      <Container>
        <Head>
          <title>In Depth Music | IDM</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <Jumbotron>
          <h1 className="display-3">In Depth Music</h1>
          <p className="lead">Here is the best place to learn more about your favorite artist.</p>

          <Row>
            <Col sm={{ size: '8', offset: 2 }}>
              <Form>
                <FormGroup>
                  <Input
                    id="artist-name"
                    bsSize="lg"
                    value={artist}
                    onChange={handleInputChange}
                    placeholder="Name of your favorite artist"
                    autoComplete="off"
                  />
                </FormGroup>

                <FormGroup>
                  <Button
                    color="primary"
                    onClick={handleBtnClick}
                    block
                    size="lg"
                  >
                    search
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Jumbotron>
      </Container>

      <Container>
        <Row>
          <Col sm={{ offset: 6 }}>
            {isLoading && <LoadingState />}
          </Col>
        </Row>

        <Row>
          <Col>
            {state.lastfm && <MediaComponent {...state} />}
          </Col>
        </Row>

        <Row>
          <Col>
            {state.lastfm && <hr />}
          </Col>
        </Row>

        <Row>
          <Col>
            {state.lastfm && <ListGroupsComponentTopTracks title={'10 Top Tracks'} data={state.lastfm.topTracks} />}
          </Col>

          <Col>
            {state.lastfm && 
              <ListGroupsComponent
                title={'Similar Artists'}
                data={state.lastfm.similar}
                displayBadge={false}
                handleClick={handleSimilarArtistClick}
              />
            }
          </Col>
        </Row>

        <Row>
          <Col>
            {state.whoSampled && <h2>Main Samples</h2>}
            {state.whoSampled && <hr />}
          </Col>
        </Row>

        <Row>
          <Col>
            {state.whoSampled && state.whoSampled.map((el, idx) => (
              <TableComponent {...el} key={idx} />
            ))}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default HomePage;

// should be an external file handling this request
export async function getStaticProps() {
  return {
    props: {
      name: 'User'
    },
    revalidate: 1,
  };
}
