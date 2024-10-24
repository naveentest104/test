// src/app/courses/page.tsx
"use client"

import { motion } from 'framer-motion'
import CourseCard from '../components/course-components/CourseCard' // Import CourseCard from the new file


const courses = [
  { 
    id: '1', // Convert id to string
    title: 'Introduction to AI',
    description: 'Learn the basics of Artificial Intelligence and its applications.',
    price: 49.99,
    duration: '4 weeks',
    rating: 4.5,
    level: 'Beginner'
  },
  { 
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Explore core concepts and algorithms in Machine Learning.',
    price: 69.99,
    duration: '6 weeks',
    rating: 4.7,
    level: 'Intermediate'
  },
  { 
    id: '3',
    title: 'Deep Learning and Neural Networks',
    description: 'Dive into the world of Deep Learning and Neural Network architectures.',
    price: 89.99,
    duration: '8 weeks',
    rating: 4.8,
    level: 'Advanced'
  },
  { 
    id: '4',
    title: 'Natural Language Processing',
    description: 'Understand and implement NLP techniques for text analysis and generation.',
    price: 79.99,
    duration: '6 weeks',
    rating: 4.6,
    level: 'Intermediate'
  },
  { 
    id: '5',
    title: 'Computer Vision',
    description: 'Learn to process and analyze visual information using computer algorithms.',
    price: 84.99,
    duration: '7 weeks',
    rating: 4.7,
    level: 'Advanced'
  },
]


export default function Courses() {
  return (
    <div className="">
      <main className="">
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
      </main>
    </div>
  )
}
