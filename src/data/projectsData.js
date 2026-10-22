import devstackPreviewImg from "../assets/projects/devstack-preview.webp";

/**
 * Projects Data Source
 * 
 * Centralized, reusable data source for all portfolio projects.
 * Used by ProjectsSection cards and the reusable ProjectDetailsPage template.
 * 
 * To add a new project in the future:
 * Simply add a new object to this array with the fields documented below.
 */
export const projectsData = [
  {
    id: "devstack",
    slug: "devstack",
    title: "DevStack — Technology Stack Explorer",
    category: "frontend",
    categoryLabel: "Frontend · React Practice Project",
    projectType: "client-side",
    status: "Completed",
    subtitle:
      "Explore development technologies, compare their ratings and popularity, and build a personalized tech stack.",
    shortDescription:
      "DevStack is a React-based practice project built to apply and strengthen React development skills through an interactive interface.",
    fullDescription:
      "DevStack is an interactive web application designed to help developers explore, evaluate, and assemble modern software development stacks. Built with React 19, Vite, Tailwind CSS, and DaisyUI, DevStack delivers a responsive catalog of developer tools with ratings, popularity indicators, and stack management. Users can browse technology cards, view real-time badges, dynamically assemble a personalized tech stack drawer, and receive instant toast feedback upon adding or removing tools.",
    capabilities: [
      "Browse technologies through interactive technology cards.",
      "View technology ratings and popularity badges.",
      "Add technologies to a personalized stack with live counter feedback.",
      "Remove technologies from the selected stack at any time.",
      "Interact with a responsive interface built using modern frontend tools.",
    ],
    technologies: ["React", "JavaScript", "Vite", "Tailwind CSS", "DaisyUI"],
    tech: ["React", "JavaScript", "Vite", "Tailwind CSS", "DaisyUI"], // backward-compatibility alias
    liveUrl: "https://dev-stack-project-xi.vercel.app/",
    demo: "https://dev-stack-project-xi.vercel.app/", // backward-compatibility alias
    githubUrl: "https://github.com/mahbubalamabid/DevStack-Project",
    github: "https://github.com/mahbubalamabid/DevStack-Project", // backward-compatibility alias
    previewImg: devstackPreviewImg,
    image: devstackPreviewImg, // backward-compatibility alias
    accent: "from-cyan-500/20 via-teal-500/10 to-transparent",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    isPlaceholder: false,
    challenges: [
      {
        title: "Dynamic State Synchronization for Tech Stack Selection",
        description:
          "Managing reactive state across technology cards and a custom stack drawer while preventing duplicate selections, allowing seamless removal, and keeping badge states in sync.",
      },
      {
        title: "Responsive Multi-Card Layouts & Visual Polish",
        description:
          "Maintaining consistent card alignment, legible typography, and balanced spacing across varied badge counts and different device viewports without layout shifts.",
      },
    ],
    solutions: [
      {
        title: "Declarative React State Handlers & Toast Feedback",
        description:
          "Structured declarative state handlers that validate stack additions before updating, paired with non-intrusive toast notifications to provide immediate user feedback.",
      },
      {
        title: "Utility-First Tailwind CSS & DaisyUI Composition",
        description:
          "Leveraged responsive Tailwind utility grids and DaisyUI components to provide robust visual contrast, fluid badge wrapping, and consistent touch targets.",
      },
    ],
    futureImprovements: [
      {
        title: "Persistent Stack Storage with LocalStorage",
        description:
          "Save the user's custom technology stack into browser LocalStorage so selections persist across page reloads and return visits.",
      },
      {
        title: "Live Category Filtering & Real-Time Search",
        description:
          "Add quick-search keywords and multi-category filtering (Frontend, Backend, Database, DevOps) to swiftly explore larger technology catalogs.",
      },
      {
        title: "Stack Export & Markdown Sharing",
        description:
          "Allow developers to export their selected stack as JSON or copy a pre-formatted Markdown badge snippet for GitHub README files.",
      },
    ],
  },
  {
    id: "placeholder-project",
    slug: "placeholder-project",
    title: "Project details coming soon",
    category: "upcoming",
    categoryLabel: "Upcoming Release",
    projectType: "client-side",
    status: "In Development",
    accent: "from-white/[0.04] to-transparent",
    isPlaceholder: true,
  },
];

/**
 * Retrieve all projects
 */
export function getAllProjects() {
  return projectsData;
}

/**
 * Retrieve project by slug or ID (case-insensitive)
 * Returns null if not found
 */
export function getProjectBySlug(slug) {
  if (!slug) return null;
  const normalized = String(slug).toLowerCase().trim();
  return (
    projectsData.find(
      (p) =>
        (p.slug && p.slug.toLowerCase() === normalized) ||
        (p.id && p.id.toLowerCase() === normalized)
    ) || null
  );
}
