"use client";

export default function PageTestimonials() {
  return (
    <section className="bg-[#1C120D] flex flex-col justify-center items-center w-full">
      <h2 className="text-2xl text-white font-extrabold uppercase tracking-widest mb-16 underline decoration-dourado">
        DEPOIMENTOS
      </h2>

      <div className=" bg-black/40 rounded-3xl border-dourado border-2 p-6 text-zinc-200 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
        <blockquote className="h-full w-full relative">
          
          <span className="absolute text-dourado text-6xl md:text-8xl -left-4 -top-6 leading-none">“</span>
            <p className="pl-6 md:pl-10 pr-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
              molestiae neque cupiditate enim, architecto similique cum rem
              commodi iure molestias doloribus, iusto ipsa, possimus eaque error
              ullam expedita accusantium tenetur?
            </p>
          <span className="absolute text-dourado text-6xl md:text-8xl -right-4 -bottom-6 leading-none">”</span>
        </blockquote>
      </div>
       
    </section>
  );
}
