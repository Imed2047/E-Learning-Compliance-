
import React, { useState, useMemo, useCallback } from 'react';
import { Section, Module, Progress } from './types';
import { platformData } from './data/modules';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ModuleCard from './components/ModuleCard';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [progress, setProgress] = useLocalStorage<Progress>('elearning_progress_v1', {});
  const [activeSectionId, setActiveSectionId] = useState<string>('initiation');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const sections: Section[] = platformData.sections;

  const handleToggleModuleComplete = useCallback((moduleId: string) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      if (newProgress[moduleId]?.completed) {
        newProgress[moduleId] = { ...newProgress[moduleId], completed: false };
      } else {
        newProgress[moduleId] = { ...newProgress[moduleId], completed: true };
      }
      return newProgress;
    });
  }, [setProgress]);
  
  const handleQuizComplete = useCallback((moduleId: string, score: number, total: number) => {
    const module = platformData.sections
        .flatMap(s => s.modules.map(m => ({ ...m, sectionId: s.id })))
        .find(m => `${m.sectionId}-${m.id}` === moduleId);

    // Le score de passage est celui défini dans le quiz, ou le total des questions si non défini.
    const passingScore = module?.quiz?.passing_score ?? total;

    setProgress(prev => ({
        ...prev,
        [moduleId]: {
            ...prev[moduleId],
            quizScore: score,
            quizTotal: total,
            completed: score >= passingScore
        }
    }));
  }, [setProgress]);


  const handleResetProgress = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser toute votre progression ? Cette action est irréversible.')) {
      setProgress({});
      setExpandedModules({});
    }
  };

  const handleToggleExpand = (moduleId: string) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleExpandAll = (modules: Module[]) => {
      const allExpanded = modules.every(m => expandedModules[`${activeSectionId}-${m.id}`]);
      const newExpandedState: Record<string, boolean> = {};
      modules.forEach(m => {
          newExpandedState[`${activeSectionId}-${m.id}`] = !allExpanded;
      });
      setExpandedModules(prev => ({...prev, ...newExpandedState}));
  };

  const { totalModules, totalCompleted } = useMemo(() => {
    const allModules = sections.flatMap(s => s.modules.map(m => ({ ...m, sectionId: s.id })));
    const completedCount = allModules.filter(m => progress[`${m.sectionId}-${m.id}`]?.completed).length;
    return { totalModules: allModules.length, totalCompleted: completedCount };
  }, [sections, progress]);

  const globalProgressPercent = totalModules > 0 ? Math.round((totalCompleted / totalModules) * 100) : 0;

  const activeSection = useMemo(() => sections.find(s => s.id === activeSectionId) || sections[0], [sections, activeSectionId]);

  const filteredModules = useMemo(() => {
    return (activeSection?.modules || []).filter(module => {
      const titleMatch = module.title.toLowerCase().includes(searchTerm.toLowerCase());
      const contentMatch = JSON.stringify(module.content).toLowerCase().includes(searchTerm.toLowerCase());
      const difficultyMatch = difficultyFilter ? module.difficulty === difficultyFilter : true;
      return (titleMatch || contentMatch) && difficultyMatch;
    });
  }, [activeSection, searchTerm, difficultyFilter]);

  const sectionProgress = useMemo(() => {
    const sectionModules = activeSection?.modules || [];
    const completedCount = sectionModules.filter(m => progress[`${activeSection.id}-${m.id}`]?.completed).length;
    return {
      completed: completedCount,
      total: sectionModules.length
    };
  }, [activeSection, progress]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8">
          <Header
            title={platformData.platform}
            progressPercent={globalProgressPercent}
            onReset={handleResetProgress}
          />

          <Navigation
            sections={sections}
            activeSectionId={activeSectionId}
            onSectionChange={setActiveSectionId}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            difficultyFilter={difficultyFilter}
            onFilterChange={setDifficultyFilter}
          />
          
          <main className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800">{activeSection.icon} {activeSection.name}</h2>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-slate-600">
                        {sectionProgress.completed}/{sectionProgress.total} modules complétés
                    </span>
                    {activeSection.modules.length > 0 && (
                        <button 
                            onClick={() => handleExpandAll(activeSection.modules)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                        >
                            Tout Développer / Réduire
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-4">
              {filteredModules.length > 0 ? (
                filteredModules.map(module => {
                  const moduleId = `${activeSection.id}-${module.id}`;
                  return (
                    <ModuleCard
                      key={moduleId}
                      module={module}
                      sectionId={activeSection.id}
                      progress={progress[moduleId]}
                      onToggleComplete={() => handleToggleModuleComplete(moduleId)}
                      onQuizComplete={(score, total) => handleQuizComplete(moduleId, score, total)}
                      isExpanded={!!expandedModules[moduleId]}
                      onToggleExpand={() => handleToggleExpand(moduleId)}
                    />
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <p>Aucun module ne correspond à vos critères de recherche.</p>
                </div>
              )}
               {activeSection.modules.length === 0 && (
                 <div className="text-center py-12 text-slate-500">
                  <p>Les modules pour cette section sont en cours de développement.</p>
                </div>
               )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
