import React, { useState, useMemo, useEffect } from 'react';
import { QuizConfig, Settings } from '../types';
import { LEVELS, GRADES, SUBJECTS } from '../constants';

interface SetupScreenProps {
  onStartQuiz: (config: QuizConfig) => void;
  settings: Settings;
}

const SelectInput = ({ id, label, value, onChange, options, placeholder, disabled = false }: { id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[], placeholder: string, disabled?: boolean }) => (
    <div>
        <label htmlFor={id} className={`text-xl font-bold text-gray-700 mb-3 block transition-colors ${disabled ? 'text-gray-400' : ''}`}>
            {label}
        </label>
        <div className="relative">
            <select
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full appearance-none px-5 py-4 bg-violet-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 transition-colors ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    </div>
);


const SetupScreen: React.FC<SetupScreenProps> = ({ onStartQuiz, settings }) => {
  const [level, setLevel] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');

  // Reset dependent fields on change for better UX
  useEffect(() => {
    setGrade('');
    setSubject('');
  }, [level]);

  useEffect(() => {
    setSubject('');
  }, [grade]);

  // Filter subjects based on level and grade
  const filteredSubjects = useMemo(() => {
    if (!grade) {
        return [];
    }

    if (level === 'Secundario') {
        return SUBJECTS;
    }

    if (level === 'Primario') {
        const primaryEarlyGrades = ['1ro', '2do', '3ro'];
        const primaryLateGrades = ['4to', '5to', '6to'];

        if (primaryEarlyGrades.includes(grade)) {
            return SUBJECTS.filter(s => s !== 'Inglés' && s !== 'Francés');
        }

        if (primaryLateGrades.includes(grade)) {
            return SUBJECTS.filter(s => s !== 'Francés');
        }
    }

    return []; // Default to empty
  }, [level, grade]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!level || !grade || !subject || !studentName.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setError('');
    onStartQuiz({ level, grade, subject, studentName: studentName.trim() });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 border border-white/50">
        <div className="text-center space-y-4">
          {settings.schoolLogo && (
            <img src={settings.schoolLogo} alt="Logo del Centro" className="mx-auto h-28 w-28 rounded-full object-cover shadow-lg mb-4 border-4 border-white" />
          )}
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
            QUIZ
          </h1>
          <p className="text-gray-600 text-lg font-medium">Plataforma de Evaluación Inteligente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <SelectInput
            id="level"
            label="Nivel Educativo"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            options={LEVELS}
            placeholder="Selecciona un Nivel"
          />

          <SelectInput
            id="grade"
            label="Grado"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            options={GRADES}
            placeholder="Selecciona un Grado"
            disabled={!level}
          />

          <SelectInput
            id="subject"
            label="Asignatura"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={filteredSubjects}
            placeholder="Selecciona una Asignatura"
            disabled={filteredSubjects.length === 0}
          />
          
          <div>
            <label htmlFor="studentName" className="text-xl font-bold text-gray-700 mb-3 block">Nombre del Estudiante</label>
            <input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Escribe tu nombre completo aquí..."
              className="w-full px-5 py-4 bg-violet-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
            />
          </div>

          {error && <p className="text-red-500 text-center font-semibold" role="alert" aria-live="assertive">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-xl py-5 px-4 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:saturate-50 disabled:scale-100 disabled:shadow-none"
            disabled={!level || !grade || !subject || !studentName.trim()}
          >
            Iniciar Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupScreen;