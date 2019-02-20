import { withRouter } from 'next/router';

const defaultRouter = {
  pathname: '/',
  asPath: '/',
  push: () => { },
  prefetch: () => { }
};

const ActiveLink = ({ router = defaultRouter, href, children }) => {
  // IIFE function that prefetchs the page requested by the link
  (function prefetchPages() {
    if (typeof window !== 'undefined') {
      router.prefetch(router.pathname);
    }
  })();

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  const isCurrentPath = router.pathname === href || router.asPath === href;

  return (
    <div data-testid='active-link'>
      <a
        href={href}
        onClick={handleClick}
        style={{
          textDecoration: 'none',
          margin: 0,
          padding: 0,
          fontWeight: isCurrentPath ? 'bold' : 'normal',
          color: '#000',
          transition: 'all 0.3s'
        }}
      >
        {children}
      </a>
    </div>
  );
};

export default withRouter(ActiveLink);
