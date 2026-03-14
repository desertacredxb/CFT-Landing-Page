export const scrollToLeadForm = () => {
  const section = document.getElementById("leadform");

  if (section) {
    const yOffset = -100; // adjust for fixed navbar
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });

    // update URL hash
    window.history.replaceState(null, "", "#leadform");
  }
};