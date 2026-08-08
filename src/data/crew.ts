import type { Locale } from '../config.ts';

type Localized = Record<Locale, string>;

export interface CrewMember {
  name: string;
  role: Localized;
  /** The human gets a different visual treatment — he is the punchline of the list. */
  human?: boolean;
}

/**
 * The actual roster of the Paperclip company that maintains the Flopsstuff catalogue.
 * Order matters: it reads as a shift rota, ending on the one person who is not an agent.
 */
export const crew: CrewMember[] = [
  {
    name: 'Prospero',
    role: { en: 'Chief executive', ru: 'Директор', pl: 'Dyrektor' },
  },
  {
    name: 'Daedalus',
    role: { en: 'Chief technology', ru: 'Технический директор', pl: 'Dyrektor techniczny' },
  },
  {
    name: 'Wayland',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
  },
  {
    name: 'Aldric',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
  },
  {
    name: 'Lyra',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
  },
  {
    name: 'Soren',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
  },
  {
    name: 'Orion',
    role: { en: 'Engineering', ru: 'Инженер', pl: 'Inżynier' },
  },
  {
    name: 'Iris',
    role: { en: 'Interface design', ru: 'Интерфейсы', pl: 'Interfejsy' },
  },
  {
    name: 'Pygmalion',
    role: { en: '3D art', ru: '3D-графика', pl: 'Grafika 3D' },
  },
  {
    name: 'Flop Butylkin',
    role: {
      en: 'Decides which of them was right',
      ru: 'Решает, кто из них был прав',
      pl: 'Decyduje, który z nich miał rację',
    },
    human: true,
  },
];
