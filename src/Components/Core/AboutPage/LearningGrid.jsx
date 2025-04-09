import React from "react";
import HighlightText from "../HomePage/HighlightText"
import CTAButton from "../HomePage/CTAButton";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className=" w-10/12 grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 p-8 mt-10 ">
      {
          LearningGridArray.map((card,index) => {
             return (
                <div 
                    key={index}
                    className = {`${index === 0  && "lg:col-span-2 lg:h-[280px] p-5" }
                      ${
                        card.order % 2 === 1 ? "bg-richblack-700 lg:h-[280px] p-5" : "bg-richblue-800 lg:h-[280px] p-5"
                      }
                      ${
                        card.order === 3 && "col-start-2 lg:h-[280px] p-5 " }
                      
                      ${
                        card.order < 0 && "bg-transparent"
                      } 
                      
                      `} 
                >  
                  {
                    card.order < 0 
                    ? (
                      <div className="text-white ">
                          <div className="flex flex-col gap-3 justify-center lg:w-[90%] ">
                              <h1 className="text-[36px] md:font-semibold font-bold">{card.heading}</h1>
                              <HighlightText text={card.highlightText}/>
                              <p className="text-[16px] text-[#838894] w-[90%]">
                                {card.description}
                              </p>
                              <div className="w-fit pb-3">
                                <CTAButton active ={true}  linkto = {card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                              </div>
                            </div>
                      </div>
                    )
                    : (
                      <div >
                          <div className="text-white flex flex-col p-6  gap-9 ">
                              <h1>{card.heading}</h1>
                              <p>{card.description}</p>
                          </div>
                      </div>
                    )
                  }
                </div>
             )
          })
      }
    </div>
  )
};

export default LearningGrid;