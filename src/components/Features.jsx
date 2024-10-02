import { featuresData } from "../utils/constants";
import AnimatedGradientText from "./AnimatedGradientText";
const Features = () => {
  return (
    <div>
      <section className=" bg-black text-white  ">
        <div className="container mx-auto p-4  space-y-2 text-center">
          <AnimatedGradientText className="text-5xl font-mono text-center mb-10">
            Features We Providing You
          </AnimatedGradientText>
          <p className="">Experience the Best with Our Features</p>
        </div>
        <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((data, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <p className="text-3xl">{data.logo}</p>
              <h3 className=" text-3xl font-semibold hover:text-blue-500 transition-transform ease-in-out hover:scale-105">
                {data.name}
              </h3>
              <div className="space-y-1 leading-tight flex flex-col justify-center items-center">
                <p>{data.description[0]}</p>
                <p>{data.description[1]}</p>
                <p>{data.description[2]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;

// import React from "react";
// import { featuresData } from "../utils/constants";

// const Features = () => {
//     return (
//         <div>
//             <section className="bg-black text-white py-16">
//                 <div className="container mx-auto space-y-4 text-center">
//                     <h2 className="text-5xl font-bold text-white tracking-wider">
//                         Features We Provide
//                     </h2>
//                     <p className="text-lg text-gray-400">
//                         Experience the Best with Our Features
//                     </p>
//                 </div>
//                 <div className="container mx-auto mt-12 grid justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
//                     {featuresData.map((data, index) => (
//                         <div
//                             key={index}
//                             className="  transition-colors duration-300 rounded-lg shadow-lg p-6 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
//                         >
//                             <p className="text-5xl mb-4">{data.logo}</p>
//                             <h3 className="text-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-300">
//                                 {data.name}
//                             </h3>
//                             <div className="space-y-2 mt-4 leading-tight text-gray-300">
//                                 {data.description.map((line, i) => (
//                                     <p key={i} className="text-sm lg:text-base">
//                                         {line}
//                                     </p>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Features;
