import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LifeBuoy,
  MapPin,
  Clock,
  Wifi,
  Coffee,
  CreditCard,
  Tv,
} from "lucide-react";
import { VITE_BACKEND_URL } from "../utils/constants";
export default function BusLayout() {
  const location = useLocation();
  const [seats, setSeats] = useState([]);
  const [busType, setBusType] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [tripId, setTripId] = useState("");
  useEffect(() => {
    if (location.state?.seats) {
      setSeats(location.state.seats);
    }
    if (location.state?.busType) {
      setBusType(location.state.busType);
    }
    if (location.state?.tripId) {
      setTripId(location.state.tripId); // Assuming tripId is passed in location state
    }
  }, [location.state]);

  const handleSeatClick = (seatNumber, status) => {
    if (status === "available") {
      setSelectedSeats((prev) =>
        prev.includes(seatNumber)
          ? prev.filter((number) => number !== seatNumber)
          : [...prev, seatNumber]
      );
    }
  };

  const getSeatColor = (status, seatId) => {
    if (status === "booked") return "bg-gray-300";
    if (selectedSeats.includes(seatId)) return "bg-red-600";
    return "bg-black";
  };
  const onProceedToPayment = async () => {
    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/book/lock_seat`, // Replace with your backend URL
        {
          method: "POST",
          credentials: "include", // To send cookies along with request if required
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tripId,
            selectedSeats,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {
        toast.success(data.message);
        // Redirect to payment page or perform other actions
      } else {
        toast.error("Please try to book another seat");
      }
    } catch (error) {
      console.error("Error locking seats:", error);
      toast.error("Error locking seats, please try again");
    }
  };

  const renderSeat = (seat) => (
    <motion.button
      key={seat.seatNumber} // Use seatNumber as the unique key
      className={`w-12 h-14 m-1 relative ${
        seat.status === "booked" ? "cursor-not-allowed" : "hover:opacity-80"
      }`}
      onClick={() => handleSeatClick(seat.seatNumber, seat.status)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`w-full h-10 border-2 ${getSeatColor(
          seat.status,
          seat.seatNumber
        )} rounded-t-lg`}
      >
        <div className="absolute inset-2 border-2 border-white rounded-t-lg"></div>
      </div>
      <div className="absolute -left-1 -right-1 bottom-0 h-4 bg-gray-400 rounded-b-lg"></div>
      <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
        {seat.seatNumber}
      </span>
    </motion.button>
  );

  const renderRow = (row, rowIndex) => {
    const seatsPerRow = parseInt(busType.split("x")[0], 10);
    return (
      <div key={rowIndex} className="flex justify-center mb-2">
        {row.map((seat, seatIndex) => (
          <React.Fragment key={seat._id}>
            {renderSeat(seat)}
            {(seatIndex + 1) % seatsPerRow === 0 &&
              seatIndex !== row.length - 1 && (
                <div className="w-8"></div> // Gap between seat groups
              )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-red-600">
        Select Your Seats
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="w-full lg:w-2/3">
          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow-lg relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Bus shape */}
            <div className="absolute inset-0 bg-gray-200 rounded-lg"></div>
            <div className="absolute top-0 left-0 right-0 h-16 bg-red-600 rounded-t-lg"></div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-600 rounded-b-lg"></div>
            <div className="absolute top-16 left-0 w-8 bottom-8 bg-red-600"></div>
            <div className="absolute top-16 right-0 w-8 bottom-8 bg-red-600"></div>

            {/* Driver's area */}
            <div className="relative mb-8 flex justify-end">
              <div className="w-20 h-16 bg-gray-400 rounded-tl-full flex items-center justify-center text-white font-bold">
                <LifeBuoy className="w-10 h-10" />
              </div>
            </div>

            {/* Seats */}
            <div className="relative">
              {seats?.map((row, rowIndex) => renderRow(row, rowIndex))}
            </div>
          </motion.div>

          {/* Trip Details */}
          <motion.div
            className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Trip Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                <span>Pickup: New York City</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                <span>Drop: Washington D.C.</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-red-600" />
                <span>Departure: 08:00 AM</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-red-600" />
                <span>Arrival: 12:30 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-red-600">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <Wifi className="w-5 h-5 mr-2 text-red-600" />
                <span>Free Wi-Fi</span>
              </div>
              <div className="flex items-center">
                <Coffee className="w-5 h-5 mr-2 text-red-600" />
                <span>Refreshments</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-red-600" />
                <span>Cashless Payment</span>
              </div>
              <div className="flex items-center">
                <Tv className="w-5 h-5 mr-2 text-red-600" />
                <span>Entertainment System</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Booking Summary
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Selected Seats</h3>
            {selectedSeats.length > 0 ? (
              <ul>
                {selectedSeats.map((seatNumber) => {
                  const seat = seats
                    .flat()
                    .find((s) => s.seatNumber === seatNumber);
                  return (
                    seat && (
                      <li key={seatNumber} className="mb-2">
                        Seat {seat.seatNumber}
                      </li>
                    )
                  );
                })}
              </ul>
            ) : (
              <p>No seats selected</p>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Price Details</h3>
            <p>Base Fare: $50 per seat</p>
            <p>Tax: $5 per seat</p>
            <p className="font-bold mt-2">
              Total: ${selectedSeats.length * 55}
            </p>
          </div>
          <button
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            disabled={selectedSeats.length === 0}
            onClick={onProceedToPayment}
          >
            Proceed to Payment
          </button>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 flex justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center">
          <div className="w-6 h-6 border-2 border-black rounded-sm mr-2 relative">
            <div className="absolute inset-1 border border-white rounded-sm"></div>
          </div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-600 rounded-sm mr-2 relative">
            <div className="absolute inset-1 border border-white rounded-sm"></div>
          </div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-sm mr-2 relative">
            <div className="absolute inset-1 border border-white rounded-sm"></div>
          </div>
          <span>Booked</span>
        </div>
      </motion.div>
    </div>
  );
}
