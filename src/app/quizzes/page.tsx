"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BookOpen, FileQuestion, User, Menu, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import { Navbar } from "../components/ui/navbar"
import Confetti from 'react-confetti'

const quizzes = [
  {
    id: 1,
    title: 'Introduction to AI',
    description: 'Test your knowledge on AI basics',
    questionCount: 10,
    timeLimit: 15,
    questions: [
      { id: 1, question: 'What does AI stand for?', options: ['Artificial Intelligence', 'Automated Integration', 'Advanced Iteration', 'Algorithmic Invention'], correctAnswer: 0 },
      { id: 2, question: 'Which of these is NOT a type of machine learning?', options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Intuitive Learning'], correctAnswer: 3 },
      // Add more questions here
    ]
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    description: 'Challenge yourself with ML concepts',
    questionCount: 15,
    timeLimit: 20,
    questions: [
      { id: 1, question: 'What is the primary goal of supervised learning?', options: ['Clustering', 'Classification', 'Dimensionality Reduction', 'Anomaly Detection'], correctAnswer: 1 },
      { id: 2, question: 'Which algorithm is commonly used for linear regression?', options: ['K-Means', 'Decision Trees', 'Ordinary Least Squares', 'Principal Component Analysis'], correctAnswer: 2 },
      // Add more questions here
    ]
  },
  // Add more quizzes here
]

const QuizCard = ({ quiz, onClick }) => (
  <Card className="cursor-pointer bg-white border border-[#e0e0e0] shadow-lg transition-transform duration-300 hover:shadow-xl hover:border-[#4CAF50]" onClick={() => onClick(quiz)}>
    <CardHeader>
      <CardTitle className="text-xl font-bold text-[#4CAF50]">{quiz.title}</CardTitle>
      <CardDescription>{quiz.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between items-center mb-2">
        <Badge variant="secondary">{quiz.questionCount} Questions</Badge>
        <Badge variant="outline">{quiz.timeLimit} Minutes</Badge>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]">Start Quiz</Button>
    </CardFooter>
  </Card>
)

const QuizQuestion = ({ question, onAnswer, userAnswer }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mb-6 p-4 bg-gray-100 shadow rounded-lg" // Keeping the background color
  >
    <h3 className="text-lg font-semibold text-blue-600 mb-4">{question.question}</h3> {/* Changed heading color to blue */}
    <div className="space-y-2">
      {question.options.map((option, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAnswer(index)}
          className={`w-full p-3 text-left rounded-md transition-colors ${userAnswer === index
            ? userAnswer === question.correctAnswer
              ? 'bg-green-100 border-2 border-green-500 text-gray-800' // Darker text color for visibility
              : 'bg-red-100 border-2 border-red-500 text-gray-800'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800' // Darker text color
            }`}
        >
          {option}
          {userAnswer === index && (
            <span className="float-right">
              {userAnswer === question.correctAnswer ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  </motion.div>
)


export default function Quizzes() {
  const [isNavExpanded, setIsNavExpanded] = useState(true)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const toggleNavbar = () => setIsNavExpanded(!isNavExpanded)

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setQuizCompleted(false)
    setShowConfetti(false)
  }

  const handleAnswer = (answerIndex) => {
    if (!quizCompleted) {
      setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answerIndex })
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
      if (calculateScore() >= 80) { // Check for good marks (80% or above)
        setShowConfetti(true);
      }
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    selectedQuiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return (correctAnswers / selectedQuiz.questions.length) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2] font-sans">
      <Navbar isExpanded={isNavExpanded} toggleNavbar={toggleNavbar} />
      <main className={`transition-all duration-300 ${isNavExpanded ? 'ml-60' : 'ml-16'}`}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Quizzes</h1>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {showConfetti && <Confetti />}
            <AnimatePresence mode="wait">
              {!selectedQuiz ? (
                <motion.div
                  key="quiz-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {quizzes.map((quiz) => (
                    <motion.div
                      key={quiz.id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <QuizCard quiz={quiz} onClick={handleQuizSelect} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="quiz-questions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setSelectedQuiz(null)}
                    className="mb-4 bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Quizzes
                  </Button>

                  <h2 className="text-2xl font-bold mb-4 text-[#4CAF50]">{selectedQuiz.title}</h2>
                  {!quizCompleted ? (
                    <>
                      <Progress
                        value={(currentQuestionIndex + 1) / selectedQuiz.questions.length * 100}
                        className="mb-4"
                      />
                      <QuizQuestion
                        question={selectedQuiz.questions[currentQuestionIndex]}
                        onAnswer={handleAnswer}
                        userAnswer={userAnswers[currentQuestionIndex]}
                      />
                      <Button onClick={handleNextQuestion} className="mt-4 bg-[#4CAF50] hover:bg-[#45a049]">
                        {currentQuestionIndex < selectedQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                      </Button>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-[#4CAF50]">Quiz Completed!</h3>
                      <p className="text-xl mb-4 text-gray-700">Your Score: {calculateScore().toFixed(2)}%</p>
                      <Button onClick={() => setSelectedQuiz(null)} className="bg-white hover:bg-[#4CAF50] text-black">Return to Quizzes</Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}