import { Outlet } from 'react-router';
import { SiteFooter } from '~/components/SiteFooter';
import { SiteNav } from '~/components/SiteNav';
import { JourneyIsland } from '~/journey/JourneyIsland';

/**
 * Every journey address shares this layout, so the 3D journey stays mounted while the address changes.
 * The page text below is what search engines, link previews and visitors without JavaScript read.
 */
export default function JourneyLayout() {
  return (
    <>
      <JourneyIsland />
      <div className="page-text">
        <SiteNav />
        <main className="page-text__main">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
