/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { Home, ArrowRight, Frown, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NotFound() {
  const [isHappy, setIsHappy] = useState(false);

  const toggleMood = () => {
    setIsHappy(!isHappy);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-100 to-red-200 opacity-30 z-0"
        />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-7xl md:text-9xl font-extrabold mb-8"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-black">
              404
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl md:text-3xl font-light text-gray-800 mb-8"
          >
            Oops! The page you're looking for doesn't exist.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={toggleMood}
              className="text-4xl md:text-6xl focus:outline-none transition-transform duration-300 transform hover:scale-110"
            >
              {isHappy ? (
                <Smile className="text-red-500" />
              ) : (
                <Frown className="text-red-500" />
              )}
            </button>
            <p className="mt-4 text-lg text-gray-600">
              {isHappy
                ? "That's the spirit! Let's find what you're looking for."
                : "Don't worry, we'll help you get back on track."}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to={"/"}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-colors duration-300"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            <Link
              to={"/"}
              className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full transition-colors duration-300"
            >
              <span>Explore Sitemap</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
