"use client";

export default function PageCard() {
  return (
    <article className="flex flex-col gap-16 bg-black items-center justify-center">
      <div className="mt-16">
        <h1 className="font-bold text-2xl">NOSSOS SERVIÇOS</h1>
      </div>

      <div className="flex">
        <div className="p-4 m-4 md:flex flex-col justify-center items-center max-w-sm rounded overflow-hidden shadow-lg border border-[#3a3328] bg-cinza-dark">
          <img className="w-25 h-25" src="/cabelo.png" alt="Cabelo" />
          <div className="px-6 py-4 items-center justify-center">
            <div className="font-bold text-xl mb-2 text-white underline decoration-dourado">
              {" "}
              Cabelo
            </div>
            <h3 className="text-dourado font-bold text-base">$ 50.00</h3>
          </div>
        </div>

        <div className="p-8 m-4 md:flex flex-col justify-center items-center max-w-sm rounded overflow-hidden shadow-lg border border-[#3a3328]  bg-cinza-dark">
          <img className="w-25 h-25" src="/barba.png" alt="Barba" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-white underline decoration-dourado">
              Barba
            </div>
            <h3 className="text-dourado font-bold text-base">$ 30.00</h3>
          </div>
        </div>

        <div className="p-8 m-4 md:flex flex-col justify-center items-center max-w-sm rounded overflow-hidden shadow-lg border border-[#3a3328]  bg-cinza-dark">
          <img className="w-25 h-25" src="/bigodin.png" alt="Bigode" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-white underline decoration-dourado">
              Bigode
            </div>
            <h3 className="text-dourado font-bold text-base">$ 20.00</h3>
          </div>
        </div>
      </div>
    </article>
  );
}
