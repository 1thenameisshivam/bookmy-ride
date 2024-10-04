/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-16 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <img
              src="https://img.freepik.com/free-vector/teamwork-concept-landing-page_52683-20164.jpg?w=740&t=st=1728047363~exp=1728047963~hmac=6d518acf86a2660aa1e8d1b07eb4d98b7e993525a0ce777b53adf33b56e275d3"
              alt="Our team"
              className="rounded-lg shadow-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 md:pl-12"
          >
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-6">
              We are a Uttar Pradesh-based travel agency with a passion for
              crafting memorable journeys across India. Our expertise shines
              through in the successful trips we have designed to breathtaking
              destinations such as Kashmir, Jaipur, and Varanasi.
            </p>
            <p className="text-gray-700 mb-6">
              We are proud to be associated with Gupta Tour and Travel, a
              reputable travel agency. Based in Saharanpur, we aim to cover all
              corners of India, offering unique travel experiences tailored to
              our clients' desires.
            </p>
            <p className="text-gray-700">
              Our mission is to provide customized travel experiences across
              India, keeping the focus on the location and the unique desires of
              our clients.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
