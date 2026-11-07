import { Link } from 'react-router';
import { SiteNav } from '~/components/SiteNav';
import { SiteFooter } from '~/components/SiteFooter';
import { metaForPath } from '~/meta';
import { Breadcrumb } from './Breadcrumb';
import { courses } from './catalogue';
import { gridPoints } from './nyc-taxi/data';
import './courses.css';

// Portraits present under public/assets/courses: a missing file shows no broken image.
const photos = new Set(
  Object.keys(import.meta.glob('/public/assets/courses/*.{jpg,jpeg,png,webp}')).map((p) =>
    p.replace('/public', ''),
  ),
);

export const meta = () => metaForPath('/courses');

function TaxiVisual() {
  return (
    <svg viewBox="0 0 460 430">
      <defs>
        <radialGradient id="project-glow">
          <stop stopColor="#a9e7f1" stopOpacity=".12" />
          <stop offset="1" stopColor="#061018" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="230" cy="210" r="210" fill="url(#project-glow)" />
      {[100, 200, 300, 400].map((x) => (
        <path key={x} d={`M${x} 0V430M0 ${x}H460`} stroke="#a9e7f1" strokeOpacity=".07" />
      ))}
      {gridPoints()
        .filter((p) => p.lon > -74.08 && p.lon < -73.72 && p.lat > 40.59 && p.lat < 40.87)
        .map((p) => (
          <circle
            key={`${p.lon}-${p.lat}`}
            cx={((p.lon + 74.08) / 0.36) * 460}
            cy={430 - ((p.lat - 40.59) / 0.28) * 430}
            r={Math.max(0.8, Math.sqrt(p.trips) / 12)}
            fill={p.trips > 1000 ? '#f6d77a' : '#a9e7f1'}
            opacity=".8"
          />
        ))}
      <text x="24" y="400" fill="#abc4cd" fontSize="10" letterSpacing="2">
        PICKUPS / 1 KM CELLS
      </text>
    </svg>
  );
}

const visuals: Record<string, () => React.ReactNode> = { 'nyc-taxi': TaxiVisual };

export default function CoursesPage() {
  return (
    <div className="page projects-page">
      <SiteNav />
      <main className="projects-index">
        <Breadcrumb trail={[['Courses']]} />
        <p className="eyebrow">EFREI / ENGINEERING COURSES</p>
        <h1>
          Courses. <em>What I built in each.</em>
        </h1>
        <p className="lede">Each course, its teacher, and the projects made for it.</p>

        {courses.map((course) => (
          <section key={course.id} id={course.id} className="course" aria-labelledby={`${course.id}-title`}>
            <header className="course__head">
              <div>
                <p className="eyebrow">{course.school}</p>
                <h2 id={`${course.id}-title`}>{course.title}</h2>
              </div>
              <div className="course__teacher-card">
                {course.teacher.photo && photos.has(course.teacher.photo) && (
                  <img
                    className="course__photo"
                    src={course.teacher.photo}
                    alt={course.teacher.name}
                    width={88}
                    height={88}
                    loading="lazy"
                  />
                )}
                <dl className="course__teacher">
                  <dt>Teacher</dt>
                  <dd>{course.teacher.name}</dd>
                  <dt>LinkedIn</dt>
                  <dd>
                    <a href={course.teacher.linkedin} target="_blank" rel="noopener">
                      linkedin.com/in/manomathew ↗
                    </a>
                  </dd>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${course.teacher.email}`}>{course.teacher.email}</a>
                  </dd>
                </dl>
              </div>
            </header>

            <div className="course__projects">
              <h3 className="course__projects-title">Projects</h3>
              {course.projects.map((project, i) => (
                <Link key={project.slug} to={project.path} className="project-entry">
                  <div className="project-entry__copy">
                    <p className="eyebrow">
                      {String(i + 1).padStart(2, '0')} / {course.title.toUpperCase()}
                    </p>
                    <h4>
                      {project.title}
                      <br />
                      <em>{project.subtitle}</em>
                    </h4>
                    <p>{project.summary}</p>
                    <p className="project-entry__facts">
                      {project.facts.map((f) => (
                        <span key={f}>{f}</span>
                      ))}
                    </p>
                    <span className="project-entry__action">
                      Open the project <span aria-hidden="true">→</span>
                    </span>
                  </div>
                  <div className="project-entry__visual" aria-hidden="true">
                    {visuals[project.slug]?.()}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
