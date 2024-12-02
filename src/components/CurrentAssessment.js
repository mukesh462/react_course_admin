import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { FaArrowRightLong } from "react-icons/fa6";
import imgBanner from "../assets/bannerCourse.png";

function CurrentAssessment() {
  return (
    <div>
      <div className="flex justify-center items-center flex-col my-5">
        <div className="relative flex flex-col md:flex-row  my-6 bg-white shadow-sm border border-slate-200 rounded-lg max-w-2xl">
          <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
            <img
              src={imgBanner}
              alt="card-image"
              className="h-full w-full rounded-md md:rounded-lg object-cover"
            />
          </div>
          <div className="p-6">
            <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
              STARTUP
            </div>
            <h4 className="mb-2 text-slate-800 text-xl font-semibold">
              Lyft launching cross-platform service this week
            </h4>
            <p className="mb-8 text-slate-600 leading-normal font-light">
              Like so many organizations these days, Autodesk is a company in
              transition. It was until recently a traditional boxed software
              company selling licenses. Yet its own business model disruption is
              only part of the story
            </p>
            <div>
              <button className="flex justify-center items-center text-center bg-[#31ABEB] w-full text-white p-2 rounded-md font-semibold text-sm hover:underline gap-2">
                Take Assessment <FaArrowRightLong />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentAssessment;
