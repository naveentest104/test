'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import Confetti from 'react-confetti'

type Quiz = {
  id: string;
  title: string;
  description?: string;
  question_count: number;
  time_limit?: number;
}

type Question = {
  id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  points: number;
  answers: Answer[];
}

type Answer = {
  id: string;
  answer_text: string;
  is_correct: boolean;
}

const sampleQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Data Science Fundamentals',
    description: 'Test your knowledge of basic data science concepts',
    question_count: 5,
    time_limit: 10
  },
  {
    id: '2',
    title: 'Machine Learning Algorithms',
    description: 'Challenge yourself with questions about ML algorithms',
    question_count: 5,
    time_limit: 15
  }
]

const sampleQuestions: Record<string, Question[]> = {
  '1': [
    {
      id: '1',
      question_text: 'What is the primary goal of data preprocessing?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'To make data look visually appealing', is_correct: false },
        { id: 'b', answer_text: 'To prepare data for analysis and modeling', is_correct: true },
        { id: 'c', answer_text: 'To increase the size of the dataset', is_correct: false },
        { id: 'd', answer_text: 'To remove all outliers from the data', is_correct: false }
      ]
    },
    {
      id: '2',
      question_text: 'Which of the following is NOT a common type of machine learning?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'Supervised learning', is_correct: false },
        { id: 'b', answer_text: 'Unsupervised learning', is_correct: false },
        { id: 'c', answer_text: 'Reinforcement learning', is_correct: false },
        { id: 'd', answer_text: 'Prescriptive learning', is_correct: true }
      ]
    },
    {
      id: '3',
      question_text: 'What does the term "overfitting" refer to in machine learning?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'When a model performs well on training data but poorly on new data', is_correct: true },
        { id: 'b', answer_text: 'When a model is too simple to capture the underlying patterns', is_correct: false },
        { id: 'c', answer_text: 'When a dataset is too small for meaningful analysis', is_correct: false },
        { id: 'd', answer_text: 'When a model takes too long to train', is_correct: false }
      ]
    },
    {
      id: '4',
      question_text: 'Which of the following is a measure of central tendency?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'Standard deviation', is_correct: false },
        { id: 'b', answer_text: 'Variance', is_correct: false },
        { id: 'c', answer_text: 'Median', is_correct: true },
        { id: 'd', answer_text: 'Range', is_correct: false }
      ]
    },
    {
      id: '5',
      question_text: 'What is the purpose of feature scaling in machine learning?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'To increase the number of features', is_correct: false },
        { id: 'b', answer_text: 'To normalize the range of independent variables', is_correct: true },
        { id: 'c', answer_text: 'To remove all categorical variables', is_correct: false },
        { id: 'd', answer_text: 'To eliminate the need for model training', is_correct: false }
      ]
    }
  ],
  '2': [
    {
      id: '1',
      question_text: 'Which algorithm is commonly used for classification tasks?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'Linear Regression', is_correct: false },
        { id: 'b', answer_text: 'K-Means Clustering', is_correct: false },
        { id: 'c', answer_text: 'Random Forest', is_correct: true },
        { id: 'd', answer_text: 'Principal Component Analysis', is_correct: false }
      ]
    },
    {
      id: '2',
      question_text: 'What is the main purpose of the K-Means algorithm?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'Classification', is_correct: false },
        { id: 'b', answer_text: 'Regression', is_correct: false },
        { id: 'c', answer_text: 'Clustering', is_correct: true },
        { id: 'd', answer_text: 'Dimensionality reduction', is_correct: false }
      ]
    },
    {
      id: '3',
      question_text: 'Which of the following is an ensemble learning method?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'Support Vector Machine', is_correct: false },
        { id: 'b', answer_text: 'Naive Bayes', is_correct: false },
        { id: 'c', answer_text: 'Decision Tree', is_correct: false },
        { id: 'd', answer_text: 'Random Forest', is_correct: true }
      ]
    },
    {
      id: '4',
      question_text: 'What is the primary goal of the Gradient Descent algorithm?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'To classify data points', is_correct: false },
        { id: 'b', answer_text: 'To minimize the loss function', is_correct: true },
        { id: 'c', answer_text: 'To cluster similar data points', is_correct: false },
        { id: 'd', answer_text: 'To reduce dimensionality', is_correct: false }
      ]
    },
    {
      id: '5',
      question_text: 'Which algorithm is based on Bayes\' theorem?',
      question_type: 'multiple_choice',
      points: 1,
      answers: [
        { id: 'a', answer_text: 'K-Nearest Neighbors', is_correct: false },
        { id: 'b', answer_text: 'Logistic Regression', is_correct: false },
        { id: 'c', answer_text: 'Naive Bayes', is_correct: true },
        { id: 'd', answer_text: 'Decision Trees', is_correct: false }
      ]
    }
  ]
}

const QuizCard = ({ quiz, onClick }: { quiz: Quiz; onClick: (quiz: Quiz) => void }) => (
  <Card className="cursor-pointer bg-white border border-[#e0e0e0] shadow-lg transition-transform duration-300 hover:shadow-xl hover:border-[#4CAF50]" onClick={() => onClick(quiz)}>
    <CardHeader>
      <CardTitle className="text-xl font-bold text-[#4CAF50]">{quiz.title}</CardTitle>
      <CardDescription>{quiz.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between items-center mb-2">
        <Badge variant="secondary">{quiz.question_count} Questions</Badge>
        {quiz.time_limit && <Badge variant="outline">{quiz.time_limit} Minutes</Badge>}
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]">Start Quiz</Button>
    </CardFooter>
  </Card>
)

const QuizQuestion = ({ question, onAnswer, userAnswer }: { question: Question; onAnswer: (answerIndex: number) => void; userAnswer?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mb-6 p-4 bg-gray-100 shadow rounded-lg" 
  >
    <h3 className="text-lg font-semibold text-blue-600 mb-4">{question.question_text}</h3> 
    <div className="space-y-2">
      {question.answers.map((answer, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAnswer(index)}
          className={`w-full p-3 text-left rounded-md transition-colors ${
            userAnswer === index
              ? answer.is_correct
                ? 'bg-green-100 border-2 border-green-500 text-gray-800'
                : 'bg-red-100 border-2 border-red-500 text-gray-800'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          {answer.answer_text}
          {userAnswer === index && (
            <span className="float-right">
              {answer.is_correct ? (
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
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizCompleted(false);
    setShowConfetti(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!quizCompleted && selectedQuiz) {
      const currentQuestion = sampleQuestions[selectedQuiz.id][currentQuestionIndex];
      setUserAnswers({ ...userAnswers, [currentQuestion.id]: answerIndex });
    }
  };

  const handleNextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.question_count - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      const score = calculateScore();
      if (score >= 80) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
      }
    }
  };

  const calculateScore = () => {
    if (!selectedQuiz) return 0;
    let earnedPoints = 0;
    sampleQuestions[selectedQuiz.id].forEach((question) => {
      const userAnswerIndex = userAnswers[question.id];
      if (userAnswerIndex !== undefined && question.answers[userAnswerIndex].is_correct) {
        earnedPoints += question.points;
      }
    });
    return (earnedPoints / selectedQuiz.question_count) * 100;
  };

  return (
    <div className="min-h-screen">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <main className="transition-all duration-300">
        <header className="bg-white shadow-sm">
          <div className="max-w-10xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Data Science Quizzes</h1>
          </div>
        </header>
        <div className="max-w-9xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <AnimatePresence mode="wait">
              {!selectedQuiz ? (
                <motion.div
                  key="quiz-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {sampleQuizzes.map((quiz) => (
                    <motion.div
                      key={quiz.id}
                      whileHover={{ scale: 1.03  }}
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
                        value={(currentQuestionIndex + 1) / selectedQuiz.question_count * 100}
                        className="mb-4"
                      />
                      {sampleQuestions[selectedQuiz.id][currentQuestionIndex] && (
                        <QuizQuestion
                          question={sampleQuestions[selectedQuiz.id][currentQuestionIndex]}
                          onAnswer={handleAnswer}
                          userAnswer={userAnswers[sampleQuestions[selectedQuiz.id][currentQuestionIndex].id]}
                        />
                      )}
                      <Button onClick={handleNextQuestion} className="mt-4 bg-[#4CAF50] hover:bg-[#45a049]">
                        {currentQuestionIndex < selectedQuiz.question_count - 1 ? 'Next Question' : 'Finish Quiz'}
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
  );
}