"use client"
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Simulate fetching category data from an API or database
async function getCategoryData(category: string) {
  // In a real scenario, replace this with a fetch call to an API
  return {
    title: category,
    description: `Explore the world of ${category} with curated topics and quizzes.`,
    learningContent: [
      { id: '1', title: `${category} Topic 1`, description: 'Introduction to key concepts', type: 'video' },
      { id: '2', title: `${category} Topic 2`, description: 'Advanced theories and applications', type: 'article' },
    ],
    quizTopics: [
      { id: '1', title: `${category} Quiz 1`, difficulty: 'easy' },
      { id: '2', title: `${category} Quiz 2`, difficulty: 'medium' },
    ],
  };
}

const CategoryPage = async () => {
  const { category } = useParams();  // Fetch category from the URL
  const categoryData = await getCategoryData(category);  // Fetch data for the category

  return (
    <div className="container mx-auto p-4">
      {/* Dynamic Banner and Title */}
      <div className="bg-blue-500 rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-bold text-white capitalize">{category}</h1>
        <p className="text-white mt-2">{categoryData.description}</p>
      </div>

      {/* Learning Content Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Learning Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryData.learningContent.map((content) => (
            <div
              key={content.id}
              className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="font-bold text-xl">{content.title}</h3>
              <p className="text-sm text-gray-500">{content.description}</p>
              <p className="text-sm text-gray-500 capitalize">{content.type}</p>
              <Link href={`/content/${content.id}`}>
                <Button variant="default" className="mt-4">View {content.type}</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz Topics Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Quiz Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryData.quizTopics.map((quiz) => (
            <div
              key={quiz.id}
              className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="font-bold text-xl">{quiz.title}</h3>
              <p className="text-sm text-gray-500 capitalize">Difficulty: {quiz.difficulty}</p>
              <Link href={`/quiz/${quiz.id}`}>
                <Button variant="default" className="mt-4">Take Quiz</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
