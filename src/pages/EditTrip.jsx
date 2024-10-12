
import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { useParams } from "react-router-dom";

export default function EditTrip() {
    const [data, setData] = useState("");
    const { id } = useParams();
    const fetchData = async () => {
        try {
            const res = await fetch(
                "http://localhost:3000/trip/viewTrip/" + id,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
            const result = await res.json(); // Parse the JSON response
            console.log("Fetched Data from the ViewTrip:", result);
            console.log("Title is ", data?.title);
            setData(result.data);
            // console.log("Fetched Data from the ViewTrip", res);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        destinations: [],
        newDestination: "",
        price: "",
        duration: "",
        availableSeats: "",
        startDate: "",
        endDate: "",
        photoUrl: null,
        photoFile: null,
    });

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || "",
                description: data.description || "",
                destinations: data.destination || [],
                newDestination: "",
                price: data.price || "",
                duration: data.duration || "",
                availableSeats: data.availableSeats || "",
                startDate: data.startDate || "",
                endDate: data.endDate || "",
                photoUrl: data.photo || null,
                photoFile: null,
            });
        }
    }, [data]);
    const fileInputRef = useRef(null);

    const handleAddDestination = () => {
        if (formData.newDestination.trim()) {
            setFormData((prev) => ({
                ...prev,
                destinations: [
                    ...prev.destinations,
                    prev.newDestination.trim(),
                ],
                newDestination: "",
            }));
        }
    };

    const handleRemoveDestination = (index) => {
        setFormData((prev) => ({
            ...prev,
            destinations: prev.destinations.filter((_, i) => i !== index),
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    photoUrl: reader.result,
                    photoFile: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Before Adding all the data to the edited trip data");
        const editedTripData = new FormData();
        editedTripData.append("title", formData.title);
        editedTripData.append("description", formData.description);
        editedTripData.append(
            "destination",
            JSON.stringify(formData.destinations)
        );
        editedTripData.append("price", formData.price);
        editedTripData.append("duration", formData.duration);
        editedTripData.append("availableSeats", formData.availableSeats);
        editedTripData.append("startDate", formData.startDate);
        editedTripData.append("endDate", formData.endDate);
        console.log("PhotoFile is :- ", formData.photoFile);
        if (formData.photoFile) {
            editedTripData.append("image", formData.photoFile);
        }
        console.log("All Data Added to the Edited Trip Data");
        try {
            const res = await fetch(
                "http://localhost:3000/trip/editTrip/" + id,
                {
                    method: "PATCH",
                    body: editedTripData,
                    credentials: "include",
                }
            );
            if (res.status === 200) {
                const data = await res.json();
                console.log("Trip Updated Successfully :-", data.message);
                setFormData({
                    title: "",
                    description: "",
                    destinations: [],
                    newDestination: "",
                    price: "",
                    duration: "",
                    availableSeats: "",
                    startDate: "",
                    endDate: "",
                    photoUrl: null,
                });
            } else {
                console.log("Error in updating trip");
            }
        } catch (error) {
            console.error("Error in Updating the trip :-", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl"
            >
                <h2 className="text-3xl font-bold mb-6 text-red-500">
                    Edit Your Trip
                </h2>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-white mb-1"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-white mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                        ></textarea>
                    </div>

                    <div>
                        <label
                            htmlFor="destination"
                            className="block text-white mb-1"
                        >
                            Destinations
                        </label>
                        <div className="flex space-x-2">
                            <input
                                id="newDestination"
                                type="text"
                                value={formData.newDestination}
                                onChange={handleChange}
                                className="flex-grow px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddDestination}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.destinations.map((dest, index) => (
                                <span
                                    key={index}
                                    className="bg-red-500 text-white px-2 py-1 rounded-full text-sm flex items-center"
                                >
                                    {dest}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveDestination(index)
                                        }
                                        className="ml-2 focus:outline-none"
                                    >
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="price"
                                className="block text-white mb-1"
                            >
                                Price
                            </label>
                            <input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="duration"
                                className="block text-white mb-1"
                            >
                                Duration (days)
                            </label>
                            <input
                                id="duration"
                                type="number"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="availableSeats"
                            className="block text-white mb-1"
                        >
                            Available Seats
                        </label>
                        <input
                            id="availableSeats"
                            type="number"
                            value={formData.availableSeats}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="startDate"
                                className="block text-white mb-1"
                            >
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="endDate"
                                className="block text-white mb-1"
                            >
                                End Date
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="photo"
                            className="block text-white mb-1"
                        >
                            Trip Photo
                        </label>
                        <div className="mt-1 flex items-center space-x-4">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
                            >
                                <Upload className="mr-[0.25rem] h-[1rem] w-[1rem]" />{" "}
                                Upload Image
                            </button>
                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                required
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            {formData.photoUrl && (
                                <div className="relative w-[6rem] h-[6rem]">
                                    <img
                                        src={formData.photoUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                photoUrl: null,
                                            }))
                                        }
                                        className="absolute top-[0] right-[0] bg-red-[rgb(239,68,68)] rounded-full p-[0.25rem]"
                                    >
                                        <X
                                            size={14}
                                            className="[color:white]"
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Edit Trip
                </button>
            </form>
        </div>
    );
}
