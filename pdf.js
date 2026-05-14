function downloadPDF(payload, reference) {

  const content = `
COMET OS TRANSACTION RECORD

Reference: ${reference}

STATUS: LOCKED

PAYLOAD:
${payload}
  `;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = reference + ".txt";
  a.click();

  URL.revokeObjectURL(url);
}
