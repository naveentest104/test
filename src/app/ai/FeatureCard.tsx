import { Card, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { FC } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: FC<{ className?: string }>; // Specify the type of the icon
}

export default function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-2xl transition-shadow bg-white hover:bg-blue-100 rounded-lg p-6 text-center border border-blue-200">
      <CardHeader>
        <Icon className="w-12 h-12 mb-4 text-blue-600 mx-auto" />
        <CardTitle className="text-blue-700 text-xl">{title}</CardTitle>
        <CardDescription className="text-blue-500">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
