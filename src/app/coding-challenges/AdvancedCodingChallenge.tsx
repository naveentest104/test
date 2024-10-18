import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { Play, RotateCcw, Save, Sun, Moon, Code, Settings } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Toaster } from "@/app/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Editor = dynamic(() => import('@monaco-editor/react').then((mod) => mod.default), { ssr: false });

type SampleInput = {
    input: string;
    output: string;
};

type Problem = {
    title: string;
    description: string;
    hint: string;
    sampleInputs: SampleInput[];
};

const AdvancedCodingChallenge: React.FC<{ problem: Problem }> = ({ problem }) => {
    const [code, setCode] = useState<string>('// Write your solution here...');
    const [output, setOutput] = useState<string>('');
    const [theme, setTheme] = useState<'vs-dark' | 'vs-light'>('vs-dark');
    const [language, setLanguage] = useState<'javascript' | 'typescript' | 'python'>('javascript');
    const [fontSize, setFontSize] = useState<number>(14);
    const [timer, setTimer] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [showHint, setShowHint] = useState<boolean>(false);
    const { toast } = useToast();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        const savedCode = localStorage.getItem('challengeCode');
        if (savedCode) {
            setCode(savedCode);
        }
    }, []);

    const runCode = () => {
        try {
            setIsRunning(true);
            setOutput('Running code...');
            const logs: string[] = [];
            const originalLog = console.log;

            console.log = (...args: unknown[]) => {
                logs.push(args.map(arg => JSON.stringify(arg)).join(' '));
            };

            const result = new Function(code)(); // Use Function constructor for better security

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
        } finally {
            setIsRunning(false);
        }
    };

    const resetCode = () => {
        setCode('// Write your solution here...');
        setOutput('');
        localStorage.removeItem('challengeCode');
        toast({
            title: "Code reset",
            description: "The editor has been reset to default",
        });
    };

    const saveCode = () => {
        localStorage.setItem('challengeCode', code);
        toast({
            title: "Code saved",
            description: "Your code has been saved locally",
        });
    };

    const toggleTheme = () => {
        setTheme(theme === 'vs-light' ? 'vs-dark' : 'vs-light');
    };

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === 'vs-dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <Head>
                <title>{problem.title} - Advanced Coding Challenge</title>
                <meta name="description" content="Advanced coding challenge playground" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="p-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
                    <p className="text-sm text-gray-400">Solve the challenge and test your coding skills!</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Select onValueChange={(value) => setLanguage(value as 'javascript' | 'typescript' | 'python')} defaultValue={language}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={toggleTheme} variant="outline" size="icon">
                        {theme === 'vs-dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                    <div className="text-lg font-semibold">Time: {formatTime(timer)}</div>
                </div>
            </header>

            <main className="flex-grow container mx-auto p-6 flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Problem Description</h2>
                        <div className={cn("bg-gray-100 p-4 rounded-lg mb-4", theme === 'vs-dark' ? 'bg-gray-800' : 'bg-gray-100')}>
                            <ReactMarkdown>{problem.description}</ReactMarkdown>
                        </div>

                        <h2 className="text-xl font-semibold mb-2">Sample Inputs</h2>
                        <div className="space-y-2 mb-4">
                            {problem.sampleInputs.map((sample, index) => (
                                <div key={index} className={cn("p-2 rounded", theme === 'vs-dark' ? 'bg-gray-800' : 'bg-gray-100')}>
                                    <p><strong>Input:</strong> {sample.input}</p>
                                    <p><strong>Expected Output:</strong> {sample.output}</p>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => setShowHint(!showHint)}
                            variant="outline"
                            className="mb-4"
                        >
                            {showHint ? 'Hide Hint' : 'Show Hint'}
                        </Button>
                        {showHint && (
                            <div className={cn("mt-2 p-2 rounded", theme === 'vs-dark' ? 'bg-gray-800' : 'bg-yellow-100')}>
                                <p><strong>Hint:</strong> {problem.hint}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <Tabs defaultValue="code" className="flex-grow flex flex-col">
                            <TabsList>
                                <TabsTrigger value="code"><Code className="mr-2 h-4 w-4" /> Code</TabsTrigger>
                                <TabsTrigger value="settings"><Settings className="mr-2 h-4 w-4" /> Settings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="code" className="flex-grow flex flex-col">
                                <div className="border rounded-lg overflow-hidden flex-grow">
                                    <Editor
                                        height="50vh"
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
                            <TabsContent value="settings">
                                <div className={cn("p-4 rounded-lg", theme === 'vs-dark' ? 'bg-gray-800' : 'bg-gray-100')}>
                                    <h2 className="text-xl font-semibold mb-4">Editor Settings</h2>
                                    <div className="space-y-4">
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
                    </div>
                </div>
            </main>

            <footer className="mt-8 p-6 text-center text-sm text-gray-500">
                <div className="mb-2">
                    <a href="#" className="hover:underline">Documentation</a> | 
                    <a href="#" className="hover:underline ml-2">Keyboard Shortcuts</a>
                </div>
                <div>© 2023 Advanced Coding Challenge. All rights reserved.</div>
            </footer>
            <Toaster />
        </div>
    );
};

export default AdvancedCodingChallenge;
