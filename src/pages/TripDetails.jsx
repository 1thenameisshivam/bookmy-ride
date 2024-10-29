/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VITE_BACKEND_URL } from "../utils/constants";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Utensils,
  Hotel,
  Mountain,
} from "lucide-react";
const TripDetails = () => {
  const { id } = useParams();
  const [tripData, setTripData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(VITE_BACKEND_URL + `/trip/${id}`);
      const data = await response.json();
      setTripData(data.trip);
    } catch (error) {
      console.log(error);
    }
  };
  if (!tripData) {
    return <div>Loading...</div>;
  }
  const handleBooking = () => {
    navigate(`/trip/${id}/book`, {
      state: {
        seats: tripData.seats,
        busType: tripData.busType,
        tripId: tripData._id,
        price: tripData.price,
      },
    });
  };
  return (
    <div className="min-h-screen  text-black">
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold mb-8 text-red-600"
        >
          {tripData.title}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <img
                src={tripData.photoUrl}
                alt={tripData.title}
                className="transition-transform duration-300  object-cover hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-4">Trip Overview</h2>
              <p className="text-gray-500 mb-6">{tripData.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-red-500" />
                  <span>{tripData?.startDate?.split("T")[0]}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-red-500" />
                  <span>{tripData?.duration} days</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-red-500" />
                  <span>{tripData.availableSeats} seats left</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-500" />
                  <span>{tripData?.destination}</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-3xl font-bold mb-4">₹{tripData.price}</p>
              <button
                onClick={handleBooking}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Journey Path</h2>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-1 bg-red-600"></div>
            {tripData?.destination?.map((dest, index) => (
              <div key={index} className="flex items-center mb-8 relative">
                <div className="absolute left-4 w-5 h-5 bg-red-600 rounded-full border-4 "></div>
                <div className="ml-16">
                  <h3 className="text-xl font-semibold">{dest}</h3>
                  <p className="text-gray-400">Day {index + 1}</p>
                </div>
              </div>
            ))}
            <div className="absolute bottom-0 left-4 w-5 h-5 bg-red-600 rounded-full border-4 "></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <Utensils className="w-6 h-6 mr-3 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Meals</h3>
                <p className="text-gray-500">
                  All meals included: Breakfast, Lunch, and Dinner. Experience
                  local Himalayan cuisine and international options.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Hotel className="w-6 h-6 mr-3 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Accommodation</h3>
                <p className="text-gray-500">
                  4-star hotel stays in Mussoorie. Comfortable mountain lodges
                  during the trek with modern amenities.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Mountain className="w-6 h-6 mr-3 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Activities</h3>
                <p className="text-gray-500">
                  Guided treks, nature walks, and cultural experiences. Optional
                  adventure activities available.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="w-6 h-6 mr-3 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Expert Guides</h3>
                <p className="text-gray-500">
                  Experienced local guides and trek leaders ensuring safety and
                  sharing in-depth knowledge of the region.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TripDetails;
