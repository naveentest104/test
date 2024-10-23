"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronDown, ChevronUp, Book, Clock, Award, Play, CheckCircle } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

// Define types for the course syllabus structure
interface Topic {
  title: string
  progress: number
}

interface Module {
  id: number
  title: string
  duration: string
  topics: Topic[]
  progress: number
}

interface CourseSyllabus {
  title: string
  description: string
  overallProgress: number
  modules: Module[]
}

const courseSyllabus: CourseSyllabus = {
  title: "Introduction to AI",
  description: "Learn the basics of Artificial Intelligence and its applications.",
  overallProgress: 50,
  modules: [
    {
      id: 1,
      title: "What is Artificial Intelligence?",
      duration: "2 hours",
      topics: [
        { title: "Definition of AI", progress: 100 },
        { title: "History of AI", progress: 100 },
        { title: "Types of AI", progress: 100 },
      ],
      progress: 100,
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      duration: "4 hours",
      topics: [
        { title: "Supervised Learning", progress: 75 },
        { title: "Unsupervised Learning", progress: 75 },
        { title: "Reinforcement Learning", progress: 50 },
      ],
      progress: 75,
    },
    {
      id: 3,
      title: "Neural Networks and Deep Learning",
      duration: "6 hours",
      topics: [
        { title: "Artificial Neural Networks", progress: 25 },
        { title: "Convolutional Neural Networks", progress: 25 },
        { title: "Recurrent Neural Networks", progress: 0 },
      ],
      progress: 25,
    },
    {
      id: 4,
      title: "Natural Language Processing",
      duration: "5 hours",
      topics: [
        { title: "Text Processing", progress: 0 },
        { title: "Sentiment Analysis", progress: 0 },
        { title: "Language Generation", progress: 0 },
      ],
      progress: 0,
    },
    {
      id: 5,
      title: "AI Ethics and Future Trends",
      duration: "3 hours",
      topics: [
        { title: "Ethical Considerations in AI", progress: 0 },
        { title: "AI in Various Industries", progress: 0 },
        { title: "Future of AI", progress: 0 },
      ],
      progress: 0,
    },
  ],
}

// Define props types for CustomProgressBar
interface CustomProgressBarProps {
  progress: number
  totalModules: number
  completedModules: number
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({ progress, totalModules, completedModules }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
            Course Progress
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-teal-600">
            {progress}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
        <motion.div 
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-xs font-semibold text-gray-600">{completedModules} of {totalModules} modules completed</span>
        <span className="text-xs font-semibold text-gray-600">{Math.round(progress / 100 * 20)} hours completed</span>
      </div>
    </div>
  )
}

// Define props types for ModuleCard
interface ModuleCardProps {
  module: Module
  isExpanded: boolean
  toggleExpand: () => void
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isExpanded, toggleExpand }) => {
  const progressColor = module.progress === 100 ? "bg-green-500" : "bg-teal-500"

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-0">
        <motion.div
          initial={false}
          animate={{ backgroundColor: isExpanded ? "#e6fffa" : "#ffffff" }}
          transition={{ duration: 0.3 }}
          className="p-4 cursor-pointer"
          onClick={toggleExpand}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{module.title}</h3>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? <ChevronUp className="text-teal-600" /> : <ChevronDown className="text-teal-600" />}
            </motion.div>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1 text-teal-600" />
            <span>{module.duration}</span>
          </div>
          <div className="mt-2 relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
              <motion.div 
                style={{ width: `${module.progress}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${progressColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${module.progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4"
            >
              <ul className="mt-2 space-y-2">
                {module.topics.map((topic, index) => (
                  <li key={index} className="flex items-center">
                    <Book className="w-4 h-4 mr-2 text-teal-600" />
                    <span>{topic.title}</span>
                    {topic.progress === 100 && <CheckCircle className="w-4 h-4 ml-2 text-green-500" />}
                  </li>
                ))}
              </ul>
              <Button className="mt-4 bg-teal-500 hover:bg-teal-600" size="sm">
                <Play className="w-4 h-4 mr-2" />
                {module.progress === 100 ? "Review Module" : "Start Module"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export default function CourseSyllabus() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null)


  const toggleExpand = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
  }

  const completedModules = courseSyllabus.modules.filter(module => module.progress === 100).length
  const totalModules = courseSyllabus.modules.length

  return (
    <div className="min-h-screen">
      <main>
        <div className="max-w-7xl mx-auto mt-5">
          <div className="mb-8 flex items-center justify-between">
            <Button variant="outline" size="sm" className="text-teal-600 border-teal-600 hover:bg-teal-100">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
            <Badge variant="secondary" className="text-lg font-semibold bg-teal-200 text-teal-800">
              {courseSyllabus.overallProgress}% Complete
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{courseSyllabus.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{courseSyllabus.description}</p>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <CustomProgressBar 
              progress={courseSyllabus.overallProgress} 
              totalModules={totalModules}
              completedModules={completedModules}
            />
          </div>
          <div className="space-y-4">
            {courseSyllabus.modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                isExpanded={expandedModule === module.id}
                toggleExpand={() => toggleExpand(module.id)}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
              <Award className="w-5 h-5 mr-2" />
              Complete Course
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
