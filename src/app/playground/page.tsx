"use client"

import React, { useState } from 'react';
import { Play, RotateCcw, Save, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Playground = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('dark');

  const runCode = () => {
    try {
      // This is a simple evaluation. In a real-world scenario, you'd want to use a more secure method.
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const resetCode = () => {
    setCode('// Write your code here');
    setOutput('');
  };

  const saveCode = () => {
    // In a real app, you'd implement actual saving functionality here
    console.log('Code saved:', code);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className="p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Coding Playground</h1>
          <p className="text-sm text-gray-400">Test your code, solve challenges, and learn by doing.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="font-semibold">User:</span> John Doe
          </div>
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <Tabs defaultValue="javascript" className="w-full">
          <TabsList>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="html" disabled>HTML</TabsTrigger>
            <TabsTrigger value="css" disabled>CSS</TabsTrigger>
          </TabsList>
          <TabsContent value="javascript" className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 bg-gray-800 text-white font-mono text-sm"
                placeholder="Write your code here..."
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex space-x-4">
          <Button onClick={runCode} className="bg-green-500 hover:bg-green-600 text-white">
            <Play className="mr-2 h-4 w-4" /> Run
          </Button>
          <Button onClick={resetCode} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button onClick={saveCode} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>

        <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-xl font-semibold mb-2">Console Output</h2>
          <pre className={`p-2 rounded ${theme === 'dark' ? 'bg-black' : 'bg-white'} ${output.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {output || 'Run your code to see the output here.'}
          </pre>
        </div>
      </main>

      <footer className="mt-8 p-6 text-center text-sm text-gray-500">
        <div className="mb-2">
          <a href="#" className="hover:underline">Documentation</a> | 
          <a href="#" className="hover:underline ml-2">Keyboard Shortcuts</a>
        </div>
        <div>© 2023 EduHub Coding Playground. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Playground;