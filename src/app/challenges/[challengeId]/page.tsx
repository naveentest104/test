"use client";

import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Editor } from "@monaco-editor/react"; // Using Monaco Editor for coding playground
import { cn } from "../../lib/utils"; // Your utility for classnames

// Simulate fetching coding challenge data from an API or database
async function getChallengeData(challengeId: string) {
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

const CodingChallengePage = ({ params }) => {
  const { challengeId } = params; // Fetch challengeId from the URL
  const [challengeData, setChallengeData] = useState(null);
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");
  const [testCases, setTestCases] = useState([""]);
  const [language, setLanguage] = useState("javascript"); // Default language

  useEffect(() => {
    async function fetchData() {
      const data = await getChallengeData(challengeId);
      setChallengeData(data);
    }
    fetchData();
  }, [challengeId]);

  const runCode = async () => {
    // Depending on the selected language, run the corresponding code
    try {
      let results;

      if (language === "javascript") {
        // Evaluate JavaScript code
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
        // Simulated response for Python code execution
        results = await runPythonCode(testCases);
      } else if (language === "java") {
        // Simulated response for Java code execution
        results = await runJavaCode(testCases);
      }

      setOutput(JSON.stringify(results));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const runPythonCode = async (testCases) => {
    // Simulate running Python code (replace with actual API call)
    return testCases.map(test => {
      const num = parseInt(test);
      if (num % 15 === 0) return "FizzBuzz";
      if (num % 3 === 0) return "Fizz";
      if (num % 5 === 0) return "Buzz";
      return num;
    });
  };

  const runJavaCode = async (testCases) => {
    // Simulate running Java code (replace with actual API call)
    return testCases.map(test => {
      const num = parseInt(test);
      if (num % 15 === 0) return "FizzBuzz";
      if (num % 3 === 0) return "Fizz";
      if (num % 5 === 0) return "Buzz";
      return num;
    });
  };

  const addTestCase = () => {
    setTestCases([...testCases, ""]); // Add a new empty test case
  };

  const handleTestCaseChange = (index, value) => {
    const newTestCases = [...testCases];
    newTestCases[index] = value;
    setTestCases(newTestCases);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode("// Write your code here..."); // Reset code on language change
    setOutput(""); // Clear output on language change
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
          onChange={(value) => setCode(value)}
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
};

export default CodingChallengePage;
