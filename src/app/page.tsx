"use client";

import HeroSection from "./home/HeroSection"; 
import Approach from "./home/Approach";
import Service from "./home/Service";
import Career from "./home/Career";
import Navbar  from "../components/Navbar";
import { useRef } from "react";
import style from "./page.module.css";
import ShootingStarScene from "@/components/ShootingStars";

export default function Home() {
  const heroRef = useRef(null);
  const aprRef = useRef(null);
  const svcRef = useRef(null);
  const carRef = useRef(null);
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className={style.mainContainer}>
        <HeroSection ref={heroRef}/>
        <Approach ref={aprRef}/>
        <Service ref={svcRef}/>
      </main>
      <footer>      
        <Career ref={carRef}/>
      </footer>
    </>
  );
}