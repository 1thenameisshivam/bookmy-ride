/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function BusLayout() {
  const location = useLocation();
  const [seats, setSeats] = useState([]);
  const [busType, setBusType] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  console.log(location);
  useEffect(() => {
    if (location.state.seats) {
      setSeats(location.state.seats);
    }
    if (location.state.busType) {
      setBusType(location.state.busType);
    }
  }, []);
  const handleSeatClick = (seatId, status) => {
    if (status === "available") {
      setSelectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((id) => id !== seatId)
          : [...prev, seatId]
      );
    }
  };

  const getSeatColor = (status, seatId) => {
    if (status === "booked") return "bg-gray-300";
    if (selectedSeats.includes(seatId)) return "bg-red-600";
    return "bg-black";
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-600">
        Select Your Seats
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-start gap-8">
        <motion.div
          className="bg-gray-100 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-10 bg-gray-300 rounded-t-full flex items-center justify-center">
              Driver
            </div>
          </div>

          {seats?.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-2">
              {row.map((seat) => (
                <motion.button
                  key={seat._id}
                  className={`w-12 h-12 m-1 rounded-lg ${getSeatColor(
                    seat.status,
                    seat._id
                  )} 
                    flex items-center justify-center text-white font-bold
                    ${
                      seat.status === "booked"
                        ? "cursor-not-allowed"
                        : "hover:opacity-80"
                    }`}
                  onClick={() => handleSeatClick(seat._id, seat.status)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {seat.seatNumber}
                </motion.button>
              ))}
              {busType === "2x1" && rowIndex % 2 === 0 && (
                <div className="w-12 h-12 m-1"></div>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="bg-gray-100 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4 text-red-600">
            Selected Seats
          </h2>
          {selectedSeats.length > 0 ? (
            <ul>
              {selectedSeats.map((seatId) => {
                const seat = seats.flat().find((s) => s._id === seatId);
                return (
                  seat && (
                    <li key={seatId} className="mb-2">
                      Seat {seat.seatNumber}
                    </li>
                  )
                );
              })}
            </ul>
          ) : (
            <p>No seats selected</p>
          )}
          <button
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            disabled={selectedSeats.length === 0}
          >
            Proceed to Booking
          </button>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 flex justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center">
          <div className="w-6 h-6 bg-black rounded-sm mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-600 rounded-sm mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-sm mr-2"></div>
          <span>Booked</span>
        </div>
      </motion.div>
    </div>
  );
}
