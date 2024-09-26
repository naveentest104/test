"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, BookOpen, FileQuestion, User, Menu, Settings, Bell, ChevronRight } from 'lucide-react'
import { Button } from "./components/ui/button"
import { Progress } from "./components/ui/progress"
import { Navbar } from "./components/ui/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { useRouter } from 'next/navigation'; // Correct import


const courses = [
  { id: 1, title: 'Introduction to AI', progress: 75, summary: 'Learn the basics of Artificial Intelligence and its applications.' },
  { id: 2, title: 'Machine Learning Fundamentals', progress: 50, summary: 'Explore core concepts and algorithms in Machine Learning.' },
  { id: 3, title: 'Deep Learning and Neural Networks', progress: 25, summary: 'Dive into the world of Deep Learning and Neural Network architectures.' },
]

const ProgressCircle = ({ progress }) => (
  <div className="relative w-32 h-32">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        className="text-gray-200 stroke-current"
        strokeWidth="10"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
      ></circle>
      <motion.circle
        className="text-[#4CAF50] stroke-current"
        strokeWidth="10"
        strokeLinecap="round"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: `${progress * 2.512} 251.2` }}
        transition={{ duration: 1, ease: "easeInOut" }}
      ></motion.circle>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-3xl font-bold text-[#4CAF50]">{progress}%</span>
    </div>
  </div>
)

const CourseCard = ({ course }) => {
  const router = useRouter();

  const handleViewSyllabus = () => {
    router.push(`/course-syllabus/${course.id}`);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-white p-6 rounded-lg shadow-lg border border-[#e0e0e0] transition-transform duration-300 cursor-pointer"
      onClick={handleViewSyllabus}
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
      <p className="text-gray-600 mb-4">{course.summary}</p>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
      </div>
      <Progress value={course.progress} className="mb-4" />
      <Button className="flex items-center justify-center" onClick={handleViewSyllabus}>
        View Syllabus
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
};
export default function DashboardComponent() {
  const [isNavExpanded, setIsNavExpanded] = useState(true)
  const [overallProgress, setOverallProgress] = useState(60)

  const toggleNavbar = () => setIsNavExpanded(!isNavExpanded)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2] font-sans">
      <Navbar isExpanded={isNavExpanded} toggleNavbar={toggleNavbar} />
      <main className={`transition-all duration-300 ${isNavExpanded ? 'ml-60' : 'ml-16'}`}>
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome, John!</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <motion.div whileHover={{ scale: 1.1, rotate: 15 }}>
                  <Bell className="h-5 w-5 text-gray-600" />
                </motion.div>
              </Button>
              <Button variant="ghost" size="icon">
                <motion.div whileHover={{ scale: 1.1, rotate: -15 }}>
                  <Settings className="h-5 w-5 text-gray-600" />
                </motion.div>
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
              <ProgressCircle progress={overallProgress} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
