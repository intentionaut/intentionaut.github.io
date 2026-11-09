// Projects that also have a full page under /open-source/ live there only.
// Two URLs for one project split its search ranking, so the /projects/ copy
// is not built and its old path forwards (see src/pages/projects/<id>.astro).
export const OPEN_SOURCE_HOME: Record<string, string> = {
  kernic: '/open-source/kernic/',
  familiar: '/open-source/familiar/',
};

export const projectHref = (id: string) => OPEN_SOURCE_HOME[id] ?? `/projects/${id}/`;
