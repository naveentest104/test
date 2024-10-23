import { Book, Brain, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import FeatureCard from "./FeatureCard";

export default function HomePage() {
  const features = [
    { id: 'summary', title: 'Book Summary', description: 'Generate summaries from PDF books', icon: Book, link: '/ai/summary' },
    { id: 'quiz', title: 'Quiz Generator', description: 'Create quizzes from educational content', icon: Brain, link: 'ai//quiz' },
    { id: 'explain', title: 'Concept Explainer', description: 'Get AI explanations for complex topics', icon: Lightbulb, link: '/explain' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-12">AI-Powered Education Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link href={feature.link} key={feature.id}>
            <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
}
