"use client";
import Image from "next/image";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Logo from "../../public/logo.png";
import { DiCode } from "react-icons/di";

const contatos = [
  { id: 1, description: "mestrebarbeiro@gmail.com" },
  { id: 2, description: "(17)90039-8080" },
  { id: 3, description: "Rua Silvestre, 123" },
];

const redeSociais = [
  {
    id: 1,
    description: "Instagram",
    avatar: FaSquareInstagram,
    classe: "bg-amber-900 w-7 h-7 p-1 border-2 rounded-4xl",
  },
  {
    id: 2,
    description: "Facebook",
    avatar: FaFacebook,
    classe: "bg-blue-500 w-7 h-7 p-1 border-2 rounded-4xl",
  },
  {
    id: 3,
    description: "Whatsapp",
    avatar: IoLogoWhatsapp,
    classe: "bg-green-500 w-7 h-7 p-1 border-2 rounded-4xl",
  },
];

export default function ComponentFooter() {
  return (
    <footer className="bg-[#130808]  h-full w-full bg-neutral-primary-soft border-1 border-dourado rounded-base p-4">
      <div className="flex justify-between max-w-7xl mx-auto border-2 border-dourado/50 rounded-lg p-10 shadow-2xl shadow-black">
        <span className="flex text-sm text-body sm:text-center gap-2">
          {/*© 2026{" "}*/}

          <Image src={Logo} alt="logo" height={120} width={190} />
        </span>
        <ul className="flex items-start gap-x-16 justify-center h-full font-medium text-body sm:mt-0">
          <li>
            <a href="#" className="hover:underline">
              CONTATO
            </a>

            {contatos.map((contato) => (
              <div key={contato.id} className="flex flex-col gap-1 py-1">
                <p className="flex text-dourado">{contato.description}</p>
              </div>
            ))}
          </li>
          <li>
            <a href="#" className="hover:underline me-2 md:me-25">
              REDES SOCIAIS
            </a>

            {redeSociais.map((rede) => {
              const Icon = rede.avatar;

              return (
                <div key={rede.id} className="flex flex-col gap-1 py-2">
                  <p className="flex items-center gap-1 text-dourado">
                    <Icon className={rede.classe} />
                    {rede.description}
                  </p>
                </div>
              );
            })}
          </li>
          <li>
            <a href="#" className="hover:underline me-2 md:me-25">
              LOCALIZAÇÃO
            </a>
            <div className="flex flex-col gap-1 py-4">
              <div className="flex flex-row items-center gap-4 h-full">
                <div className="h-25 w-35 rounded-md border-2 border-zinc-200 overflow-hidden relative flex-shrink-0 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps?q=Barretos%20SP&output=embed"
                    width="100%"
                    height="100%"
                    className="border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 fill-red-900 drop-shadow-md"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                    </svg>
                  </div>
                </div>

                <div className="text-dourado text-sm leading-snug flex flex-col">
                  <span>Rua das Tesouras,</span>
                  <span>120 ao cinquentenário</span>
                  <span>Barretos, 129</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex justify-center p-1 gap-1 items-center">
        © 2026 O Mestre Barbeiro. Todos os direitos reservados. Desenvolvido por
        MuzelCode <DiCode size={27} className=" text-dourado rounded-2xl" />
      </div>
    </footer>
  );
}
