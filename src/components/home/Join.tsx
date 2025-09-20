"use client"
import { FaUserCheck, FaFolderOpen, FaUserPlus } from "react-icons/fa";
interface Step {
  id: string;
  icon: React.ComponentType<{ size?: string | number }>;
  title: string;
  description: string;
  buttonText: string;
  action: () => void;
}

const JoinSection = () => {
  const featuredSteps:Step[] = [
    {
      id: "confirm",
      icon: FaUserCheck,
      title: "Confirm Your Profile",
      description:
        "Already nominated? Verify your details and complete your profile to go live in the directory.",
      buttonText: "Confirm Now",
      action: () => {
        // Add your confirm profile logic here
        console.log("Confirm Now clicked");
      },
    },
    {
      id: "portfolio",
      icon: FaFolderOpen,
      title: "Submit Your Portfolio",
      description:
        "Showcase your work, projects, and skills to be considered for inclusion in the directory.",
      buttonText: "Submit Portfolio",
      action: () => {
        // Add your submit portfolio logic here
        console.log("Submit Portfolio clicked");
      },
    },
    {
      id: "nominate",
      icon: FaUserPlus,
      title: "Nominate Someone",
      description:
        "Know a talented student who should be featured? Nominate them for consideration.",
      buttonText: "Nominate Now",
      action: () => {
        // Add your nominate logic here
        console.log("Nominate Now clicked");
      },
    },
  ];

  const handleCardClick = (step:Step) => {
    console.log(`${step.title} card clicked`);
    // Optionally trigger the same action as the button
    // step.action();
  };

  return (
    <section id="join" className="py-20 bg-navy text-white section-clickable">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
            How to Get Featured
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                id={`cta-card-${index + 1}`}
                onClick={() => handleCardClick(step)}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer group section-clickable relative overflow-hidden"
              >
                {/* Subtle number indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="text-gold text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={48} />
                </div>

                {/* Content */}
                <h3 className="font-montserrat font-semibold text-xl mb-4">
                  {step.title}
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Button */}
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when button is clicked
                    step.action();
                  }}
                  className="bg-gold text-navy px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-all duration-300 w-full hover:shadow-lg hover:shadow-gold/20 transform hover:-translate-y-0.5"
                >
                  {step.buttonText}
                </button> */}

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
              </div>
            );
          })}
        </div>

        {/* Additional CTA section */}
        <div className="mt-16 text-center">
          <p className="text-white/70 text-lg mb-6">
            Need help getting started? Our team is here to guide you through the
            process.
          </p>
          <button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
