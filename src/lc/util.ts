import { useEffect } from "react";
import { caseStudies, type CaseStudy } from "@/data/site";

export const caseBySlug = (slug: string): CaseStudy | undefined => caseStudies.find((c) => c.slug === slug);

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
