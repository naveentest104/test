"use client"

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
}

interface Challenge {
  id: string;
  title: string;
  difficulty: string;
  thumbnail: string;
}

interface Discussion {
  id: string;
  user: string;
  comment: string;
}

interface TopicData {
  title: string;
  description: string;
  videos: Video[];
  challenges: Challenge[];
  discussions: Discussion[];
}

async function getTopicData(topicId: string): Promise<TopicData> {
  // In a real scenario, replace this with a fetch call to an API
  return {
    title: `Topic ${topicId}`,
    description: `Learn all about ${topicId}. This topic includes video lessons, coding challenges, and more.`,
    videos: [
      {
        id: '101',
        title: `Introduction to ${topicId}`,
        duration: '10:35',
        thumbnail: '/images/video1.jpg',
      },
      {
        id: '102',
        title: `Advanced Concepts in ${topicId}`,
        duration: '18:20',
        thumbnail: '/images/video2.jpg',
      },
    ],
    challenges: [
      {
        id: '201',
        title: `${topicId} Challenge 1`,
        difficulty: 'medium',
        thumbnail: '/images/challenge1.jpg',
      },
    ],
    discussions: [
      { id: '301', user: 'John Doe', comment: `I found this topic really helpful!` },
      { id: '302', user: 'Jane Smith', comment: `Can someone explain the concept of XYZ further?` },
    ],
  };
}

export default function TopicPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const [topicData, setTopicData] = useState<TopicData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getTopicData(topicId);
      setTopicData(data);
    }
    fetchData();
  }, [topicId]);

  if (!topicData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Topic Header */}
      <div className="bg-indigo-500 rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-bold text-white capitalize">{topicData.title}</h1>
        <p className="text-white mt-2">{topicData.description}</p>
      </div>

      {/* Videos Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topicData.videos.map((video) => (
            <div
              key={video.id}
              className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              {/* Video Thumbnail */}
              <Image src={video.thumbnail} alt={video.title} width={400} height={225} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="font-bold text-xl">{video.title}</h3>
              <p className="text-sm text-gray-500">Duration: {video.duration}</p>
              <Link href={`/video/${video.id}`}>
                <Button variant="default" className="mt-4">Watch Video</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Challenges Section */}
      {topicData.challenges.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Interactive Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topicData.challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                {/* Challenge Thumbnail */}
                <Image src={challenge.thumbnail} alt={challenge.title} width={400} height={225} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="font-bold text-xl">{challenge.title}</h3>
                <p className="text-sm text-gray-500 capitalize">Difficulty: {challenge.difficulty}</p>
                <Link href={`/challenge/${challenge.id}`}>
                  <Button variant="default" className="mt-4">Start Challenge</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Discussion Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Discussion</h2>
        <div className="space-y-4">
          {topicData.discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="border border-gray-300 p-4 rounded-lg shadow-lg"
            >
              <h4 className="font-bold text-lg">{discussion.user}</h4>
              <p className="text-gray-700">{discussion.comment}</p>
            </div>
          ))}
          {/* Link to full discussion page */}
          <Link href={`/discussion/${topicId}`}>
            <Button variant="default" className="mt-4">Join Discussion</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
