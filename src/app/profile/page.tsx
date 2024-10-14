"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, FileQuestion, Award, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Navbar } from "../components/ui/navbar"
import { Input } from "@/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"

const userStats = [
  { icon: BookOpen, label: 'Courses Completed', value: 5 },
  { icon: FileQuestion, label: 'Quizzes Taken', value: 23 },
  { icon: Clock, label: 'Total Study Time', value: '47h 23m' },
  { icon: Award, label: 'Achievements', value: 12 },
]

const StatCard = ({ icon: Icon, label, value }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{label}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

export default function Profile() {
  const [isNavExpanded, setIsNavExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const toggleNavbar = () => setIsNavExpanded(!isNavExpanded)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2] font-sans">
      <Navbar isExpanded={isNavExpanded} toggleNavbar={toggleNavbar} />
      <main className={`transition-all duration-300 ${isNavExpanded ? 'ml-60' : 'ml-16'}`}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Your Profile</h1>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
                      <p className="text-sm text-gray-500">john.doe@example.com</p>
                      <Button className="mt-4 bg-[#4CAF50] hover:bg-[#45a049]" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue="John Doe" disabled={!isEditing} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" disabled={!isEditing} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input id="bio" defaultValue="Passionate learner and tech enthusiast" disabled={!isEditing} />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Your Learning Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {userStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <StatCard icon={stat.icon} label={stat.label} value={stat.value} />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email updates about your courses</p>
                      </div>
                      <Switch id="notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <p className="text-sm text-muted-foreground">Allow others to see your learning progress</p>
                      </div>
                      <Switch id="public-profile" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
