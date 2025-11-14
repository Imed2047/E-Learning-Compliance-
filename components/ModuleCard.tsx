
import React from 'react';
import { Module, Progress } from '../types';
import Quiz from './Quiz';
import GeminiAnalysis from './GeminiAnalysis';

interface ModuleCardProps {
  module: Module;
  sectionId: string;
  progress?: Progress[string];
  onToggleComplete: () => void;
  onQuizComplete: (score: number, total: number) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
    const styles = {
        beginner: 'bg-green-100 text-green-800',
        intermediate: 'bg-yellow-100 text-yellow-800',
        expert: 'bg-red-100 text-red-800',
    };
    const text = {
        beginner: 'Débutant',
        intermediate: 'Intermédiaire',
        expert: 'Expert',
    }
    return (
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[difficulty] || 'bg-slate-100 text-slate-800'}`}>
            {text[difficulty] || difficulty}
        </span>
    );
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module, sectionId, progress, onToggleComplete, onQuizComplete, isExpanded, onToggleExpand }) => {
  const isCompleted = progress?.completed || false;
  const moduleId = `${sectionId}-${module.id}`;
  
  return (
    <div className={`border rounded-xl transition-all duration-300 ${isCompleted ? 'border-l-4 border-l-emerald-500 bg-emerald-50/50' : 'bg-white border-slate-200'} shadow-sm`}>
      <header
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={onToggleExpand}
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`module-content-${moduleId}`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
             {isCompleted && (
                 <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-white">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
                    </svg>
                 </div>
             )}
            <h3 className="text-lg font-bold text-slate-800 truncate">{module.title}</h3>
          </div>
          <div className="mt-1.5 flex items-center gap-4 text-sm text-slate-500">
            <DifficultyBadge difficulty={module.difficulty} />
            {module.duration && <span><span className="font-semibold">{module.duration}</span> min</span>}
             {progress?.quizScore !== undefined && (
                <span>Quiz: <span className="font-semibold">{progress.quizScore}/{progress.quizTotal}</span></span>
             )}
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <svg
            className={`w-6 h-6 text-slate-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </header>

      <div
        id={`module-content-${moduleId}`}
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px]' : 'max-h-0'}`}
      >
        <div className="p-4 border-t border-slate-200">
          <div className="prose prose-slate max-w-none">
            {module.objectives && (
              <>
                <h4>Objectifs</h4>
                <ul>{module.objectives.map((obj, i) => <li key={i}>{obj}</li>)}</ul>
              </>
            )}

            {module.content.case_study && (
              <>
                <h4>Étude de cas: {module.content.case_study.title}</h4>
                <p>{module.content.case_study.content}</p>
                {module.content.case_study.learning_points && (
                  <ul>{module.content.case_study.learning_points.map((p, i) => <li key={i}>{p}</li>)}</ul>
                )}
              </>
            )}

            {module.content.definitions && module.content.definitions.length > 0 && (
              <>
                <h4>Définitions Clés</h4>
                <dl>
                  {module.content.definitions.map((def, i) => (
                    <React.Fragment key={i}>
                      <dt className="font-semibold">{def.term}</dt>
                      <dd className="pl-4 mb-2">{def.definition} {def.reference && <em className="text-xs">({def.reference})</em>}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </>
            )}

            {module.content.red_flags && module.content.red_flags.length > 0 && (
              <>
                <h4>Red Flags</h4>
                {module.content.red_flags.map((flag, i) => (
                  <div key={i} className="my-2 p-3 border-l-4 border-red-400 bg-red-50 rounded-r-lg">
                    <p className="font-semibold text-red-800">{flag.description}</p>
                    {flag.examples && <ul>{flag.examples.map((ex, j) => <li key={j}>{ex}</li>)}</ul>}
                  </div>
                ))}
              </>
            )}
            
            <GeminiAnalysis moduleContent={module.content} />
          </div>

          {module.quiz && <Quiz quizData={module.quiz} moduleId={moduleId} onQuizComplete={onQuizComplete} />}

          <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={onToggleComplete}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              {isCompleted ? 'Marquer comme non terminé' : 'Marquer comme terminé'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
