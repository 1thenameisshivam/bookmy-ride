import { VITE_BACKEND_URL } from "./constants";
// import { useState } from "react";
export const TotalRevenueGenerator = async () => {
    // const [totalRevenue, setTotalRevenue] = useState(0);

    try {
        const revenue = await fetch(VITE_BACKEND_URL + "/admin/totalRevenue", {
            method: "GET",
            credentials: "include",
        });
        // const response = await isAdmin.json();
        if (revenue.ok) {
            // setTotalRevenue(response.totalRevenue);
            const data = await revenue.json();
            console.log("Data is totalRevenue", data);
            return [data.totalRevenue, data.percentageChange];
        }
        /* else
        {
            console.log('Error in fetching total revenue');
            return 0;
        } */
        // console.log("Is Admin", response);
        // return totalRevenue;
    } catch (error) {
        console.error(error);
        return null;
    }
};
