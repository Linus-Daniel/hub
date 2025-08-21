"use client";
// components/AboutSection.js
import { useState } from "react";

const AboutSection = () => {
  const [flippedCards, setFlippedCards] = useState({
    1: false,
    2: false,
    3: false,
  });

  const toggleCard = (cardId: 1 | 2 | 3) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <section id="about" className="py-20 bg-white section-clickable">
      <div className="container mx-auto px-4">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center mb-16">
          What Is This?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            id="about-card-1"
            className="flip-card bg-white rounded-lg shadow-lg h-[300px] group perspective section-clickable cursor-pointer"
            onClick={() => toggleCard(1)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
                flippedCards[1] ? "rotate-y-180" : ""
              }`}
            >
              <div className="absolute inset-0 backface-hidden p-8 flex flex-col items-center justify-center text-center">
                <div className="text-gold text-4xl mb-4">
                  <svg
                    className="svg-inline--fa fa-globe"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="1em"
                    height="1em"
                  >
                    <path
                      fill="currentColor"
                      d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"
                    />
                  </svg>
                </div>
                <h3 className="font-montserrat font-semibold text-xl mb-2">
                  A National Platform
                </h3>
                <p className="text-gray-600">Flip to learn more</p>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-navy text-white p-8 flex flex-col items-center justify-center text-center rounded-lg">
                <p>
                  The first nationwide directory showcasing the best
                  engineering, tech and design talent from Christian higher
                  institutions across Nigeria.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            id="about-card-2"
            className="flip-card bg-white rounded-lg shadow-lg h-[300px] group perspective section-clickable cursor-pointer"
            onClick={() => toggleCard(2)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
                flippedCards[2] ? "rotate-y-180" : ""
              }`}
            >
              <div className="absolute inset-0 backface-hidden p-8 flex flex-col items-center justify-center text-center">
                <div className="text-gold text-4xl mb-4">
                  <svg
                    className="svg-inline--fa fa-users"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    width="1em"
                    height="1em"
                  >
                    <path
                      fill="currentColor"
                      d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                    />
                  </svg>
                </div>
                <h3 className="font-montserrat font-semibold text-xl mb-2">
                  A Community
                </h3>
                <p className="text-gray-600">Flip to learn more</p>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-navy text-white p-8 flex flex-col items-center justify-center text-center rounded-lg">
                <p>
                  A vibrant network of like-minded students and graduates who
                  share a passion for excellence, innovation, and faith-driven
                  purpose.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            id="about-card-3"
            className="flip-card bg-white rounded-lg shadow-lg h-[300px] group perspective section-clickable cursor-pointer"
            onClick={() => toggleCard(3)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
                flippedCards[3] ? "rotate-y-180" : ""
              }`}
            >
              <div className="absolute inset-0 backface-hidden p-8 flex flex-col items-center justify-center text-center">
                <div className="text-gold text-4xl mb-4">
                  <svg
                    className="svg-inline--fa fa-bridge"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    width="1em"
                    height="1em"
                  >
                    <path
                      fill="currentColor"
                      d="M32 32C14.3 32 0 46.3 0 64S14.3 96 32 96H72v64H0V288c53 0 96 43 96 96v64c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V384c0-53 43-96 96-96s96 43 96 96v64c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V384c0-53 43-96 96-96V160H504V96h40c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM456 96v64H376V96h80zM328 96v64H248V96h80zM200 96v64H120V96h80z"
                    />
                  </svg>
                </div>
                <h3 className="font-montserrat font-semibold text-xl mb-2">
                  A Bridge
                </h3>
                <p className="text-gray-600">Flip to learn more</p>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-navy text-white p-8 flex flex-col items-center justify-center text-center rounded-lg">
                <p>
                  Connecting talented students with companies, mentors, and
                  opportunities that align with their skills, values, and
                  aspirations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
