
import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuizConfig } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will be caught by the App component and shown to the user.
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      description: "Un array de 20 preguntas de quiz únicas.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "El texto de la pregunta del quiz."
          },
          options: {
            type: Type.ARRAY,
            description: "Un array de 4 posibles respuestas en español.",
            items: { type: Type.STRING }
          },
          correctAnswerIndex: {
            type: Type.INTEGER,
            description: "El índice (0-3) de la respuesta correcta en el array 'options'."
          }
        },
        required: ["question", "options", "correctAnswerIndex"]
      }
    }
  },
  required: ["questions"]
};


export const generateQuizQuestions = async (config: Omit<QuizConfig, 'studentName'>): Promise<Question[]> => {
  const { level, grade, subject } = config;

  const prompt = `
    Genera exactamente 20 preguntas únicas de opción múltiple para un estudiante de ${grade} grado del nivel ${level} en la asignatura de ${subject}.
    Las preguntas deben estar alineadas con el currículo vigente del MINERD (Ministerio de Educación de la República Dominicana).
    Para cada pregunta, proporciona 4 opciones de respuesta. Solo una debe ser correcta.
    Asegúrate de que la posición de la respuesta correcta esté distribuida aleatoriamente entre las opciones para diferentes preguntas.
    Las preguntas y respuestas deben estar en español.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as { questions: Question[] };
    
    if (!result.questions || result.questions.length === 0) {
      throw new Error("La API no devolvió preguntas.");
    }

    // Basic validation
    return result.questions.filter(q => 
        q.question && 
        Array.isArray(q.options) && 
        q.options.length === 4 && 
        typeof q.correctAnswerIndex === 'number' &&
        q.correctAnswerIndex >= 0 &&
        q.correctAnswerIndex < 4
    );

  } catch (error) {
    console.error("Error generando preguntas del quiz:", error);
    if (error instanceof Error) {
        throw new Error(`No se pudieron generar las preguntas. Por favor, intente de nuevo. Detalle: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al generar las preguntas.");
  }
};
