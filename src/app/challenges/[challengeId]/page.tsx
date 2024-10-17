"use client";

import { useEffect, useState } from "react";
import { Button } from '@/app/components/ui/button';
import { Editor } from "@monaco-editor/react";

interface ChallengeData {
  title: string;
  description: string;
  examples: { input: string; output: string }[];
}

async function getChallengeData(challengeId: string): Promise<ChallengeData> {
  return {
    title: `Challenge ${challengeId}: FizzBuzz`,
    description: `Write a program that prints the numbers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".`,
    examples: [
      { input: "15", output: "FizzBuzz" },
      { input: "3", output: "Fizz" },
      { input: "5", output: "Buzz" },
    ],
  };
}

interface CodingChallengePageProps {
  params: { challengeId: string };
}

export default function CodingChallengePage({ params }: CodingChallengePageProps) {
  const { challengeId } = params;
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
  const [code, setCode] = useState<string>("// Write your code here...");
  const [output, setOutput] = useState<string>("");
  const [testCases, setTestCases] = useState<string[]>([""]);
  const [language, setLanguage] = useState<"javascript" | "python" | "java">("javascript");

  useEffect(() => {
    async function fetchData() {
      const data = await getChallengeData(challengeId);
      setChallengeData(data);
    }
    fetchData();
  }, [challengeId]);

  const runCode = async () => {
    try {
      let results: (string | number)[];

      if (language === "javascript") {
        const testFunction = new Function("testCases", `
          return testCases.map(test => {
            const num = parseInt(test);
            if (num % 15 === 0) return "FizzBuzz";
            if (num % 3 === 0) return "Fizz";
            if (num % 5 === 0) return "Buzz";
            return num;
          });
        `);
        results = testFunction(testCases);
      } else if (language === "python") {
        results = await runPythonCode(testCases);
      } else {
        results = await runJavaCode(testCases);
      }

      setOutput(JSON.stringify(results));
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput("An unknown error occurred");
      }
    }
  };

  const runPythonCode = async (testCases: string[]): Promise<(string | number)[]> => {
    return testCases.map(test => {
      const num = parseInt(test);
      if (num % 15 === 0) return "FizzBuzz";
      if (num % 3 === 0) return "Fizz";
      if (num % 5 === 0) return "Buzz";
      return num;
    });
  };

  const runJavaCode = async (testCases: string[]): Promise<(string | number)[]> => {
    return testCases.map(test => {
      const num = parseInt(test);
      if (num % 15 === 0) return "FizzBuzz";
      if (num % 3 === 0) return "Fizz";
      if (num % 5 === 0) return "Buzz";
      return num;
    });
  };

  const addTestCase = () => {
    setTestCases([...testCases, ""]);
  };

  const handleTestCaseChange = (index: number, value: string) => {
    const newTestCases = [...testCases];
    newTestCases[index] = value;
    setTestCases(newTestCases);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as "javascript" | "python" | "java");
    setCode("// Write your code here...");
    setOutput("");
  };

  if (!challengeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
      {/* Left Column - Challenge Details */}
      <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">{challengeData.title}</h1>
        <p className="mb-4">{challengeData.description}</p>
        <h2 className="text-2xl font-bold mb-2">Examples</h2>
        <ul className="list-disc pl-5">
          {challengeData.examples.map((example, index) => (
            <li key={index}>
              Input: {example.input}, Output: {example.output}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column - Code Playground */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Code Playground</h2>

        {/* Language Selection Dropdown */}
        <select 
          value={language} 
          onChange={handleLanguageChange} 
          className="mb-4 border rounded-lg p-2"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <Editor
          height="300px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
          }}
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Test Cases</h3>
          {testCases.map((testCase, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={testCase}
                onChange={(e) => handleTestCaseChange(index, e.target.value)}
                placeholder="Enter a number"
                className="border rounded-lg p-2 mr-2"
              />
            </div>
          ))}
          <Button onClick={addTestCase} className="mr-2">
            Add Test Case
          </Button>
          <Button onClick={runCode}>Run Code</Button>
        </div>
        <h3 className="mt-4 text-lg font-semibold">Output</h3>
        <div className="border p-2 rounded-lg bg-gray-100">
          {output}
        </div>
      </div>
    </div>
  );
}