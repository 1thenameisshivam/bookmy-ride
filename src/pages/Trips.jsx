import { useEffect } from "react";
import { VITE_BACKEND_URL } from "../utils/constants";
import TripCard from "../components/Ui/TripCard";
import { useState } from "react";

const Trips = () => {
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(VITE_BACKEND_URL + "/trip/");
      const data = await response.json();
      console.log(data);
      setTrip(data.trips);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-7 min-h-screen">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        {trip?.map((trip, index) => (
          <TripCard
            index={index}
            key={trip.id}
            title={trip.title}
            duration={trip.duration}
            availableSeats={trip.availableSeats}
            price={trip.price}
            image={trip.photoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Trips;
