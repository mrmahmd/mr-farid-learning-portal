type SocialLinksProps = {
  floating?: boolean;
  labeled?: boolean;
};

export function SocialLinks({ floating = false, labeled = false }: SocialLinksProps) {
  return (
    <div className={floating ? "social-links social-floating" : "social-links"} aria-label="Teacher contact links">
      <a
        className="social-button whatsapp"
        href="https://wa.me/966552019074"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact Mr. Mohamed Farid on WhatsApp at +966 55 201 9074"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 4a11.5 11.5 0 0 0-9.8 17.5L4.7 27l5.7-1.5A11.6 11.6 0 1 0 16 4Zm0 20.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.3.9.9-3.2-.2-.4A9.1 9.1 0 1 1 16 24.8Zm5-6.8c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1a7.5 7.5 0 0 1-3.7-3.2c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.1.2 2.4 3.7 5.9 5.2 2.2.9 3 .9 4.1.7.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.2-.3-.4-.4-.7-.5Z" />
        </svg>
        {labeled && <span>WhatsApp</span>}
        {floating && <span className="social-tooltip">WhatsApp</span>}
      </a>
      <a
        className="social-button facebook"
        href="https://www.facebook.com/mr.mahmmd"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Mr. Mohamed Farid on Facebook"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M18.3 28V17.1H22l.6-4.3h-4.3v-2.7c0-1.3.4-2.1 2.2-2.1h2.3V4.1c-.4-.1-1.8-.1-3.4-.1-3.4 0-5.7 2.1-5.7 5.8v3H10v4.3h3.7V28h4.6Z" />
        </svg>
        {labeled && <span>Facebook</span>}
        {floating && <span className="social-tooltip">Facebook</span>}
      </a>
      <a
        className="social-button youtube"
        href="https://www.youtube.com/@english-architect"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Mr. Mohamed Farid on YouTube"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M28 10.2c-.3-2.1-1.9-3.7-4-4C21.6 5.8 18.8 5.6 16 5.6s-5.6.2-8 .6c-2.1.3-3.7 1.9-4 4-.4 2.1-.6 4-.6 5.8s.2 3.7.6 5.8c.3 2.1 1.9 3.7 4 4 2.4.4 5.2.6 8 .6s5.6-.2 8-.6c2.1-.3 3.7-1.9 4-4 .4-2.1.6-4 .6-5.8s-.2-3.7-.6-5.8ZM13.4 21V11l8.3 5-8.3 5Z" />
        </svg>
        {labeled && <span>YouTube</span>}
        {floating && <span className="social-tooltip">YouTube</span>}
      </a>
    </div>
  );
}
