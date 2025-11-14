
import React from 'react';

interface HeaderProps {
  title: string;
  progressPercent: number;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, progressPercent, onReset }) => {
  return (
    <header className="pb-6 border-b border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500">
            {title}
          </h1>
          <p className="mt-1 text-base text-slate-500">
            Plateforme de formation interactive sur la conformité LCB-FT
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          title="Réinitialiser toute la progression"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-3.181-4.991v4.99" />
          </svg>
          Réinitialiser
        </button>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-blue-700">Progression Globale</span>
          <span className="text-sm font-bold text-blue-700">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
