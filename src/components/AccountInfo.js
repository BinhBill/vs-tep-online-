import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {firstName,
    lastName,
    email} from "../services/headers"

export default function AccountInfo() {

    
    useEffect(() => {
        
    }, [])

    

    return (
        <>
            <div style={{marginTop: -50}}>
                <main className="d-flex w-100">
                    <div className="container d-flex flex-column">
                        <div className="row vh-100">
                            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-25">
                                <div className="d-table-cell align-middle">
                                    <div className="text-center mt-4">
                                        <p className="lead">
                                            Thông tin tài khoản
                                        </p>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="m-sm-4">

                                                <form>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input className="form-control form-control-lg" type="email"
                                                               disabled
                                                               name="email" placeholder="Nhập Email"
                                                               value={email()}
                                                               />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">First Name</label>
                                                        <input className="form-control form-control-lg" type="text"
                                                               name="fullName" placeholder="Nhập họ tên đầy đủ"
                                                               value={firstName()}
                                                               readOnly
                                                               />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Last Name</label>
                                                        <input className="form-control form-control-lg" type="text"
                                                               name="fullName" placeholder="Nhập họ tên đầy đủ"
                                                               value={lastName()}
                                                               readOnly
                                                               />
                                                    </div>
                                                    
                                                    
                                                </form>
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