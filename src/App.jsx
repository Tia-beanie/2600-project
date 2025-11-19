import { useState } from 'react'
import Header from './components/Header'
import InputsPanel from './components/InputsPanel'
import ResultGraph from './components/ResultGraph'
import ResultTable from './components/ResultTable'

import 'bootstrap/dist/css/bootstrap.min.css'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


function App() {
  

  return (
    <Container className="my-4">
      <Header />

      <Row className="my-4">
        <Col md={5}>
          <InputsPanel />
        </Col>
        <Col md={7}>
          <ResultGraph />
        </Col>
      </Row>

      <Row>
        <Col>
          <ResultTable />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
