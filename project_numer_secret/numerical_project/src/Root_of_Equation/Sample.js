import React, { Component } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';

class Sample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueIter: [],
            valueXl: [],
            valueXm: [],
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
            valueXm: this.data.map((x) => x.Xm),
            valueXr: this.data.map((x) => x.Xr),
        });

        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="10%">Iteration</th>
                        <th width="30%">XL</th>
                        <th width="30%">XM</th>
                        <th width="30%">XR</th>
                    </tr>
                </thead>
                <tbody>
                    {this.data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };

    error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    Calbisection = (xl, xr) => {
        var xm, fXm, fXr, ea, scope;
        console.log(xl + " " + xr);
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};
        do {
            xm = (xl + xr) / 2.0;
            scope = {
                x: xr,
            };
            fXr = evaluate(this.state.Equation, scope);

            scope = {
                x: xm,
            };
            fXm = evaluate(this.state.Equation, scope);

            iter++;
            if (fXm * fXr > 0) {
                ea = this.error(xr, xm);
                obj = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr,
                };
                this.data.push(obj);
                xr = xm;
            } else if (fXm * fXr < 0) {
                ea = this.error(xl, xm);
                obj = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr,
                };
                this.data.push(obj);
                xl = xm;
            }
        } while (ea > e && iter < MAX);
        this.setState({ X: xm });
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
        this.Calbisection(xlnum, xrnum);

        this.setState({ html: this.print() });

        console.log(this.state.valueIter);
        console.log(this.state.valueXl);
    };

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <h1>Bisection</h1>
                        <Form.Label>Input f(x)</Form.Label>
                        <input
                            type="text"
                            id="equation"
                            value={this.state.Equation}
                            onChange={this.inputEquation}
                            style={{ width: "20%", margin: "0 auto" }}
                            className="form-control"
                        ></input>
                        <Form.Label>Input XL</Form.Label>
                        <input
                            type="number"
                            id="XL"
                            onChange={this.inputXL}
                            style={{ width: "20%", margin: "0 auto" }}
                            className="form-control"
                        ></input>
                        <Form.Label>Input XR</Form.Label>
                        <input
                            type="number"
                            id="XR"
                            onChange={this.inputXR}
                            style={{ width: "20%", margin: "0 auto" }}
                            className="form-control"
                        ></input>
                    </Form.Group>
                    <Button variant="dark" onClick={this.calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5>Answer = {this.state.X.toPrecision(7)}</h5>
                <Container>{this.state.html}</Container>
            </Container>
        );
    }
}

export default Sample;