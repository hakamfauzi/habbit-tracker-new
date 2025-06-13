"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Dashboard() {
    const [healthStatus] = useState({
        percentage: 95,
        status: "Healthy",
        message: "You are healthy!",
        progress: 0.95,
    });

    const dailyGoals = [
        { day: "Mon", achieved: true },
        { day: "Tue", achieved: true },
        { day: "Wed", achieved: false },
        { day: "Thu", achieved: false },
        { day: "Fri", achieved: true },
        { day: "Sat", achieved: true },
        { day: "Sun", achieved: true },
    ];

    const activitySummary = [
        {
        icon: "/icons/sepatuu.jpg", // Gambar sepatu
        title: "Steps Taken",
        value: "12,000",
        unit: "Steps",
        comparison: "8% more than average people",
        },
        {
        icon: "/icons/api.jpg", // Gambar api
        title: "Calories",
        value: "696",
        unit: "kCal",
        comparison: "5% more than average people",
        },
        {
        icon: "/icons/air.jpg", // Gambar air
        title: "Drink Water",
        value: "459",
        unit: "ml",
        comparison: "6% more than average people",
        },
    ];

    return (
        <>
        <Head>
            <title>Dashboard</title>
        </Head>

        <div className="bg-gray-100 min-h-screen p-6">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-4 fixed left-0 top-0 h-full">
            <div className="flex items-center space-x-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5 9 5v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6zM4 16l9-5 9 5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v10z" />
                </svg>
                <span className="text-purple-500 font-bold">HabbiTracker</span>
            </div>

            <nav className="space-y-2">
                <Link href="/#" className="block px-4 py-2 text-gray-700 hover:bg-purple-200 rounded">Dashboard</Link>
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-purple-200 rounded">Profile</Link>
                <Link href="/optioncreate" className="block px-4 py-2 text-gray-700 hover:bg-purple-200 rounded">Add Habit</Link>
            </nav>
            </aside>

            {/* Content Area */}
            <main className="ml-64 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Welcome to HabbiTracker!</h1>
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                Daily Summary
                </button>
            </div>

            {/* Health Status Card */}
            <div className="bg-black text-white rounded-md p-4 mb-6 flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5 9 5v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6zM4 16l9-5 9 5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v10z" />
                </svg>
                <div className="flex-1">
                <p className="text-xl font-medium">{healthStatus.percentage}%</p>
                <p className="text-sm">{healthStatus.message}</p>
                <div className="relative h-2 w-full mt-2 bg-gray-700 rounded">
                    <div
                    className="absolute top-0 left-0 h-full bg-purple-500 rounded"
                    style={{ width: `${healthStatus.progress * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-300 mt-1">
                    <span>Unhealthy</span>
                    <span>Healthy</span>
                </div>
                </div>
            </div>

            {/* Daily Goals Card */}
            <div className="bg-gray-200 rounded-md p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Your Daily Goals</span>
                </div>
                <span className="text-sm text-gray-500">Last 7 Days</span>
                </div>
                <div className="mt-2 flex space-x-2">
                {dailyGoals.map((goal, index) => (
                    <div key={index} className="flex flex-col items-center">
                    <span className={`text-xl ${goal.achieved ? "text-green-500" : "text-red-500"}`}>
                        {goal.achieved ? "✅" : "❌"}
                    </span>
                    <span className="text-sm text-gray-500">{goal.day}</span>
                    </div>
                ))}
                </div>
            </div>

            {/* Activity Summary Cards */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Activity Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activitySummary.map((summary, index) => (
                    <div
                    key={index}
                    className="bg-white rounded-md p-4 flex flex-col items-start shadow-sm"
                    >
                    <img src={summary.icon} alt={summary.title} className="w-10 h-10 mb-4" />
                    <p className="text-lg font-medium">{summary.value}</p>
                    <p className="text-sm text-gray-500">{summary.unit}</p>
                    <p className="text-xs text-purple-500">{summary.comparison}</p>
                    </div>
                ))}
                </div>
            </div>
            </main>
        </div>
        </>
    );
}