// /* eslint-disable no-unused-vars */
// import { useState, useRef } from "react";
// import { X, Upload } from "lucide-react";
// import toast from "react-hot-toast";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { VITE_BACKEND_URL } from "../utils/constants";

// export default function CreateTrip() {
//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         destination: [],
//         newDestination: "",
//         price: "",
//         duration: "",
//         availableSeats: "",
//         startDate: "",
//         endDate: "",
//         busType: "",
//         photoUrl: null,

//     });
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const fileInputRef = useRef(null);

//     const handleAddDestination = () => {
//         if (formData.newDestination.trim()) {
//             setFormData((prev) => ({
//                 ...prev,
//                 destination: [...prev.destination, prev.newDestination.trim()],
//                 newDestination: "",
//             }));
//         }
//     };

//     const handleRemoveDestination = (index) => {
//         setFormData((prev) => ({
//             ...prev,
//             destination: prev.destination.filter((_, i) => i !== index),
//         }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setFormData((prev) => ({
//                     ...prev,
//                     photoUrl: reader.result,
//                     // New File Uploaded
//                     photoFile: file,
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [id]: value,
//         }));
//     };
//     const handleSubmit = async (e) => {
//         setLoading(true);
//         e.preventDefault();
//         const tripData = new FormData();
//         tripData.append("title", formData.title);
//         tripData.append("description", formData.description);
//         tripData.append("destination", JSON.stringify(formData.destination)); // Send as JSON string
//         tripData.append("price", formData.price);
//         tripData.append("duration", formData.duration);
//         tripData.append("availableSeats", formData.availableSeats);
//         tripData.append("startDate", formData.startDate);
//         tripData.append("endDate", formData.endDate);
//         tripData.append("busType", formData.busType);

//         // Append the image file if available
//         if (formData.photoFile) {
//             tripData.append("image", formData.photoFile);
//         }

//         try {
//             // Send the POST request
//             const response = await fetch(
//                 VITE_BACKEND_URL + "/trip/createTrip",
//                 {
//                     method: "POST",
//                     body: tripData,
//                     credentials: "include",
//                 }
//             );
//             const data = await response.json();
//             if (data.status) {
//                 setLoading(false);

//                 toast.success("Trip created successfully");
//                 // Optionally reset the form or redirect the user
//                 setFormData({
//                     title: "",
//                     description: "",
//                     destination: [],
//                     newDestination: "",
//                     price: "",
//                     duration: "",
//                     availableSeats: "",
//                     startDate: "",
//                     endDate: "",
//                     photoUrl: null,
//                     photoFile: null,
//                     busType: "",
//                 });
//                 setMessage("");
//             } else {
//                 setLoading(false);
//                 setMessage(data.message);
//             }
//         } catch (error) {
//             setLoading(false);
//             setMessage(error.message);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl"
//             >
//                 <h2 className="text-3xl font-bold mb-6 text-red-500">
//                     Create New Trip
//                 </h2>

//                 <div className="space-y-4">
//                     <div>
//                         <label
//                             htmlFor="title"
//                             className="block text-white mb-1"
//                         >
//                             Title
//                         </label>
//                         <input
//                             id="title"
//                             type="text"
//                             value={formData.title}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                         />
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="description"
//                             className="block text-white mb-1"
//                         >
//                             Description
//                         </label>
//                         <textarea
//                             id="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
//                         ></textarea>
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="destination"
//                             className="block text-white mb-1"
//                         >
//                             destination
//                         </label>
//                         <div className="flex space-x-2">
//                             <input
//                                 id="newDestination"
//                                 type="text"
//                                 value={formData.newDestination}
//                                 onChange={handleChange}
//                                 className="flex-grow px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={handleAddDestination}
//                                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//                             >
//                                 Add
//                             </button>
//                         </div>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             {formData.destination.map((dest, index) => (
//                                 <span
//                                     key={index}
//                                     className="bg-red-500 text-white px-2 py-1 rounded-full text-sm flex items-center"
//                                 >
//                                     {dest}
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             handleRemoveDestination(index)
//                                         }
//                                         className="ml-2 focus:outline-none"
//                                     >
//                                         <X size={14} />
//                                     </button>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label
//                                 htmlFor="price"
//                                 className="block text-white mb-1"
//                             >
//                                 Price
//                             </label>
//                             <input
//                                 id="price"
//                                 type="number"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="duration"
//                                 className="block text-white mb-1"
//                             >
//                                 Duration (days)
//                             </label>
//                             <input
//                                 id="duration"
//                                 type="number"
//                                 value={formData.duration}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="availableSeats"
//                             className="block text-white mb-1"
//                         >
//                             Available Seats
//                         </label>
//                         <input
//                             id="availableSeats"
//                             type="number"
//                             value={formData.availableSeats}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label
//                                 htmlFor="startDate"
//                                 className="block text-white mb-1"
//                             >
//                                 Start Date
//                             </label>
//                             <input
//                                 id="startDate"
//                                 type="date"
//                                 value={formData.startDate}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="endDate"
//                                 className="block text-white mb-1"
//                             >
//                                 End Date
//                             </label>
//                             <input
//                                 id="endDate"
//                                 type="date"
//                                 value={formData.endDate}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <label
//                             htmlFor="photo"
//                             className="block text-white mb-1"
//                         >
//                             Trip Photo
//                         </label>
//                         <div className="mt-1 flex items-center space-x-4">
//                             <button
//                                 type="button"
//                                 onClick={() => fileInputRef.current?.click()}
//                                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
//                             >
//                                 <Upload className="mr-[0.25rem] h-[1rem] w-[1rem]" />{" "}
//                                 Upload Image
//                             </button>
//                             <input
//                                 id="photo"
//                                 type="file"
//                                 name="image"
//                                 accept="image/*"
//                                 required
//                                 className="hidden"
//                                 ref={fileInputRef}
//                                 onChange={handleImageChange}
//                             />
//                             {formData.photoUrl && (
//                                 <div className="relative w-[6rem] h-[6rem]">
//                                     <img
//                                         src={formData.photoUrl}
//                                         alt="Preview"
//                                         className="w-full h-full object-cover rounded"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             setFormData((prev) => ({
//                                                 ...prev,
//                                                 photoUrl: null,
//                                             }))
//                                         }
//                                         className="absolute top-[0] right-[0] bg-red-[rgb(239,68,68)] rounded-full p-[0.25rem]"
//                                     >
//                                         <X
//                                             size={14}
//                                             className="[color:white]"
//                                         />
//                                     </button>
//                                 </div>
//                             )}
//                             <div>
//                                 <select
//                                     id="busType"
//                                     name="busType"
//                                     value={formData.busType} // Bind to form data state
//                                     onChange={handleChange} // Handle the change event
//                                     required
//                                     className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                                 >
//                                     <option value="" disabled>
//                                         Select Bus Type
//                                     </option>
//                                     <option value="2x1">2x1</option>
//                                     <option value="3x2">3x2</option>
//                                     <option value="2x2">2x2</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {message && (
//                     <p className="text-xl text-red-500 mt-4">{message}</p>
//                 )}
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="mt-6 w-full px-4 py-2 flex justify-center bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 >
//                     {loading ? (
//                         <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
//                     ) : (
//                         "Create Trip"
//                     )}
//                 </button>
//             </form>
//         </div>
//     );
// }

import { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VITE_BACKEND_URL } from "../utils/constants";

export default function CreateTrip() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        destination: [],
        newDestination: "",
        price: "",
        duration: "",
        availableSeats: "",
        startDate: "",
        endDate: "",
        busType: "",
        photoUrl: null,
        photoFile: null,
        pickup: "",
        drop: "",
        arrivalTime: "",
        departureTime: "",
        ac: false,
        meal: "",
        accommodation: "",
        activities: "",
        expertGuide: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef(null);

    const handleAddDestination = () => {
        if (formData.newDestination.trim()) {
            setFormData((prev) => ({
                ...prev,
                destination: [...prev.destination, prev.newDestination.trim()],
                newDestination: "",
            }));
        }
    };

    const handleRemoveDestination = (index) => {
        setFormData((prev) => ({
            ...prev,
            destination: prev.destination.filter((_, i) => i !== index),
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
        const { id, value, type, checked } = e.target;
        // console.log("CheckBox Create Trip Page", e.target.value);
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const tripData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "destination") {
                tripData.append(key, JSON.stringify(formData[key]));
            } else if (key === "photoFile" && formData[key]) {
                tripData.append("image", formData[key]);
            } else if (key !== "photoUrl" && key !== "newDestination") {
                tripData.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch(
                VITE_BACKEND_URL + "/trip/createTrip",
                {
                    method: "POST",
                    body: tripData,
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (data.status) {
                setLoading(false);
                toast.success("Trip created successfully");
                setFormData({
                    title: "",
                    description: "",
                    destination: [],
                    newDestination: "",
                    price: "",
                    duration: "",
                    availableSeats: "",
                    startDate: "",
                    endDate: "",
                    photoUrl: null,
                    photoFile: null,
                    busType: "",
                    pickup: "",
                    drop: "",
                    arrivalTime: "",
                    departureTime: "",
                    ac: false,
                    meal: "",
                    accommodation: "",
                    activities: "",
                    expertGuide: "",
                });
                setMessage("");
            } else {
                setLoading(false);
                setMessage(data.message);
            }
        } catch (error) {
            setLoading(false);
            setMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl"
            >
                <h2 className="text-3xl font-bold mb-6 text-red-500">
                    Create New Trip
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
                            Destination
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
                            {formData.destination.map((dest, index) => (
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
                                <Upload className="mr-1 h-4 w-4" /> Upload Image
                            </button>
                            <input
                                id="photo"
                                type="file"
                                name="image"
                                accept="image/*"
                                required
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            {formData.photoUrl && (
                                <div className="relative w-24 h-24">
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
                                                photoFile: null,
                                            }))
                                        }
                                        className="absolute top-0 right-0 bg-red-500 rounded-full p-1"
                                    >
                                        <X size={14} className="text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="busType"
                            className="block text-white mb-1"
                        >
                            Bus Type
                        </label>
                        <select
                            id="busType"
                            value={formData.busType}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="" disabled>
                                Select Bus Type
                            </option>
                            <option value="2x1">2x1</option>
                            <option value="3x2">3x2</option>
                            <option value="2x2">2x2</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="pickup"
                            className="block text-white mb-1"
                        >
                            Pickup Location
                        </label>
                        <input
                            id="pickup"
                            type="text"
                            value={formData.pickup}
                            onChange={handleChange}
                            required
                            maxLength={100}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="drop" className="block text-white mb-1">
                            Drop Location
                        </label>
                        <input
                            id="drop"
                            type="text"
                            value={formData.drop}
                            onChange={handleChange}
                            required
                            maxLength={100}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="arrivalTime"
                                className="block text-white mb-1"
                            >
                                Arrival Time
                            </label>
                            <input
                                id="arrivalTime"
                                type="text"
                                value={formData.arrivalTime}
                                onChange={handleChange}
                                required
                                maxLength={100}
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="departureTime"
                                className="block text-white mb-1"
                            >
                                Departure Time
                            </label>
                            <input
                                id="departureTime"
                                type="text"
                                value={formData.departureTime}
                                onChange={handleChange}
                                required
                                maxLength={100}
                                className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="ac"
                            type="checkbox"
                            checked={formData.ac}
                            onChange={handleChange}
                            className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <label htmlFor="ac" className="ml-2 block text-white">
                            AC
                        </label>
                    </div>

                    <div>
                        <label htmlFor="meal" className="block text-white mb-1">
                            Meal
                        </label>
                        <input
                            id="meal"
                            type="text"
                            value={formData.meal}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="accommodation"
                            className="block text-white mb-1"
                        >
                            Accommodation
                        </label>
                        <input
                            id="accommodation"
                            type="text"
                            value={formData.accommodation}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="activities"
                            className="block text-white mb-1"
                        >
                            Activities
                        </label>
                        <input
                            id="activities"
                            type="text"
                            value={formData.activities}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="expertGuide"
                            className="block text-white mb-1"
                        >
                            Expert Guide
                        </label>
                        <input
                            id="expertGuide"
                            type="text"
                            value={formData.expertGuide}
                            onChange={handleChange}
                            required
                            maxLength={200}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                </div>

                {message && (
                    <p className="text-xl text-red-500 mt-4">{message}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full px-4 py-2 flex justify-center bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    {loading ? (
                        <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
                    ) : (
                        "Create Trip"
                    )}
                </button>
            </form>
        </div>
    );
}
