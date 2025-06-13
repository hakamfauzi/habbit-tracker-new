"use client";

import Head from "next/head";
import { useState } from "react";

export default function OptionCreate() {
  // State untuk mengelola data form
    const [habits, setHabits] = useState([
        {
        id: 1,
        name: "Workout",
        description: "Hit the gym hard or take your energy outdoors for a run — you've got this!",
        icon: "💪",
        },
    ]);

    const popularHabits = [
        {
        id: 1,
        name: "Workout",
        description: "Hit the gym hard or take your energy outdoors for a run — you've got this!",
        icon: "💪",
        },
        {
        id: 2,
        name: "Drink water",
        description: "Keep your body and mind clear by drinking water throughout the day.",
        icon: "💧",
        },
        {
        id: 3,
        name: "Read",
        description: "Take a moment to unwind with a good book and some tea.",
        icon: "📖",
        },
        {
        id: 4,
        name: "Meditate",
        description: "Ease and cope with stress by centering yourself.",
        icon: "🧘‍♀️",
        },
    ];

    const healthHabits = [
        {
        id: 1,
        name: "Steps",
        description: "Keep moving and aim for more steps during the day.",
        icon: "🚶‍♂️",
        },
        {
        id: 2,
        name: "Exercise",
        description: "Treat your body kindly with some exercise.",
        icon: "🏃‍♂️",
        },
    ];

    return (
        <>
        <Head>
            <title>Add New Habit</title>
        </Head>
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            {/* Header */}
            <h1 className="text-center text-2xl font-bold mb-4">Add New Habit</h1>

            {/* Create Custom Habit Button */}
            <button className="w-full bg-purple-200 hover:bg-purple-300 text-white font-semibold py-2 px-4 rounded mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Create custom habit
            </button>

            {/* Your Habits */}
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Your Habits</h2>
                <p className="text-gray-500 mb-2">Adjust your habits.</p>
                {habits.map((habit) => (
                <div key={habit.id} className="bg-purple-200 rounded-md p-4 mb-2">
                    <div className="flex items-center space-x-2">
                    <span className="text-2xl">{habit.icon}</span>
                    <h3 className="font-medium">{habit.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{habit.description}</p>
                </div>
                ))}
            </div>

            {/* Popular Habits */}
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Popular Habits</h2>
                <p className="text-gray-500 mb-2">Just starting out or want to try something new? These habits are for you!</p>
                {popularHabits.map((habit) => (
                <div key={habit.id} className="bg-purple-200 rounded-md p-4 mb-2">
                    <div className="flex items-center space-x-2">
                    <span className="text-2xl">{habit.icon}</span>
                    <h3 className="font-medium">{habit.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{habit.description}</p>
                </div>
                ))}
            </div>

            {/* Health Habits */}
            <div>
                <h2 className="text-xl font-bold mb-2">Health Habits</h2>
                <p className="text-gray-500 mb-2">Just starting out or want to try something new? These habits are for you!</p>
                {healthHabits.map((habit) => (
                <div key={habit.id} className="bg-purple-200 rounded-md p-4 mb-2">
                    <div className="flex items-center space-x-2">
                    <span className="text-2xl">{habit.icon}</span>
                    <h3 className="font-medium">{habit.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{habit.description}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
        </>
    );
}