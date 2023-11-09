import { useState } from "react"
import { Button, Container, Form, FormText, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

<h1>
    Grapigay
</h1>
const Graphical = () => {
    const print = () => {
        console.log(data)
        setValueIter(data.map((x) => x.iteration));
        setValueXl(data.map((x) => x.X));
        // setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x) => x.Y));
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {/* <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.Xl}</td>
                                    <td>{element.Xm}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>

        );
    }
    const calGraphical = (xl, xr) => {
        var xm, fXl, fXr, ea, scope, xold, xnew;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        scope = {
            x: xl,
        }
        fXl = evaluate(Equation, scope)
        while (xl < xr) {
            xl = xl + 1;
            scope = {
                x: xl,
            }
            fXr = evaluate(Equation, scope)

            iter++;
            if (fXl * fXr > 0) {
                xold = xl;
                fXl = fXr;
                console.log(fXl);
            } else {
                xnew = xl;
                while ((fXl > 0.000001 && iter < MAX)||( Math.abs(fXl) > 0.000001)) {
                    console.log(fXl);
                    iter++;
                    xold = xold + 0.000001;
                    scope = {
                        x: xold,
                    }
                    fXl = evaluate(Equation, scope)
                }
                setX(xold);
                break;
            }
        }

    }

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);


    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(43*x)-180")
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
        calGraphical(xlnum, xrnum);

        setHtml(print());

        console.log(valueIter)
        console.log(valueXl)
    }

    return (
        <Container>

            <Form>
                <Row>
                    <h1>Grapigay</h1>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Card>
                            <Card.Header as="h5">Featured</Card.Header>
                            <Card.Body>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Label>Input f(x)</Form.Label>
                                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "50%", margin: "0 auto" }} className="form-control" />
                                    </Col>
                                    <Col>
                                        <Form.Label>Input XL</Form.Label>
                                        <input type="number" id="XL" onChange={inputXL} style={{ width: "50%", margin: "0 auto" }} className="form-control" />
                                    </Col>
                                    <Col>
                                        <Form.Label>Input XR</Form.Label>
                                        <input type="number" id="XR" onChange={inputXR} style={{ width: "50%", margin: "0 auto" }} className="form-control" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="primary" onClick={calculateRoot} style={{ width: "40%", margin: "0 auto", height: "50px" }}>Go somewhere</Button>
                                    </Col>

                                </Row>
                                <br></br>
                                <Row>
                                    <Col>
                                        <h5>Answer = {X.toPrecision(10)}</h5>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Form.Group>
                </Row>
            </Form>


            <Container>
                {html}
            </Container>

        </Container>

    )
}

export default Graphical;