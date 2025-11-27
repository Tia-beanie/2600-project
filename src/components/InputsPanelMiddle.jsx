import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import formatCurrency from "../utils/formatCurrency";

export default function InputsPanelMiddle({
  mode,
  values,
  setters,
  onBtcAmountChange,
}) {
  return (
    <Row className="my-4">
      {mode === "conventional" ? (
        <>
          <Col md={8}>
            <Card className="p-4 mb-3 shadow-sm rounded-4 h-100">
              <Form>
                <Form.Label>Initial Principal (CAD)</Form.Label>
                <Form.Control
                  type="number"
                  value={values.principal}
                  onChange={(e) => setters.setPrincipal(Number(e.target.value))}
                />
              </Form>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-4 mb-3 shadow-sm rounded-4 h-100">
              <Form>
                <Form.Label>Expected Annual Return (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={values.annualReturn}
                  onChange={(e) =>
                    setters.setAnnualReturn(Number(e.target.value))
                  }
                />
              </Form>
            </Card>
          </Col>
        </>
      ) : (
        <>
          <Col md={4}>
            <Card className="p-4 mb-3 shadow-sm rounded-4 card-btc-orange h-100">
              <Form>
                <Form.Label>
                  Initial BTC Amount
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="return-tooltip">
                        Your initial fund converted to Bitcoin at today's price.
                      </Tooltip>
                    }
                  >
                    <span className="ms-2" style={{ cursor: "pointer" }}>
                      ⓘ
                    </span>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="number"
                  value={values.btcAmount}
                  onChange={(e) => onBtcAmountChange(e.target.value)}
                />
              </Form>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-4 mb-3 shadow-sm rounded-4 card-btc-orange h-100">
              <Form.Label>Current BTC Price (Live)</Form.Label>
              {values.isLoading ? (
                <p className="mb-0">Loading...</p>
              ) : values.btcPrice ? (
                <div className="d-flex justify-content-between align-items-center">
                  <span>CAD</span>
                  <h3 className="mb-0" style={{ color: "#f4722a" }}>
                    {formatCurrency(values.btcPrice)}
                  </h3>
                </div>
              ) : (
                <p className="mb-0">Price unavailable</p>
              )}
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-4 mb-3 shadow-sm rounded-4 card-btc-orange h-100">
              <Form>
                <Form.Label>
                  Expected Annual Return (%)
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="return-tooltip">
                        Historical Bitcoin returns have averaged more than 20%
                        annually, but past performance doesn't guarantee future
                        results.
                      </Tooltip>
                    }
                  >
                    <span className="ms-2" style={{ cursor: "pointer" }}>
                      ⓘ
                    </span>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="number"
                  value={values.annualReturn}
                  style={{ color: "#f4722a" }}
                  onChange={(e) =>
                    setters.setAnnualReturn(Number(e.target.value))
                  }
                />
              </Form>
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
}
