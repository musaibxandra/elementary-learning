import { HoverBorderGradient } from "./hover-border-gradient";
import Image from "next/image";
import Link from "next/link";

interface Feature1Props {
  title: string;
  description?: string;

  buttonSecondary: {
    label: string;
    href: string;
  };
}

export const Feature1 = ({
  title = "Blocks built with Shadcn & Tailwind",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  buttonSecondary = {
    label: "Book Your Appointment",
    href: "https://shadcnblocks.com",
  },
}: Feature1Props) => {
  return (
    <section className="w-full py-16 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mt-12 mx-auto w-full min-w-0">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-balance mb-4 sm:mb-6">
              {title}
            </h1>
            <p className="mb-6 sm:mb-8 max-w-xl text-sm sm:text-base lg:text-lg text-muted-foreground">
              {description}
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link href="payment" className="w-full sm:w-auto">
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto"
                  as="button"
                  className="dark:bg-black border-green-200 border-1 bg-gray-100 cursor-pointer text-black dark:text-white flex items-center justify-center space-x-2 px-6 py-2 text-sm sm:text-base w-full sm:w-auto"
                >
                  <span>{buttonSecondary.label}</span>
                </HoverBorderGradient>
              </Link>
            </div>
          </div>
          {/* Image */}
          <div className="order-1 lg:order-2 w-full min-w-0">
            <Image
              className="w-full h-auto rounded-lg object-cover max-w-full"
              src="/icons/header.jpg"
              width={1300}
              height={1012}
              alt="Facial"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
