import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default function InputsPanelBottom({ values, setters }) {
  return (
    <Row>
      <Col md={6}>
        <Card className="p-4 mb-3 shadow-sm rounded-4 h-100">
          <Form>
            <Form.Label>Annual Living Cost (CAD)</Form.Label>
            <Form.Control
              type="number"
              value={values.baseLivingCost}
              onChange={(e) =>
                setters.setBaseLivingCost(Number(e.target.value))
              }
            />
          </Form>
        </Card>
      </Col>

      <Col md={6}>
        <Card className="p-4 mb-3 shadow-sm rounded-4 h-100">
          <Form>
            <Form.Label>Inflation Rate (%)</Form.Label>
            <Form.Control
              type="number"
              value={values.inflation}
              onChange={(e) => setters.setInflation(Number(e.target.value))}
            />
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
