/** The business levers a case can serve, in reading order, with what each one means to a manager. */
export const LEVERS = {
  Continuity: 'Operations kept running.',
  Customers: 'Customers served, relationships held.',
  'Commitments met': 'Obligations, contracts and deadlines held.',
  'Speed of decision': 'Fresher Data, quicker answers.',
  'Trust and risk': 'Risks under control, information people can rely on.',
  'Team autonomy': 'Teams that answer their own questions.',
  Cost: 'Money the company no longer spends.',
} as const;

export type Lever = keyof typeof LEVERS;
