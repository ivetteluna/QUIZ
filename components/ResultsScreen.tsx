import React, { useMemo, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Question, QuizConfig, Settings } from '../types';
import { CheckCircleIcon, TrophyIcon, WhatsAppIcon, XCircleIcon, DownloadIcon } from './icons';
import ResultsImage from './ResultsImage';

interface ResultsScreenProps {
  questions: Question[];
  answers: (number | null)[];
  quizConfig: QuizConfig;
  settings: Settings;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ questions, answers, quizConfig, settings, onRestart }) => {
  const { correctCount, incorrectCount, percentage } = useMemo(() => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswerIndex === answers[index]) {
        correct++;
      }
    });
    const total = questions.length;
    return {
      correctCount: correct,
      incorrectCount: total - correct,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  }, [questions, answers]);

  const reportImageRef = useRef<HTMLDivElement>(null);

  const handleShareReport = useCallback(() => {
    if (!settings.adminPhone) {
      alert('El número del docente no está configurado. Por favor, configúrelo en los Ajustes.');
      return;
    }

    const date = new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const message = `*📊 Reporte de Evaluación de Quiz*

*Estudiante:* ${quizConfig.studentName}
*Asignatura:* ${quizConfig.subject}
*Grado:* ${quizConfig.grade} (${quizConfig.level})
*Fecha:* ${date}

*Resultados:*
✅ Correctas: *${correctCount}*
❌ Incorrectas: *${incorrectCount}*
🎯 Puntuación Final: *${percentage}%*

_Reporte generado por la plataforma de Quiz Inteligente._`;

    const cleanPhone = settings.adminPhone.replace(/[\s+\-()]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, [settings, quizConfig, correctCount, incorrectCount, percentage]);

  const handleDownloadReport = useCallback(() => {
    if (!reportImageRef.current) {
        alert('No se pudo generar la imagen del reporte. El componente de imagen no está listo.');
        return;
    }

    toPng(reportImageRef.current, { cacheBust: true, pixelRatio: 2 })
        .then((dataUrl) => {
            const link = document.createElement('a');
            const safeName = quizConfig.studentName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            link.download = `reporte_quiz_${safeName}.png`;
            link.href = dataUrl;
            link.click();
        })
        .catch((err) => {
            console.error('Error al generar la imagen del reporte:', err);
            alert('Ocurrió un error al generar la imagen. Por favor, intente de nuevo.');
        });
  }, [quizConfig.studentName]);

  const resultsImageProps = { settings, quizConfig, correctCount, incorrectCount, percentage };

  return (
    <>
      <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', fontFamily: "'Poppins', sans-serif" }}>
          <div ref={reportImageRef}>
              <ResultsImage {...resultsImageProps} />
          </div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in-up border border-white/50">
          <TrophyIcon className="w-24 h-24 text-yellow-400 mx-auto" />
          <h2 className="text-5xl font-extrabold text-gray-800 mt-4 mb-2">¡Quiz Completado!</h2>
          <p className="text-xl text-gray-600 mb-8">Estos son tus resultados, <span className="font-bold text-purple-600">{quizConfig.studentName}</span>.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-green-100 text-green-800 p-6 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <CheckCircleIcon className="w-10 h-10"/>
              <div className="text-5xl font-bold">{correctCount}</div>
              <div className="text-lg font-semibold">Correctas</div>
            </div>
            <div className="bg-rose-100 text-rose-800 p-6 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <XCircleIcon className="w-10 h-10"/>
              <div className="text-5xl font-bold">{incorrectCount}</div>
              <div className="text-lg font-semibold">Incorrectas</div>
            </div>
            <div className="bg-blue-100 text-blue-800 p-6 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#dbeafe"
                          strokeWidth="3.8"
                      />
                      <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3.8"
                          strokeDasharray={`${percentage}, 100`}
                          strokeLinecap="round"
                      />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">{percentage}%</div>
              </div>
              <div className="text-lg font-semibold">Porcentaje</div>
            </div>
          </div>
          
          <div className="space-y-4 mt-10">
            <button
              onClick={handleShareReport}
              disabled={!settings.adminPhone}
              className="w-full flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-4 px-4 rounded-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <WhatsAppIcon className="w-6 h-6"/>
              Enviar Reporte al Docente
            </button>
            {!settings.adminPhone && (
                <p className="text-sm text-gray-500">
                    Para enviar el reporte, el docente debe configurar su número de WhatsApp en los <span className="font-semibold">Ajustes</span>.
                </p>
            )}
            <button
              onClick={handleDownloadReport}
              className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
            >
              <DownloadIcon className="w-6 h-6"/>
              Descargar Reporte en Imagen
            </button>
            <button
              onClick={onRestart}
              className="w-full bg-gray-700 text-white font-bold py-4 px-4 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all transform hover:scale-105"
            >
              Realizar Otro Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsScreen;