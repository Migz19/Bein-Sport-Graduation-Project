'use client'

import Link from "next/link";

function Footer() {
    return (
        <>
            <section className="info_section layout_padding2">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-lg-4 info_col">
                  <div className="info_contact">
                    <h4>Address</h4>
                    <div className="contact_link_box">
                      <Link href="">
                        <i aria-hidden="true" className="fa fa-map-marker" />
                        <span>Location</span>
                      </Link>
                      <Link href="">
                        <i aria-hidden="true" className="fa fa-phone" />
                        <span>Call +01 1234567890</span>
                      </Link>
                      <Link href="">
                        <i aria-hidden="true" className="fa fa-envelope" />
                        <span>demo@gmail.com</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 info_col">
                  {/* <div className="info_detail">
                    <h4>Info</h4>
                    <p>
                      necessary, making this the first true generator on the Internet.
                      It uses a dictionary of over 200 Latin words, combined with a
                      handful
                    </p>
                  </div> */}
                </div>
                {/* <div className="col-md-6 col-lg-2 mx-auto info_col">
                  <div className="info_link_box">
                    <h4>Links</h4>
                    <div className="info_social">
                      <Link href="">
                        <i aria-hidden="true" className="fa fa-facebook" />
                      </Link>
                      <Link href="">
                        <i aria-hidden="true" className="fa fa-linkedin" />
                      </Link>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-6 col-lg-4 info_col ">
                  <h4>Subscribe</h4>
                  <form action="#">
                    <input placeholder="Enter email" type="text" />
                    <button type="submit">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
            <section className="footer_section">
                <div className="container">
                    <p>
                        © <span id="displayYear" /> All Rights Reserved By Stat Zone
                    </p>
                </div>
            </section>
            <script src="/js/jquery-3.4.1.min.js" type="text/javascript" />
            <script
                crossOrigin="anonymous"
                dangerouslySetInnerHTML={{
                    __html: "  ",
                }}
                integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
            />
            <script src="/js/bootstrap.js" type="text/javascript" />
            <script
                dangerouslySetInnerHTML={{
                    __html: "  ",
                }}
                src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
                type="text/javascript"
            />
            <script src="/js/custom.js" type="text/javascript" />
            <script
                dangerouslySetInnerHTML={{
                    __html: "  ",
                }}
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh39n5U-4IoWpsVGUHWdqB6puEkhRLdmI&callback=myMap"
            />
        </>
    )
}

export default Footer;