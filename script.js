function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  // Collect values
  const name = document.getElementById('name').value;
  const jobTitle = document.getElementById('jobTitle').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;
  const email = document.getElementById('email').value;
  const profile = document.getElementById('profile').value;
  const experience = document.getElementById('experience').value.split("\n").filter(l=>l.trim()!=="");
  const education = document.getElementById('education').value;
  const skills = document.getElementById('skills').value.split(",");
  const awards = document.getElementById('awards').value;

  let y = 60;

  // Job Title
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(jobTitle.toUpperCase(), 300, y, { align: "center" });
  y += 20;   // one full line space

  // Name
  doc.setFont("times", "bold");
  doc.setFontSize(20);
  doc.setTextColor(26, 77, 128);
  doc.text(name, 300, y, { align: "center" });
  y += 20;   // one full line space

  // Contact info
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text([address, contact, email].filter(Boolean).join(", "), 300, y, { align: "center" });
  y += 30;   // one full line space after address block

  // Profile
  y = addSection(doc, "PROFILE", profile, y);
  y += 14;   // spacing after profile

  // Experience
  // Title
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.setTextColor(37, 120, 173);
  doc.text("EXPERIENCE", 60, y);
  y += 14;

  // Body
  experience.forEach(line => {
    if (/^[A-Za-z ]+,/.test(line)) {
      doc.setFont("times", "bold");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(line, 60, y);
    } else {
      doc.setFont("times", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(line, 60, y);
    }
    y += 14;
  });
  y += 14; // one blank line before Education

  // Education
  y = addSection(doc, "EDUCATION", education, y);
  y += 14;

  // Skills
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.setTextColor(37, 120, 173);
  doc.text("SKILLS", 60, y);
  y += 14;

  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  skills.filter(s => s.trim() !== "").forEach(skill => {
    doc.text("• " + skill.trim(), 60, y);
    y += 14;
  });
  y += 14;

  // Awards
  y = addSection(doc, "AWARDS", awards, y);

  doc.save("resume.pdf");
}

function addSection(doc, title, text, y) {
  // Section title
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.setTextColor(37, 120, 173);
  doc.text(title, 60, y);
  y += 14;

  // Section body
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  if (text) {
    let splitText = doc.splitTextToSize(text, 480);
    doc.text(splitText, 60, y);
    y += splitText.length * 14;
  }

  return y;
}
