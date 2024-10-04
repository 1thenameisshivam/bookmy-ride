import { motion } from "framer-motion";
import { Search, Calendar, UserCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Trips",
    description: "Explore our curated selection of trips across India.",
  },
  {
    icon: Calendar,
    title: "Choose Your Dates",
    description: "Select the perfect dates for your adventure.",
  },
  {
    icon: UserCheck,
    title: "Book Securely",
    description: "Reserve your spot with our secure booking system.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-orange-100 rounded-full p-6 inline-block mb-4">
                <step.icon size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
