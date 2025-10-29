document.addEventListener('DOMContentLoaded', () => {
  // DOM refs
    const clientName = document.getElementById("name");
    const hourlyRate = document.getElementById("rate");
    const hours = document.getElementById("hours");
    const jobDesc = document.getElementById("jobDesc");
    const template = document.getElementById("templateDropdown");
    const output = document.getElementById("proposalOutput");
    const generate = document.getElementById("generate");
    const save = document.getElementById("save"); // <-- was missing

  // Defensive check: make sure required elements exist
    if (!generate || !save || !output) {
        console.error("Missing essential DOM elements:", { generate, save, output });
        return;
    }

  // Load saved draft (if any)
    const savedDraft = JSON.parse(localStorage.getItem("proposalDraft"));
    if (savedDraft) {
        clientName.value = savedDraft.clientName || "";
        hourlyRate.value = savedDraft.hourlyRate || "";
        hours.value = savedDraft.hours || "";
        jobDesc.value = savedDraft.jobDesc || "";
        template.value = savedDraft.template || "";
        console.info("Loaded draft from localStorage.");
    }

  // Generate proposal on click
    generate.addEventListener("click", () => {
    // basic validation
    if (!clientName.value || !hourlyRate.value || !hours.value || !jobDesc.value) {
        alert("Please fill in client name, hourly rate, estimated hours and job description.");
        return;
        }

    const total = (parseFloat(hourlyRate.value) * parseFloat(hours.value)).toFixed(2);

    const proposal = `
        <h3>Proposal for ${escapeHtml(clientName.value)}</h3>
        <p><strong>Project:</strong> ${nl2br(escapeHtml(jobDesc.value))}</p>
        <p><strong>Estimated Hours:</strong> ${escapeHtml(hours.value)}</p>
        <p><strong>Hourly Rate:</strong> $${escapeHtml(hourlyRate.value)}/hr</p>
        <p><strong>Total Estimated Cost:</strong> $${escapeHtml(total)}</p>
        <p><strong>Selected Template:</strong> ${escapeHtml(template.value)}</p>
        <p>Thank you for considering this proposal. Looking forward to collaborating!</p>
    `;

    output.innerHTML = proposal;
    });

  // Save draft on click
    save.addEventListener("click", () => {
    const draft = {
        clientName: clientName.value || "",
        hourlyRate: hourlyRate.value || "",
        hours: hours.value || "",
        jobDesc: jobDesc.value || "",
        template: template.value || ""
    };
    localStorage.setItem("proposalDraft", JSON.stringify(draft));
    // nice non-blocking toast: minimal fallback to alert for now
    if (window.Toastify) {
        Toastify({ text: "Draft saved ✔", duration: 1500 }).showToast();
    } else {
        alert("Draft saved!");
    }
    });
    
    // Download PDF on click
    const download = document.getElementById("download");
    download.addEventListener("click", () => {
        const output = document.getElementById("proposalOutput");
        if (!output.innerHTML.trim()) {
            alert("Please generate the proposal first.");
            return;
        }
        const element = output;
        const opt = {
            margin:       0.5,
            filename:     'proposal.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();
    });

  // --- helpers ---
    function escapeHtml(unsafe) {
    if (!unsafe) return "";
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function nl2br(str) {
    if (!str) return "";
    return str.replace(/\n/g, "<br/>");
    }
});
