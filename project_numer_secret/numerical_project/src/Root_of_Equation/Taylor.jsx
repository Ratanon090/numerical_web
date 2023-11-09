import { useState } from "react"
import { Button, Container, Form, FormText, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Taylor = () => {
    const print = () => {
        console.log(data)
        setValueIter(data.map((x) => x.iteration));
        setValueXl(data.map((x) => x.Xl));
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
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.XL}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }
    const error = (xold, xnew) => Math.abs(xnew - xold / xnew) * 100;
    const calTaylor = (xl) => {
        if(Equation == "ln(x)"){
            setEquation("log(x,2.7182818)")
        }
        var scope;
        scope ={
            x:xl,
        }
        var fXl;
        fXl = evaluate(Equation, scope);
        setX(fXl);
    }
    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("")
    const [X, setX] = useState(0)
    const [XL, setXL] = useState(0)

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
        if(Equation == "ln(x)"){
            event.target.value = "log(x,2.7182818)"
            setEquation(event.target.value)
        }
                
    }
    const inputXL = (event) => {
        console.log(event.target.value)
        setXL(event.target.value)
    }
    const calculateRoot = () => {
        const xlnum = parseFloat(XL)
        calTaylor(xlnum);

        setHtml(print());

        console.log(valueIter)
        console.log(valueXl)
    }
    return (
        <Container>
            <h1>Taylor</h1>
            <Card>
                <Card.Header as="h5">Normalized the Gay</Card.Header>
                <Card.Body>
                    <Row>
                        <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "80%", margin: "0 auto" }} className="form-control"></input>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Input X0</Form.Label>
                            <input type="number" id="XL" onChange={inputXL} className="form-control" style={{ widht: "70%", margin: "0 auto" }}></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Input X to find</Form.Label>
                            <input type="number" id="XL" onChange={inputXL} className="form-control" style={{ widht: "70%", margin: "0 auto" }}></input>
                        </Col>
                    </Row>
                    <Row>
                        <br></br>
                    </Row>
                    <Row>
                        <Button variant="primary" onClick={calculateRoot} style={{ width: "20%", margin: "0 auto" }}>Calculate</Button>
                    </Row>
                </Card.Body>
                <h5> Answer = {X.toPrecision(7)}</h5>
            </Card>
            <br></br>
            <Container>
                {html}
            </Container>
        </Container>
    )
}
export default Taylor;