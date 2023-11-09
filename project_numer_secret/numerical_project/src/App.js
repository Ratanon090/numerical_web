import logo from './logo.svg';
import './App.css';
import Sample from './Root_of_Equation/Sample';
import Graphical from './Root_of_Equation/Graphical';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar1 from "./Navigation/Navbar.js";
import Falseposition from './Root_of_Equation/Falseposition';
import Onepoint from './Root_of_Equation/Onepoint';
import Newton from './Root_of_Equation/Newton';
// import Cramer from './Gauss/Cramer';
import Secant from './Root_of_Equation/Secant';
import { Container } from 'react-bootstrap';
import { useRef } from 'react';

import { BrowserRouter , Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
      {/* <a href="/Bisection" >ddawd</a> */}
        <div className="App">
          <Navbar1 />
          <main>
            <Container>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/Sample" element={<Sample />} />
              <Route path="/onepoint" element={<Onepoint />} />
              <Route path="/graphical" element={<Graphical />} />
              <Route path="/Falseposition" element={<Falseposition />} />
              <Route path="/Newton" element={<Newton />} />
              <Route path="/secant" element={<Secant />} />

              {/* <Route path="/Cramer" element={<Cramer />}/> */}
              {/* <Route path="/gauss-elimination" element={<GaussElimination />} /> */}
              {/* <Route path="/gauss-jordan" element={<GaussJordan />} /> */}

              {/* <Route path="/lagrange" element={<Lagrange />} /> */}
              {/* <Route path="/spline" element={<Spline />} /> */}
            </Routes>
            </Container>
          </main>

        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
