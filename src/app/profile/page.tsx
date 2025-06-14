"use client";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Profile() {
  // State untuk data profil
    const [profileData, setProfileData] = useState({
        name: "",
        totalStreak: 0,
        tasksCompleted: 0,
    });

    // Data day tracking
    const [daysOfWeek] = useState([
        { id: 1, name: "Mon", value: 14 },
        { id: 2, name: "Tue", value: 18 },
        { id: 3, name: "Wed", value: 20 },
        { id: 4, name: "Thu", value: 17 },
        { id: 5, name: "Fri", value: 19 },
        { id: 6, name: "Sat", value: 18 },
        { id: 7, name: "Sun", value: 20 },
    ]);

    // Inisialisasi data profil hanya di sisi klien
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        const user = JSON.parse(storedUser);
        setProfileData({
            name: user.name || '',
            totalStreak: user.totalStreak || 0,
            tasksCompleted: user.tasksCompleted || 0,
        });
        }
    }, []);

    // Sidebar menu
    const sidebarMenu = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Profile", href: "/profile" },
        { label: "Add Habit", href: "/add" },
    ];

    return (
        <>
        <Head>
            <title>Profile</title>
        </Head>
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg p-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5 9 5v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z" />
                </svg>
                <span className="text-purple-500 font-bold">HabbitTracker</span>
            </div>

            {/* Menu */}
            <nav>
                {sidebarMenu.map((item) => (
                <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 mt-2 text-gray-700 hover:bg-purple-200 rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5 9 5v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6zM4 16l9-5 9 5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v10z" />
                    </svg>
                    {item.label}
                </a>
                ))}
            </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Your Profile</h1>
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543 1.066 1.543 2.774 0 4.84 a1.724 1.724 0 00-1.065 2.572c-1.066 1.543-2.774 1.543-4.84 0A1.724 1.724 0 006.65 12.653c-1.066-1.543-1.066-2.774 0-4.84 a1.724 1.724 0 001.065-2.572z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-purple-200 rounded-md p-4 mb-4">
                <div className="flex items-center space-x-4">
                <img src="/hakam.jpg" alt="Profile Picture" className="w-20 h-20 rounded-full" />
                <div>
                    <h2 className="text-xl font-medium">{profileData.name || "Loading..."}</h2>
                    <p className="text-sm text-gray-500">Name</p>
                </div>
                </div>
                <div className="flex justify-between mt-4">
                <div>
                    <p className="text-sm text-gray-500">total streak</p>
                    <p className="text-lg font-medium">{profileData.totalStreak}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Task completed</p>
                    <p className="text-lg font-medium">{profileData.tasksCompleted}</p>
                </div>
                </div>
            </div>

            {/* Day Tracking */}
            <div className="bg-purple-200 rounded-md p-4 mb-4">
                <h2 className="text-lg font-medium mb-2">Day Tracking</h2>
                <div className="flex justify-around">
                {daysOfWeek.map((day) => (
                    <div key={day.id} className="flex flex-col items-center">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-1 px-2 rounded-full">
                        {day.value}
                    </button>
                    <p className="text-sm text-gray-500 mt-1">{day.name}</p>
                    </div>
                ))}
                </div>
            </div>

            {/* Daily Quote */}
            <div className="bg-purple-200 rounded-md p-4">
                <h2 className="text-lg font-medium mb-2">Daily Quote</h2>
                <div className="flex items-center space-x-4">
                <img src="https://source.unsplash.com/random/100x100/?quote" alt="Quote Image" className="w-16 h-16 rounded" />
                <div>
                    <p className="text-sm text-gray-500">"Ubuh ubur ikan lele workout dong lee"</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}