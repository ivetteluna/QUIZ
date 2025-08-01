import React from 'react';

export const SettingsIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M11.078 2.25c-.917 0-1.699.663-1.946 1.55l-.26 1.037a1.5 1.5 0 01-.22-.112l-1.086-.543a1.95 1.95 0 00-2.322.383l-.999 1.73a1.95 1.95 0 00.384 2.322l.877.877a1.5 1.5 0 010 2.121l-.877.877a1.95 1.95 0 00-.384 2.322l.999 1.73a1.95 1.95 0 002.322.383l1.086-.543a1.5 1.5 0 01.22-.112l.26 1.037a1.95 1.95 0 001.946 1.55h2.844c.917 0 1.699-.663 1.946-1.55l.26-1.037a1.5 1.5 0 01.22.112l1.086.543a1.95 1.95 0 002.322-.383l.999-1.73a1.95 1.95 0 00-.384-2.322l-.877-.877a1.5 1.5 0 010-2.121l.877-.877a1.95 1.95 0 00.384-2.322l-.999-1.73a1.95 1.95 0 00-2.322-.383l-1.086.543a1.5 1.5 0 01-.22.112l-.26-1.037A1.95 1.95 0 0013.922 2.25H11.08zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
      clipRule="evenodd"
    />
  </svg>
);

export const CloseIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const UploadIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6s0-.3.1-.4c.1-.1.2-.2.4-.4.1-.1.2-.2.3-.4.1-.1.1-.3 0-.4-.1-.1-1-.7-1.4-1.6-.3-.8-.7-1.4-.7-1.4-.1-.1-.3-.1-.5-.1h-.5c-.2 0-.5.2-.6.5-.1.3-.6 1.4-.6 2.8 0 1.5.6 3.3.7 3.5.1.2 1.2 1.9 2.9 2.6.4.2.7.3 1 .4.5.1 1 .1 1.4-.1.4-.2.9-.6 1-1.2.1-.6.1-1.1.1-1.2s-.1-.3-.3-.4zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18.2c-4.5 0-8.2-3.7-8.2-8.2S7.5 3.8 12 3.8s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"/>
    </svg>
);

export const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const XCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const TrophyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 1 1 9 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V18.75m-4.5-3-1.036-6.219a1.125 1.125 0 0 1 1.09-1.285h8.892a1.125 1.125 0 0 1 1.09 1.285L16.5 15.75m-1.5-6-1.5-3.75-1.5 3.75" />
    </svg>
);