"use client";

import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { COURSES, getRecommendedCourses } from "@/lib/data";
import { CourseCard } from "@/components/course-card";
import { FlagIndicator } from "@/components/flag-indicator";
import { FLAGS } from "@/lib/growthbook";

const CATEGORIES = ["All", ...Array.from(new Set(COURSES.map((c) => c.category)))];

export default function CoursesPage() {
  // Flag: AI-powered recommendations vs. popularity sort
  const aiRecsEnabled = useFeatureIsOn(FLAGS.AI_RECOMMENDATIONS);

  // When AI recs are on, show personalized suggestions at the top
  // (in a real app, this would come from a recommendation API)
  const recommendedCourses = aiRecsEnabled
    ? getRecommendedCourses("", ["typescript", "react", "node"])
    : null;

  const sortedCourses = aiRecsEnabled
    ? [...COURSES].sort((a, b) => (a.isFree === b.isFree ? 0 : a.isFree ? -1 : 1))
    : [...COURSES].sort((a, b) => b.durationMin - a.durationMin);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Courses</h1>
          <p className="mt-1 text-zinc-400">
            {aiRecsEnabled
              ? "Personalized picks based on your skill profile"
              : `${COURSES.length} courses sorted by popularity`}
          </p>
        </div>

        <FlagIndicator
          flagKey={FLAGS.AI_RECOMMENDATIONS}
          value={aiRecsEnabled}
          label={aiRecsEnabled ? "AI sort" : "Popularity sort"}
        />
      </div>

      {/* AI-recommended section (only when flag is ON) */}
      {aiRecsEnabled && recommendedCourses && recommendedCourses.length > 0 && (
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">Recommended for you</h2>
            <span className="rounded-full bg-indigo-900/50 px-2 py-0.5 text-xs font-medium text-indigo-400">
              AI
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* Category filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white first:border-indigo-600 first:text-indigo-400"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* All courses grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedCourses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}
