'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const ResultAddPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [habit, setHabit] = useState<any>(null)
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const data = searchParams.get('pageData')
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id); // ✅ Access id after parsing
    }
    if (data) {
      setHabit(JSON.parse(data))
    }
  }, [searchParams])

  if (!habit) return <p className="text-center mt-10">Loading habit data...</p>

  const timeStringToNumber = (time: string): number => {
    switch (time) {
      case 'morning': return 1
      case 'afternoon': return 2
      case 'evening': return 3
      case 'all': return 0
      default: return -1
    }
  }

  const handleSubmit = async () => {
    // const userId = 1 // TODO: replace with actual user ID from auth

    const payload = {
      name: habit.name,
      icon_default: habit.icon,
      icon_status: [], // optional, replace if you store statuses
      goal_time: String(habit.goal),
      goal_status: [], // optional, replace if applicable
      time_options: timeStringToNumber(habit.timeOfDay),
      user_id: userId,
      color: habit.color,
    }

    try {
      const res = await fetch(`http://localhost:8000/api/users/${userId}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to create habit')
      }

      const data = await res.json()
      console.log('Habit created:', data)
      router.push('/dashboard')
    } catch (err) {
      console.error('Error creating habit:', err)
      alert('Failed to create habit. Please try again.')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">New Habit</h1>

      {/* Name */}
      <div className="mb-6">
        <p className="font-semibold mb-1">Name</p>
        <div className="bg-[#EADBFF] px-4 py-2 rounded-md">{habit.name}</div>
      </div>

      {/* Icon and Color */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Icon and color</p>
        <div className="flex gap-4">
          <div className="bg-[#EADBFF] px-4 py-2 rounded-md flex items-center gap-2">
            <span className="text-2xl">{habit.icon}</span>
            <span className="font-medium">Icon</span>
          </div>
          <div className="bg-[#EADBFF] px-4 py-2 rounded-md flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: habit.color }}></div>
            <span className="font-medium">Color</span>
          </div>
        </div>
      </div>

      {/* Goal */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Goal</p>
        <div className="bg-purple-100 rounded-xl p-4 relative">
          <button
            onClick={() => router.push('/add?step=3')}
            className="absolute top-2 right-2 bg-[#D3BAFF] px-3 py-1 text-sm rounded-full font-medium"
          >
            Change
          </button>
          <div className="mb-3">
            <p className="text-lg font-semibold">{habit.goal} time</p>
            <p className="text-sm text-gray-600">or more per day</p>
          </div>
          <div className="bg-purple-300 px-4 py-2 rounded-lg inline-flex items-center gap-2 w-fit capitalize">
            <Image src="/tabler_refresh.png" width={20} height={20} alt="refresh" />
            {habit.frequency}
          </div>
        </div>
      </div>

      {/* During */}
      <div className="mb-6">
        <p className="font-semibold mb-2">During</p>
        <div className="grid grid-cols-2 gap-4">
          {['all', 'morning', 'afternoon', 'evening'].map(time => (
            <div
              key={time}
              className={`px-4 py-4 rounded-xl text-center capitalize ${
                habit.timeOfDay === time
                  ? 'bg-[#EADBFF] font-semibold text-black'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {time === 'all' ? (
                <>
                  <span className="text-2xl">🌈</span><br />
                  All
                </>
              ) : (
                <>
                  <img src={`/${time}.png`} alt={time} className="w-6 h-6 mx-auto mb-1" />
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reminder (placeholder) */}
      <div className="mb-6">
        <p className="font-semibold mb-1">Reminder</p>
        <p className="text-sm text-gray-500 mb-2">Set up reminders to help you crush your new habit goals</p>
        <div className="bg-[#EADBFF] px-4 py-2 rounded-md flex items-center justify-between">
          <span>Set reminder</span>
          <input type="checkbox" className="form-checkbox w-5 h-5" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button className="bg-gray-100 text-black px-4 py-2 rounded-md">Cancel Habit</button>
        <button
          onClick={handleSubmit}
          className="bg-purple-400 text-white px-4 py-2 rounded-md"
        >
          Add Habit
        </button>
      </div>
    </div>
  )
}

export default ResultAddPage
