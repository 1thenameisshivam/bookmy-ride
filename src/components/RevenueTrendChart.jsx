import React, { useEffect, useState } from 'react'
import { MonthlyRevenueGenerator } from '../utils/MonthlyRevenueGenerator';
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const RevenueTrendChart = () => {

    const [lineData, setLineData] = useState([]); // Set initial state to empty array
    /* const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); */      // Error state

    useEffect(() => {
        const fetchMonthlyRevenue = async () => {
            try {
                const data = await MonthlyRevenueGenerator();
                if (data) {
                    const formattedData = data.monthlyRevenue.map(item => ({
                        name: item.month,
                        revenue: item.totalRevenue,
                    }));
                    setLineData(formattedData);
                }
            } catch (error) {
                // setError("Failed to fetch monthly revenue data");
                console.error("Error:", error);
            } /* finally {
                setLoading(false); // End loading state
            } */
        };
        
        fetchMonthlyRevenue();
    }, []);
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1E1E1E",
                            border: "none",
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#FF0000"
                        strokeWidth={2}
                        dot={{ fill: "#FF0000" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueTrendChart
