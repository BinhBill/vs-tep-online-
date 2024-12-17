import React, { useState } from "react";
import logo from "../logo.png";
import { useNavigate } from "react-router-dom";

import bg from '../bg.jpg';

import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import { Form, Row, Col,  InputGroup } from 'react-bootstrap'
import { registeraccount } from "../services/auth";




export default function Register() {
    let navigate = useNavigate();
    const [showPass, setShowPass] = useState(false)

    const [account, setAccount] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: "",
        role: 'ROLE_USER'
    })
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    const handleshowConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass)
    }

    const handleshowPass = () => {
        setShowPass(!showPass)
    }
    const handleChangeDateOfBirth = (event) => {
        setAccount(prevState => {
            return { ...prevState, dateOfBirth: event.target.value }
        })
    }
    const handleChangeEmail = (event) => {

        setAccount(prevState => {
            return { ...prevState, email: event.target.value }
        })
    }

    const handleChangeFirstName = (event) => {
        setAccount(prevState => {
            return { ...prevState, firstName: event.target.value }
        })
    }
    const handleChangeLastName = (event) => {
        setAccount(prevState => {
            return { ...prevState, lastName: event.target.value }
        })
    }
    const handleChangePassword = (event) => {
        setAccount(prevState => {
            return { ...prevState, password: event.target.value }
        })
    }

    const handleChangeConfirmPassword = (event) => {
        setAccount(prevState => {
            return { ...prevState, confirmPassword: event.target.value }
        })
    }

    const RegisterService = async (e) => {
        e.preventDefault();
        if (account.email === '' || account.firstName === '' || account.lastName === '' || account.password === '' || account.confirmPassword === '') {
            window.ShowAlert('warning', 'Bạn chưa nhập đủ thông tin');
            return
        }
        if (account.password !== account.confirmPassword) {
            window.ShowAlert('warning', 'Mật khẩu nhập lại không khớp');
            return
        }
        console.log(account)
        const data = await registeraccount(account.firstName, account.lastName, account.email, account.dateOfBirth, account.password, account.confirmPassword)
        console.log(data)
        if (data.status === 200 && data.data) {
            window.ShowAlert('success', 'Đăng ký tài khoản thành công');
            navigate('/');
        } else {
            window.ShowAlert('danger', 'Đăng ký tài khoản không thành công');
        }
    }


    return (
        <>
            <div style={{
                background: `url(${bg})`,
                backgroundSize: "100vw 100vh",
                width: "100%",
                height: "100%",
                zIndex: -99999,
                position: "fixed"
            }}></div>
            <div style={{}}>
                <main className="d-flex w-100">
                    <div className="container d-flex flex-column">
                        <div className="row vh-100">
                            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                                <div className="d-table-cell align-middle">
                                    <div className="text-center mt-4">
                                        <h1 className="h2" style={{ color: "white" }}>VSSTEP ONLINE</h1>
                                        <p className="lead" style={{ color: "white" }}>
                                            Đăng ký
                                        </p>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="m-sm-4">
                                                <div className="text-center">
                                                    <img src={logo} alt="Charles Hall"
                                                        className="img-fluid" width={180} height={180} />
                                                </div>
                                                    <Row>
                                                        <Col md={{ span: 8, offset: 0 }}>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Email </Form.Label>
                                                                <Form.Control type="email" placeholder="Enter email"
                                                                    value={account.email}
                                                                    onChange={(event) => { handleChangeEmail(event) }} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={{ span: 4, offset: 0 }}>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Date Of Birth </Form.Label>
                                                                <Form.Control type="date"
                                                                    value={account.dateOfBirth}
                                                                    onChange={(event) => { handleChangeDateOfBirth(event) }} />
                                                            </Form.Group>
                                                        </Col>


                                                    </Row>


                                                    <Row>
                                                        <Col md={{ span: 6, offset: 0 }}>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>First Name </Form.Label>
                                                                <Form.Control type="text" placeholder="First Name"
                                                                    value={account.firstName}
                                                                    onChange={(event) => { handleChangeFirstName(event) }} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={{ span: 6, offset: 0 }}>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Last Name </Form.Label>
                                                                <Form.Control type="text" placeholder="Last Name"
                                                                    value={account.lastName}
                                                                    onChange={(event) => { handleChangeLastName(event) }} />
                                                            </Form.Group>
                                                        </Col>


                                                    </Row>
                                                    <Row>
                                                        <Col md={{ span: 12, offset: 0 }}>

                                                            <Form.Label>Mật khẩu (Có ký tự Hoa, thường, đặc biệt, số)  </Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control placeholder="Password"
                                                                    type={!showPass ? "password" : "text"}
                                                                    value={account.password}
                                                                    onChange={(event) => { handleChangePassword(event) }} />
                                                                <InputGroup.Text>{showPass ? <BsEye onClick={handleshowPass} /> : <BsEyeSlash onClick={handleshowPass} />}</InputGroup.Text>

                                                            </InputGroup>

                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col md={{ span: 12, offset: 0 }}>

                                                            <Form.Label>Nhập lại mật khẩu (Có ký tự Hoa, thường, đặc biệt, số)  </Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control placeholder="Confirm Password"
                                                                    type={!showConfirmPass ? "password" : "text"}
                                                                    value={account.confirmPassword}
                                                                    onChange={(event) => { handleChangeConfirmPassword(event) }} />
                                                                <InputGroup.Text>{showConfirmPass ? <BsEye onClick={handleshowConfirmPass} /> : <BsEyeSlash onClick={handleshowConfirmPass} />}</InputGroup.Text>

                                                            </InputGroup>


                                                        </Col>
                                                    </Row>


                                                    <div>Bằng việc nhấn nút đăng ký, bạn đồng ý với <b style={{
                                                        color: "blue",
                                                        textDecoration: "underline",
                                                        cursor: "pointer"
                                                    }}>điều khoản sử dụng</b> của chúng tôi
                                                    </div>
                                                    <div className="text-center mt-3">
                                                        {/*<a href="index.html" className="btn btn-lg btn-primary">Sign in</a>*/}
                                                        <button type="submit" className="btn btn-lg btn-primary"
                                                            onClick={RegisterService}
                                                        >Đăng ký
                                                        </button>
                                                    </div>
                                                    <div>Đã có tài khoản? <a
                                                        style={{ color: "blue", textDecoration: "underline" }}
                                                        onClick={() => {
                                                            navigate('/')
                                                        }}>Đăng nhập</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}