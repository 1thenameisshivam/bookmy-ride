import { VITE_BACKEND_URL } from "./constants";
export const TotalRevenueGenerator = async () => {
    try {
        const revenue = await fetch(VITE_BACKEND_URL + "/admin/totalRevenue", {
            method: "GET",
            credentials: "include",
        });
        if (revenue.ok) {
            const data = await revenue.json();
            console.log("Data is totalRevenue", data);
            return [data.totalRevenue, data.percentageChange];
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
