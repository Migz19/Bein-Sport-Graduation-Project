"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, [router]);

  return (
    <div className="header">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <Link className="navbar-brand" href="/">
            <Image src={"/images/logo.png"} alt="Logo" height={60} width={60} />
            <span> Stat Zone</span>
          </Link>
          <button
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbarSupportedContent"
            data-toggle="collapse"
            type="button"
          >
            <span className=""> </span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard">
                  Dashboard
                </Link>
              </li>
              {/* added the login here */}
              <li className="nav-item">
                <Link className="nav-link" href="/components/team">
                  Team
                </Link>
              </li>
              {!userId && (
                <li className="nav-item">
                  <Link className="nav-link" href="/components/Login">
                    Login
                  </Link>
                </li>
              )}
              {userId && (
                <li className="nav-item">
                  <Link className="nav-link" href="/" onClick={() => {
                      localStorage.removeItem("userId");
                      localStorage.removeItem("possessionData");
                      localStorage.removeItem("videoUrl");
                      localStorage.removeItem("fieldVideoUrl");
                      setUserId(null);}}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
