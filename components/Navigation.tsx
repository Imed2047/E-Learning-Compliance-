
import React from 'react';
import { Section } from '../types';

interface NavigationProps {
  sections: Section[];
  activeSectionId: string;
  onSectionChange: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  difficultyFilter: string;
  onFilterChange: (difficulty: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  sections,
  activeSectionId,
  onSectionChange,
  searchTerm,
  onSearchChange,
  difficultyFilter,
  onFilterChange,
}) => {
  return (
    <nav className="mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex-initial p-1 bg-slate-100 rounded-lg flex space-x-1">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeSectionId === section.id
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
           <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            <input
              type="text"
              placeholder="Rechercher un module..."
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <select
            value={difficultyFilter}
            onChange={e => onFilterChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Tous les niveaux</option>
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
