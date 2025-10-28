"use client";

import HeroSection from "./home/HeroSection"; 
import Approach from "./home/Approach";
import Service from "./home/Service";

export default function Home() {
  return (
    <>
      <div>
        <header></header>
      </div>
      <main>
        <HeroSection/>
        <Approach/>
        <Service/>
      </main>
      <div>
        <footer>       
        </footer>
      </div>
    </>
  );
}