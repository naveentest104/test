"use client"

import React, { useState, useMemo } from 'react'
import { ChevronRight, Star, Clock, BarChart, Search, Filter, SortAsc, SortDesc } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import AdvancedCodingChallenge from './AdvancedCodingChallenge'

interface SampleInput {
  input: string
  output: string
}

interface Problem {
  id: number
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  timeEstimate: string
  successRate: string
  tags: string[]
  hint: string
  sampleInputs: SampleInput[]
}

const problems: Problem[] = [
  {
    id: 1,
    title: 'Hello World',
    description: 'Write a function that prints "Hello, World!" to the console.',
    difficulty: 'Easy',
    timeEstimate: '5 min',
    successRate: '95%',
    tags: ['Basics', 'Functions'],
    hint: 'Use the appropriate print function for your chosen language. In JavaScript, you can use console.log().',
    sampleInputs: [
      { input: 'greet()', output: 'Hello, World!' },
    ],
  },
  {
    id: 2,
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    timeEstimate: '15 min',
    successRate: '80%',
    tags: ['Array', 'Hash Table'],
    hint: 'Try using a hash table to store complements as you iterate through the array.',
    sampleInputs: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    ],
  },
  {
    id: 3,
    title: 'Reverse Linked List',
    description: 'Reverse a singly linked list.',
    difficulty: 'Medium',
    timeEstimate: '20 min',
    successRate: '70%',
    tags: ['Linked List', 'Recursion'],
    hint: 'You can solve this iteratively or recursively. For the iterative approach, use three pointers: previous, current, and next.',
    sampleInputs: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
  },
  {
    id: 4,
    title: 'Binary Tree Level Order Traversal',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level)',
    difficulty: 'Medium',
    timeEstimate: '25 min',
    successRate: '65%',
    tags: ['Tree', 'BFS'],
    hint: 'Use a queue to keep track of nodes at each level. Process all nodes at the current level before moving to the next.',
    sampleInputs: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
  },
  {
    id: 5,
    title: 'Merge K Sorted Lists',
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    difficulty: 'Hard',
    timeEstimate: '40 min',
    successRate: '45%',
    tags: ['Linked List', 'Divide and Conquer', 'Heap'],
    hint: 'You can use a min-heap to efficiently get the smallest element among the k lists at each step.',
    sampleInputs: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' },
      { input: 'lists = [[]]', output: '[]' },
    ],
  },
]

const CodingChallengePlatform: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<Problem['difficulty'] | 'All'>('All')
  const [tagFilter, setTagFilter] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'difficulty' | 'successRate'>('difficulty')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleProblemClick = (problem: Problem) => {
    setSelectedProblem(problem)
  }

  const handleBackToList = () => {
    setSelectedProblem(null)
  }

  const getDifficultyColor = (difficulty: Problem['difficulty']) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredAndSortedProblems = useMemo(() => {
    return problems
      .filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (difficultyFilter === 'All' || problem.difficulty === difficultyFilter) &&
        (tagFilter === 'All' || problem.tags.includes(tagFilter))
      )
      .sort((a, b) => {
        if (sortBy === 'difficulty') {
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
          return sortOrder === 'asc'
            ? difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
            : difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
        } else {
          const aRate = parseFloat(a.successRate)
          const bRate = parseFloat(b.successRate)
          return sortOrder === 'asc' ? aRate - bRate : bRate - aRate
        }
      })
  }, [searchTerm, difficultyFilter, tagFilter, sortBy, sortOrder])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    problems.forEach(problem => problem.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags)
  }, [])

  if (selectedProblem) {
    return (
      <div>
        <Button onClick={handleBackToList} className="m-4">
          ← Back to List
        </Button>
        <AdvancedCodingChallenge problem={selectedProblem} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Coding Challenges</h1>
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            type="text"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tagFilter} onValueChange={setTagFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Tags</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort by {sortBy === 'difficulty' ? 'Difficulty' : 'Success Rate'}
              {sortOrder === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => { setSortBy('difficulty'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc') }}>
              Difficulty
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSortBy('successRate'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc') }}>
              Success Rate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProblems.map((problem) => (
          <Card key={problem.id} className="hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="link">{problem.title}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="font-normal text-sm">{problem.hint}</p>
                  </PopoverContent>
                </Popover>
                <Badge className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
              </CardTitle>
              <CardDescription>{problem.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {problem.timeEstimate}
                </div>
                <div className="flex items-center">
                  <BarChart className="w-4 h-4 mr-1" />
                  {problem.successRate}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {problem.difficulty}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <Button onClick={() => handleProblemClick(problem)} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 shadow-lg">
                Solve Challenge <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CodingChallengePlatform