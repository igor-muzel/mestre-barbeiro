"use client";

import Image from "next/image";
import banner from "../../public/banner.png";


export default function Hero() {
  return (
    <section className="h-full relative overflow-hidden inset-0">
      <div className="w-full h-full">
        <Image className="w-full h-200 object-cover" src={banner} alt="Banner" />
      </div>

      <div className="absolute text-black inset-0 flex flex-start items-center mx-0 left-90">
        <div className="">
          <div className="w-5/9">
            <h1 className="text-5xl text-white font-titulo-banner">
              SEU ESTILO, NOSSA ARTE
            </h1>
          </div>

          <div className="w-5/12">
            <p className="text-white py-4">Agende seu horário na melhor barbearia da cidade</p>
          </div>
          
          <button className="button">AGENDAR AGORA</button>
        </div>
      </div>
    </section>
  );
}
