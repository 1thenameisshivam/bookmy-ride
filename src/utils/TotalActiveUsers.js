import { VITE_BACKEND_URL } from "./constants";

export const TotalActiveUsers = async () => {
    try {
        const revenue = await fetch(VITE_BACKEND_URL + "/admin/totalActiveUsers", {
            method: "GET",
            credentials: "include",
        });
        // const response = await isAdmin.json();
        if (revenue.ok) {
            // setTotalRevenue(response.totalRevenue);
            const data = await revenue.json();
            console.log("Data is totalUsers", data);
            
            return [data.totalUsers, data.numberChangeInUsers];
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
}
