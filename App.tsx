import React, { useState, useEffect, useCallback } from 'react';
import { AppState, Question, QuizConfig, Settings } from './types';
import { generateQuizQuestions } from './services/geminiService';
import SetupScreen from './components/SetupScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import SettingsModal from './components/SettingsModal';
import { SettingsIcon } from './components/icons';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('SETUP');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({ adminPhone: '18294754755', schoolLogo: null });

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('quizAppSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        // Overwrite adminPhone with the fixed one, but keep the saved logo.
        setSettings({ ...parsedSettings, adminPhone: '18294754755' });
      }
    } catch (e) {
      console.error("Failed to load settings from localStorage", e);
    }
  }, []);
  
  const handleSaveSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
    try {
        localStorage.setItem('quizAppSettings', JSON.stringify(newSettings));
    } catch(e) {
        console.error("Failed to save settings to localStorage", e);
    }
  }, []);

  const handleStartQuiz = useCallback(async (config: QuizConfig) => {
    setAppState('LOADING');
    setError(null);
    setQuizConfig(config);
    try {
      const fetchedQuestions = await generateQuizQuestions(config);
      if (fetchedQuestions.length < 1) {
          throw new Error("No se recibieron preguntas. La IA podría estar sobrecargada o la configuración es muy específica.");
      }
      setQuestions(fetchedQuestions);
      setAppState('QUIZ');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
      setAppState('ERROR');
    }
  }, []);

  const handleFinishQuiz = useCallback((answers: (number | null)[]) => {
    setUserAnswers(answers);
    setAppState('RESULTS');
  }, []);

  const handleRestart = useCallback(() => {
    setAppState('SETUP');
    setQuizConfig(null);
    setQuestions([]);
    setUserAnswers([]);
    setError(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'SETUP':
        return <SetupScreen onStartQuiz={handleStartQuiz} settings={settings} />;
      case 'LOADING':
        return (
          <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
            <h2 className="text-center text-2xl font-bold text-purple-700">Generando tu quiz personalizado...</h2>
            <p className="text-gray-600">La IA está creando las preguntas. ¡Espera un momento!</p>
            <style>{`.loader { border-top-color: #8B5CF6; animation: spinner 1.5s linear infinite; } @keyframes spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        );
      case 'QUIZ':
        if (!quizConfig) {
            handleRestart();
            return null;
        }
        return <QuizScreen questions={questions} quizConfig={quizConfig} onFinish={handleFinishQuiz} />;
      case 'RESULTS':
        if (!quizConfig) {
            handleRestart();
            return null;
        }
        return <ResultsScreen questions={questions} answers={userAnswers} quizConfig={quizConfig} settings={settings} onRestart={handleRestart} />;
      case 'ERROR':
        return (
            <div className="min-h-screen flex flex-col justify-center items-center p-4">
                <div className="text-center bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50">
                    <h2 className="text-3xl font-bold text-rose-500 mb-4">¡Oops! Ocurrió un error</h2>
                    <p className="text-gray-600 mb-8 max-w-md">{error || "Algo salió mal. Por favor, intenta de nuevo."}</p>
                    <button onClick={handleRestart} className="bg-rose-500 text-white font-bold py-3 px-8 rounded-full hover:bg-rose-600 transition-all transform hover:scale-105">
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
      case 'SETTINGS':
          return <SettingsModal initialSettings={settings} onSave={handleSaveSettings} onClose={() => setAppState('SETUP')} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {appState !== 'SETTINGS' && (
        <button
          onClick={() => setAppState('SETTINGS')}
          className="fixed top-4 right-4 bg-white p-3 rounded-full shadow-lg text-purple-500 hover:text-purple-700 hover:scale-110 transition-all z-10 animate-pulse-slow"
          aria-label="Abrir configuración"
        >
          <SettingsIcon className="w-7 h-7" />
        </button>
      )}
      <main className="flex-grow animate-fade-in">{renderContent()}</main>
      <footer className="w-full text-center py-6 bg-transparent text-gray-700 text-sm font-medium">
        <p>Aplicación Creada por <strong>Luis Baudilio Luna</strong></p>
        <p className="mt-1">Tel. (829) 475-4755 | Email: lunarterd@gmail.com</p>
      </footer>
      <style>{`
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-in-out; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-in-out; }
        @keyframes pulse-slow {
            0%, 100% {
              transform: scale(1) rotate(0deg);
              box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
            }
            50% {
              transform: scale(1.1) rotate(15deg);
              box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
            }
        }
        .animate-pulse-slow {
            animation: pulse-slow 2.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
