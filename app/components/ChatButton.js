'use client';

import { usePathname } from 'next/navigation';

// Berco already sends ?ref= on every Messenger link (mobile-bar, nav-menu,
// contact-top), so this keeps that convention rather than inventing a second
// one. Meta passes the value through to the messaging_referrals webhook.
const PAGE = 'bercophilippines';

export function chatRef(pathname) {
  const slug = (pathname || '/') === '/'
    ? 'home'
    : String(pathname).replace(/^\/+|\/+$/g, '').replace(/[^A-Za-z0-9]+/g, '_');
  return ('web_' + slug).slice(0, 60);
}

export default function ChatButton() {
  const pathname = usePathname();
  return (
    <a
      className="chatfab"
      href={`https://m.me/${PAGE}?ref=${chatRef(pathname)}`}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on Messenger"
    >
      {/* The real Messenger glyph: bubble + bolt. The bolt is not drawn, it is
          the button's own blue showing through, so it must match --chatfab-bg. */}
      <svg className="chatfab-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12 2.04c-5.5 0-9.96 4.13-9.96 9.22 0 2.9 1.44 5.49 3.7 7.19v3.51l3.38-1.86c.9.25 1.86.38 2.88.38 5.5 0 9.96-4.13 9.96-9.22S17.5 2.04 12 2.04Z"
        />
        <path
          className="chatfab-bolt"
          d="m6.1 14.6 2.93-4.64a1.5 1.5 0 0 1 2.17-.4l2.33 1.75c.21.16.5.16.71 0l3.15-2.39c.42-.32.97.18.69.63l-2.93 4.64a1.5 1.5 0 0 1-2.17.4l-2.33-1.75a.6.6 0 0 0-.71 0L6.79 15.23c-.42.32-.97-.18-.69-.63Z"
        />
      </svg>
      <span className="chatfab-txt">Chat with us</span>
    </a>
  );
}
