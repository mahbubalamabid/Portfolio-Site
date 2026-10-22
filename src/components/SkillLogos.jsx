import React from "react";

export function SkillLogo({ name, className = "w-5 h-5" }) {
  switch (name) {
    case "HTML5":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4.5 3h15l-1.37 15.34L12 21.05l-6.13-2.71L4.5 3z" fill="#E44D26" />
          <path d="M12 4.63v14.77l4.75-2.1 1.05-11.75H12z" fill="#F16529" />
          <path d="M7.74 7.22h8.52l-.24 2.6H12v2.53h3.78l-.34 3.78-3.44 1.13v2.66l5.77-1.89.65-7.38.23-2.6H7.5l.24 1.77z" fill="#EBEBEB" />
          <path d="M12 7.22H7.74l.46 5.13H12v-2.53H9.72l-.23-2.6H12V7.22zm0 8.91l-.03.01-2.91-.95-.19-2.1H7.35l.37 4.14 4.28 1.4v-2.5z" fill="#FFFFFF" />
        </svg>
      );

    case "CSS3":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4.5 3h15l-1.37 15.34L12 21.05l-6.13-2.71L4.5 3z" fill="#1572B6" />
          <path d="M12 4.63v14.77l4.75-2.1 1.05-11.75H12z" fill="#33A9DC" />
          <path d="M7.74 7.22h8.52l-.24 2.6H12v2.53h3.78l-.34 3.78-3.44 1.13v2.66l5.77-1.89.65-7.38.23-2.6H7.5l.24 1.77z" fill="#EBEBEB" />
          <path d="M12 7.22H7.74l.46 5.13H12v-2.53H9.72l-.23-2.6H12V7.22zm0 8.91l-.03.01-2.91-.95-.19-2.1H7.35l.37 4.14 4.28 1.4v-2.5z" fill="#FFFFFF" />
        </svg>
      );

    case "JavaScript":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M7.5 18.2c.7.4 1.5.7 2.3.7 1.2 0 1.9-.6 1.9-1.6v-6.5H9.8v6.4c0 .6-.3.9-.9.9-.4 0-.8-.1-1.1-.3l-.3.4zm7.6.7c1.7 0 2.8-.8 2.8-2.3 0-1.4-.9-2-2.3-2.5l-.6-.2c-.8-.3-1.2-.6-1.2-1.1 0-.6.5-1 1.4-1 .7 0 1.3.2 1.7.5l.4-.7c-.5-.4-1.2-.6-2-.6-1.5 0-2.4.9-2.4 2.1 0 1.2.8 1.9 2.1 2.3l.6.2c.9.3 1.4.7 1.4 1.3 0 .7-.6 1.2-1.7 1.2-.8 0-1.6-.3-2.1-.7l-.4.8c.6.5 1.5.8 2.3.8z" fill="#000000" />
        </svg>
      );

    case "TypeScript":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M12.5 11.2h-3v7.3H7.8v-7.3h-3v-1.6h7.7v1.6zm6.8 6c-.5.5-1.3.8-2.3.8-1.7 0-2.8-.9-2.8-2.4 0-1.5.9-2.2 2.3-2.7l.6-.2c.8-.3 1.2-.6 1.2-1.1 0-.6-.5-1-1.4-1-.7 0-1.4.2-1.8.5l-.5-1.4c.7-.4 1.6-.6 2.5-.6 1.8 0 2.9.9 2.9 2.3 0 1.3-.8 2.1-2.2 2.6l-.6.2c-.8.3-1.2.6-1.2 1.1 0 .6.5 1 1.4 1 .8 0 1.5-.2 2-.6l.4 1.4z" fill="#FFFFFF" />
        </svg>
      );

    case "React":
    case "React.js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1.2">
            <ellipse cx="12" cy="12" rx="9" ry="3.5" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );

    case "Next.js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10.5" fill="#000000" stroke="#333333" strokeWidth="1" />
          <path d="M8.5 7.5h1.8v9H8.5v-9zm7.2 0h1.8v9h-1.8v-9z" fill="#FFFFFF" />
          <path d="M9.8 7.5l6.5 8.7h1.4L10.2 7.5H9.8z" fill="url(#nextGradient)" />
          <defs>
            <linearGradient id="nextGradient" x1="10" y1="8" x2="16.5" y2="16.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "Tailwind CSS":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1 1 .2 1.8 1 2.6 1.8 1.3 1.4 2.8 3 6.1 3 2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1-1-.2-1.8-1-2.6-1.8-1.3-1.4-2.8-3-6.1-3zM4.5 12c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1 1 .2 1.8 1 2.6 1.8 1.3 1.4 2.8 3 6.1 3 2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1-1-.2-1.8-1-2.6-1.8-1.3-1.4-2.8-3-6.1-3z" fill="#38BDF8" />
        </svg>
      );

    case "DaisyUI":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3.5" fill="#FBBF24" />
          <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v2a2.5 2.5 0 0 0 5 0v-2A2.5 2.5 0 0 0 12 2zm0 13a2.5 2.5 0 0 0-2.5 2.5v2a2.5 2.5 0 0 0 5 0v-2A2.5 2.5 0 0 0 12 15zm10-5.5a2.5 2.5 0 0 0-2.5-2.5h-2a2.5 2.5 0 0 0 0 5h2A2.5 2.5 0 0 0 22 9.5zM6.5 7a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5h2a2.5 2.5 0 0 0 0-5h-2z" fill="#F59E0B" />
        </svg>
      );

    case "Responsive Web Design":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <rect x="15" y="9" width="6" height="10" rx="1" fill="#09090b" stroke="#22D3EE" strokeWidth="1.5" />
        </svg>
      );

    case "Vite":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21.5 4.5l-9.1 16.2a.8.8 0 0 1-1.4 0L2.5 4.5a.8.8 0 0 1 .9-1.1l8.3 1.9a.8.8 0 0 0 .6 0l8.3-1.9a.8.8 0 0 1 .9 1.1z" fill="url(#viteGradient)" />
          <path d="M14.5 3.5L8.2 12.8a.5.5 0 0 0 .4.8h3.3l-1.4 6.9 7.2-10a.5.5 0 0 0-.4-.8H14l.5-6.2z" fill="#FFD62E" />
          <defs>
            <linearGradient id="viteGradient" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "Node.js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" fill="#333333" stroke="#5FA04E" strokeWidth="1.5" />
          <path d="M12 5.5l5.5 3.2v6.4L12 18.3 6.5 15.1V8.7L12 5.5z" fill="#5FA04E" fillOpacity="0.2" />
          <path d="M11 9.5v5m2-5v5m-4-3h6" stroke="#5FA04E" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case "Express.js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F4F4F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 8l4 8m0-8l-4 8m9-8h5c0 2-3 2.5-3 4.5s3 2.5 3 4.5h-5" />
          <circle cx="12" cy="12" r="10" stroke="#71717A" strokeWidth="1.2" strokeDasharray="3 3" />
        </svg>
      );

    case "REST API Development":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="3" />
          <circle cx="6" cy="12" r="1.5" fill="#38BDF8" />
          <path d="M10 9l3 3-3 3m5 0h3" />
        </svg>
      );

    case "JWT Authentication":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#000000" stroke="#333333" strokeWidth="1" />
          <path d="M12 2a10 10 0 0 1 8.66 5l-8.66 5V2z" fill="#FB015B" />
          <path d="M20.66 7A10 10 0 0 1 12 22v-10l8.66-5z" fill="#D63AFF" />
          <path d="M12 22A10 10 0 0 1 3.34 7L12 12v10z" fill="#00B9F1" />
          <circle cx="12" cy="12" r="3.2" fill="#000000" stroke="#FFFFFF" strokeWidth="0.8" />
        </svg>
      );

    case "MongoDB":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2C11.5 3.5 6 9.8 6 14.5c0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5C18 9.8 12.5 3.5 12 2z" fill="#47A248" />
          <path d="M12 2v19c-.3 0-.6-.1-.9-.2-2.3-1-3.6-3.3-3.6-5.8 0-3.8 3.5-9 4.5-13z" fill="#499D4A" />
          <path d="M12 22.5c-.3 0-.5-.5-.5-1v-4.5c0-.6.4-1 .9-1 .6 0 1 .4 1 1v4.5c0 .5-.2 1-.5 1-.3 0-.6 0-.9 0z" fill="#8CE185" />
        </svg>
      );

    case "MySQL":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#00758F" fillOpacity="0.15" stroke="#00758F" strokeWidth="1" />
          <path d="M6 16c1.5-4 4.5-6.5 8.5-7 2-.3 3.5.5 4.5 1.5-1.5-.2-2.8.2-3.8.9-1.5 1-2.5 2.6-3.5 4.6h-5.7z" fill="#00758F" />
          <path d="M18.5 10c-.5-1.5-1.8-2.5-3.5-2.5-3 0-5.5 2-7 5 1.5-1 3.2-1.5 5-1.5 2.2 0 4 .8 5.5 2l1.5-.5c-.5-.8-1-1.6-1.5-2.5z" fill="#F29111" />
        </svg>
      );

    case "Git":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21.6 10.9L13.1 2.4a1.6 1.6 0 0 0-2.3 0L8.5 4.7l3 3a1.9 1.9 0 0 1 2.4 2.4l2.9 2.9a1.9 1.9 0 1 1-1.1 1.1l-2.7-2.7v4.1a1.9 1.9 0 1 1-1.6 0V11a1.9 1.9 0 0 1-1-2.5L7.4 5.5 2.4 10.5a1.6 1.6 0 0 0 0 2.3l8.5 8.5a1.6 1.6 0 0 0 2.3 0l8.4-8.5a1.6 1.6 0 0 0 0-2.3z" fill="#F05032" />
        </svg>
      );

    case "GitHub":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );

    case "Postman":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#FF6C37" />
          <path d="M17.2 8.5c-.8-.8-2-.9-3-.4L10 10.3l-2.4-.6c-.5-.1-1 .1-1.3.5l-.2.2c-.3.4-.3 1 0 1.4l2.8 2.8 3.5 3.5c.4.4 1 .4 1.4 0l.2-.2c.4-.4.5-.9.4-1.4l-.6-2.4 2.2-4.2c.5-1 .4-2.1-.4-2.9z" fill="#FFFFFF" />
          <circle cx="15.5" cy="8.5" r="1" fill="#FF6C37" />
        </svg>
      );

    case "VS Code":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M17.5 2.2l4.8 2.3c.4.2.7.6.7 1v13c0 .4-.3.8-.7 1l-4.8 2.3a1 1 0 0 1-1.2-.3L9.6 15l-4.8 3.7a.8.8 0 0 1-1.1-.2l-2-2.5a.8.8 0 0 1 .1-1.1L6 12 1.8 8.1a.8.8 0 0 1-.1-1.1l2-2.5a.8.8 0 0 1 1.1-.2L9.6 9l6.7-6.5a1 1 0 0 1 1.2-.3z" fill="#007ACC" />
          <path d="M17.5 5.5L10 12l7.5 6.5V5.5z" fill="#1F9CF0" />
          <path d="M17.5 18.5l4-3V8.5l-4-3v13z" fill="#0065A9" />
        </svg>
      );

    case "Linux":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="13.5" rx="5.5" ry="7" fill="#FCC624" />
          <path d="M12 3c-3 0-5 2.5-5 5.5 0 2 .8 3.5 2 4.5v3.5c0 2 1.5 3.5 3 3.5s3-1.5 3-3.5V13c1.2-1 2-2.5 2-4.5 0-3-2-5.5-5-5.5z" fill="#18181B" />
          <circle cx="10" cy="7" r="1" fill="#FFFFFF" />
          <circle cx="14" cy="7" r="1" fill="#FFFFFF" />
          <circle cx="10" cy="7.2" r="0.5" fill="#000000" />
          <circle cx="14" cy="7.2" r="0.5" fill="#000000" />
          <path d="M10.5 9.5c.8.6 2.2.6 3 0l-.5 1.5h-2l-.5-1.5z" fill="#FFA500" />
          <ellipse cx="12" cy="14" rx="3.2" ry="4" fill="#FFFFFF" />
        </svg>
      );

    case "Bash":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#293138" />
          <path d="M5 8l4 4-4 4" stroke="#4EAA25" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="11" y1="16" x2="18" y2="16" stroke="#4EAA25" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case "Command-Line Tools":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <path d="M6 9l3 3-3 3" />
          <line x1="11" y1="15" x2="16" y2="15" />
        </svg>
      );

    case "GSAP":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#000000" stroke="#88CE02" strokeWidth="1" />
          <path d="M12 4a8 8 0 1 0 8 8h-4a4 4 0 1 1-4-4v4l5-5-5-5v2z" fill="#88CE02" />
        </svg>
      );

    case "ScrollTrigger":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#88CE02" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="6" y="2" width="12" height="20" rx="6" />
          <circle cx="12" cy="7" r="1.5" fill="#88CE02" />
          <path d="M12 12v4m-2-2l2 2 2-2" />
        </svg>
      );

    case "Lenis":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 18c4 0 5-12 8-12s4 12 8 12" />
          <circle cx="12" cy="12" r="2" fill="#22D3EE" />
        </svg>
      );

    case "Problem Solving":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18h6m-4 3h2m-1-18a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1.3c1.8-1.2 3-3.3 3-5.7a7 7 0 0 0-7-7z" />
          <path d="M10 10l2 2 4-4" stroke="#22D3EE" strokeWidth="1.8" />
        </svg>
      );

    case "Communication":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="13" y2="13" />
        </svg>
      );

    case "Teamwork":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case "Adaptability":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l6.73-5.19" />
          <polyline points="22 4 12 14 8 10" stroke="#22D3EE" strokeWidth="1.5" />
        </svg>
      );

    case "Continuous Learning":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          <path d="M12 7v10" />
        </svg>
      );

    case "Notion":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
          <path d="M5.5 6.5l3.2-.5 9.8 1.4v10.1l-3.2 1-9.8-1.5V6.5zm3.7 2.2L7 16.5h1.8l1.3-4.9 3.1 5.3 1.8-.4V8.7h-1.6v5.1l-2.9-5.1H9.2z" fill="#FFFFFF" />
        </svg>
      );

    case "Microsoft Excel":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#107C41" />
          <rect x="7" y="5" width="13" height="14" rx="1.5" fill="#FFFFFF" fillOpacity="0.2" />
          <path d="M4 6.5h8v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" fill="#0E6A37" />
          <path d="M6 9.5l2 2.5-2 2.5h1.5l1.2-1.6 1.3 1.6h1.5l-2-2.5 2-2.5h-1.5L8.7 11.1 7.5 9.5H6z" fill="#FFFFFF" />
        </svg>
      );

    case "Microsoft Word":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#185ABD" />
          <rect x="7" y="5" width="13" height="14" rx="1.5" fill="#FFFFFF" fillOpacity="0.2" />
          <path d="M4 6.5h8v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" fill="#104A9E" />
          <path d="M5.5 9.5l1.3 5h1.2l1-3.6 1 3.6h1.2l1.3-5h-1.3l-.7 3.5-.9-3.5h-1.2l-.9 3.5-.7-3.5H5.5z" fill="#FFFFFF" />
        </svg>
      );

    case "Microsoft PowerPoint":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#D83B01" />
          <rect x="7" y="5" width="13" height="14" rx="1.5" fill="#FFFFFF" fillOpacity="0.2" />
          <path d="M4 6.5h8v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" fill="#B73200" />
          <path d="M6.5 9.5h3c1.2 0 2 .7 2 1.8s-.8 1.8-2 1.8h-1.5v1.9H6.5v-5.5zm1.5 2.4h1.4c.5 0 .9-.3.9-.7s-.4-.7-.9-.7H8v1.4z" fill="#FFFFFF" />
        </svg>
      );

    case "Adobe Audition":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#001D26" stroke="#00E4BB" strokeWidth="1" />
          <text x="5" y="16.5" fill="#00E4BB" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
            Au
          </text>
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8m-4-4h8" />
        </svg>
      );
  }
}
