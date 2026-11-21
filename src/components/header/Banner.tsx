import { Coffee } from "lucide-react";
import Image from "next/image";

export default function Banner() {
  return (
    <>
      <section className="group relative isolate overflow-hidden min-h-105 flex items-center bg-[#24160f] shadow-2xl">
        {/* Background Image */}
        <Image
          src="/blackStation.png"
          alt="Black Coffee espresso machine"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#1c100b]/95 via-[#2b190f]/85 to-[#2b190f]/20" />

        {/* Additional Bottom Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10" />

        {/* Content */}
        <div className="relative z-10 w-full px-7 py-14 sm:px-12 lg:px-16">
          {/* Welcome Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e8c5a0]/30 bg-white/10 px-4 py-2 backdrop-blur-md">
            <Coffee className="h-4 w-4 text-[#e8c5a0]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f2dfcd]">
              Welcome to Black Coffee
            </span>
          </div>

          {/* Brand Logo */}
          <div className="mb-7">
            <Image
              src="/black-coffee-logo-white.png"
              alt="Black Coffee"
              width={220}
              height={75}
              className="h-auto w-40 object-contain object-left sm:w-48"
              priority
            />
          </div>

          {/* Heading */}
          <h1 className=" text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Stock Management
            <span className="mt-1 block text-[#e8b98f]">
              System<span className="text-white">.</span>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-sm leading-7 text-[#e8ddd3] sm:text-base">
            Keep track of your products, stock and store inventory from one
            simple and powerful management system.
          </p>

          {/* Decorative Line */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-[#d9a77e]" />
            <div className="h-px w-20 bg-white/30" />
          </div>
        </div>

       

        {/* Bottom Right Decoration */}
        <div className="absolute bottom-0 right-0 h-1 w-1/3 rounded-full bg-linear-to-l from-[#d9a77e]/70 to-transparent" />
      </section>
      ;
    </>
  );
}
