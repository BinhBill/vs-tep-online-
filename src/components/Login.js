import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../logo.png';
import bg from '../bg.jpg';
import { loginService } from '../services/auth'
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import { InputGroup } from "react-bootstrap";
import { Form } from 'react-bootstrap'



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false)
    let navigate = useNavigate();
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }


    const handleshowPass = () => {
        setShowPass(!showPass)
    }
    
    function loginNavigate() {
        if (sessionStorage.getItem('role') === 'ROLE_ADMIN') {
            //navigate('/admin/dashboards');
            window.location.href = '/admin/dashboards';
        } else if (sessionStorage.getItem('role') === 'ROLE_USER') {
            //navigate('/home');
            window.location.href = '/home';
        } else {
            window.ShowAlert('warning', 'Tài khoản chưa được cấp quyền');
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('token') != null) loginNavigate();
    }, []);


    const loginForm = async (e) => {
        e.preventDefault();
        console.log(email, password)
        if (email === '' || password === '') {
            window.ShowAlert('warning', 'Bạn chưa điền đủ tài khoản và mật khẩu');
            return
        }
        const data = await loginService(email, password)
        console.log(data)
        if (data.data && data.status === 200) {
            localStorage.setItem("user", JSON.stringify(data.data));
            window.alert("Đăng nhập thành công")
            window.location.assign('/home');
        } else {
            window.ShowAlert('danger', 'Sai tài khoản hoặc mật khẩu');
        }

    }


    return (<>
        <div style={{
            background: `url(${bg})`,
            backgroundSize: "100vw 100vh",
            width: "100%",
            height: "100%",
            zIndex: -99999,
            position: "fixed"
        }}></div>
        <div>
            <main className="d-flex w-100">
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">
                                <div className="text-center mt-4">
                                    <h1 className="h2" style={{ color: "white" }}>Welcome</h1>
                                    <p className="lead" style={{ color: "white" }}>
                                        Đăng nhập để tiếp tục
                                    </p>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                            <div className="text-center">
                                                <img src={logo} alt="Charles Hall"
                                                    className="img-fluid" width={180} height={180} />
                                            </div>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" value={email}
                                                    onChange={(event) => { handleChangeEmail(event) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        type={!showPass ? "password" : "text"}
                                                        placeholder="Password" value={password}
                                                        onChange={(event) => { handleChangePassword(event) }} />
                                                    <InputGroup.Text>{showPass ? <BsEye onClick={handleshowPass} /> : <BsEyeSlash onClick={handleshowPass} />}</InputGroup.Text>
                                                </InputGroup>
                                            </Form.Group>
                                            
                                            <div className="text-center mt-3">
                                                {/*<a href="index.html" className="btn btn-lg btn-primary">Sign in</a>*/}
                                                <button type="submit" className="btn btn-lg btn-primary"
                                                    onClick={loginForm}>Đăng nhập
                                                </button>
                                            </div>
                                            <div>Chưa có tài khoản? <a
                                                style={{ color: "blue", textDecoration: "underline" }}
                                                onClick={() => {
                                                    navigate('/register')
                                                }}>Đăng ký</a></div>
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