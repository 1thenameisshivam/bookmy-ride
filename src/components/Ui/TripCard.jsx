/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const TripCard = ({ index, title, availableSeats, duration, price, image }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white lg:w-[32%] rounded-lg shadow-md overflow-hidden"
        >
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">
                    Duration: {duration} | Capacity: {availableSeats} people
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                        {price}
                    </span>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors">
                        Book Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default TripCard;
