import React, { useEffect } from 'react'
import './css/NavigationBar.css'
import { Container, Button } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithGoogle, signOut } from '../firebaseConfig'
// import { useDispatch, useSelector } from 'react-redux';
// import { actionCreaters } from "../state/index";


function NavigationBar() {

    // const dispatch = useDispatch();
    // const quantity = useSelector(state => state.quantity);

    const navigate = useNavigate();
    // const loginState = useSelector(state => state.login);

    useEffect(() => {
        // console.log(provider)
    }, [])

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={()=>{navigate("/home")}}>Food Court</Navbar.Brand>
                    <Navbar.Toggle />
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>{navigate("/home")}}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{navigate("/cart")}}>Cart</Nav.Link>
                        <Nav.Link onClick={()=>{navigate("/order")}}>My Order</Nav.Link>
                        <Nav.Link onClick={()=>{navigate("/aboutus")}}>About Us</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        {localStorage.getItem("name") ?

                            <Navbar.Text>
                                Logged in as: <Link to="/login">{localStorage.getItem("name")}</Link>
                                <Button className='mx-3' onClick={() => {
                                    signOut().then(() => {
                                        navigate("/");
                                    });
                                }}>signout</Button>
                            </Navbar.Text> :

                            <div>
                                <button className="login-with-google-btn" onClick={() => {
                                    signInWithGoogle().then(() => {
                                        navigate("/home");
                                    });
                                }}>
                                    Sign in with Google
                                </button>
                            </div>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar