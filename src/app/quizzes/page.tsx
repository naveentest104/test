"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import Confetti from 'react-confetti'
import { supabase } from '../../lib/supabaseClient'

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
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('Quiz')
        .select(`
          id,
          title,
          description,
          (SELECT COUNT(*) FROM QuizQuestion WHERE quiz_id = Quiz.id) as question_count
        `);

      if (error) {
        console.error("Error fetching quizzes:", error);
        setError("Failed to load quizzes. Please try again later.");
      } else {
        setQuizzes(data as unknown as Quiz[]);
      }
      setIsLoading(false);
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = async (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsLoading(true);
    const { data, error } = await supabase
      .from('QuizQuestion')
      .select(`
        id,
        question_text,
        question_type,
        points,
        QuizAnswer (id, answer_text, is_correct)
      `)
      .eq('quiz_id', quiz.id);

    if (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load quiz questions. Please try again later.");
    } else {
      setQuestions(data.map(q => ({
        ...q,
        answers: q.QuizAnswer
      })));
    }
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizCompleted(false);
    setShowConfetti(false);
    setIsLoading(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!quizCompleted && questions[currentQuestionIndex]) {
      setUserAnswers({ ...userAnswers, [questions[currentQuestionIndex].id]: answerIndex });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      if (calculateScore() >= 80) {
        setShowConfetti(true);
      }
    }
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;
    questions.forEach((question) => {
      totalPoints += question.points;
      const userAnswerIndex = userAnswers[question.id];
      if (userAnswerIndex !== undefined && question.answers[userAnswerIndex].is_correct) {
        earnedPoints += question.points;
      }
    });
    return (earnedPoints / totalPoints) * 100;
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2] font-sans">
      <main className="transition-all duration-300">
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
                        value={(currentQuestionIndex + 1) / questions.length * 100}
                        className="mb-4"
                      />
                      {questions[currentQuestionIndex] && (
                        <QuizQuestion
                          question={questions[currentQuestionIndex]}
                          onAnswer={handleAnswer}
                          userAnswer={userAnswers[questions[currentQuestionIndex].id]}
                        />
                      )}
                      <Button onClick={handleNextQuestion} className="mt-4 bg-[#4CAF50] hover:bg-[#45a049]">
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
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