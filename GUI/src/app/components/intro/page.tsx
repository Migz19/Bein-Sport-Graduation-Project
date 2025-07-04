'use-client'

import Link from "next/link";
import Model from "../fileUpload/page";

function Intro() {
  return (
    <section className="intro_section ">
      <div
        className="carousel slide"
        data-ride="carousel"
        id="customCarousel1">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row">
                <div className="col-md-6 ">
                  <div className="detail-box">
                    <h1>
                      Bein Sports <br />
                    </h1>
                    <span className="description">
                      Football is the world's most popular sport, uniting over 4 billion fans worldwide.
                      Modern football relies heavily on statistics, changing how teams and fans understand the game.<br />
                      One key stat is possession, which shows how much control a team has during a match.
                    </span>
                    <div className="btn-box">
                      <Link href="/components/description">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-box">
                  
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            {/* <br />
            <br />
            <br />
            <Model /> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro;