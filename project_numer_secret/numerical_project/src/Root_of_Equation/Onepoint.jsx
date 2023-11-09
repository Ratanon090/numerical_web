import { useState } from "react"
import { Button, Container, Form, FormText, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
<h1>
    One-Gay-Down
</h1>
const Onepoint = () =>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x) => x.iteration));
        setValueXl(data.map((x) =>x.Xl));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return(
                                <tr key = {index}>
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
    const error = (xold,xnew) => Math.abs(xnew - xold / xnew)*100;
    const calPoint = (xl)=>{
        var xnew,scope,fXl;
        const e = 0.000001;
        var iter = 0;
        var temp;
        xnew = 0;
        var obj = {};
        const MAX = 50;
        scope = {
            x:xl,
        }
        xnew = evaluate(Equation, scope);
        while((Math.abs(xnew - xl)/xnew)* 100 > e && iter < MAX){
            xl = xnew;
            iter++;
            scope = {
                x:xl,
            }
            xnew = evaluate(Equation, scope);
            obj = {
                iteration: iter,
                XL: xnew,
            }
            data.push(obj)
        }
        setX(xnew)

    }
    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXr, setValueXr] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x+1)/44");
    const [X, setX] = useState(0)
    const [XL, setXL] = useState(0)
    const [XR,setXR] = useState(0)

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
        calPoint(xlnum,xrnum);

        setHtml(print());

        console.log(valueIter)
        console.log(valueXl)
    }
    return(
        <Container style ={{width: "40%"}}>
            <h1>One-Point-Iteration</h1>
            <Card>
                <Card.Header as="h5">GAY SHIT</Card.Header>
                <Card.Body>
                    <Row>
                        <Form.Label>Input f(x)</Form.Label>
                        <input type = "text" id="equation" value={Equation} onChange={inputEquation} style={{width: "80%", margin: "0 auto"}} className="form-control"></input>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label> Input XL</Form.Label>
                            <input type = "number" id="XL" onChange = {inputXL} className = "form-control" style={{width: "85%", margin: "0 auto"}}></input>
                        </Col>
                        
                    </Row>
                    <Row>
                        <br></br>
                    </Row>
                    <Row>
                        <Button varaint = "primary" onClick={calculateRoot} style={{width: "20%", margin: "0 auto"}}>Calculate</Button>
                    </Row>
                </Card.Body>
                <h5> Answer = {X.toPrecision(10)}</h5>
            </Card>
            <br></br>
            <Container>
                {html}
            </Container>
        </Container>
    )
}
export default Onepoint;