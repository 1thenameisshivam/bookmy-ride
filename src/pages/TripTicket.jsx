import { QrCode, X, PhoneCall } from "lucide-react";

const TripTicket = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg border border-red-200">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-red-600">
              Mountain Retreat
            </h2>
            <p className="text-sm text-red-500">Adventure, 3 Days</p>
          </div>
          <img
            src="/placeholder.svg?height=60&width=60"
            alt="Trip"
            className="w-15 h-15 rounded border-2 border-red-300"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-red-500">Fri, 15 Dec | 09:00 AM</p>
          <p className="text-sm font-semibold text-gray-800">
            Departure: Mountain Base Camp
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-red-500">2 Traveler(s)</p>
            <p className="font-semibold text-gray-800">ADVENTURE - A12, A13</p>
          </div>
          <QrCode className="w-20 h-20 text-red-600" />
        </div>

        <div className="bg-red-50 -mx-6 px-6 py-3">
          <p className="text-sm text-red-600 font-semibold">
            BOOKING ID: TRIP789
          </p>
          <p className="text-xs text-red-400">Tap to see more</p>
        </div>
      </div>

      <div className="border-t border-red-200">
        <div className="flex justify-between p-4">
          <button className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300">
            <X className="w-4 h-4 mr-2" />
            Cancel trip
          </button>
          <button className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300">
            <PhoneCall className="w-4 h-4 mr-2" />
            Contact support
          </button>
        </div>
      </div>

      <div className="bg-red-600 p-4">
        <p className="text-sm font-semibold text-white">Total Amount</p>
        <p className="text-lg font-bold text-white">₹15,999</p>
      </div>
    </div>
  );
};

export default TripTicket;
