'use client'

import Footer from "../footer/page";
import Header from "../header/page";
import Head from "../head/page";
function Description() {
    return (
        <>
            <Head />
            <Header />
            <section className="about_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        {/* <h2>
                            Description
                        </h2> */}
                        {/* <p>
                            Magni quod blanditiis non minus sed aut voluptatum illum quisquam
                            aspernatur ullam vel beatae rerum ipsum voluptatibus
                        </p> */}
                    </div>
                    <div className="row">
                        <div className="col-md-6 ">
                            <div className="img-box">
                                <img alt="" src="/images/description.jpeg" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="detail-box">
                                <h3>Description</h3>
                                <p>
                                Possession is just one of many stats shaping modern football analysis. While high possession can indicate dominance, some teams thrive on counter-attacks, proving that efficiency matters just as much.

Beyond possession, passing accuracy, and heat maps provide deeper insights into team performance. These stats help coaches refine strategies, scouts assess players, and fans gain a richer understanding of the game.

With the rise of AI and big data, football analytics is evolving rapidly, shaping the future of the sport.

 For Coaches & Analysts: Advanced metrics like Expected Goals (xG), progressive passes, and heat maps help refine tactics, optimize formations, and exploit opponents' weaknesses.

 For Scouts & Clubs: Player performance data—such as sprint speed, pressing intensity, and passing accuracy—helps teams identify talent, make transfer decisions, and build competitive squads.

 For Fans & Media: Stats enhance match discussions, providing deeper insights beyond just goals and assists. With analytics, fans can understand team strategies, player impact, and key turning points in a game.

As technology and AI continue to evolve, football analytics is reshaping how the sport is played, managed, and experienced.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Description;