'use client'

import Footer from "../footer/page";
import Header from "../header/page";
import Head from "../head/page";

function Team() {
    return (
        <>
            <Head />
            <Header />
            <section className="team_section layout_padding">
                <div className="container-fluid text-center">
                    <div className="heading_container heading_center">
                        <h2 className="">
                            Our Team
                        </h2>
                    </div>
                    <div className="team_container">
                        <div className="row justify-content-center">
                            <div className="col-3">
                                <div className="box ">
                                    <div className="img-box">
                                        <img alt="" className="img1" src="/images/team-1.jpg" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>Tasneem Bahaa</h5>
                                        <p>Marketing Head</p>
                                    </div>
                                    <div className="social_box">
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-facebook" />
                                        </a>
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-linkedin" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="box ">
                                    <div className="img-box">
                                        <img alt="" className="img1" src="/images/team-2.jpg" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>Jonathan Mamdouh</h5>
                                        <p>Marketing Head</p>
                                    </div>
                                    <div className="social_box">
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-facebook" />
                                        </a>
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-linkedin" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="box ">
                                    <div className="img-box">
                                        <img alt="" className="img1" src="/images/team-3.jpg" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>Bola Milad</h5>
                                        <p>Marketing Head</p>
                                    </div>
                                    <div className="social_box">
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-facebook" />
                                        </a>
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-linkedin" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-3">
                                <div className="box ">
                                    <div className="img-box">
                                        <img alt="" className="img1" src="/images/team-1.jpg" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>Bassant Salem</h5>
                                        <p>Marketing Head</p>
                                    </div>
                                    <div className="social_box">
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-facebook" />
                                        </a>
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-linkedin" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="box ">
                                    <div className="img-box">
                                        <img alt="" className="img1" src="/images/team-2.jpg" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>Shaimaa Hesham</h5>
                                        <p>Marketing Head</p>
                                    </div>
                                    <div className="social_box">
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-facebook" />
                                        </a>
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-linkedin" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="box ">
                                    <div className="img-box">
                                        <img alt="" className="img1" src="/images/team-3.jpg" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>Earl Martinez</h5>
                                        <p>Marketing Head</p>
                                    </div>
                                    <div className="social_box">
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-facebook" />
                                        </a>
                                        <a href="#">
                                            <i aria-hidden="true" className="fa fa-linkedin" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Team;