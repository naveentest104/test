"use client"
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Simulate fetching topic data from an API or database
async function getTopicData(topicId: string) {
  // In a real scenario, replace this with a fetch call to an API
  return {
    title: `Topic ${topicId}`,
    description: `Learn all about ${topicId}. This topic includes video lessons, coding challenges, and more.`,
    videos: [
      {
        id: '101',
        title: `Introduction to ${topicId}`,
        duration: '10:35',
        thumbnail: '/images/video1.jpg', // Adding thumbnail
      },
      {
        id: '102',
        title: `Advanced Concepts in ${topicId}`,
        duration: '18:20',
        thumbnail: '/images/video2.jpg', // Adding thumbnail
      },
    ],
    challenges: [
      {
        id: '201',
        title: `${topicId} Challenge 1`,
        difficulty: 'medium',
        thumbnail: '/images/challenge1.jpg', // Adding thumbnail
      },
    ],
    discussions: [
      { id: '301', user: 'John Doe', comment: `I found this topic really helpful!` },
      { id: '302', user: 'Jane Smith', comment: `Can someone explain the concept of XYZ further?` },
    ],
  };
}

const TopicPage = async () => {
  const { topicId } = useParams();  // Fetch topicId from the URL
  const topicData = await getTopicData(topicId);  // Fetch data for the topic

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
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded-lg mb-4" />
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
                <img src={challenge.thumbnail} alt={challenge.title} className="w-full h-48 object-cover rounded-lg mb-4" />
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
};

export default TopicPage;
