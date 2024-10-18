
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Play, RotateCcw, Save, Sun, Moon, Code, Settings } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Toaster } from "@/app/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Dynamically import the Editor component with SSR disabled
const Editor = dynamic(
  () => import('@monaco-editor/react').then((mod) => mod.default),
  { ssr: false }
);

const Playground: React.FC = () => {
  const [code, setCode] = useState('// Write your code here...');
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState<'vs-dark' | 'vs-light'>('vs-dark');
  const [language, setLanguage] = useState<'javascript' | 'typescript' | 'python'>('javascript');
  const [fontSize, setFontSize] = useState(14);
  const { toast } = useToast();

  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem('playgroundCode');
      if (savedCode) {
        setCode(savedCode);
      }
    }
  }, []);

  const runCode = () => {
    try {
      const logs: string[] = [];
      const originalLog = console.log;

      console.log = (...args: unknown[]) => {
        logs.push(args.map(arg => JSON.stringify(arg)).join(' '));
      };

      // Use Function constructor instead of eval for better security
      const result = new Function(code)();

      console.log = originalLog;
      setOutput(logs.join('\n') + (result !== undefined ? `\nResult: ${String(result)}` : ''));
      
      toast({
        title: "Code executed successfully",
        description: "Check the output below",
      });
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
        toast({
          title: "Error executing code",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setOutput("An unknown error occurred");
        toast({
          title: "Error executing code",
          description: "An unknown error occurred",
          variant: "destructive",
        });
      }
    }
  };

  const resetCode = () => {
    setCode('// Write your code here...');
    setOutput('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('playgroundCode');
    }
    toast({
      title: "Code reset",
      description: "The editor has been reset to default",
    });
  };

  const saveCode = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('playgroundCode', code);
    }
    toast({
      title: "Code saved",
      description: "Your code has been saved locally",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'vs-light' ? 'vs-dark' : 'vs-light');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'vs-dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className="p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Advanced Coding Playground</h1>
          <p className="text-sm text-gray-400">Test your code, solve challenges, and learn by doing.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select onValueChange={(value: 'javascript' | 'typescript' | 'python') => setLanguage(value)} defaultValue={language}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setFontSize(Number(value))} defaultValue={fontSize.toString()}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Font Size" />
            </SelectTrigger>
            <SelectContent>
              {[12, 14, 16, 18, 20].map((size) => (
                <SelectItem key={size} value={size.toString()}>{size}px</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === 'vs-dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6 flex flex-col">
        <Tabs defaultValue="code" className="flex-grow flex flex-col">
          <TabsList>
            <TabsTrigger value="code"><Code className="mr-2 h-4 w-4" /> Code</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="mr-2 h-4 w-4" /> Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="mt-4 flex-grow flex flex-col">
            <div className="border rounded-lg overflow-hidden flex-grow">
              <Editor
                height="70vh"
                language={language}
                theme={theme}
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  fontSize: fontSize,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <div className={cn("p-4 rounded-lg", theme === 'vs-dark' ? 'bg-gray-800' : 'bg-gray-100')}>
              <h2 className="text-xl font-semibold mb-4">Editor Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Theme</label>
                  <Select onValueChange={(value: 'vs-dark' | 'vs-light') => setTheme(value)} defaultValue={theme}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vs-dark">Dark</SelectItem>
                      <SelectItem value="vs-light">Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Language</label>
                  <Select onValueChange={(value: 'javascript' | 'typescript' | 'python') => setLanguage(value)} defaultValue={language}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Font Size</label>
                  <Select onValueChange={(value) => setFontSize(Number(value))} defaultValue={fontSize.toString()}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Font Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {[12, 14, 16, 18, 20].map((size) => (
                        <SelectItem key={size} value={size.toString()}>{size}px</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
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

        <div className={cn("mt-4 p-4 rounded-lg", theme === 'vs-dark' ? 'bg-gray-800' : 'bg-gray-100')}>
          <h2 className="text-xl font-semibold mb-2">Output</h2>
          <pre className={cn("p-2 rounded", theme === 'vs-dark' ? 'bg-black' : 'bg-white', output.startsWith('Error') ? 'text-red-500' : 'text-green-500')}>
            {output || 'Run your code to see the output here.'}
          </pre>
        </div>
      </main>

      <footer className="mt-8 p-6 text-center text-sm text-gray-500">
        <div className="mb-2">
          <a href="#" className="hover:underline">Documentation</a> | 
          <a href="#" className="hover:underline ml-2">Keyboard Shortcuts</a>
        </div>
        <div>© 2023 Advanced Coding Playground. All rights reserved.</div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Playground;