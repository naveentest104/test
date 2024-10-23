import { Card, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button"
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen">
      <Card className="bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-blue-700 text-2xl">Quiz Generator</CardTitle>
        </CardHeader>
        <CardFooter>
          <Link href="/ai">
            <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
              <ArrowLeft className="mr-2" /> Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
