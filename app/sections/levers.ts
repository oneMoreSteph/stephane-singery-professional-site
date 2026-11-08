/** The business levers a case can serve, in reading order, with what each one means for the company. */
export const LEVERS = {
  Continuity:
    'Operations kept running, day after day: trains, deliveries, Data and services available when people needed them.',
  Customers: 'Customers served as promised, and the relationship kept for the long term.',
  'Commitments met':
    'What the company had promised was delivered: contractual dates, regulatory requirements, deadlines.',
  'Speed of decision': 'Decisions taken sooner, on fresher and complete Data, by the people who need them.',
  'Trust and risk':
    'Risks spotted and controlled early, from passenger safety to Data quality, so people can rely on what they see.',
  'Team autonomy': 'Business teams answer their own questions with the Data, at their own pace.',
  Cost: 'Money the company no longer spends: licences, manual checks, wasted effort.',
} as const;

export type Lever = keyof typeof LEVERS;
