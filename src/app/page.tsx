"use client";

import HeroSection from "./home/HeroSection"; 
import Approach from "./home/Approach";
import Service from "./home/Service";
import Navbar  from "../component/Navbar";

export default function Home() {
  return (
    <>
      <div>
        <header>
          <Navbar/>
        </header>
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