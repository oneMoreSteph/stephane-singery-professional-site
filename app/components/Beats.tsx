import { lines } from '~/content';
import type { Beat } from '~/sections/types';

/** The steps of a case as plain sections: readable without JavaScript and by search engines. */
export function Beats({ beats }: { beats: Beat[] }) {
  return (
    <>
      {beats.map(([label, heading, body]) => (
        <section key={label} className="text-beat">
          <p className="text-beat__label">{label}</p>
          <h2>{heading}</h2>
          <ul>
            {lines(body).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
