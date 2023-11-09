import { useState } from "react"
import { Button, Container, Form, FormText, Table } from "react-bootstrap";
import { evaluate,derivative } from 'mathjs'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const Newton = () => {
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
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }
    const error = (xold,xnew) => Math.abs(xnew - xold/ xnew)*100;
    const calNewton=(xl)=>{
        var fxl,fxld,scope,xnew; 
        const e = 0.000001;
        var iter = 0;
        const MAX = 50;
        var obj =[];
        scope = {
            x:xl,
        }
        fxl = evaluate(Equation,scope)
        scope={
            x:xl,
        }
        fxld = derivative(Equation, 'x').evaluate(scope);
        xnew = xl - (fxl/fxld);
        while((Math.abs((xnew-xl)/xnew))*100 >e && iter < MAX){
            iter++;
            xl = xnew;
            scope = {
                x:xl,
            }
            fxl = evaluate(Equation,scope)
            scope={
                x:xl,
            }
            fxld = derivative(Equation, 'x').evaluate(scope);
            xnew = xl - (fxl/fxld);
            obj = {
                iteration: iter,
                XL: xnew,
            }
            data.push(obj)
        }
        setX(xnew)
    }
    const data=[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x^2)-7");
    const [X, setX] = useState(0)
    const [XL, setXL] = useState(0)

    const inputEquation = (event)=>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }
    const calculateRoot =()=>{
        const xlnum = parseFloat(XL)
        calNewton(xlnum)

        setHtml(print());

        console.log(valueIter)
        console.log(valueXl)
    }
    return(
        <Container style = {{width: "60%"}}>
            <h1>Newton-Raphson</h1>
            <Card>
                <Card.Header as ="h5">Featured</Card.Header>
                <Card.Body>
                    <Row>
                        
                        <Form.Label >Input f(x)</Form.Label>
                        <input type = "text" id ="equation" value = {Equation} onChange={inputEquation} className ="form-control"></input>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Input X</Form.Label>
                            <input type = "number" id="XL"onChange = {inputXL} className= "form-control"></input>
                        </Col>
                    </Row>
                    <Row>
                        <br></br>
                    </Row>
                    <Row>
                        <Button variant = "primary" onClick = {calculateRoot}>Calcualte</Button>
                    </Row>
                </Card.Body>
                <h5>Answer = {X.toPrecision(10)}</h5>
            </Card>
            <br></br>
            <Container>
                {html}
            </Container>
        </Container>
    )
}
export default Newton;