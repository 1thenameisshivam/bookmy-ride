import { PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

import { VITE_BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";

const TripTicket = () => {
    const { id } = useParams();
    const location = useLocation();
    const [tripData, setTripData] = useState({});
    const [showMore, setShowMore] = useState(false);
    const data = location.state;

    useEffect(() => {
        fetchTripData();
    }, []);

    const fetchTripData = async () => {
        try {
            const response = await fetch(`${VITE_BACKEND_URL}/trip/${id}`);
            const data = await response.json();
            setTripData(data.trip);
            // console.log("Trip Data", tripData);
        } catch (error) {
            toast.error("Failed to fetch trip data");
            console.log(error);
        }
    };

    return (
        <div className="max-w-md mx-auto my-5 bg-white rounded-lg shadow-lg overflow-hidden border border-red-200 mt-6 p-4">
            <div className="p-4 space-y-4">
                {/* Trip Header */}
                <h2 className="text-3xl font-bold text-red-600">
                    {tripData.title || "Trip Title"}
                </h2>
                <p className="text-sm text-gray-600">{tripData.description}</p>

                {/* Trip Image */}
                <img
                    src={tripData.photoUrl || "/placeholder.svg"}
                    alt="Trip"
                    className="w-full h-48 rounded-lg object-cover"
                />

                {/* Date and Departure */}
                <div className="flex justify-between text-gray-600 mt-4">
                    <p className="text-sm">
                        {new Date(tripData.startDate).toLocaleDateString(
                            "en-GB",
                            {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}
                    </p>
                    <p className="font-semibold">
                        Departure:{" "}
                        {tripData.destination
                            ? tripData.destination[0]
                            : "Location"}
                    </p>
                </div>

                {/* Travelers and Seats */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                        {data?.seats?.length || 0} Traveler(s)
                    </p>
                    <p className="font-semibold text-gray-800">
                        Seats -{" "}
                        {data?.seats.map((seat) => seat.seatNumber).join(", ")}
                    </p>
                    <QRCodeSVG
                        value={`${data?.orderId} | ${data?.seats
                            .map((seat) => seat.seatNumber)
                            .join(", ")} | ${data?.date}`}
                        size={60}
                    />
                </div>

                {/* Booking ID and More Info */}
                <div className="bg-red-50 px-4 py-3 rounded-lg mt-4">
                    <p className="text-sm text-red-600 font-semibold">
                        BOOKING ID: {data?.orderId}
                    </p>
                    <button
                        className="text-xs text-red-400 mt-2"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? "Hide details" : "Tap to see more"}
                    </button>
                    {showMore && (
                        <div className="mt-2 text-sm text-gray-600">
                            <p>Bus Type: {tripData.busType}</p>
                            <p>
                                End Date:{" "}
                                {new Date(tripData.endDate).toLocaleDateString(
                                    "en-GB"
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact and Group Buttons */}
            <div className="border-t border-red-200 flex justify-between p-4">
                <button
                    onClick={() =>
                        window.open(
                            "https://chat.whatsapp.com/example-group-link",
                            "_blank"
                        )
                    }
                    className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300"
                >
                    <span>Join Group</span>
                </button>
                <button
                    className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300"
                    onClick={() => (window.location.href = "tel:+1234567890")}
                >
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Contact Support
                </button>
            </div>

            {/* Total Amount */}
            <div className="bg-red-600 p-4 rounded-b-lg text-center">
                <p className="text-sm font-semibold text-white">Total Amount</p>
                <p className="text-lg font-bold text-white">
                    ₹{data?.amount} INR
                </p>
            </div>
        </div>
    );
};

export default TripTicket;
