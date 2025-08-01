import React from 'react';
import { Settings, QuizConfig } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface ResultsImageProps {
  settings: Settings;
  quizConfig: QuizConfig;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
}

const ResultsImage: React.FC<ResultsImageProps> = ({
  settings,
  quizConfig,
  correctCount,
  incorrectCount,
  percentage,
}) => {
  const date = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Determine circle color based on percentage
  const circleColor = percentage >= 80 ? '#22c55e' : percentage >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="w-[450px] bg-white p-8 font-['Poppins'] text-gray-800 shadow-2xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
        {settings.schoolLogo ? (
          <img src={settings.schoolLogo} alt="Logo" className="h-20 w-20 object-contain" />
        ) : (
          <div className="h-20 w-20"></div>
        )}
        <div className="text-right">
          <h1 className="text-2xl font-bold text-purple-700">Reporte de Evaluación</h1>
          <p className="text-sm text-gray-500">Generado el {date}</p>
        </div>
      </div>
      
      <div className="my-8">
        <h2 className="text-lg font-semibold text-gray-500">Estudiante</h2>
        <p className="text-3xl font-bold">{quizConfig.studentName}</p>
      </div>

      <div className="my-8">
        <h2 className="text-lg font-semibold text-gray-500">Detalles de la Prueba</h2>
        <div className="mt-2 text-lg">
            <p><span className="font-bold">Nivel:</span> {quizConfig.level}</p>
            <p><span className="font-bold">Grado:</span> {quizConfig.grade}</p>
            <p><span className="font-bold">Asignatura:</span> {quizConfig.subject}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-center mb-4">Resultados Finales</h2>
        <div className="flex justify-around items-center text-center">
            <div className="flex flex-col items-center">
                <CheckCircleIcon className="w-10 h-10 text-green-500 mb-1" />
                <span className="text-3xl font-bold">{correctCount}</span>
                <span className="text-sm text-gray-600">Correctas</span>
            </div>
             <div className="flex flex-col items-center">
                <XCircleIcon className="w-10 h-10 text-rose-500 mb-1" />
                <span className="text-3xl font-bold">{incorrectCount}</span>
                <span className="text-sm text-gray-600">Incorrectas</span>
            </div>
            <div className="flex flex-col items-center">
                 <div className="relative w-20 h-20">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                        />
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={circleColor}
                            strokeWidth="4"
                            strokeDasharray={`${percentage}, 100`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">{percentage}%</div>
                </div>
                <span className="text-sm text-gray-600 mt-1">Puntuación</span>
            </div>
        </div>
      </div>
      
       <div className="mt-8 text-center text-xs text-gray-400">
           <p>QUIZ - Plataforma de Evaluación Inteligente</p>
       </div>
    </div>
  );
};

export default ResultsImage;
