export function exportToCSV<T extends object>(data: T[], fileName: string) {
  if (data.length === 0) {
    alert("No data to export.");
    return;
  }

  const headers = Object.keys(data[0]) as Array<keyof T>;

  const escapeCsvValue = (value: unknown) =>
    `"${String(value ?? "").replaceAll('"', '""')}"`;

  const csvRows = [
    headers.map((header) => escapeCsvValue(String(header))).join(","),
    ...data.map((row) =>
      headers
        .map((field) => escapeCsvValue(row[field]))
        .join(",")
    ),
  ];

  const csvString = csvRows.join("\n");

  const blob = new Blob(["\uFEFF", csvString], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
