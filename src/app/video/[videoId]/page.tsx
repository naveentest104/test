"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Update the import path
import { Editor } from '@tinymce/tinymce-react'; // Use TinyMCE as a rich text editor

// Simulate fetching video data from an API or database
async function getVideoData(videoId: string) {
  // In a real scenario, replace this with a fetch call to an API
  return {
    title: `Video Lesson ${videoId}`,
    description: `This video covers important topics related to ${videoId}. Watch, take quizzes, and add your own notes.`,
    videoUrl: `/videos/sample-video.mp4`, // Add your video URL here
    quiz: {
      questions: [
        { id: 1, question: 'What is the main concept discussed in this video?', options: ['A', 'B', 'C', 'D'], correct: 'B' },
        { id: 2, question: 'Which of the following is an example of X?', options: ['A', 'B', 'C', 'D'], correct: 'C' }
      ]
    },
    notes: "",
    textExplanation: "Here is a deeper explanation of the video content, including key points and references."
  };
}

const VideoPage = () => {
  const { videoId } = useParams(); // Fetch videoId from the URL
  const [videoData, setVideoData] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getVideoData(videoId);
      setVideoData(data);
      setNotes(data.notes);
    }
    fetchData();
  }, [videoId]);

  const handleNoteChange = (content: string) => {
    setNotes(content);
  };

  const handleSaveNotes = () => {
    // Logic to save notes goes here (e.g., API call to save notes)
    console.log("Notes saved:", notes);
  };

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Video Section */}
      <section className="mb-8">
        <div className="relative">
          <video
            className="w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
            controls
            src={videoData.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
          <div className="mt-4">
            <h1 className="text-3xl font-bold">{videoData.title}</h1>
            <p className="text-gray-600">{videoData.description}</p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <Tabs defaultValue="notes">
        <TabsList>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="ai-explanation">AI Explanation</TabsTrigger>
        </TabsList>

        <TabsContent value="notes">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Your Notes</h2>
            <Editor
              initialValue={notes}
              onEditorChange={handleNoteChange}
              apiKey="YOUR_TINYMCE_API_KEY" // Replace with your TinyMCE API key
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
            <Button onClick={handleSaveNotes} className="mt-2">Save Notes</Button>
          </div>
        </TabsContent>

        <TabsContent value="quiz">
          <h2 className="text-2xl font-bold mb-4">Quiz for this Video</h2>
          <div className="space-y-6">
            {videoData.quiz.questions.map((question) => (
              <div key={question.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="font-bold">{question.question}</h3>
                <ul className="space-y-2 mt-2">
                  {question.options.map((option, index) => (
                    <li key={index}>
                      <Button variant="ghost">{option}</Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-explanation">
          <h2 className="text-2xl font-bold mb-4">AI Explanation</h2>
          <div className="prose max-w-none bg-gray-100 p-6 rounded-lg shadow-lg">
            {videoData.textExplanation}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoPage;
