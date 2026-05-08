export type Issue = {
  id: number;
  title: string;
  location: string;
  lat: number;
  lng: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
  description: string;
};

class IssueStore {
  private issues: Issue[] = [];

  // 📥 GET ALL ISSUES
  getAll() {
    return this.issues;
  }

  // ➕ ADD ISSUE
  add(issue: Issue) {
    this.issues.unshift(issue);

    // 🔥 notify UI everywhere
    window.dispatchEvent(new Event("issues-update"));
  }
}

// ✅ SINGLE EXPORT INSTANCE
export const issueStore = new IssueStore();