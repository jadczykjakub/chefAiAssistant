import Groq from 'groq-sdk';
import {
  ChatCompletion,
  ChatCompletionCreateParams,
  ChatCompletionMessageParam,
} from 'groq-sdk/resources/chat/completions';

/**
 * @class GroqApiWrapper
 * @description A robust, TypeScript-first wrapper for the Groq API client.
 */
export class GroqApiWrapper {
  private groqClient: Groq;
  private defaultModel: string = 'openai/gpt-oss-120b';

  /**
   * Initializes the Groq client.
   * Looks for GROQ_API_KEY environment variable by default.
   * @param defaultModel Optional default model to use for completions.
   */
  constructor(defaultModel?: string) {
    if (!process.env.GROQ_API_KEY) {
      console.warn(
        'GROQ_API_KEY not found. Ensure it is set in environment or passed to the constructor.',
      );
    }

    this.groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });

    if (defaultModel) {
      this.defaultModel = defaultModel;
    }
  }

  /**
   * Generates a chat completion response from the Groq API.
   * @param messages An array of message objects for the chat history.
   * @returns A Promise that resolves to the ChatCompletion object.
   * @throws {Error} Throws an error if the API call fails.
   */
  public async generateChatCompletion(
    messages: ChatCompletionMessageParam[],
  ): Promise<ChatCompletion> {
    const params: ChatCompletionCreateParams = {
      messages: messages,
      model: this.defaultModel,
    };

    try {
      return await this.groqClient.chat.completions.create(params);
    } catch (error) {
      // A more specific error handling for Groq's client errors can be added here
      // e.g., checking for specific error types from the 'groq' package.
      console.error('Groq API Call Error:', error);

      // Re-throw a generic error or a custom application error
      throw new Error('Failed to generate chat completion from Groq API.');
    }
  }
}
