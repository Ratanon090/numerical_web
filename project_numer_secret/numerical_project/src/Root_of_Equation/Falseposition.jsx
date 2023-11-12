import React, { Component } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Falseposition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueIter: [],
            valueXl: [],
            valueXr: [],
            html: null,
            Equation: "(x^4)-13",
            X: 0,
            XL: 0,
            XR: 0,
        };

        this.data = [];
    }

    print = () => {
        console.log(this.data);
        this.setState({
            valueIter: this.data.map((x) => x.iteration),
            valueXl: this.data.map((x) => x.Xl),
            valueXr: this.data.map((x) => x.Xr),
        });

        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.XL}</td>
                                    <td>{element.Xr}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    };

    error = (xold, xnew) => Math.abs(xnew - xold / xnew) * 100;

    calFalse = (xl, xr) => {
        var ea = 0;
        var x1, x1_old, fXl, fXr, scope;
        x1_old = 0;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var obj = {};
        scope = {
            x: xr,
        };
        fXr = evaluate(this.state.Equation, scope);
        scope = {
            x: xl,
        };
        fXl = evaluate(this.state.Equation, scope);
        x1 = (xl * fXr - xr * fXl) / (fXr - fXl);
        ea = this.error(x1, x1_old);
        while (Math.abs((x1 - x1_old) / x1) * 100 > e && iter < MAX) {
            console.log(this.error(x1, x1_old));
            iter++;
            x1 = (xl * fXr - xr * fXl) / (fXr - fXl);
            x1_old = x1;
            scope = {
                x: x1,
            };
            fXl = evaluate(this.state.Equation, scope);
            scope = {
                x: xr,
            };
            fXr = evaluate(this.state.Equation, scope);
            if (fXl * fXr > 0) {
                ea = this.error(xr, x1_old);
                console.log(ea);
                x1_old = xr;
                xr = x1;
                obj = {
                    iteration: iter,
                    XL: xl,
                    Xr: xr,
                };

                this.data.push(obj);
            } else if (fXl * fXr) {
                ea = this.error(xl, x1_old);
                console.log(ea);
                x1_old = xl;
                xl = x1;
                obj = {
                    iteration: iter,
                    XL: xl,
                    Xr: xr,
                };

                this.data.push(obj);
            }
        }
        this.setState({ X: x1 });
    };

    inputEquation = (event) => {
        console.log(event.target.value);
        this.setState({ Equation: event.target.value });
    };

    inputXL = (event) => {
        console.log(event.target.value);
        this.setState({ XL: event.target.value });
    };

    inputXR = (event) => {
        console.log(event.target.value);
        this.setState({ XR: event.target.value });
    };

    calculateRoot = () => {
        const xlnum = parseFloat(this.state.XL);
        const xrnum = parseFloat(this.state.XR);
        this.calFalse(xlnum, xrnum);

        this.setState({ html: this.print() });

        console.log(this.state.valueIter);
        console.log(this.state.valueXl);
    };

    render() {
        return (
            <Container>
                <h1>False-Position</h1>
                <Card>
                    <Card.Header as="h5">Featured</Card.Header>
                    <Card.Body>
                        <Row>
                            <Form.Label>Input f(x)</Form.Label>
                            <input
                                type="text"
                                id="equation"
                                value={this.state.Equation}
                                onChange={this.inputEquation}
                                style={{ width: "80%", margin: "0 auto" }}
                                className="form-control"
                            ></input>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Input XL</Form.Label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="XL"
                                    onChange={this.inputXL}
                                    className="form-control"
                                ></input>
                            </Col>
                            <Col>
                                <Form.Label>Input XR</Form.Label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="XR"
                                    onChange={this.inputXR}
                                    className="form-control"
                                ></input>
                            </Col>
                        </Row>
                        <Row>
                            <h1></h1>
                        </Row>
                        <Row>
                            <h1></h1>
                        </Row>
                        <Row>
                            <br></br>
                            <Button
                                variant="primary"
                                onClick={this.calculateRoot}
                                style={{ width: "20%", margin: "0 auto" }}
                            >
                                Calculate
                            </Button>
                        </Row>
                    </Card.Body>
                    <h5>Answer = {this.state.X.toPrecision(7)}</h5>
                </Card>
                <br></br>
                <Container>{this.state.html}</Container>
            </Container>
        );
    }
}

export default Falseposition;