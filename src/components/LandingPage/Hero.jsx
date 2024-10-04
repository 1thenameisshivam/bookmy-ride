/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { VITE_BG_IMAGE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${VITE_BG_IMAGE})`,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <div className="container mx-auto px-4 z-20 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Discover India's Hidden Gems
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8"
        >
          Embark on unforgettable journeys across the diverse landscapes of
          India
        </motion.p>
        <motion.button
          onClick={() => navigate("/trips")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
        >
          Explore Trips
        </motion.button>
      </div>
    </section>
  );
}
