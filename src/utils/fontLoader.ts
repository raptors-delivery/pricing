export const loadFonts = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap";
  document.head.appendChild(link);

  document.body.style.fontFamily = "'Cairo', sans-serif";
  document.body.setAttribute("dir", "rtl");
};
