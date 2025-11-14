
import React, { useState } from 'react';
import { ModuleContent } from '../types';
import { summarizeContent, analyzeCaseStudy } from '../services/geminiService';

interface GeminiAnalysisProps {
  moduleContent: ModuleContent;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
    </div>
);

const GeminiAnalysis: React.FC<GeminiAnalysisProps> = ({ moduleContent }) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [userCase, setUserCase] = useState('');

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary('');
    const result = await summarizeContent(moduleContent);
    setSummary(result);
    setIsSummarizing(false);
  };

  const handleAnalyze = async () => {
    if (!userCase.trim()) return;
    setIsAnalyzing(true);
    setAnalysis('');
    const result = await analyzeCaseStudy(userCase, moduleContent);
    setAnalysis(result);
    setIsAnalyzing(false);
  };
  
  // A simple markdown to HTML converter for Gemini's response
  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map(line => line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
      )
      .map((line, index) => <p key={index} className="mb-2">{line}</p>);
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <h4 className="font-bold text-lg flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 1-3.09-3.09L2.25 9l2.846-.813a4.5 4.5 0 0 1 3.09-3.09L9 2.25l.813 2.846a4.5 4.5 0 0 1 3.09 3.09L15.75 9l-2.846.813a4.5 4.5 0 0 1-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.898 20.575 16.5 21.75l-.398-1.175a3.375 3.375 0 0 0-2.456-2.456L12.75 18l1.175-.398a3.375 3.375 0 0 0 2.456-2.456L16.5 14.25l.398 1.175a3.375 3.375 0 0 0 2.456 2.456L20.25 18l-1.175.398a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>
          Outils d'Analyse IA (Gemini)
        </h4>

        {/* Summarizer */}
        <div className="mt-4">
          <button onClick={handleSummarize} disabled={isSummarizing} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-slate-500">
            {isSummarizing ? "Génération..." : "Résumer ce module avec l'IA"}
          </button>
          {isSummarizing && <div className="mt-2"><LoadingSpinner /></div>}
          {summary && (
            <div className="mt-4 p-3 bg-slate-700 rounded-lg text-sm">{renderMarkdown(summary)}</div>
          )}
        </div>

        {/* Case Study Analyzer */}
        <div className="mt-6 pt-4 border-t border-slate-700">
            <h5 className="font-semibold">Analyser votre propre étude de cas</h5>
            <p className="text-sm text-slate-400 mt-1">Décrivez un scénario ou une transaction, et l'IA identifiera les 'red flags' potentiels en se basant sur ce module.</p>
            <textarea
                value={userCase}
                onChange={(e) => setUserCase(e.target.value)}
                placeholder="Ex: Un client ouvre un compte et dépose 9500€ en espèces chaque semaine..."
                className="w-full mt-2 p-2 rounded-lg bg-slate-800 text-white border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={4}
            />
            <button onClick={handleAnalyze} disabled={isAnalyzing || !userCase} className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-slate-500">
                {isAnalyzing ? "Analyse en cours..." : "Analyser avec l'IA"}
            </button>
            {isAnalyzing && <div className="mt-2"><LoadingSpinner /></div>}
            {analysis && (
                <div className="mt-4 p-3 bg-slate-700 rounded-lg text-sm">{renderMarkdown(analysis)}</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GeminiAnalysis;
