// // app/components/InterviewQuestions.tsx
// 'use client';

// import React, { useState } from 'react';

// interface Problem {
//     title: string;
//     topic: string;
//     difficulty: 'Easy' | 'Medium' | 'Hard'; // Assuming difficulty has specific values
//     time: string;
//     companies: string[];
//     id: number;
// }

// const problemsData: Problem[] = [
//     { title: "Gas Station", topic: "Greedy Algorithm", difficulty: "Medium", time: "56 Mins", companies: ["Google"], id: 1 },
//     { title: "Majority Element", topic: "Greedy Algorithm", difficulty: "Easy", time: "19 Mins", companies: ["Windows", "Y Combinator", "Google"], id: 2 },
//     { title: "Distribute Candy", topic: "Greedy Algorithm", difficulty: "Medium", time: "65 Mins", companies: ["Windows", "Y Combinator", "Amazon"], id: 3 },
//     { title: "Longest Increasing Subsequence", topic: "Dynamic Programming", difficulty: "Easy", time: "30 Mins", companies: ["Facebook", "Y Combinator"], id: 4 },
//     { title: "Unique Binary Search Trees", topic: "Dynamic Programming", difficulty: "Easy", time: "61 Mins", companies: ["Amazon"], id: 5 },
// ];

// const InterviewQuestions: React.FC = () => {
//     const [filteredProblems, setFilteredProblems] = useState<Problem[]>(problemsData);
//     const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
//     const [modalOpen, setModalOpen] = useState<boolean>(false);

//     const handleProblemClick = (problem: Problem) => {
//         setSelectedProblem(problem);
//         setModalOpen(true);
//     };

//     const handleRandomProblem = () => {
//         const randomIndex = Math.floor(Math.random() * problemsData.length);
//         handleProblemClick(problemsData[randomIndex]);
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//         setSelectedProblem(null);
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <h1 className="text-2xl font-semibold mb-4">Top Coding Interview Questions</h1>
//             <div className="relative mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search for problems or keywords"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//                 <div className="absolute right-2 top-2 text-gray-400">
//                     <i className="fas fa-search"></i>
//                 </div>
//             </div>
//             <div className="flex justify-between mb-4">
//                 <button className="bg-white border border-gray-300 rounded-md px-4 py-2">Difficulty <i className="fas fa-chevron-down"></i></button>
//                 <button className="bg-white border border-gray-300 rounded-md px-4 py-2">Status <i className="fas fa-chevron-down"></i></button>
//                 <button className="bg-white border border-gray-300 rounded-md px-4 py-2">Topics <i className="fas fa-chevron-down"></i></button>
//                 <button className="bg-white border border-gray-300 rounded-md px-4 py-2">Companies <i className="fas fa-chevron-down"></i></button>
//                 <button className="bg-white border border-gray-300 rounded-md px-4 py-2">Sort By <i className="fas fa-chevron-down"></i></button>
//                 <button className="bg-teal-500 text-white rounded-md px-4 py-2" onClick={handleRandomProblem}>Pick Random</button>
//             </div>
//             {filteredProblems.map((problem) => (
//                 <div
//                     key={problem.id}
//                     className="bg-white shadow-md rounded-md mb-4 p-4 cursor-pointer hover:bg-gray-100"
//                     onClick={() => handleProblemClick(problem)}
//                 >
//                     <div className="flex justify-between items-center mb-2">
//                         <span className="text-blue-600">{problem.title}</span>
//                         <div className="flex items-center">
//                             <span className="bg-gray-100 text-gray-600 rounded-md px-2 py-1 text-sm mr-2">{problem.topic}</span>
//                             <span className={`bg-${problem.difficulty === 'Easy' ? 'green' : 'yellow'}-100 text-${problem.difficulty === 'Easy' ? 'green' : 'yellow'}-600 rounded-md px-2 py-1 text-sm`}>{problem.difficulty}</span>
//                         </div>
//                     </div>
//                     <div className="flex justify-between items-center">
//                         <span className="text-gray-500">{problem.time}</span>
//                         <div className="flex items-center">
//                             {problem.companies.map((company, index) => (
//                                 <i key={index} className={`fab fa-${company.toLowerCase().replace(' ', '-')} text-gray-500 mr-2`}></i>
//                             ))}
//                             <a href="#" className="text-blue-600">Solve</a>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//             <div className="flex justify-center mt-4">
//                 <button className="bg-white border border-teal-500 text-teal-500 rounded-md px-4 py-2">View All Problems</button>
//             </div>

//             {modalOpen && selectedProblem && (
//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white rounded-md p-4 max-w-lg w-full">
//                         <h2 className="text-xl font-semibold mb-2">{selectedProblem.title}</h2>
//                         <p><strong>Topic:</strong> {selectedProblem.topic}</p>
//                         <p><strong>Difficulty:</strong> {selectedProblem.difficulty}</p>
//                         <p><strong>Time to Solve:</strong> {selectedProblem.time}</p>
//                         <p><strong>Companies:</strong> {selectedProblem.companies.join(", ")}</p>
//                         <div className="flex justify-end mt-4">
//                             <button className="bg-teal-500 text-white rounded-md px-4 py-2" onClick={closeModal}>Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default InterviewQuestions;
