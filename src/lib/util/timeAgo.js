function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const units = [
    { name: "years", seconds: 60 * 60 * 24 * 365 },
    { name: "months", seconds: 60 * 60 * 24 * 30 },
    { name: "days", seconds: 60 * 60 * 24 },
    { name: "hours", seconds: 60 * 60 },
    { name: "minutes", seconds: 60 },
    { name: "seconds", seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value > 0) {
      return `${value} ${unit.name} ago`;
    }
  }
  return "Just now";
}

export default timeAgo;
