'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AddHabitPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState(1)

  // Ambil step dari parameter URL (misal: ?step=3)
  useEffect(() => {
    const initialStep = Number(searchParams.get('step') || 1)
    setStep(initialStep)
  }, [])

  // Inisialisasi habitData dari localStorage saat pertama render
  const [habitData, setHabitData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('habitData')
      return saved
        ? JSON.parse(saved)
        : {
            name: '',
            icon: '',
            color: '',
            frequency: '',
            days: [],
            goal: 1,
            timeOfDay: ''
          }
    }
    return {
      name: '',
      icon: '',
      color: '',
      frequency: '',
      days: [],
      goal: 1,
      timeOfDay: ''
    }
  })

  // Simpan ke localStorage setiap kali habitData berubah
  useEffect(() => {
    localStorage.setItem('habitData', JSON.stringify(habitData))
  }, [habitData])

  const handleContinue = () => {
    if (step === 5) {
      localStorage.removeItem('habitData') // Bersihkan setelah submit
      const query = encodeURIComponent(JSON.stringify(habitData))
      router.push(`/add/resultadd?pageData=${query}`)
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleCheckbox = (day: string) => {
    setHabitData((prev: typeof habitData) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d: string) => d !== day)
        : [...prev.days, day]
    }))
  }


  const [showEmoji, setShowEmoji] = useState(false)

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-lg font-bold mb-4">Step {step}</h2>

      {step === 1 && (
        <>
          <p className="text-lg font-semibold mb-4">What’s the new name of your habit?</p>
          <input
            type="text"
            placeholder="Contoh: Workout, read book..."
            value={habitData.name}
            onChange={e => setHabitData({ ...habitData, name: e.target.value })}
            className="bg-[#EADBFF] border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-lg font-semibold mb-4">Select an icon and color that best represents</p>
          <div className="mb-4 relative inline-block">
            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className="bg-[#EADBFF] border px-4 py-2 rounded-md"
            >
              {habitData.icon || 'Choose Icon'}
            </button>
            {showEmoji && (
              <div className="absolute mt-2 bg-white border rounded shadow p-2 z-10">
                {['💪', '🚴', '🏀', '⚽', '🥛', '🏃‍♂️'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setHabitData({ ...habitData, icon: emoji })
                      setShowEmoji(false)
                    }}
                    className="text-2xl p-2 hover:bg-[#EADBFF] rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="color"
            value={habitData.color}
            onChange={e => setHabitData({ ...habitData, color: e.target.value })}
            className="ml-4 w-10 h-10 rounded border"
          />
        </>
      )}

      {step === 3 && (
        <>
          <p className="mb-4 text-lg font-semibold">How often do you want to complete this habit?</p>
          <div className="bg-[#EADBFF] rounded-xl inline-flex items-center justify-center gap-4 px-6 py-3 mb-4">
            <button
              onClick={() => setHabitData({ ...habitData, frequency: 'daily', days: [] })}
              className={`px-4 py-2 rounded-lg transition ${
                habitData.frequency === 'daily' ? 'bg-purple-400 text-white' : ''
              }`}
            >
              daily
            </button>
            <button
              onClick={() => setHabitData({ ...habitData, frequency: 'weekly', days: [] })}
              className={`px-4 py-2 rounded-lg transition ${
                habitData.frequency === 'weekly' ? 'bg-purple-400 text-white' : ''
              }`}
            >
              weekly
            </button>
          </div>

          {habitData.frequency === 'daily' && (
            <>
              <p className="font-medium mb-2">on these days</p>
              {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(day => (
                <button
                  key={day}
                  onClick={() => handleCheckbox(day)}
                  className={`block w-full mt-1 py-2 rounded text-center capitalize ${
                    habitData.days.includes(day) ? 'bg-purple-300 font-semibold' : 'bg-purple-100'
                  }`}
                >
                  {day}
                </button>
              ))}
            </>
          )}

          {habitData.frequency === 'weekly' && (
            <p className="mt-4 text-sm text-gray-700 text-center">
              This habit will be tracked on a weekly basis<br />
              and reset every Sunday
            </p>
          )}
        </>
      )}

      {step === 4 && (
        <>
          <p className="text-lg font-semibold mb-4">What’s your weekly goal?</p>
          <input
            type="number"
            min={1}
            value={habitData.goal}
            onChange={e => setHabitData({ ...habitData, goal: Number(e.target.value) })}
            className="bg-[#EADBFF] border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </>
      )}

      {step === 5 && (
        <>
          <p className="mb-4 text-lg font-semibold">Does this habit relate to any specific time of day?</p>
          <div className="grid grid-cols-2 gap-4 place-items-center">
            {['all', 'morning', 'afternoon', 'evening'].map(time => (
              <button
                key={time}
                onClick={() => setHabitData({ ...habitData, timeOfDay: time })}
                className={`w-full py-4 rounded-xl transition ${
                  habitData.timeOfDay === time ? 'bg-[#EADBFF] font-bold' : 'bg-purple-100'
                }`}
              >
                {time === 'all' ? (
                  <div className="text-2xl mb-1">🌈</div>
                ) : (
                  <img src={`/${time}.png`} alt={time} className="w-6 h-6 mx-auto mb-1" />
                )}
                {time.charAt(0).toUpperCase() + time.slice(1)}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Tombol Navigasi */}
      <div className="mt-6 flex justify-between">
        <button onClick={handleBack} disabled={step === 1} className="bg-gray-200 px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleContinue} className="bg-purple-400 px-4 py-2 rounded text-white">
          {step === 5 ? 'Submit' : 'Continue'}
        </button>
      </div>
    </div>
  )
}

export default AddHabitPage
