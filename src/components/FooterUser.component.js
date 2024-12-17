import React from 'react';
import styled from 'styled-components';



const FooterUser = () => {
  return (
    <footer className="footertestkill ">
                        <div className="container-fluid">
                            
                            <div className="row text-muted  ">                                
                                
                                <div className="col p-3 mb-2 btn btn-info text-dark centered-skill">
                                    <div className="row text-start">
                                        <div className="col"> 
                                            <p className="mb-0">
                                            <a className="text-dark btn btn-primary" href="/listening"
                                            >part1</a>
                                            </p>
                                        </div>
                                        <div className="col"> 
                                            <p className="mb-0">
                                            <a className="text-dark btn btn-primary" href="/listening"
                                            ><strong>part2</strong></a>
                                            </p>
                                        </div>
                                        <div className="col"> 
                                            <p className="mb-0">
                                            <a className="text-dark btn btn-primary" href="/listening"
                                            ><strong>part3</strong></a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row center-text d-flex justify-content-center align-items-center">
                                        Listening 
                                    </div>
                                    
                                </div>
                                <div className="col p-3 mb-2 btn btn-dark  text-dark centered-skill">
                                    <div className="row text-start">
                                        <div className="col"> 
                                            <p className="mb-0">
                                            <a className="text-dark btn btn-secondary" href="/reading"
                                            >part1</a>
                                            </p>
                                        </div>
                                        <div className="col"> 
                                            <p className="mb-0">
                                            <a className="text-dark btn btn-secondary" href="/reading"
                                            ><strong>part2</strong></a>
                                            </p>
                                        </div>
                                        <div className="col"> 
                                            <p className="mb-0">
                                            <a className="text-dark btn btn-secondary" href="/reading"
                                            ><strong>part3</strong></a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row center-text d-flex justify-content-center align-items-center">
                                        Reading 
                                    </div>
                                    
                                </div>
                                <div className="col p-3 mb-2 btn btn-success text-dark centered-skill">
                                    <div className="row text-start">
                                        <div className="col"> 
                                            <p className="mb-0">
                                            <a className="text-dark btn btn-light" href="/writing"
                                            >part1</a>
                                            </p>
                                        </div>
                                        <div className="col"> 
                                            <p className="mb-0">
                                            <a className="text-dark btn btn-light" href="/writing"
                                            ><strong>part2</strong></a>
                                            </p>
                                        </div>
                                        
                                    </div>
                                    <div className="row center-text d-flex justify-content-center align-items-center ">
                                        Writing - 2 phần
                                    </div>
                                    
                                </div>
                                <div className="col p-3 mb-2 btn btn-dark  text-dark centered-skill">
                                    <div className="row text-center">
                                        <div className="col"> 
                                            <p className="mb-0 ">
                                            <a className="text-dark btn btn-success" href="/speaking"
                                            >part1</a>
                                            </p>
                                        </div>
                                        
                                    </div>
                                    <div className="row center-text d-flex justify-content-center align-items-center">
                                        Speaking
                                    </div>
                                    
                                </div>
                                <div className="col text-start centered-div">
                                
                                <div className="row ">
                                <div className="col  centered-div">
                                    <button className="btn btn-info"> 
                                    Next
                                    </button>
                                 
                                </div>
                                <div className="col  centered-div">
                                    <button className="btn btn-info"> 
                                    Save
                                    </button>
                                 
                                </div>
                                
                                        
                                </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </footer>
  );
};

export default FooterUser;
