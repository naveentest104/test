'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent } from "@/app/components/ui/card"
import { Trophy, Star, TrendingUp, ChevronRight, Edit2 } from "lucide-react"

export default function UserProfile() {
  const [username, setUsername] = useState('Billu')
  const [isEditing, setIsEditing] = useState(false)
  const [points, setPoints] = useState(61848)
  const [coins, setCoins] = useState(3400)
  const [rank, setRank] = useState('--')

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => prev + 1)
      setCoins(prev => prev + (Math.random() > 0.8 ? 1 : 0))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const updateRank = () => {
    const newRank = Math.floor(Math.random() * 100) + 1
    setRank(newRank.toString())
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center p-6">
        <div className="flex items-center space-x-4">
          <img src="/placeholder.svg?height=100&width=100" alt="Profile picture" className="w-16 h-16 rounded-full" />
          <div>
            {isEditing ? (
              <Input
                value={username}
                onChange={handleUsernameChange}
                className="text-lg font-semibold mb-1"
              />
            ) : (
              <h1 className="text-lg font-semibold">{username}</h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-teal-600 p-0 h-6"
              onClick={updateRank}
            >
              <Trophy className="w-4 h-4 mr-1" />
              <span>Daily Rank {rank}</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-gray-500 text-sm">22nd October 2024</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={toggleEdit}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <div className="flex space-x-8 mt-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <Star className="text-white" />
            </div>
            <p className="text-xl font-semibold mt-2">{points.toLocaleString()}</p>
            <p className="text-gray-500">Points</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <TrendingUp className="text-white" />
            </div>
            <p className="text-xl font-semibold mt-2">{coins.toLocaleString()}</p>
            <p className="text-gray-500">Coins</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}