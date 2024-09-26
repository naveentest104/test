// src/app/courses/page.tsx
"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from "../components/ui/navbar"
import CourseCard from '../components/course-components/CourseCard' // Import CourseCard from the new file

const courses = [
  { 
    id: 1, 
    title: 'Introduction to AI', 
    description: 'Learn the basics of Artificial Intelligence and its applications.',
    price: 49.99,
    duration: '4 weeks',
    rating: 4.5,
    level: 'Beginner'
  },
  { 
    id: 2, 
    title: 'Machine Learning Fundamentals', 
    description: 'Explore core concepts and algorithms in Machine Learning.',
    price: 69.99,
    duration: '6 weeks',
    rating: 4.7,
    level: 'Intermediate'
  },
  { 
    id: 3, 
    title: 'Deep Learning and Neural Networks', 
    description: 'Dive into the world of Deep Learning and Neural Network architectures.',
    price: 89.99,
    duration: '8 weeks',
    rating: 4.8,
    level: 'Advanced'
  },
  { 
    id: 4, 
    title: 'Natural Language Processing', 
    description: 'Understand and implement NLP techniques for text analysis and generation.',
    price: 79.99,
    duration: '6 weeks',
    rating: 4.6,
    level: 'Intermediate'
  },
  { 
    id: 5, 
    title: 'Computer Vision', 
    description: 'Learn to process and analyze visual information using computer algorithms.',
    price: 84.99,
    duration: '7 weeks',
    rating: 4.7,
    level: 'Advanced'
  },
]

export default function Courses() {
  const [isNavExpanded, setIsNavExpanded] = useState(true)

  const toggleNavbar = () => setIsNavExpanded(!isNavExpanded)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2] font-sans">
      <Navbar isExpanded={isNavExpanded} toggleNavbar={toggleNavbar} />
      <main className={`transition-all duration-300 ${isNavExpanded ? 'ml-60' : 'ml-16'}`}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
