import { useState, useEffect, useCallback } from "react";
import { RouterContext } from "./routerContextDef.js";
import { useRouter } from "./useRouter";

const rawBase = import.meta.env.BASE_URL || "/";
const normalizedBase = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

/**
 * Normalizes pathname by stripping Vite's BASE_URL prefix if present
 */
function normalizePath(pathname) {
  let path = pathname;
  if (normalizedBase && path.startsWith(normalizedBase)) {
    path = path.slice(normalizedBase.length);
  }
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  return path;
}

/**
 * Resolves route object based on normalized pathname
 */
function resolveRoute(pathname) {
  const path = normalizePath(pathname);

  // Home route
  if (path === "/" || path === "") {
    return { type: "home", slug: null };
  }

  // Project details route: /projects/:slug
  const projectMatch = path.match(/^\/projects\/([a-zA-Z0-9_-]+)\/?$/);
  if (projectMatch) {
    return {
      type: "project-details",
      slug: projectMatch[1],
    };
  }

  // Not found
  return {
    type: "not-found",
    slug: null,
    invalidPath: path,
  };
}

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== "undefined") {
      return normalizePath(window.location.pathname);
    }
    return "/";
  });

  const [route, setRoute] = useState(() => {
    if (typeof window !== "undefined") {
      return resolveRoute(window.location.pathname);
    }
    return { type: "home", slug: null };
  });

  // Scroll to target hash or top
  const handleScrollForPath = useCallback((path, hash) => {
    const isProjectDetails = path.startsWith("/projects/");

    if (isProjectDetails) {
      // Scroll to top immediately for details page
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      return;
    }

    // Returning to home with a hash
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -60, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 80);
    } else if (path === "/" || path === "") {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, []);

  // Listen to browser popstate (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const newPath = normalizePath(window.location.pathname);
      setCurrentPath(newPath);
      setRoute(resolveRoute(window.location.pathname));
      handleScrollForPath(newPath, window.location.hash);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handleScrollForPath]);

  // Navigate function
  const navigate = useCallback(
    (to, options = {}) => {
      if (typeof window === "undefined") return;

      const [targetPathWithBase, targetHash] = to.split("#");
      const hash = targetHash ? `#${targetHash}` : "";

      let targetPath = targetPathWithBase;
      if (!targetPath && hash) {
        // Just a hash on the current page
        targetPath = currentPath;
      }

      const fullUrl = `${targetPath}${hash}`;
      const normalized = normalizePath(targetPath);

      if (options.replace) {
        window.history.replaceState(null, "", fullUrl);
      } else {
        window.history.pushState(null, "", fullUrl);
      }

      setCurrentPath(normalized);
      setRoute(resolveRoute(targetPath));
      handleScrollForPath(normalized, hash);
    },
    [currentPath, handleScrollForPath]
  );

  const goBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/#projects");
    }
  }, [navigate]);

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        route,
        navigate,
        goBack,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function Link({ to, children, className = "", onClick, ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    // Let browser handle middle-click, Ctrl+click, Cmd+click, or shift-click for new tabs
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      props.target === "_blank"
    ) {
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
