import React, { Component } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Newton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueIter: [],
            valueXl: [],
            html: null,
            Equation: "(x^2)-7",
            X: 0,
            XL: 0,
        };

        this.data = [];
    }

    print = () => {
        console.log(this.data);
        this.setState({
            valueIter: this.data.map((x) => x.iteration),
            valueXl: this.data.map((x) => x.XL),
        });

        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.XL}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    };

    error = (xold, xnew) => Math.abs(xnew - xold / xnew) * 100;

    calNewton = (xl) => {
        var fxl, fxld, scope, xnew;
        const e = 0.000001;
        var iter = 0;
        const MAX = 50;
        var obj = [];
        scope = {
            x: xl,
        };
        fxl = evaluate(this.state.Equation, scope);
        scope = {
            x: xl,
        };
        fxld = derivative(this.state.Equation, 'x').evaluate(scope);
        xnew = xl - (fxl / fxld);
        while ((Math.abs((xnew - xl) / xnew)) * 100 > e && iter < MAX) {
            iter++;
            xl = xnew;
            scope = {
                x: xl,
            };
            fxl = evaluate(this.state.Equation, scope);
            scope = {
                x: xl,
            };
            fxld = derivative(this.state.Equation, 'x').evaluate(scope);
            xnew = xl - (fxl / fxld);
            obj = {
                iteration: iter,
                XL: xnew,
            };
            this.data.push(obj);
        }
        this.setState({ X: xnew });
    };

    inputEquation = (event) => {
        console.log(event.target.value);
        this.setState({ Equation: event.target.value });
    };

    inputXL = (event) => {
        console.log(event.target.value);
        this.setState({ XL: event.target.value });
    };

    calculateRoot = () => {
        const xlnum = parseFloat(this.state.XL);
        this.calNewton(xlnum);

        this.setState({ html: this.print() });

        console.log(this.state.valueIter);
        console.log(this.state.valueXl);
    };

    render() {
        return (
            <Container style={{ width: "60%" }}>
                <h1>Newton-Raphson</h1>
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
                                className="form-control"
                            ></input>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Input X</Form.Label>
                                <input
                                    type="number"
                                    id="XL"
                                    onChange={this.inputXL}
                                    className="form-control"
                                ></input>
                            </Col>
                        </Row>
                        <Row>
                            <br></br>
                        </Row>
                        <Row>
                            <Button
                                variant="primary"
                                onClick={this.calculateRoot}
                            >
                                Calculate
                            </Button>
                        </Row>
                    </Card.Body>
                    <h5>Answer = {this.state.X.toPrecision(10)}</h5>
                </Card>
                <br></br>
                <Container>{this.state.html}</Container>
            </Container>
        );
    }
}

export default Newton;