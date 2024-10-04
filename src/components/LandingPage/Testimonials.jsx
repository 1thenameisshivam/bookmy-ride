/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    quote:
      "Our trip to Kashmir was absolutely magical! bookmy-ride took care of everything, making it a stress-free experience.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai",
    quote:
      "The attention to detail and personalized service provided by bookmy-ride made our Rajasthan tour unforgettable.",
  },
  {
    id: 3,
    name: "Anita Gupta",
    location: "Bangalore",
    quote:
      "I was amazed by the spiritual journey to Varanasi. bookmy-ride's local knowledge enhanced our experience.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-orange-600 font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
