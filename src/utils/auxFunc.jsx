function truncate(string) {
  return string.substring(0, 100) + "...";
}

function rankingColor(ranking) {
  if (ranking <= 5) return "has-text-danger";
  else if (ranking > 5 && ranking < 8) return "has-text-warning-dark";
  else return "has-text-success";
}

function headingName(pathname) {
  const headings = {
    "/search": "Search Results",
    "/movies": "Top Rated Movies",
    "/shows": "Top Rated Shows",
    "/": "Trending Shows and Movies",
  };

  return headings[pathname] || "";
}
export { truncate, rankingColor, headingName };
