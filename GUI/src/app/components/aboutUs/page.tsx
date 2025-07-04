'use-client'

import Link from "next/link";

function AboutUs() {
    return (
        <section className="about_section layout_padding">
          <div className="container">
            <div className="heading_container heading_center">
              <h2>
                About Us
              </h2>
              <p>
              We are a team of passionate Computer Science students dedicated to blending technology
               with sports analytics. Our project focuses on revolutionizing football analysis through 
               cutting-edge real-time video processing and AI-driven insights.
              </p>
            </div>
            <div className="row">
              <div className="col-md-6 ">
                <div className="img-box">
                  <img alt="" src="/images/about-img.jpg" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-box">
                  <h3>We Are Football Analysers</h3>
                  <p>
                    Currently, professionals calculate possession manually by recording gameplay incidents such as passing, 
                    interceptions, and ball recoveries. 
                    However, traditional methods, such as using a clock timer or counting passes, suffer from inherent inaccuracies.
                    Hand-timing possession often relies on human judgment, leading to inconsistencies, 
                    especially in fast-paced situations or during contested ball control. 
                    Counting passes also presents challenges, as it fails to differentiate between meaningful possession 
                    in threatening areas and that occurring in less critical parts of the field. 
                    Consequently, these methods are prone to human error and bias, The integration of advanced technology
                    could significantly improve the accuracy and reliability of ball possession calculations.
                  </p>
                  <p>
                    So, we designed an application that analyzes real-time football match footage, 
                    detecting players and the ball as they move. 
                    It takes video input from matches and provides output in the form of accurate possession metrics, 
                    player identification, and team classifications. 
                    the app enhances sports analytics and provides valuable insights for fans, coaches, and analysts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}

export default AboutUs;