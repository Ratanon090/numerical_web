import { useState } from "react"
import { Button, Container, Form, FormText, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Falseposition = () => {
    const print = () => {
        console.log(data)
        setValueIter(data.map((x) => x.iteration));
        setValueXl(data.map((x) => x.Xl));
        setValueXr(data.map((x) => x.Xr));
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
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.XL}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }
    const error = (xold, xnew) => Math.abs(xnew - xold / xnew) * 100;

    const calFalse = (xl, xr) => {
        var ea = 0;
        var x1, x1_old, fXl, fXr, scope;
        x1_old = 0;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var obj = {};
        scope = {
            x: xr,
        }
        fXr = evaluate(Equation, scope)
        scope = {
            x: xl,
        }
        fXl = evaluate(Equation, scope)
        x1 = (xl * fXr - xr * fXl) / (fXr - fXl);
        ea = error(x1, x1_old);
        while (Math.abs((x1-x1_old)/x1)*100 > e && iter < 50) {
            console.log(error(x1,x1_old))
            iter++;
            x1 = (xl * fXr - xr * fXl) / (fXr - fXl);
            x1_old = x1;
            scope = {
                x: x1,
            }
            fXl = evaluate(Equation, scope)
            scope = {
                x: xr,
            }
            fXr = evaluate(Equation, scope)
            if (fXl * fXr > 0) {
                ea = error(xr, x1_old);
                console.log(ea)
                x1_old = xr;
                xr = x1;
                obj = {
                    iteration: iter,
                    XL: xl,
                    Xr: xr,
                }
               
                data.push(obj)
            } else if (fXl * fXr) {
                ea = error(xl, x1_old);
                console.log(ea)
                x1_old = xl;
                xl = x1;
                obj = {
                    iteration: iter,
                    XL: xl,
                    Xr: xr,
                }
                
                data.push(obj)
            }
        }
        setX(x1)
    }
    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXr, setValueXr] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x^4)-13")
    const [X, setX] = useState(0)
    const [XL, setXL] = useState(0)
    const [XR, setXR] = useState(0)

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    const inputXL = (event) => {
        console.log(event.target.value)
        setXL(event.target.value)
    }
    const inputXR = (event) => {
        console.log(event.target.value)
        setXR(event.target.value)
    }
    const calculateRoot = () => {
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        calFalse(xlnum, xrnum);

        setHtml(print());

        console.log(valueIter)
        console.log(valueXl)
    }
    return (

        <Container>
            <h1>
                False-Position
            </h1>
            <Card>
                <Card.Header as="h5">Featured</Card.Header>
                <Card.Body>
                    <Row>
                        <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "80%", margin: "0 auto" }} className="form-control"></input>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Input XL</Form.Label>
                            <input type="number" step="0.01" id="XL" onChange={inputXL} className="form-control" ></input>
                        </Col>
                        <Col>
                            <Form.Label>Input XR</Form.Label>
                            <input type="number" step="0.01" id="XR" onChange={inputXR} className="form-control"></input>
                        </Col>
                    </Row>
                    <Row>
                        <h1>

                        </h1>
                    </Row>
                    <Row>
                        <h1>

                        </h1>
                    </Row>
                    <Row>
                        <br></br>
                        <Button variant="primary" onClick={calculateRoot} style={{ width: "20%", margin: "0 auto" }}>Calculate</Button>
                    </Row>

                </Card.Body>
                <h5>Answer = {X.toPrecision(7)}</h5>
            </Card>
            <br></br>
            <Container>
                {html}
            </Container>

        </Container >
    )
}
export default Falseposition;