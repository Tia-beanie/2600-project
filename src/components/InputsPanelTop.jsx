import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import formatCurrency from "../utils/formatCurrency";

export default function InputsPanelTop({ values, setters }) {
  return (
    <Row>
      <Col md={6}>
        <Card className="p-4 mb-3 shadow-sm rounded-4 h-100">
          <Form>
            <Form.Label>Investment Horizon (Years)</Form.Label>
            <Form.Control
              type="number"
              value={values.years}
              onChange={(e) => setters.setYears(Number(e.target.value))}
            />
          </Form>
        </Card>
      </Col>

      <Col md={6}>
        <Card className="p-4 mb-3 shadow-sm rounded-4 h-100 card-initial-fund">
          <Form.Label>Initial Fund</Form.Label>
          <div className="d-flex justify-content-between align-items-center">
            <span>CAD</span>
            <h3 className="mb-0">{formatCurrency(values.principal)}</h3>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
