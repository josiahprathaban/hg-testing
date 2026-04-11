import type { CharacterName, Character } from '@/types';

export const characterData: Character[] = [
  {
    key: "katy",
    name: {
      en: "Katy",
      zh: "凯帝",
      ms: "Katy"
    },
    avatar: '{"charKey":"mochi_v4","body":"cat","mouth":"cat","pColor":"FCE83F","hat":"","left":"","right":"","back":""}'
  },
  {
    key: "beary",
    name: {
      en: "Beary",
      zh: "贝里",
      ms: "Beary"
    },
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"C67334","hat":"","left":"","right":"","back":""}'
  },
  {
    key: "ruby",
    name: {
      en: "Ruby",
      zh: "路比",
      ms: "Ruby"
    },
    avatar: '{"charKey":"mochi_v4","body":"rabbit","mouth":"rabbit","pColor":"FFFFFF","hat":"S0280_H","left":"","right":"","back":""}'
  },
  {
    key: "hamochi",
    name: {
      en: "Hamochi",
      zh: "Hamochi",
      ms: "Hamochi"
    },
    avatar: '{"charKey":"mochi_v4","body":"hamster","mouth":"hamster","pColor":"EEC883","hat":"S0010_H","left":"","right":"","back":""}'
  },
  {
    key: "villager1",
    name: {
      en: "Villager 1",
      zh: "村民一号",
      ms: "Penduduk 1"
    },
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"9E8C7E","hat":"","left":"S0280_L","right":"","back":""}'
  },
  {
    key: "villager2",
    name: {
      en: "Villager 2",
      zh: "村民二号",
      ms: "Penduduk 2"
    },
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"FFB6C1","hat":"","left":"","right":"","back":""}'
  },
  {
    key: "builder",
    name: {
      en: "Hamochi",
      zh: "Hamochi",
      ms: "Hamochi"
    },
    avatar: '{"charKey":"mochi_v4","body":"hamster","mouth":"hamster","pColor":"EEC883","hat":"S0060_H","left":"","right":"S0060_R","back":""}'
  },
  {
    key: "explorer",
    name: {
      en: "Hamochi",
      zh: "Hamochi",
      ms: "Hamochi"
    },
    avatar: '{"charKey":"mochi_v4","body":"hamster","mouth":"hamster","pColor":"EEC883","hat":"S0050_H","left":"S0050_L","right":"","back":"S0030_B"}'
  },
  {
    key: "wizard",
    name: {
      en: "Hamochi",
      zh: "Hamochi",
      ms: "Hamochi"
    },
    avatar: '{"charKey":"mochi_v4","body":"hamster","mouth":"hamster","pColor":"EEC883","hat":"S0120_H","left":"S0120_L","right":"S0120_R","back":""}'
  },
  {
    key: "witch",
    name: {
      en: "Katy",
      zh: "凯帝",
      ms: "Katy"
    },
    avatar: '{"charKey":"mochi_v4","body":"cat","mouth":"cat","pColor":"FCE83F","hat":"S0120_H","left":"S0120_L","right":"S0120_R","back":""}'
  },
  {
    key: "warrior",
    name: {
      en: "Beary",
      zh: "贝里",
      ms: "Beary"
    },
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"C67334","hat":"S0280_H","left":"S0400_L","right":"S0400_R","back":""}'
  },
  {
    key: "hunter",
    name: {
      en: "Ruby",
      zh: "路比",
      ms: "Ruby"
    },
    avatar: '{"charKey":"mochi_v4","body":"rabbit","mouth":"rabbit","pColor":"FFFFFF","hat":"S0280_H","left":"S0260_L","right":"S0050_R","back":"S0260_B"}'
  },
  {
    key: "farmer",
    name: {
      en: "Ruby",
      zh: "路比",
      ms: "Ruby"
    },
    avatar: '{"charKey":"mochi_v4","body":"rabbit","mouth":"rabbit","pColor":"FFFFFF","hat":"S0070_H","left":"S0010_L","right":"S0010_R","back":"S0010_B"}'
  },
  {
    key: "forager",
    name: {
      en: "Ruby",
      zh: "路比",
      ms: "Ruby"
    },
    avatar: '{"charKey":"mochi_v4","body":"rabbit","mouth":"rabbit","pColor":"FFFFFF","hat":"S0300_H","left":"S0300_L","right":"S0030_R","back":"S0010_B"}'
  },
  {
    key: "chef",
    name: {
      en: "Beary",
      zh: "贝里",
      ms: "Beary"
    },
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"C67334","hat":"S0090_H","left":"S0090_L","right":"S0090_R","back":"S0090_B"}'
  },
  {
    key: "witchdoctor",
    name: {
      en: "Katy",
      zh: "凯帝",
      ms: "Katy"
    },
    avatar: '{"charKey":"mochi_v4","body":"cat","mouth":"cat","pColor":"FCE83F","hat":"S0340_H","left":"S0340_L","right":"S0340_R","back":"S0340_B"}'
  },
];

// Helper function to get character by key
export const getCharacterByKey = (key: string): Character | undefined => {
  return characterData.find(character => character.key === key);
};

// Helper function to get character name in specific language
export const getCharacterName = (key: string, language: string = 'en'): string => {
  const character = getCharacterByKey(key);
  if (!character) return '';

  // Return name in requested language with fallback to English
  return character.name[language as keyof CharacterName] || character.name.en;
};

// Helper function to get character avatar config by key
export const getCharacterAvatarConfig = (key: string): object | null => {
  const character = getCharacterByKey(key);
  if (!character) return null;

  try {
    return JSON.parse(character.avatar);
  } catch (error) {
    console.error(`Error parsing avatar config for character ${key}:`, error);
    return null;
  }
};
