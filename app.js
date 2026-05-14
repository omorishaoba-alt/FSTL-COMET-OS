let step = "INPUT";
let payload = "";
let reference = "";

const app = document.getElementById("app");

function render() {

  let html = "";

  if (step === "INPUT") {
    html = `
      <div class="block">Enter Transaction Payload</div>
      <textarea id="payloadInput"></textarea>
      <button class="primary" onclick="next()">CONTINUE</button>
    `;
  }

  if (step === "VALIDATION") {
    html = `
      <div class="block">Validating transaction...</div>
      <button class="primary" onclick="next()">CONTINUE</button>
    `;
  }

  if (step === "REVIEW") {
    html = `
      <div class="block">Review Payload</div>
      <pre>${payload}</pre>
      <button class="primary" onclick="next()">PROCESS</button>
      <button class="secondary" onclick="back()">BACK</button>
    `;
  }

  if (step === "LOCKED") {
    html = `
      <div class="block">Transaction Locked</div>
      <div class="block">Reference: ${reference}</div>
      <button class="primary" onclick="next()">GENERATE PDF</button>
    `;
  }

  if (step === "PDF") {
    html = `
      <div class="block">PDF Ready</div>
      <button class="primary" onclick="downloadPDF(payload, reference)">DOWNLOAD</button>
    `;
  }

  app.innerHTML = html;
}

window.next = function () {

  if (step === "INPUT") {
    payload = document.getElementById("payloadInput").value;
    step = "VALIDATION";
  }

  else if (step === "VALIDATION") {
    reference = "COMET-" + Date.now();
    step = "REVIEW";
  }

  else if (step === "REVIEW") {
    step = "LOCKED";
  }

  else if (step === "LOCKED") {
    step = "PDF";
  }

  render();
};

window.back = function () {
  if (step === "REVIEW") step = "VALIDATION";
  else if (step === "LOCKED") step = "REVIEW";
  render();
};

render();
