"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight2 } from "iconsax-react";
import Link from "next/link";
import useInView from "@/hooks/useInView";
import { cn } from "@/utils";

const AlmostUnder = () => {
  const JoinRef = React.useRef<HTMLDivElement>(null);
  const isInView8 = useInView(JoinRef);
  const JoinRef2 = React.useRef<HTMLDivElement>(null);
  const isInView9 = useInView(JoinRef2);

  return (
    <section>
      <div
        ref={JoinRef}
        className={cn(
          "flex flex-col justify-center px-8 py-11 mt-20 text-base leading-5 text-white bg-neutral-900 ",
          isInView8
            ? "opacity-100 translate-y-0 md:delay-300 duration-500"
            : " opacity-0 translate-y-36"
        )}
      >
        <div className="max-w-[328px] flex flex-col self-center items-center justify-center">
          <header className="text-2xl font-semibold  text-center">
            Join as a Partner/Sponsor/ <br /> Exhibitors
          </header>
          <div className="mt-4 capitalize whitespace-nowrap">
            Unlock Boundless Opportunities at ODS 24
          </div>
          <div>
            <div className="self-center flex">
              <Link
                href="/"
                className="flex gap-2.5 justify-center self-center px-11 py-2 mt-8 max-w-full whitespace-nowrap bg-green-600 rounded-xl w-[245px]"
              >
                <span className="grow self-start mt-1">Become a partner</span>

                <ArrowRight2 />
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="flex gap-2.5 justify-center self-center px-8 py-2 mt-4 max-w-full text-green-600 whitespace-nowrap rounded-xl border-t border-r-4 border-b-4 border-l border-solid border-b-[color:var(--Foundation-Primary-color-primary-color-500,#00A651)] border-l-[color:var(--Foundation-Primary-color-primary-color-500,#00A651)] border-r-[color:var(--Foundation-Primary-color-primary-color-500,#00A651)] border-t-[color:var(--Foundation-Primary-color-primary-color-500,#00A651)] w-[245px]"
              >
                <span className="grow self-start mt-1">
                  Become an Exhibitor
                </span>

                <ArrowRight2 />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={JoinRef2}
        className={cn(
          "flex flex-col justify-center",
          isInView9
            ? "opacity-100 translate-y-0 md:delay-300 duration-500"
            : " opacity-0 translate-y-36"
        )}
      >
        <Image
          loading="eager"
          src="/under.svg"
          alt="hero image"
          width={390}
          height={304}
          priority
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default AlmostUnder;
