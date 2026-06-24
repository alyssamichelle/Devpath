"use client";

import Link from "next/link";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { COURSES } from "@/lib/data";
import { FlagIndicator } from "@/components/flag-indicator";
import { FLAGS } from "@/lib/growthbook";

// Mock user progress data
const MOCK_PROGRESS = [
  { courseSlug: "typescript-fundamentals", completedLessons: 3, totalLessons: 4 },
  { courseSlug: "git-advanced", completedLessons: 1, totalLessons: 4 },
  { courseSlug: "docker-containers", completedLessons: 2, totalLessons: 4 },
];

const MOCK_STATS = {
  streak: 7,
  totalLessons: 6,
  hoursLearned: 4.5,
  xp: 1240,
};

export default function DashboardPage() {
  // Flag: new dashboard layout with XP, streaks, and progress rings
  const newLayout = useFeatureIsOn(FLAGS.NEW_DASHBOARD_LAYOUT);

  const inProgressCourses = MOCK_PROGRESS.map((p) => ({
    ...p,
    course: COURSES.find((c) => c.slug === p.courseSlug)!,
    pct: Math.round((p.completedLessons / p.totalLessons) * 100),
  })).filter((p) => p.course);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Learning</h1>
          <p className="mt-1 text-zinc-400">
            {newLayout ? "Your progress, XP, and learning streak" : "Your courses in progress"}
          </p>
        </div>
        <FlagIndicator
          flagKey={FLAGS.NEW_DASHBOARD_LAYOUT}
          value={newLayout}
          label={newLayout ? "new layout" : "classic layout"}
        />
      </div>

      {/* New layout: stats strip with XP and streak */}
      {newLayout && (
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center">
            <p className="text-3xl font-bold text-amber-400">{MOCK_STATS.streak}</p>
            <p className="mt-1 text-xs text-zinc-500">day streak</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center">
            <p className="text-3xl font-bold text-white">{MOCK_STATS.totalLessons}</p>
            <p className="mt-1 text-xs text-zinc-500">lessons done</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center">
            <p className="text-3xl font-bold text-white">{MOCK_STATS.hoursLearned}h</p>
            <p className="mt-1 text-xs text-zinc-500">learning time</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center">
            <p className="text-3xl font-bold text-indigo-400">{MOCK_STATS.xp}</p>
            <p className="mt-1 text-xs text-zinc-500">XP earned</p>
          </div>
        </div>
      )}

      {/* In-progress courses */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Continue learning</h2>
        <div className="flex flex-col gap-4">
          {inProgressCourses.map(({ course, completedLessons, totalLessons, pct }) => (
            <div
              key={course.slug}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: course.color }}
                    />
                    <span className="text-xs text-zinc-500">{course.category}</span>
                  </div>
                  <h3 className="font-semibold text-white">{course.title}</h3>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {completedLessons} of {totalLessons} lessons complete
                  </p>
                </div>

                {/* New layout: circular progress ring; classic: percentage text */}
                {newLayout ? (
                  <CircleProgress pct={pct} color={course.color} />
                ) : (
                  <span className="text-sm font-medium text-zinc-400">{pct}%</span>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 rounded-full bg-zinc-800">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: course.color }}
                />
              </div>

              <div className="mt-3 flex justify-end">
                <Link
                  href={`/courses/${course.slug}`}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Continue →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse more */}
      <div className="mt-8 text-center">
        <Link
          href="/courses"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Browse more courses →
        </Link>
      </div>
    </div>
  );
}

function CircleProgress({ pct, color }: { pct: number; color: string }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="shrink-0 -rotate-90">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#27272a" strokeWidth="4" />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}
