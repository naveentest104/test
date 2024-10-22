'use client'

import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { FileUp, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function SummaryPage() {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  const handleGenerateSummary = () => {
    if (file) {
      setLoading(true)
      // Simulate AI summary generation with a timeout
      setTimeout(() => {
        setSummary(`This is an AI-generated summary for "${file.name}". The summary provides key insights and highlights from the book's content.`)
        setLoading(false)
      }, 2000)  // Simulated 2-second delay
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex items-center justify-center">
      <Card className="shadow-2xl w-full max-w-2xl bg-white rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-blue-600 text-center">AI Book Summary Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2 justify-center">
            <FileUp className="text-blue-500 w-6 h-6" />
            <label htmlFor="file-upload" className="block">
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700 transition-colors duration-300 ease-in-out"
                aria-label="Upload PDF file"
              />
            </label>
          </div>
          {file && <p className="text-sm text-blue-600 text-center">Selected file: {file.name}</p>}

          <Button 
            onClick={handleGenerateSummary} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-transform transform hover:scale-105"
            disabled={!file || loading}
            aria-label="Generate summary"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" /> Generating Summary...
              </span>
            ) : (
              'Generate Summary'
            )}
          </Button>

          {summary && (
            <Textarea
              value={summary}
              readOnly
              className="h-40 mt-4 border border-blue-200 rounded-lg p-4 text-gray-700"
              aria-label="Generated summary"
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/ai" className="w-full">
            <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 transition-transform transform hover:scale-105">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
