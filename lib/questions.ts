export interface Question {
  id: number;
  text: string;
  subscale: 'awareness' | 'clarity' | 'goals' | 'impulse' | 'strategies' | 'nonAcceptance';
  reverse: boolean;
  example: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "I am clear about my feelings.",
    subscale: "clarity",
    reverse: true,
    example: "For example: 'I can easily identify whether I'm feeling sad, angry, or anxious.'"
  },
  {
    id: 2,
    text: "I pay attention to how I feel.",
    subscale: "awareness",
    reverse: true,
    example: "For example: 'I notice when my mood changes throughout the day.'"
  },
  {
    id: 3,
    text: "When I'm upset, I become angry with myself for feeling that way.",
    subscale: "nonAcceptance",
    reverse: false,
    example: "For example: 'I criticize myself for being too emotional or sensitive.'"
  },
  {
    id: 4,
    text: "When I'm upset, I have difficulty getting work done.",
    subscale: "goals",
    reverse: false,
    example: "For example: 'Strong emotions make it hard for me to focus on tasks.'"
  },
  {
    id: 5,
    text: "When I'm upset, I become out of control.",
    subscale: "impulse",
    reverse: false,
    example: "For example: 'I might say or do things impulsively when emotionally charged.'"
  },
  {
    id: 6,
    text: "When I'm upset, I believe that I will remain that way for a long time.",
    subscale: "strategies",
    reverse: false,
    example: "For example: 'I feel like negative emotions will never pass.'"
  },
  {
    id: 7,
    text: "When I'm upset, I believe that I'll end up feeling very depressed.",
    subscale: "strategies",
    reverse: false,
    example: "For example: 'I worry that feeling upset will spiral into something worse.'"
  },
  {
    id: 8,
    text: "When I'm upset, I have difficulty focusing on other things.",
    subscale: "goals",
    reverse: false,
    example: "For example: 'My emotions consume my attention and distract me.'"
  },
  {
    id: 9,
    text: "When I'm upset, I feel ashamed with myself for feeling that way.",
    subscale: "nonAcceptance",
    reverse: false,
    example: "For example: 'I feel embarrassed about having certain emotions.'"
  },
  {
    id: 10,
    text: "When I'm upset, I have difficulty concentrating.",
    subscale: "goals",
    reverse: false,
    example: "For example: 'I can't think clearly when I'm experiencing strong feelings.'"
  },
  {
    id: 11,
    text: "When I'm upset, I have difficulty controlling my behaviors.",
    subscale: "impulse",
    reverse: false,
    example: "For example: 'I might act without thinking when I'm emotional.'"
  },
  {
    id: 12,
    text: "When I'm upset, I believe that there is nothing I can do to make myself feel better.",
    subscale: "strategies",
    reverse: false,
    example: "For example: 'I feel helpless to improve my emotional state.'"
  },
  {
    id: 13,
    text: "When I'm upset, I become irritated with myself for feeling that way.",
    subscale: "nonAcceptance",
    reverse: false,
    example: "For example: 'I get frustrated with myself for not being able to control my emotions.'"
  },
  {
    id: 14,
    text: "When I'm upset, I lose control over my behaviors.",
    subscale: "impulse",
    reverse: false,
    example: "For example: 'I might lash out or make poor decisions when upset.'"
  },
  {
    id: 15,
    text: "When I'm upset, I have difficulty thinking about anything else.",
    subscale: "goals",
    reverse: false,
    example: "For example: 'My emotions dominate my thoughts completely.'"
  },
  {
    id: 16,
    text: "When I'm upset, it takes me a long time to feel better.",
    subscale: "strategies",
    reverse: false,
    example: "For example: 'I struggle to recover from negative emotional experiences.'"
  }
];

export const likertScale = [
  { value: 1, label: "Almost Never" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "About Half the Time" },
  { value: 4, label: "Most of the Time" },
  { value: 5, label: "Almost Always" }
];
