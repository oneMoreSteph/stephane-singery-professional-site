// The skills and tools behind my Data work. Each entry states only what a case already shows, and links to it.
export interface StackItem {
  /** The skill or tool. */
  name: string;
  /** What I did with it, in one line. */
  what: string;
  /** Case slugs that show it. */
  cases: string[];
}
export interface StackGroup {
  title: string;
  items: StackItem[];
}

/** How each proof link reads: the company or case, shorter than the role title. */
export const proofLabel: Record<string, string> = {
  'food-data': 'FoodChéri Data',
  heetch: 'Heetch',
  verisure: 'Verisure',
  signal: 'Signal or noise',
  'food-deadline': 'Six weeks',
  'study-data': 'Jedha',
  'study-efrei': 'EFREI',
};

/** The Data chain, as keywords. */
export const chain = ['Source', 'ELT / ETL', 'Data warehouse', 'BI / Analytics'];

export const groups: StackGroup[] = [
  {
    title: 'Sources and storage',
    items: [
      {
        name: 'Structured Data · Redshift',
        what: 'SQL tables as a source, at FoodChéri; raw and curated Data before the new platform, at Heetch.',
        cases: ['food-data', 'heetch'],
      },
      {
        name: 'Semi-structured Data · MongoDB (NoSQL)',
        what: 'Seazon’s JSON documents, brought into the same warehouse as FoodChéri’s Data.',
        cases: ['food-data'],
      },
      {
        name: 'Object storage · S3, GCS',
        what: 'Raw files in S3 before the new platform; GCS, files of any structure, as a source of BigQuery.',
        cases: ['heetch'],
      },
    ],
  },
  {
    title: 'Ingestion and pipelines',
    items: [
      {
        name: 'ELT',
        what: 'Extract and load the raw Data, then transform it inside the Data warehouse: FoodChéri and Heetch platforms.',
        cases: ['food-data', 'heetch'],
      },
      {
        name: 'Ingestion tool selection',
        what: 'A ready-made ingestion tool, chosen after an audit; I built the pipelines.',
        cases: ['food-data'],
      },
      {
        name: 'ETL pipelines and microservices',
        what: 'For operational business workflows, owned from requirements to production support.',
        cases: ['heetch'],
      },
    ],
  },
  {
    title: 'Data warehouses',
    items: [
      {
        name: 'BigQuery (Google Cloud)',
        what: 'Raw and curated layers of the FoodChéri and Heetch platforms.',
        cases: ['food-data', 'heetch'],
      },
      {
        name: 'Snowflake',
        what: 'The Data warehouse whose Data marts the Verisure platform watches.',
        cases: ['verisure'],
      },
      {
        name: 'Redshift (AWS)',
        what: 'Source at FoodChéri; the warehouse Heetch moved away from.',
        cases: ['food-data', 'heetch'],
      },
    ],
  },
  {
    title: 'Transformation and orchestration',
    items: [
      {
        name: 'SQL modelling',
        what: 'Raw tables turned into curated tables, ready to analyse.',
        cases: ['food-data', 'heetch'],
      },
      {
        name: 'Dataform (equivalent of dbt)',
        what: 'Nearly all the SQL models at Heetch, with complex incremental logic.',
        cases: ['heetch'],
      },
      {
        name: 'dbt Core',
        what: 'Models and tests at Verisure, the first observability domain.',
        cases: ['verisure'],
      },
      {
        name: 'Orchestration · Dataform schedules',
        what: 'Every step in the right order, at the right time, with a tag policy: logic safer to change.',
        cases: ['heetch'],
      },
      {
        name: 'Dataiku',
        what: 'Most transformations of Heetch’s previous stack, where I developed a lot.',
        cases: ['heetch'],
      },
    ],
  },
  {
    title: 'Data quality and observability',
    items: [
      {
        name: 'Reusable Data tests',
        what: 'Tests written once, applied to many models: my first step into observability.',
        cases: ['heetch'],
      },
      {
        name: 'Observability platform',
        what: 'dbt Core, Snowflake and Elementary; a common alert model in a transverse layer.',
        cases: ['verisure'],
      },
      {
        name: 'Automated tests in production',
        what: '525 tests a day, about 60,000 executions so far; qualification, prioritisation, alerts, fixes.',
        cases: ['verisure'],
      },
      {
        name: 'Observability dashboards',
        what: 'Two dashboards on Data health: Data test deployment, and Data test results in operation.',
        cases: ['verisure'],
      },
      {
        name: 'Governed severity operational measures',
        what: 'Harmless alerts requalified with an owner, a review date and a duration; nothing silenced for good.',
        cases: ['signal'],
      },
    ],
  },
  {
    title: 'BI, analytics and AI access',
    items: [
      {
        name: 'Metabase',
        what: 'Benchmarked, defended before the board, migrated within six weeks; teams from 2 to 25 active producers.',
        cases: ['food-data', 'food-deadline'],
      },
      { name: 'Looker', what: 'BI access to the curated Data of the Heetch platform.', cases: ['heetch'] },
      { name: 'Vertex AI', what: 'AI access to the same curated Data.', cases: ['heetch'] },
      {
        name: 'Tableau',
        what: 'Audited: 600+ dashboards, about one in ten used regularly.',
        cases: ['food-data'],
      },
    ],
  },
  {
    title: 'Cloud',
    items: [
      {
        name: 'Google Cloud',
        what: 'BigQuery, GCS, Dataform, Looker, Vertex AI, App Engine.',
        cases: ['heetch', 'food-data'],
      },
      { name: 'AWS', what: 'Redshift and S3, in the stacks I worked with.', cases: ['food-data', 'heetch'] },
    ],
  },
  {
    title: 'Engineering practices',
    items: [
      {
        name: 'Git and code review',
        what: 'Versioned code, reviewed by colleagues before it ships, in my Data roles.',
        cases: [],
      },
      {
        name: 'Dev and prod environments',
        what: 'Changes tested in development before they reach production.',
        cases: [],
      },
      {
        name: 'Documentation',
        what: 'Models, pipelines and tools documented, for users and for the engineers after me.',
        cases: ['food-data'],
      },
      {
        name: 'Deployment and maintenance',
        what: 'Metabase deployed and maintained on Google App Engine, in production.',
        cases: ['food-data'],
      },
      {
        name: 'Production support',
        what: 'Operational workflows owned end to end, from requirements to production support.',
        cases: ['heetch'],
      },
    ],
  },
  {
    title: 'Languages and training',
    items: [
      {
        name: 'SQL',
        what: 'Every platform above: models, tests, analysis.',
        cases: ['food-data', 'heetch', 'verisure'],
      },
      {
        name: 'Python',
        what: 'In production in my Data roles; self-taught from 2019, then the Jedha Data Science programme.',
        cases: ['study-data'],
      },
      {
        name: 'Engineering degree, EFREI',
        what: 'Computer Science, Big Data and Machine Learning, alongside the Verisure role.',
        cases: ['study-efrei'],
      },
    ],
  },
];
