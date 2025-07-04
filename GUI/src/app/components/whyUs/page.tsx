"use client";

import Link from "next/link";
import styles from "./page.module.css";
import Model from "../fileUpload/page";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

function WhyUs() {
  const router = useRouter();

  const downloadFieldVideo = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      router.push("/components/Login");
      return;
    }

    const fieldVideoUrl = localStorage.getItem("fieldVideoUrl");
    if (!fieldVideoUrl) {
      alert("No field video available. Please process a video first.");
      router.push("/possession");
      return;
    }

    try {
      const a = document.createElement('a');
      a.href = fieldVideoUrl;
      a.download = 'field_transformation_video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Field video download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  const downloadMatchVideo = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      router.push("/components/Login");
      return;
    }

    const videoUrl = localStorage.getItem("videoUrl");
    if (!videoUrl) {
      alert("No match video available. Please process a video first.");
      router.push("/possession");
      return;
    }

    try {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'match_output_video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Match video download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <section className="why_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            <span>Made by passionate students for Football Professionals</span>
          </h2>
          <h4>
            <span>
              Our platform is designed to benefit all football professionals.
              We provide a wide variety of tools to help you analyze overall
              team performance and individual performances.
            </span>
          </h4>
        </div>

        {/* This container will be turned into a flex container by the CSS */}
        <div className="why_container">

          <div className="box">
            <div className="img-box">
              <img alt="" src="/images/analyst.jpeg" />
            </div>
            <div className="detail-box">
              <h5>Analyst</h5>
              <p>
                Identify and highlight opponents' strategy and tendencies
                to gain a competitive edge
              </p>
            </div>
            <Model />
          </div>

          <div className="box">
            <div className="img-box">
              <img alt="" src="/images/coach1.jpg" />
            </div>
            <div className="detail-box">
              <h5>Coach</h5>
              <p>
                Study your team's strengths and weaknesses to improve your
                result
              </p>
            </div>
            <div>
              <Button className="tag-btn" href="/dashboard">
                Display dashboard
              </Button>
            </div>
          </div>

          <div className="box">
              <div className="img-box">
                <img alt="" src="/images/OIP.jpeg" />
              </div>
              <div className="detail-box">
                <h5>Scout</h5>
                <p>
                  Be the first to identify the next generation players
                </p>
              </div>
              <div>
              <Button className="tag-btn" onClick={downloadFieldVideo}>
                Download the Field Trans. output
              </Button>
            </div>
            </div>

          <div className="box">
            <div className="img-box">
              <img alt="" src="/images/another.jpeg" />
            </div>
            <div className="detail-box">
              <h5>Team</h5>
              <p>
                Understand your role and self-evaluate your performance
              </p>
            </div>
            <div>
              <Button className="tag-btn" onClick={downloadMatchVideo}>
                Download the output video
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyUs;
