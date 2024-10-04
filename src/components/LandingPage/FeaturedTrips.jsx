import { motion } from "framer-motion";

const trips = [
  {
    id: 1,
    title: "Magical Kashmir",
    duration: "7 days",
    capacity: 20,
    price: "₹35,000",
    image:
      "https://media.istockphoto.com/id/1082292294/photo/multi-color-lake-in-western-china.jpg?s=2048x2048&w=is&k=20&c=cYGKomaJG5VXKogVCnITHR2NhERm7GW4u329Rs879vs=",
  },
  {
    id: 2,
    title: "Royal Rajasthan",
    duration: "6 days",
    capacity: 25,
    price: "₹30,000",
    image:
      "https://cdn.pixabay.com/photo/2021/04/06/11/22/hawa-mahal-6156123_1280.jpg",
  },
  {
    id: 3,
    title: "Spiritual Varanasi",
    duration: "4 days",
    capacity: 15,
    price: "₹20,000",
    image:
      "https://media.istockphoto.com/id/537988165/photo/varanasi.jpg?s=2048x2048&w=is&k=20&c=kTj8njrwskmoiIzifXa71ch8uZjn2gbAe_RrVxRVwDE=",
  },
];

export default function FeaturedTrips() {
  return (
    <section id="featured-trips" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-yellow-500 font-mono font-bold text-center mb-12">
          Featured Trips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
                <p className="text-gray-600 mb-4">
                  Duration: {trip.duration} | Capacity: {trip.capacity} people
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">
                    {trip.price}
                  </span>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
