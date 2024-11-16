import TripCard from "../Ui/TripCard";

// const trips = [
//     {
//         id: 1,
//         title: "Magical Kashmir",
//         duration: "7 days",
//         capacity: 20,
//         price: "₹35,000",
//         image: "https://media.istockphoto.com/id/1082292294/photo/multi-color-lake-in-western-china.jpg?s=2048x2048&w=is&k=20&c=cYGKomaJG5VXKogVCnITHR2NhERm7GW4u329Rs879vs=",
//     },
//     {
//         id: 2,
//         title: "Royal Rajasthan",
//         duration: "6 days",
//         capacity: 25,
//         price: "₹30,000",
//         image: "https://cdn.pixabay.com/photo/2021/04/06/11/22/hawa-mahal-6156123_1280.jpg",
//     },
//     {
//         id: 3,
//         title: "Spiritual Varanasi",
//         duration: "4 days",
//         capacity: 15,
//         price: "₹20,000",
//         image: "https://media.istockphoto.com/id/537988165/photo/varanasi.jpg?s=2048x2048&w=is&k=20&c=kTj8njrwskmoiIzifXa71ch8uZjn2gbAe_RrVxRVwDE=",
//     },
// ];

// export default function FeaturedTrips() {
//     return (
//         <section id="featured-trips" className="py-16 bg-white">
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl text-yellow-500 font-mono font-bold text-center mb-12">
//                     Featured Trips
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-full gap-8">
//                     {trips.map((trip, index) => (
//                         <TripCard
//                             key={trip.id}
//                             index={index}
//                             id={trip.id}
//                             availableSeats={trip.capacity}
//                             title={trip.title}
//                             duration={trip.duration}
//                             price={trip.price}
//                             image={trip.image}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { CreditCard, Map, Clock, PhoneCall } from "lucide-react";

// const Feature = ({ icon, title, description }) => (
//     <Card className="border-none shadow-none bg-transparent">
//         <CardContent className="flex flex-col items-center text-center p-6">
//             <div className="mb-4 p-2 bg-orange-100 rounded-full">{icon}</div>
//             <h3 className="text-xl font-semibold mb-2">{title}</h3>
//             <p className="text-muted-foreground">{description}</p>
//         </CardContent>
//     </Card>
// );

// export default function WhyChooseUs() {
//     const features = [
//         {
//             icon: <CreditCard className="h-10 w-10 text-orange-500" />,
//             title: "Affordable Prices",
//             description: "Enjoy premium experiences without breaking the bank",
//         },
//         {
//             icon: <Map className="h-10 w-10 text-orange-500" />,
//             title: "Expert Guides",
//             description:
//                 "Learn from passionate locals who know every hidden gem",
//         },
//         {
//             icon: <Clock className="h-10 w-10 text-orange-500" />,
//             title: "Curated Itineraries",
//             description:
//                 "Perfectly balanced trips designed for unforgettable memories",
//         },
//         {
//             icon: <PhoneCall className="h-10 w-10 text-orange-500" />,
//             title: "24/7 Support",
//             description: "We're always here to assist you, anytime, anywhere",
//         },
//     ];

//     return (
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9fa]">
//             <div className="container px-4 md:px-6">
//                 <h2 className="text-3xl font-bold text-center text-primary mb-12">
//                     Why Choose Us?
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {features.map((feature, index) => (
//                         <Feature
//                             key={index}
//                             icon={feature.icon}
//                             title={feature.title}
//                             description={feature.description}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

import React from 'react'
import { CreditCard, Map, Clock, PhoneCall } from 'lucide-react'

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="mb-4 p-2 bg-orange-100 rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default function WhyChooseUs() {
  const features = [
    {
      icon: <CreditCard className="h-10 w-10 text-orange-500" />,
      title: "Affordable Prices",
      description: "Enjoy premium experiences without breaking the bank",
    },
    {
      icon: <Map className="h-10 w-10 text-orange-500" />,
      title: "Expert Guides",
      description: "Learn from passionate locals who know every hidden gem",
    },
    {
      icon: <Clock className="h-10 w-10 text-orange-500" />,
      title: "Curated Itineraries",
      description: "Perfectly balanced trips designed for unforgettable memories",
    },
    {
      icon: <PhoneCall className="h-10 w-10 text-orange-500" />,
      title: "24/7 Support",
      description: "We're always here to assist you, anytime, anywhere",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}