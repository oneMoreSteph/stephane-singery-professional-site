import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { site } from '~/site';

// The site used to live at /mission-journey.html#<stop>. Old links land here and move to the new address;
// the journey turns the old # part into a page address.
export const meta = () => [{ title: site.name }, { name: 'robots', content: 'noindex' }];

export default function OldEntry() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${window.location.hash}`, { replace: true });
  }, [navigate]);
  return null;
}
