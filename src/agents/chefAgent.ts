export enum QuestionCategory {
  GENERAL_INFO = 'Informacje o wydarzeniu',
  GUESTS = 'Goście',
  DIET_AND_ALLERGIES = 'Dieta i alergie',
  SERVING_STYLE = 'Styl i forma serwowania',
  TASTE_PREFERENCE = 'Preferencje smakowe',
  EQUIPMENT_AND_LOGISTIC = 'Wyposażenie i logistyka',
  SCHEDULE = 'Harmonogram',
  BUDGET = 'Budżet',
  SPECIALS = 'Oczekiwania specjalne',
  FINALIZING = 'Finalizacja',
}

export interface QuestionDefinition {
  id: string;
  text: string;
  category: QuestionCategory;
}

export const INTERVIEW_QUESTIONS: Record<string, QuestionDefinition> = {
  celebration_type: {
    id: 'celebration_type',
    text: 'Jaki jest rodzaj wydarzenia? (urodziny, kolacja prywatna, event firmowy, degustacja, wesele itp.)',
    category: QuestionCategory.GENERAL_INFO,
  },
  guests_count: {
    id: 'guests_count',
    text: 'Ilu gości będzie obecnych?',
    category: QuestionCategory.GUESTS,
  },
  guests_allergies: {
    id: 'guests_allergies',
    text: 'Czy goście mają alergie pokarmowe?',
    category: QuestionCategory.DIET_AND_ALLERGIES,
  },
  cuisine_style: {
    id: 'cuisine_style',
    text: 'Jaki styl kuchni preferuje klient?',
    category: QuestionCategory.SERVING_STYLE,
  },
  taste_preferences: {
    id: 'taste_preferences',
    text: 'Jakie smaki klient preferuje? (ostre, łagodne, słodkie, słone, kwaśne, wytrawne)',
    category: QuestionCategory.TASTE_PREFERENCE,
  },
  kitchen_equipment: {
    id: 'kitchen_equipment',
    text: 'Czy kuchnia na miejscu jest wyposażona?',
    category: QuestionCategory.EQUIPMENT_AND_LOGISTIC,
  },
  time_guests_arrive: {
    id: 'time_guests_arrive',
    text: 'O której godzinie goście zaczynają wchodzić?',
    category: QuestionCategory.SCHEDULE,
  },
  persons_budget: {
    id: 'persons_budget',
    text: 'Jaki jest budżet na osobę?',
    category: QuestionCategory.BUDGET,
  },
  event_personalization: {
    id: 'event_personalization',
    text: 'Czy klient chce element personalizacji? (np. menu z dedykacją, urodzinowe życzenia w deserze)',
    category: QuestionCategory.SPECIALS,
  },
  generate_note_file: {
    id: 'generate_note_file',
    text: 'Czy klient potrzebuje pełnej specyfikacji PDF/HTML?',
    category: QuestionCategory.FINALIZING,
  },
};
