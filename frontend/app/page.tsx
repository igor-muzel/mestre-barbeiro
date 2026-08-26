"use client";
import Image from "next/image";
import Navbar from "../components/Navbar/navbar";
import Hero from "../components/Hero/hero";
import Card from "../components/Card/card";
import Team from "../components/Team/team";
import Testimonials from "../components/Testimonials/testimonials";


export default function Home() {
  return (
    
    <main className="flex flex-col flex-1 w-full h-full font-sans bg-white">
      <Navbar />
      <Hero />
      <Card/>
      <div className="flex flex-col md:flex-row w-full items-stretch">
        <div className="w-full md:w-1/2 flex">
          <Team />
        </div>
        <div className="w-full md:w-1/2 flex">
          <Testimonials />
          
        </div>
        
      </div>
      
    </main>
  );
}
