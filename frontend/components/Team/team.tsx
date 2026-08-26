"use client";

import Image from "next/image";

const teamsMembers = [
  { id: 1, name: "Igor", role: "Barbeiro Sênior", avatar: "/barbeiro1.jpg" },
  {
    id: 2,
    name: "Henrique",
    role: "Especialista em Barba",
    avatar: "/barbeiro2.jpg",
  },
  { id: 3, name: "Fernando", role: "Barbeiro", avatar: "/barbeiro3.jpg" },
];

export default function PageTeam() {
  
  return (
    <section className="w-full py-20 px-60 flex justify-start items-center flex-col bg-[#1C120D] gap-4">
      <div className="text-2xl text-white font-extrabold uppercase tracking-widest mb-16 underline decoration-dourado">
        <h1>EQUIPE</h1>
      </div>

      <div className="flex justify-start gap-8 mx-0 left-90 items-center">
        {teamsMembers.map((member) => (
          <article
            key={member.id}
            className="flex flex-col justify-center items-center"
          >
            <div className="w-32 h-32 rounded-full border-4 border-dourado overflow-hidden mb-6 transition group-hover:scale-105">
              <Image
                className="object-cover h-full w-full"
                src={member.avatar}
                alt="Membro da equipe"
                width={128}
                height={128}
              />
            </div>

            <div className="flex flex-col justify-center items-center flex-nowrap whitespace-nowrap">
              <h3>{member.name}</h3>
              <p className="text-dourado text-sm mt-1">{member.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
