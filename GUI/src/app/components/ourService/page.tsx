  'use-client'

  import Link from "next/link";

  function OurService() {
    return (
      <section className="service_section layout_padding">
        <div className="service_container">
          <div className="container">
            <div className="heading_container heading_center">
              <h2>
                <span>Our Services</span>
              </h2>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <div className="box ">
                  <div className="img-box">
                    <img alt="" src="/images/s1.png" />
                  </div>
                  <div className="detail-box">
                    <h5>Possession Metrics</h5>
                    <p>
                      Accurate tracking of ball possession for each team
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="box ">
                  <div className="img-box">
                    <img alt="" src="/images/s2.png" />
                  </div>
                  <div className="detail-box">
                    <h5>Team Classification</h5>
                    <p>
                      Intelligent team and player performance analysis
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="box ">
                  <div className="img-box">
                    <img alt="" src="/images/s3.png" />
                  </div>
                  <div className="detail-box">
                    <h5>Real-time Calculation</h5>
                    <p>
                      fact that a reader will be distracted by the readable
                      content of a page when looking at its layout. The point of
                      using
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  export default OurService;