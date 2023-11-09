import { useState } from "react"
import { Button, Container, Form, FormText, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Secant = () =>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXr(data.map((x)=> x.Xr));
        return(
            <Container>
                <Table striped bordered hover variant ="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width = "30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return (
                                <tr key = {index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.XL}</td>
                                    <td>{element.Xr}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }
    const error = (xold, xnew) => Math.abs(xnew - xold/ xnew)*100;

    const calSecant=(xl,xr) =>{
        var xnew,xmid,xold,scope,fxold,fxmid;
        xold = xl;
        xmid = xr;
        const e=0.000001;
        var obj = [];
        var iter = 0;
        const MAX = 50;
        scope = {
            x: xold,
        }
        fxold = evaluate(Equation, scope)
        scope={
            x:xmid,
        }
        fxmid = evaluate(Equation,scope)
        xnew = xold - (fxold*(xold-xmid))/(fxold-fxmid);
        
        while(Math.abs((xnew-xmid)/xnew)*100 > e && iter < MAX){
            xold = xmid;
            xmid = xnew;
            scope = {
                x: xold,
            }
            fxold = evaluate(Equation, scope)
            scope={
                x:xmid,
            }
            fxmid = evaluate(Equation,scope)
            xnew = xold - (fxold*(xold-xmid))/(fxold-fxmid);
            obj = {
                iteration: iter,
                XL: xold,
                Xr: xmid,
            }
            data.push(obj)
            iter++;
        }
        setX(xnew);
    }
    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXr, setValueXr] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("x^2 -7")
    const [X, setX] = useState(0)
    const [XL, setXL] = useState(0)
    const [XR, setXR] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }
    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }
    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        calSecant(xlnum, xrnum);

        setHtml(print());

        console.log(valueIter)
        console.log(valueXl)
        console.log(valueXr)
    }
    return (
        <Container>
            <h1>
                Secant
            </h1>
            <Card>
                <Card.Header as = "h5">Featured</Card.Header>
                <Card.Body>
                    <Row>
                        <Form.Label>Input f(x)</Form.Label>
                        <input type = "text" id="equation" value={Equation} onChange = {inputEquation} style={{width: "80%", margin: "0 auto"}} className="form-control"></input>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Input XL</Form.Label>
                            <input type="number" id="XL" onChange={inputXL} className = "form-control"></input>
                        </Col>
                        <Col>
                            <Form.Label>Input XR</Form.Label>
                            <input type = "number" id="XR" onChange={inputXR} className = "form-control"></input>
                        </Col>
                    </Row>
                    <Row>
                        <h1>

                        </h1>
                    </Row>
                    <Row>
                        <br></br>
                    </Row>
                    <Row>
                        <Button variant = "primary" onClick={calculateRoot} style={{width: "20%",margin: "0 auto"}}>Calculate</Button>
                    </Row>
                </Card.Body>
                <h5>Answer = {X.toPrecision(13)}</h5>
            </Card>
            <br></br>
            <Container>
                {html}
            </Container>
        </Container>
    )
}
export default Secant;