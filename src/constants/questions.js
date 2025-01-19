// constants/questions.js
const PHQ9_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

export const PHQ9_QUESTIONS = [
  {
    id: 1,
    text: "Little interest or pleasure in doing things",
    options: PHQ9_OPTIONS,
  },
  {
    id: 2,
    text: "Feeling down, depressed, or hopeless",
    options: PHQ9_OPTIONS,
  },
  {
    id: 3,
    text: "Trouble falling or staying asleep, or sleeping too much",
    options: PHQ9_OPTIONS,
  },
  {
    id: 4,
    text: "Feeling tired or having little energy",
    options: PHQ9_OPTIONS,
  },
  { id: 5, text: "Poor appetite or overeating", options: PHQ9_OPTIONS },
  {
    id: 6,
    text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    options: PHQ9_OPTIONS,
  },
  {
    id: 7,
    text: "Trouble concentrating on things, such as reading the newspaper or watching television",
    options: PHQ9_OPTIONS,
  },
  {
    id: 8,
    text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    options: PHQ9_OPTIONS,
  },
  {
    id: 9,
    text: "Thoughts that you would be better off dead or of hurting yourself in some way",
    options: PHQ9_OPTIONS,
  },
];

const GAD7_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

export const GAD7_QUESTIONS = [
  {
    id: 1,
    text: "Feeling nervous, anxious, or on edge",
    options: GAD7_OPTIONS,
  },
  {
    id: 2,
    text: "Not being able to stop or control worrying",
    options: GAD7_OPTIONS,
  },
  {
    id: 3,
    text: "Worrying too much about different things",
    options: GAD7_OPTIONS,
  },
  { id: 4, text: "Trouble relaxing", options: GAD7_OPTIONS },
  {
    id: 5,
    text: "Being so restless that it is hard to sit still",
    options: GAD7_OPTIONS,
  },
  {
    id: 6,
    text: "Becoming easily annoyed or irritable",
    options: GAD7_OPTIONS,
  },
  {
    id: 7,
    text: "Feeling afraid, as if something awful might happen",
    options: GAD7_OPTIONS,
  },
];
