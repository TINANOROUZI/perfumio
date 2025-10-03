export async function fetchCSV(url: string): Promise<string> {
  const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1h
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`);
  return res.text();
}

export function parseCSV(csv: string): Array<Record<string, string>> {
  const lines = csv.trim().split(/\r?\n/);
  const headers = lines.shift()?.split(",").map((h) => h.trim()) || [];
  return lines.map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = cols[i] ?? ""));
    return obj;
  });
}
