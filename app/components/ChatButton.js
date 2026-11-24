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
      <svg className="chatfab-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 2.5c-5.1 0-9.2 3.8-9.2 8.5 0 2.7 1.3 5.1 3.4 6.6v3.4l3.2-1.7c.8.2 1.7.3 2.6.3 5.1 0 9.2-3.8 9.2-8.6S17.1 2.5 12 2.5Z"
          fill="currentColor"
        />
      </svg>
      <span className="chatfab-txt">Chat with us</span>
    </a>
  );
}
