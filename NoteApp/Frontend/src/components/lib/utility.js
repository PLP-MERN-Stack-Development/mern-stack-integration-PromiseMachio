// utility.js
export function formatDate(date) {
  if (!date) return ""; // prevent crash if date is undefined
  const d = new Date(date); // ✅ Convert string → Date
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
