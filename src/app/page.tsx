"use client";

import HeroSection from "./home/HeroSection"; 
import Approach from "./home/Approach";
import Service from "./home/Service";
import Navbar  from "../component/Navbar";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef(null);
  const aprRef = useRef(null);
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main>
        <HeroSection ref={heroRef}/>
        <Approach ref={aprRef}/>
        <Service/>
      </main>
      <footer>       
      </footer>
    </>
  );
}