import { VITE_BACKEND_URL } from "./constants";

export const TotalTripsGenerator=async()=>{
    try {
        const trips=await fetch(VITE_BACKEND_URL+"/admin/totalTrips",{
            method:"GET",
            credentials:"include"
        });
        if(trips.ok){
            const data=await trips.json();
            console.log("Data is totalTrips",data);
            return [data.totalTrips,data.numberChange];
        }
    } catch (error) {
        console.error("Error in Total Trips Generator Function   ",error);
        return [0,0];
    }
}