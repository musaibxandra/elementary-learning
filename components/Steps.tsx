// components/HowItWorks.tsx

import { LogIn, GraduationCap, BookCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { 
      title: "Register", 
      description: "Signup to our website.", 
      icon: LogIn 
    },
    { 
      title: "Pick a Course", 
      description: "Decide on what you want to learn.", 
      icon: GraduationCap 
    },
    { 
      title: "Subscribe", 
      description: "Confirm your booking instantly.", 
      icon: BookCheck 
    },
  ];

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-gray-50 my-4 sm:my-6 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto text-center w-full min-w-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">Make your first steps</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col md:flex-row items-center w-full md:w-auto">
                {/* Step Card */}
                <div className="bg-white shadow-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 w-full sm:w-56 md:w-60 max-w-sm">
                  <div className="flex justify-center mb-4 p-2 sm:p-3">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-black-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
                </div>

                {/* Wave Connector (only between steps on desktop) */}
                {index < steps.length - 1 && (
                  <>
                    {/* Mobile: Arrow down */}
                    <div className="md:hidden my-2">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400"
                      >
                        <path
                          d="M12 4v16m0 0l-6-6m6 6l6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* Desktop: Wave */}
                    <div className="hidden md:block mx-4 lg:mx-8 w-24 lg:w-40 h-20">
                      <svg
                        viewBox="0 0 200 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        <path
                          d="M0 30 C 50 0, 150 60, 200 30"
                          stroke="#000000"
                          strokeWidth="3"
                          fill="transparent"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
