import { VITE_BACKEND_URL } from "./constants";
export const MonthlyRevenueGenerator = async () => {
    try {
        const revenue = await fetch(
            VITE_BACKEND_URL + "/admin/getMonthlyRevenue",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (revenue.ok) {
            const data = await revenue.json();
            console.log("Data is totalUsers", data);

            return data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
