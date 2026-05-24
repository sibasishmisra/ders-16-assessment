// DERS-16 — Bjureberg et al. (2016)
// Canonical item text from: Bjureberg, J., Ljótsson, B., Tull, M. T., et al.
// Journal of Psychopathology and Behavioral Assessment, 38, 284–296.
// DOI: 10.1007/s10862-015-9514-x
//
// Rules:
//  • 5 subscales only — NO Awareness subscale
//  • NO reverse-scored items — every item summed as-is
//  • Total range 16–80

export interface Question {
  id: number;
  text: string;
  subscale: 'clarity' | 'goals' | 'impulse' | 'strategies' | 'nonAcceptance';
  example: string;
  nudge: string; // {name} replaced at runtime
}

// Item → subscale (matches SUBSCALE_DEFS in scoring.ts exactly):
//   Clarity       : 1, 2
//   Goals         : 3, 7, 15
//   Impulse       : 4, 8, 11
//   Strategies    : 5, 6, 12, 14, 16
//   NonAcceptance : 9, 10, 13

export const questions: Question[] = [
  {
    id: 1,
    text: "I have difficulty making sense out of my feelings.",
    subscale: "clarity",
    nudge: "Hey {name}, this is your first step to knowing yourself better. No right or wrong — just you.",
    example: "Think about whether you can usually tell what emotion you're experiencing, or whether your feelings often feel muddled or hard to name."
  },
  {
    id: 2,
    text: "I am confused about how I feel.",
    subscale: "clarity",
    nudge: "{name}, emotional clarity is about knowing what's going on inside. How often do your feelings feel unclear to you?",
    example: "Do you sometimes feel something strongly but can't quite put a label on it — unsure whether it's sadness, frustration, or something else entirely?"
  },
  {
    id: 3,
    text: "When I'm upset, I have difficulty getting work done.",
    subscale: "goals",
    nudge: "This one's about staying functional under emotional pressure, {name}. Think about how upset feelings affect your productivity.",
    example: "When you're emotionally activated, does it become hard to push through tasks, meet deadlines, or stay on top of responsibilities?"
  },
  {
    id: 4,
    text: "When I'm upset, I become out of control.",
    subscale: "impulse",
    nudge: "Quarter of the way there, {name}. This is about what happens to your self-control when emotions run high.",
    example: "Do you find yourself saying or doing things impulsively — things you might regret later — when you're emotionally charged?"
  },
  {
    id: 5,
    text: "When I'm upset, I believe that I will remain that way for a long time.",
    subscale: "strategies",
    nudge: "You're doing great, {name}. This question is about how you perceive the duration of difficult feelings.",
    example: "When you're in a low mood, does it feel like it will last forever — or do you trust that it will pass?"
  },
  {
    id: 6,
    text: "When I'm upset, I believe that I'll end up feeling very depressed.",
    subscale: "strategies",
    nudge: "Halfway to the midpoint, {name}. Think about whether difficult emotions tend to spiral for you.",
    example: "When you feel upset, do you worry that it will snowball into something much worse, like deep sadness or depression?"
  },
  {
    id: 7,
    text: "When I'm upset, I have difficulty focusing on other things.",
    subscale: "goals",
    nudge: "Almost at the halfway mark, {name}. Think about how emotions compete with your attention.",
    example: "Do your emotions tend to dominate your attention, making it hard to think about anything else when you're upset?"
  },
  {
    id: 8,
    text: "When I'm upset, I feel out of control.",
    subscale: "impulse",
    nudge: "You've reached the halfway point, {name} — you're doing brilliantly. Keep going!",
    example: "At your most upset, does it feel like your reactions and behaviour are no longer fully in your hands?"
  },
  {
    id: 9,
    text: "When I'm upset, I feel ashamed with myself for feeling that way.",
    subscale: "nonAcceptance",
    nudge: "More than halfway now, {name}. This one explores whether you judge yourself for having emotions.",
    example: "Do you feel embarrassed or ashamed about certain emotions — like you shouldn't be feeling them at all?"
  },
  {
    id: 10,
    text: "When I'm upset, I feel like I am weak.",
    subscale: "nonAcceptance",
    nudge: "Ten down, {name}. You're in the home stretch. This is about how you see yourself when you're struggling.",
    example: "When you're going through a hard emotional time, do you interpret that as a sign of personal weakness or inadequacy?"
  },
  {
    id: 11,
    text: "When I'm upset, I have difficulty controlling my behaviors.",
    subscale: "impulse",
    nudge: "Almost there, {name}. This is about behavioural control — what you do, not just what you feel.",
    example: "Do you find it hard to stop yourself from acting out — raising your voice, withdrawing, or making impulsive decisions — when upset?"
  },
  {
    id: 12,
    text: "When I'm upset, I believe that there is nothing I can do to make myself feel better.",
    subscale: "strategies",
    nudge: "Four to go, {name}. This question is about your sense of agency over your own emotional state.",
    example: "When you're feeling low, do you feel helpless — like nothing you try will actually help you feel better?"
  },
  {
    id: 13,
    text: "When I'm upset, I become irritated at myself for feeling that way.",
    subscale: "nonAcceptance",
    nudge: "Three more after this, {name}. Think about the inner voice that shows up when you're struggling.",
    example: "Do you get frustrated with yourself for not being able to 'just get over it' or control your emotions better?"
  },
  {
    id: 14,
    text: "When I'm upset, I start to feel very bad about myself.",
    subscale: "strategies",
    nudge: "So close now, {name}. This is about whether being upset triggers a broader sense of self-criticism.",
    example: "When you're emotionally distressed, does it spill into feeling generally bad, worthless, or down on yourself as a person?"
  },
  {
    id: 15,
    text: "When I'm upset, I have difficulty concentrating.",
    subscale: "goals",
    nudge: "One more after this, {name}. You've been incredibly thoughtful — almost done.",
    example: "When emotions take over, do they crowd out your ability to think clearly or stay focused on what you need to do?"
  },
  {
    id: 16,
    text: "When I'm upset, I believe that wallowing in it is all I can do.",
    subscale: "strategies",
    nudge: "Last question, {name}. This is about whether you feel stuck in difficult emotions or able to move through them.",
    example: "When you're upset, do you feel like there's nothing to do but sit with the feeling — that you have no tools to shift it?"
  },
];

export const likertScale = [
  { value: 1, label: "Almost Never",        sublabel: "0–10% of the time" },
  { value: 2, label: "Sometimes",           sublabel: "11–35% of the time" },
  { value: 3, label: "About Half the Time", sublabel: "36–65% of the time" },
  { value: 4, label: "Most of the Time",    sublabel: "66–90% of the time" },
  { value: 5, label: "Almost Always",       sublabel: "91–100% of the time" },
];
