
document.addEventListener("DOMContentLoaded", () => {
  const htmlEl = document.documentElement;

  if (!document.getElementById("themeToggle")) {
    const btn = document.createElement("button");
    btn.id = "themeToggle";
    btn.title = "تغییر تم";
    btn.innerText = "🌙";
    document.body.appendChild(btn);
  }

  const toggleBtn = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") {
    htmlEl.classList.add("dark");
  }

  toggleBtn.addEventListener("click", () => {
    htmlEl.classList.toggle("dark");
    const isDark = htmlEl.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  if (htmlEl.classList.contains("dark")) {
    const elements = [
      `<div class="moon"></div>`,
      `<div class="heart" style="top:80%; left:10%;"></div>`,
      `<div class="heart" style="top:70%; left:50%;"></div>`,
      `<div class="star" style="top:10%; left:20%;"></div>`,
      `<div class="star" style="top:40%; left:60%;"></div>`,
      `<div class="firefly" style="top:60%; left:30%;"></div>`,
      `<div class="firefly" style="top:20%; left:80%;"></div>`
    ];
    elements.forEach(html => {
      document.body.insertAdjacentHTML("beforeend", html);
    });
  }
});
