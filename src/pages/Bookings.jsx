import { useState, useEffect } from "react";
import { VITE_BACKEND_URL } from "../utils/constants";
import { CalendarDays, CreditCard, MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/book/booked_seats`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-red-600 text-center mb-10">
          Your Booking History
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking.orderId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Trip ID: {booking.tripId.slice(-6)}
                  </h2>
                  <span className="px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full">
                    {booking.currency} {booking.amount}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <CalendarDays className="w-5 h-5 mr-2 text-red-500" />
                    <span>{formatDate(booking.bookingDate)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-red-500" />
                    <span>
                      Seats:{" "}
                      {booking.seatsBooked
                        .map((seat) => seat.seatNumber)
                        .join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="w-5 h-5 mr-2 text-red-500" />
                    <span>Order ID: {booking.orderId.slice(-8)}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-red-50">
                <button
                  onClick={() =>
                    navigate(`/trip/ticket/${booking.tripId}`, {
                      state: {
                        tripId: booking.tripId,
                        currency: booking.currency,
                        amount: booking.amount,
                        date: booking.bookingDate,
                        seats: booking.seatsBooked,
                        orderId: booking.orderId,
                      },
                    })
                  }
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
                >
                  Get Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
