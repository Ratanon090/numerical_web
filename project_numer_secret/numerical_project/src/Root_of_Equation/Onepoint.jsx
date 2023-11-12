import React, { Component } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Onepoint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueIter: [],
            valueXl: [],
            valueXr: [],
            html: null,
            Equation: "(x+1)/44",
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

    calPoint = (xl) => {
        var xnew, scope, fXl;
        const e = 0.000001;
        var iter = 0;
        var temp;
        xnew = 0;
        var obj = {};
        const MAX = 50;
        scope = {
            x: xl,
        };
        xnew = evaluate(this.state.Equation, scope);
        while ((Math.abs(xnew - xl) / xnew) * 100 > e && iter < MAX) {
            xl = xnew;
            iter++;
            scope = {
                x: xl,
            };
            xnew = evaluate(this.state.Equation, scope);
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

    inputXR = (event) => {
        console.log(event.target.value);
        this.setState({ XR: event.target.value });
    };

    calculateRoot = () => {
        const xlnum = parseFloat(this.state.XL);
        const xrnum = parseFloat(this.state.XR);
        this.calPoint(xlnum, xrnum);

        this.setState({ html: this.print() });

        console.log(this.state.valueIter);
        console.log(this.state.valueXl);
    };

    render() {
        return (
            <Container style={{ width: "40%" }}>
                <h1>One-Point-Iteration</h1>
                <Card>
                    <Card.Header as="h5">GAY SHIT</Card.Header>
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
                                <Form.Label> Input XL</Form.Label>
                                <input
                                    type="number"
                                    id="XL"
                                    onChange={this.inputXL}
                                    className="form-control"
                                    style={{ width: "85%", margin: "0 auto" }}
                                ></input>
                            </Col>
                        </Row>
                        <Row>
                            <br></br>
                        </Row>
                        <Row>
                            <Button
                                varaint="primary"
                                onClick={this.calculateRoot}
                                style={{ width: "20%", margin: "0 auto" }}
                            >
                                Calculate
                            </Button>
                        </Row>
                    </Card.Body>
                    <h5> Answer = {this.state.X.toPrecision(10)}</h5>
                </Card>
                <br></br>
                <Container>{this.state.html}</Container>
            </Container>
        );
    }
}

export default Onepoint;