import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
 // make sure this is imported

function App() {
  const [clientName, setClientName] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hours, setHours] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [template, setTemplate] = useState("");
  const [proposal, setProposal] = useState("");

  // ✅ Load saved draft from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("proposalDraft"));
    if (saved) {
      setClientName(saved.clientName || "");
      setHourlyRate(saved.hourlyRate || "");
      setHours(saved.hours || "");
      setJobDesc(saved.jobDesc || "");
      setTemplate(saved.template || "");
    }
  }, []);

  // ✅ Auto-update live preview
  useEffect(() => {
    if (!clientName && !hourlyRate && !hours && !jobDesc) {
      setProposal("");
      return;
    }

    const total =
      hourlyRate && hours ? (parseFloat(hourlyRate) * parseFloat(hours)).toFixed(2) : "—";

    const generated = `
      <h3>Proposal for ${clientName || "Client"}</h3>
      <p><strong>Project:</strong> ${jobDesc ? jobDesc.replace(/\n/g, "<br/>") : "No description yet."}</p>
      <p><strong>Estimated Hours:</strong> ${hours || "—"}</p>
      <p><strong>Hourly Rate:</strong> $${hourlyRate || "—"}/hr</p>
      <p><strong>Total Estimated Cost:</strong> $${total}</p>
      
      <p>Thank you for considering this proposal. Looking forward to collaborating!</p>
    `;
    setProposal(generated);
  }, [clientName, hourlyRate, hours, jobDesc, template]);

  // ✅ Fade-in effect for live preview
  useEffect(() => {
    const preview = document.querySelector(".preview-content");
    if (preview) {
      preview.classList.remove("fade-in");
      void preview.offsetWidth; // restart animation
      preview.classList.add("fade-in");
    }
  }, [proposal]);

  // ✅ Save draft locally
  const handleSave = () => {
    const draft = { clientName, hourlyRate, hours, jobDesc, template };
    localStorage.setItem("proposalDraft", JSON.stringify(draft));
    alert("Draft saved ✔");
  };

  // ✅ Generate PDF
  const generatePDF = () => {
    const element = document.querySelector(".preview-content");
    if (!element || !proposal) {
      alert("Please fill in the fields first!");
      return;
    }

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`proposal_${clientName || "draft"}.pdf`);
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Freelance Proposal Generator</h1>
      </header>

      <main className="app-main">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <form className="proposal-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="name">Client Name</label>
              <input
                type="text"
                id="name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="rate">Hourly Rate</label>
              <input
                type="number"
                id="rate"
                min="0"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="hours">Estimated Hours</label>
              <input
                type="number"
                id="hours"
                min="1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="jobDesc">Job Description</label>
              <textarea
                id="jobDesc"
                rows="6"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              ></textarea>
            </div>

            <div className="field">
              <label htmlFor="templateDropdown">Template</label>
              <select
                id="templateDropdown"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
              >
                <option value="">Choose a template</option>
                <option value="Template 1">Template 1</option>
                <option value="Template 2">Template 2</option>
                <option value="Template 3">Template 3</option>
              </select>
            </div>

            <div className="actions">
              <button type="button" className="btn btn-primary">
                Let's Cook
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleSave}>
                Save as Draft
              </button>
              <button type="button" onClick={generatePDF} className="btn btn-ghost">
                Download Proposal
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="preview-header">
            <h2>Live Proposal Preview</h2>
          </div>
          <div
            className={`preview-content ${
              template ? template.toLowerCase().replace(/\s+/g, "") : ""
            }`}
            dangerouslySetInnerHTML={{ __html: proposal }}
          ></div>
        </div>
      </main>

      <footer className="app-footer">
        <a
          href="https://www.linkedin.com/in/rishikesh-bhatt-906833316/"
          className="footer-link"
        >
          About
        </a>
        <p className="footer-text">Contact: rishikesh.bhatt24@spit.ac.in</p>
      </footer>
    </div>
  );
}

export default App;
