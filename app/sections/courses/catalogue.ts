// Courses, their teachers and the projects built for them. Add a course or a project here.

export interface Teacher {
  name: string;
  linkedin: string;
  email: string;
  /** Portrait under public/, e.g. /assets/courses/mano-mathew.jpg. Shown only once the file is there. */
  photo?: string;
}

export interface CourseProject {
  slug: string;
  path: string;
  title: string;
  subtitle: string;
  summary: string;
  facts: string[];
}

export interface Course {
  /** Anchor on the Courses page, e.g. "data-visualisation-bi". */
  id: string;
  title: string;
  school: string;
  teacher: Teacher;
  projects: CourseProject[];
}

export const courses: Course[] = [
  {
    id: 'data-visualisation-bi',
    title: 'Data Visualisation & BI',
    school: 'EFREI · ING2 BDML',
    teacher: {
      name: 'Mano Mathew',
      linkedin: 'https://www.linkedin.com/in/manomathew/',
      email: 'mathew.mano@gmail.com',
      photo: '/assets/courses/mano-mathew.jpg',
    },
    projects: [
      {
        slug: 'nyc-taxi',
        path: '/courses/nyc-taxi',
        title: 'NYC Taxi',
        subtitle: 'One day, different journeys.',
        summary:
          'One Thursday of New York taxi trips: when people travel, where they go, how long it takes and what it costs.',
        facts: ['97,986 trips', '15 January 2015', 'Python · Plotly · Jupyter'],
      },
    ],
  },
];

export const courseOf = (projectSlug: string) =>
  courses.find((c) => c.projects.some((p) => p.slug === projectSlug))!;
