export function generateBreadcrumbs(pathname: string) {
  if (!pathname || pathname === "/") {
    return [
      { name: "Home", url: "/" }
    ];
  }

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { name: "Home", url: "/" }
  ];

  let current = "";

  for (const segment of segments) {
    current += `/${segment}`;
    breadcrumbs.push({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      url: current
    });
  }

  return breadcrumbs;
}
