import React, { Component } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Secant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueIter: [],
            valueXl: [],
            valueXr: [],
            html: null,
            Equation: "x^2 -7",
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

    calSecant = (xl, xr) => {
        var xnew, xmid, xold, scope, fxold, fxmid;
        xold = xl;
        xmid = xr;
        const e = 0.000001;
        var obj = [];
        var iter = 0;
        const MAX = 50;
        scope = {
            x: xold,
        };
        fxold = evaluate(this.state.Equation, scope);
        scope = {
            x: xmid,
        };
        fxmid = evaluate(this.state.Equation, scope);
        xnew = xold - (fxold * (xold - xmid)) / (fxold - fxmid);

        while (Math.abs((xnew - xmid) / xnew) * 100 > e && iter < MAX) {
            xold = xmid;
            xmid = xnew;
            scope = {
                x: xold,
            };
            fxold = evaluate(this.state.Equation, scope);
            scope = {
                x: xmid,
            };
            fxmid = evaluate(this.state.Equation, scope);
            xnew = xold - (fxold * (xold - xmid)) / (fxold - fxmid);
            obj = {
                iteration: iter,
                XL: xold,
                Xr: xmid,
            };
            this.data.push(obj);
            iter++;
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
        this.calSecant(xlnum, xrnum);

        this.setState({ html: this.print() });

        console.log(this.state.valueIter);
        console.log(this.state.valueXl);
        console.log(this.state.valueXr);
    };

    render() {
        return (
            <Container>
                <h1>Secant</h1>
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
                                    id="XL"
                                    onChange={this.inputXL}
                                    className="form-control"
                                ></input>
                            </Col>
                            <Col>
                                <Form.Label>Input XR</Form.Label>
                                <input
                                    type="number"
                                    id="XR"
                                    onChange={this.inputXR}
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
                                style={{ width: "20%", margin: "0 auto" }}
                            >
                                Calculate
                            </Button>
                        </Row>
                    </Card.Body>
                    <h5>Answer = {this.state.X.toPrecision(13)}</h5>
                </Card>
                <br></br>
                <Container>{this.state.html}</Container>
            </Container>
        );
    }
}

export default Secant;





