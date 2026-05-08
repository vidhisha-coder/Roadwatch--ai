export type Severity = "Low" | "Medium" | "High" | "Critical";

export function predictSeverity(text: string): Severity {
  const t = text.toLowerCase();

  if (
    t.includes("accident") ||
    t.includes("flood") ||
    t.includes("blocked") ||
    t.includes("danger")
  ) {
    return "Critical";
  }

  if (
    t.includes("large pothole") ||
    t.includes("broken") ||
    t.includes("crack")
  ) {
    return "High";
  }

  if (
    t.includes("pothole") ||
    t.includes("streetlight") ||
    t.includes("damage")
  ) {
    return "Medium";
  }

  return "Low";
}