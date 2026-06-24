export type Course = {
  slug: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationMin: number;
  lessonCount: number;
  isFree: boolean;
  color: string;
  tags: string[];
};

export type Lesson = {
  id: string;
  courseSlug: string;
  title: string;
  durationMin: number;
  hasCode: boolean;
  body: string;
};

export const COURSES: Course[] = [
  {
    slug: "typescript-fundamentals",
    title: "TypeScript Fundamentals",
    description:
      "Master the type system that powers modern JavaScript projects — generics, narrowing, utility types, and more.",
    category: "Language",
    level: "Beginner",
    durationMin: 180,
    lessonCount: 4,
    isFree: true,
    color: "#3178c6",
    tags: ["typescript", "javascript", "types"],
  },
  {
    slug: "react-patterns",
    title: "Advanced React Patterns",
    description:
      "Compound components, render props, custom hooks, and performance patterns that scale in production.",
    category: "Frontend",
    level: "Advanced",
    durationMin: 240,
    lessonCount: 4,
    isFree: false,
    color: "#61dafb",
    tags: ["react", "patterns", "hooks", "frontend"],
  },
  {
    slug: "node-apis",
    title: "Building REST APIs with Node.js",
    description:
      "Design and build production-ready REST APIs with Express, validation, auth middleware, and OpenAPI docs.",
    category: "Backend",
    level: "Intermediate",
    durationMin: 210,
    lessonCount: 4,
    isFree: false,
    color: "#68a063",
    tags: ["node", "express", "api", "backend"],
  },
  {
    slug: "docker-containers",
    title: "Docker for Developers",
    description:
      "Containerize your apps, write multi-stage Dockerfiles, and orchestrate services with Docker Compose.",
    category: "DevOps",
    level: "Beginner",
    durationMin: 150,
    lessonCount: 4,
    isFree: true,
    color: "#2496ed",
    tags: ["docker", "containers", "devops"],
  },
  {
    slug: "sql-for-devs",
    title: "SQL for Developers",
    description:
      "Go beyond SELECT * — window functions, CTEs, query planning, and indexing strategies for backend engineers.",
    category: "Database",
    level: "Intermediate",
    durationMin: 200,
    lessonCount: 4,
    isFree: false,
    color: "#f29111",
    tags: ["sql", "database", "postgres"],
  },
  {
    slug: "git-advanced",
    title: "Git: Beyond the Basics",
    description:
      "Interactive rebases, bisect, reflog, worktrees, and the mental model that makes Git finally click.",
    category: "Tooling",
    level: "Intermediate",
    durationMin: 120,
    lessonCount: 4,
    isFree: true,
    color: "#f05032",
    tags: ["git", "version-control", "tooling"],
  },
];

export const LESSONS: Lesson[] = [
  // TypeScript Fundamentals
  {
    id: "ts-1",
    courseSlug: "typescript-fundamentals",
    title: "Why TypeScript?",
    durationMin: 12,
    hasCode: false,
    body: "We start with the question every developer asks: why add types to JavaScript? We'll look at real bugs that TypeScript catches at compile time, explore the developer experience improvements, and understand the tradeoff between flexibility and safety.",
  },
  {
    id: "ts-2",
    courseSlug: "typescript-fundamentals",
    title: "The Type System",
    durationMin: 28,
    hasCode: true,
    body: "Primitives, unions, intersections, and literal types. We'll build intuition for how TypeScript's structural type system works — and why `{ name: string }` is assignable to `{ name: string; age?: number }` but not the other way around.",
  },
  {
    id: "ts-3",
    courseSlug: "typescript-fundamentals",
    title: "Generics in Depth",
    durationMin: 35,
    hasCode: true,
    body: "Generics are TypeScript's superpower. We'll write generic functions, constrain type parameters, and build utility types from scratch. By the end you'll understand how `Pick`, `Omit`, and `ReturnType` work under the hood.",
  },
  {
    id: "ts-4",
    courseSlug: "typescript-fundamentals",
    title: "Narrowing & Type Guards",
    durationMin: 22,
    hasCode: true,
    body: "TypeScript's control flow analysis tracks types through `if` statements, `switch` cases, and `instanceof` checks. We'll write custom type guards and discriminated unions to make impossible states unrepresentable.",
  },
  // React Patterns
  {
    id: "react-1",
    courseSlug: "react-patterns",
    title: "Compound Components",
    durationMin: 30,
    hasCode: true,
    body: "The compound component pattern lets you build flexible APIs like `<Select>` and `<Tabs>` that share state through React Context without prop drilling. We'll build one from scratch.",
  },
  {
    id: "react-2",
    courseSlug: "react-patterns",
    title: "Custom Hook Architecture",
    durationMin: 40,
    hasCode: true,
    body: "Custom hooks are the primary unit of logic reuse in React. We'll cover co-location, separation of concerns, and how to design hooks that are easy to test and compose.",
  },
  {
    id: "react-3",
    courseSlug: "react-patterns",
    title: "Performance Patterns",
    durationMin: 35,
    hasCode: true,
    body: "When to use `useMemo`, `useCallback`, and `memo` — and when not to. We'll use React DevTools Profiler to find real bottlenecks and apply targeted optimizations.",
  },
  {
    id: "react-4",
    courseSlug: "react-patterns",
    title: "Server Components Deep Dive",
    durationMin: 45,
    hasCode: true,
    body: "React Server Components change the mental model. We'll cover the server/client boundary, data fetching patterns, and how to structure an app that uses both effectively.",
  },
  // Node APIs
  {
    id: "node-1",
    courseSlug: "node-apis",
    title: "Express Fundamentals",
    durationMin: 25,
    hasCode: true,
    body: "Routing, middleware, request/response lifecycle. We'll build a minimal but production-shaped API that handles errors consistently and is easy to test.",
  },
  {
    id: "node-2",
    courseSlug: "node-apis",
    title: "Validation & Error Handling",
    durationMin: 30,
    hasCode: true,
    body: "Zod for runtime validation, typed errors, and a global error handler that returns consistent JSON responses — even for unexpected failures.",
  },
  {
    id: "node-3",
    courseSlug: "node-apis",
    title: "Authentication Middleware",
    durationMin: 40,
    hasCode: true,
    body: "JWT verification, refresh token rotation, and role-based authorization middleware. We'll also cover common mistakes that lead to security vulnerabilities.",
  },
  {
    id: "node-4",
    courseSlug: "node-apis",
    title: "OpenAPI Docs with Zod",
    durationMin: 25,
    hasCode: true,
    body: "Generate an OpenAPI spec directly from your Zod schemas so your docs stay in sync with your code. We'll wire it into Swagger UI for an interactive API explorer.",
  },
  // Docker
  {
    id: "docker-1",
    courseSlug: "docker-containers",
    title: "Containers vs. VMs",
    durationMin: 15,
    hasCode: false,
    body: "What containers actually are at the OS level — namespaces, cgroups, and copy-on-write filesystems. Understanding this makes everything else about Docker click.",
  },
  {
    id: "docker-2",
    courseSlug: "docker-containers",
    title: "Writing a Production Dockerfile",
    durationMin: 30,
    hasCode: true,
    body: "Multi-stage builds, layer caching strategy, running as non-root, and minimizing image size. We'll take a naive Dockerfile and make it production-ready step by step.",
  },
  {
    id: "docker-3",
    courseSlug: "docker-containers",
    title: "Docker Compose for Local Dev",
    durationMin: 35,
    hasCode: true,
    body: "Composing a full local stack with a Node API, Postgres, and Redis. We'll cover environment variables, volume mounts, health checks, and service dependencies.",
  },
  {
    id: "docker-4",
    courseSlug: "docker-containers",
    title: "Debugging Containers",
    durationMin: 20,
    hasCode: true,
    body: "Exec into running containers, read logs, inspect network traffic, and debug crashes from init. These skills will save you hours of frustration.",
  },
  // SQL
  {
    id: "sql-1",
    courseSlug: "sql-for-devs",
    title: "JOINs, Explained",
    durationMin: 25,
    hasCode: true,
    body: "INNER, LEFT, RIGHT, and FULL OUTER joins with visual explanations and performance implications. We'll also cover self-joins and anti-joins using NOT EXISTS.",
  },
  {
    id: "sql-2",
    courseSlug: "sql-for-devs",
    title: "Window Functions",
    durationMin: 40,
    hasCode: true,
    body: "ROW_NUMBER, RANK, LAG, LEAD, and moving averages. Window functions replace a surprising number of self-joins and subqueries with cleaner, faster SQL.",
  },
  {
    id: "sql-3",
    courseSlug: "sql-for-devs",
    title: "CTEs & Recursive Queries",
    durationMin: 30,
    hasCode: true,
    body: "Common table expressions make complex queries readable and reusable. We'll also cover recursive CTEs for tree structures like org charts and comment threads.",
  },
  {
    id: "sql-4",
    courseSlug: "sql-for-devs",
    title: "Query Planning & Indexes",
    durationMin: 35,
    hasCode: true,
    body: "EXPLAIN ANALYZE, index types, and why your query is slow. We'll cover partial indexes, covering indexes, and when composite indexes help versus hurt.",
  },
  // Git
  {
    id: "git-1",
    courseSlug: "git-advanced",
    title: "The Object Model",
    durationMin: 20,
    hasCode: false,
    body: "Blobs, trees, commits, and refs — Git's four object types. Once you understand the DAG, commands like rebase, cherry-pick, and reflog stop being magic.",
  },
  {
    id: "git-2",
    courseSlug: "git-advanced",
    title: "Interactive Rebase",
    durationMin: 25,
    hasCode: true,
    body: "Squash, fixup, reorder, and drop commits. We'll use interactive rebase to clean up a messy branch before a PR review — a workflow every senior engineer uses.",
  },
  {
    id: "git-3",
    courseSlug: "git-advanced",
    title: "Bisect & Blame",
    durationMin: 20,
    hasCode: true,
    body: "Binary search through commit history to find when a bug was introduced. Combined with `git blame` and `git log -S`, this is the fastest way to debug a regression.",
  },
  {
    id: "git-4",
    courseSlug: "git-advanced",
    title: "Worktrees & Reflog",
    durationMin: 20,
    hasCode: true,
    body: "Check out multiple branches simultaneously with worktrees, and recover from any mistake with the reflog. These two features alone are worth watching this course.",
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getLessons(courseSlug: string): Lesson[] {
  return LESSONS.filter((l) => l.courseSlug === courseSlug);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getRecommendedCourses(currentSlug: string, tags: string[]): Course[] {
  return COURSES.filter(
    (c) => c.slug !== currentSlug && c.tags.some((t) => tags.includes(t))
  ).slice(0, 3);
}
