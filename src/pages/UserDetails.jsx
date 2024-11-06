import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { VITE_BACKEND_URL } from "../utils/constants";

// Mock data for demonstration
const userData = {
    fullName: "John Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    registrationDate: "2023-01-15",
    city: "New York",
};

const userTrips = [
    { id: 1, name: "Paris Getaway", date: "2024-06-15", duration: "7 days" },
    { id: 2, name: "Tokyo Adventure", date: "2024-08-22", duration: "10 days" },
    { id: 3, name: "African Safari", date: "2024-11-05", duration: "14 days" },
];

export default function UserDetailsPage() {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [userDetails, setUserDetails] = useState("");
    const navigate = useNavigate();
    const getUserDetails = async () => {
        try {
            const response = await fetch(
                `${VITE_BACKEND_URL}/user/getUserDetails/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch user details");
            }
            const data = await response.json();
            console.log("User Details Without setting is :-> ", data);
            setUserDetails(data);
            console.log("User Details are after setting :-", userDetails);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchBookings = async () => {
        try {
            const response = await fetch(
                `${VITE_BACKEND_URL}/book/booked_seats`,
                {
                    credentials: "include",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch bookings");
            }
            const data = await response.json();
            setBookings(data);
            console.log("Bookings are :-", data);
        } catch (err) {
            console.log("Error is :- ", err);
        }
    };
    const fetchUserTripDetails = async () => {
        try {
            // Get trip details for each booking
            const tripDetailsPromises = bookings.map(async (booking) => {
                const response = await fetch(
                    `${VITE_BACKEND_URL}/trip/viewTrip/${booking.tripId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch trip details for tripId: ${booking.tripId}`
                    );
                }
                const tripData = await response.json();
                console.log("Information of the trip is :-> ", tripData);
                return { ...booking, tripData }; // Combine booking with trip details
            });

            // Wait for all requests to complete
            const detailedBookings = await Promise.all(tripDetailsPromises);
            setBookingDetails(detailedBookings);
            console.log("Detailed Bookings are:", detailedBookings);
        } catch (error) {
            console.error("Error fetching trip details:", error);
        }
    };
    useEffect(() => {
        fetchBookings();
        getUserDetails();
        // fetchUserTripDetails();
    }, []);
    useEffect(() => {
        if (bookings.length > 0) {
            fetchUserTripDetails();
        }
    }, [bookings]);
    return (
        <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-red-600 mb-8">
                    User Details
                </h1>

                {/* User Information Section */}
                <div className="bg-gray-900 shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-red-500 mb-4">
                        Basic Information
                    </h2>
                    <h3 className="text-xl font-semibold text-red-500 mb-4">
                        {"(" + userDetails?.user?.type + ")"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-400">
                                Username
                            </p>
                            <p className="mt-1 text-lg text-white">
                                {userDetails?.user?.userName}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">
                                Phone Number
                            </p>
                            <p className="mt-1 text-lg text-white">
                                {userDetails?.user?.phNo}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">
                                Email
                            </p>
                            <p className="mt-1 text-lg text-white">
                                {userDetails?.user?.email}
                                {/* email */}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">
                                Registration Date
                            </p>
                            <p className="mt-1 text-lg text-white">
                                {" "}
                                {new Date(
                                    userDetails?.user?.createdAt
                                ).toLocaleDateString()}
                                {/* {
                                    userDetails?.user?.createdAt
                                }  */}
                                {/* email */}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">
                                City
                            </p>
                            <p className="mt-1 text-lg text-white">
                                {userDetails?.user?.place}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Registered Trips Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-red-500 mb-4">
                        All Bookings
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookingDetails.map((trip) => (
                            <div
                                key={trip.id}
                                className="bg-gray-900 shadow-md rounded-lg overflow-hidden"
                            >
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-red-500 mb-2">
                                        {trip.tripData.data.title}
                                    </h3>
                                    <p className="text-gray-300">
                                        Booking Date:{" "}
                                        {new Date(
                                            trip.bookingDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-300">
                                        Seats Booked:{" "}
                                        {trip.seatsBooked.map(
                                            (seat) => seat.seatNumber
                                        ) + ","}
                                    </p>
                                    <p className="text-gray-300">
                                        Duration: {trip.tripData.data.duration}
                                    </p>
                                </div>
                                <div className="bg-red-700 p-4">
                                    <button
                                        className="w-full bg-black text-red-500 font-semibold py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
                                        onClick={() =>
                                            navigate(
                                                `/trip/ticket/${trip?.tripId}`,
                                                {
                                                    state: {
                                                        tripId: trip?.tripId,
                                                        currency:
                                                            trip?.currency,
                                                        amount: trip?.amount,
                                                        date: trip?.bookingDate,
                                                        seats: trip?.seatsBooked,
                                                        orderId: trip?.orderId,
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
