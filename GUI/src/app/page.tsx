'use client'
import Image from "next/image";
import logo from "@/app/images/hero-bg.png"
import styles from "./page.module.css";
import Link from "next/link";
import Description from "./components/description/page";
import WhyUs from "./components/whyUs/page";
import Team from "./components/team/page";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import React, { useEffect, useRef, useState } from 'react';
import Head from "./components/head/page";
import Model from "./components/fileUpload/page";
import AboutUs from "./components/aboutUs/page";
import OurService from "./components/ourService/page";
import Intro from "./components/intro/page";

export default function Home() {
  return (
    <>
        <Head />
        <Header />
        <Intro />
        <OurService />
        <AboutUs />
        <WhyUs />
        <Footer />
    </>
  );
}
