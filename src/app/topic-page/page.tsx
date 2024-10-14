"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BookOpen, FileQuestion, User, Menu, Play, Pause, RotateCcw, ChevronRight, CheckCircle, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/app/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useRouter } from 'next/navigation'

import { Navbar } from "../components/ui/navbar"



const topicData = {
  id: 1,
  title: "What is Artificial Intelligence?",
  videoUrl: "https://example.com/ai-intro-video.mp4",
  article: `
    Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.

    The concept of AI dates back to ancient times, with myths and stories of artificial beings endowed with intelligence or consciousness by master craftsmen. However, the field of AI as we know it today began to take shape in the mid-20th century.

    There are two main types of AI:
    1. Narrow AI: This type of AI is designed to perform a narrow task (e.g., only facial recognition or only internet searches or only driving a car).
    2. General AI: This type of AI would have all of the capabilities of human intelligence, including the capacities mentioned above.

    AI is being used across various industries, including healthcare, finance, education, and more. It's powering innovations like self-driving cars, personalized recommendations on streaming platforms, and advanced medical diagnosis tools.

    As AI continues to evolve, it presents both exciting opportunities and significant challenges for society to grapple with.
  `,
  quiz: [
    {
      question: "What does AI stand for?",
      options: ["Artificial Intelligence", "Automated Integration", "Advanced Iteration", "Algorithmic Invention"],
      correctAnswer: 0
    },
    {
      question: "Which of the following is NOT a type of AI mentioned in the article?",
      options: ["Narrow AI", "General AI", "Weak AI", "Strong AI"],
      correctAnswer: 2
    },
    {
      question: "In which century did the field of AI as we know it today begin to take shape?",
      options: ["18th century", "19th century", "20th century", "21st century"],
      correctAnswer: 2
    }
  ]
}


const VideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const restartVideo = () => {
    videoRef.current.currentTime = 0
    videoRef.current.play()
    setIsPlaying(true)
  }

  return (
    <div className="relative">
      <video ref={videoRef} className="w-full rounded-lg">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
        <Button onClick={togglePlay} variant="secondary" size="icon">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button onClick={restartVideo} variant="secondary" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

const ArticleSection = ({ content }) => (
  <div className="prose max-w-none">
    {content.split('\n\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
  </div>
)

const QuizSection = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (index) => {
    if (!isAnswered) {
      setSelectedAnswer(index)
      setIsAnswered(true)
      if (index === questions[currentQuestion].correctAnswer) {
        setScore(score + 1)
      }
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Quiz</h3>
      {currentQuestion < questions.length ? (
        <>
          <p className="mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full justify-start text-left ${
                  selectedAnswer === index
                    ? index === questions[currentQuestion].correctAnswer
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-red-500 hover:bg-red-600'
                    : ''
                }`}
                disabled={isAnswered}
              >
                {option}
                {isAnswered && index === selectedAnswer && (
                  index === questions[currentQuestion].correctAnswer
                    ? <CheckCircle className="ml-2 h-4 w-4" />
                    : <XCircle className="ml-2 h-4 w-4" />
                )}
              </Button>
            ))}
          </div>
          {isAnswered && (
            <Button onClick={nextQuestion} className="mt-4">
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </>
      ) : (
        <div className="text-center">
          <h4 className="text-2xl font-bold mb-4">Quiz Completed!</h4>
          <p className="text-xl">Your score: {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  )
}

const NotesSection = () => {
  const [notes, setNotes] = useState('')

  const handleNotesChange = (e) => {
    setNotes(e.target.value)
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Your Notes</h3>
      <textarea
        className="w-full h-40 p-2 border rounded-md"
        value={notes}
        onChange={handleNotesChange}
        placeholder="Take your notes here..."
      />
    </div>
  )
}

export default function TopicPageComponent() {
  const [isNavExpanded, setIsNavExpanded] = useState(true)
  const router = useRouter()

  const toggleNavbar = () => setIsNavExpanded(!isNavExpanded)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isExpanded={isNavExpanded} toggleNavbar={toggleNavbar} />
      <main className={`transition-all duration-300 ${isNavExpanded ? 'ml-60' : 'ml-16'}`}>
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={() => router.push('/syllabus')}
            variant="outline"
            className="mb-6"
          >
            <ChevronRight className="mr-2 h-4 w-4" />
            Back to Syllabus
          </Button>
          <h1 className="text-3xl font-bold mb-6">{topicData.title}</h1>
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="article">Article</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="video">
              <Card>
                <CardHeader>
                  <CardTitle>Video Lesson</CardTitle>
                </CardHeader>
                <CardContent>
                  <VideoPlayer videoUrl={topicData.videoUrl} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="article">
              <Card>
                <CardHeader>
                  <CardTitle>Article</CardTitle>
                </CardHeader>
                <CardContent>
                  <ArticleSection content={topicData.article} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="quiz">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuizSection questions={topicData.quiz} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <NotesSection />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}