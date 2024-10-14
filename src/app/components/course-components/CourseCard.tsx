// src/components/CourseCard.tsx
import { useState } from 'react'
import { Star, Clock, DollarSign, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import EnrollmentModal from './enrollment-modal' // Adjust the import path

const CourseCard = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Badge variant="secondary">{course.level}</Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{course.rating}</span>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <Clock className="h-4 w-4 mr-2" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          <span className="text-lg font-bold">${course.price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => setIsModalOpen(true)}>
          Enroll Now
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
      
      {/* Enrollment Modal */}
      {isModalOpen && (
        <EnrollmentModal course={course} onClose={() => setIsModalOpen(false)} />
      )}
    </Card>
  )
}

export default CourseCard
