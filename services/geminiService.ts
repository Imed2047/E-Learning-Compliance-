
import { GoogleGenAI } from "@google/genai";
import { ModuleContent } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder check. The actual key is expected to be in the environment.
  console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const summarizeContent = async (content: ModuleContent): Promise<string> => {
  try {
    const contentString = `
      Case Study: ${content.case_study?.title} - ${content.case_study?.content}
      Definitions: ${content.definitions?.map(d => `${d.term}: ${d.definition}`).join(', ')}
      Red Flags: ${content.red_flags?.map(rf => rf.description).join(', ')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Summarize the key points of the following AML/CFT e-learning module content in French. Be concise and focus on the most important takeaways for a compliance professional. Content: ${contentString}`,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error summarizing content with Gemini:", error);
    return "Une erreur est survenue lors de la communication avec l'IA. Veuillez réessayer.";
  }
};

export const analyzeCaseStudy = async (userCase: string, moduleContent: ModuleContent): Promise<string> => {
  try {
    const referenceRedFlags = moduleContent.red_flags?.map(rf => `- ${rf.description} (Sévérité: ${rf.severity})`).join('\n') || 'N/A';
    
    const prompt = `
      Vous êtes un expert en conformité LCB-FT. Analysez l'étude de cas suivante fournie par un utilisateur. 
      Identifiez les potentiels 'red flags' (signaux d'alerte) en vous basant sur les principes généraux de la LCB-FT et sur les exemples de 'red flags' de ce module.
      Pour chaque 'red flag' identifié, expliquez pourquoi il représente un risque.
      Soyez clair, structuré et répondez en français.

      ---
      ÉTUDE DE CAS DE L'UTILISATEUR:
      "${userCase}"
      ---
      'RED FLAGS' DE RÉFÉRENCE DU MODULE:
      ${referenceRedFlags}
      ---

      VOTRE ANALYSE:
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing case study with Gemini:", error);
    return "Une erreur est survenue lors de la communication avec l'IA. Veuillez réessayer.";
  }
};
