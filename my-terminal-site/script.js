const output = document.getElementById('output');
const input = document.getElementById('cmd-input');

// ── EDIT THIS SECTION WITH YOUR INFO ──
const INFO = {
  name: "Your Name",
  location: "Dhaka, Bangladesh",
  role: "Web Developer & Creative Coder",
  bio: "I build things for the web. Obsessed with design, code, and making cool stuff.",
  email: "you@email.com",
  github: "github.com/yourhandle",
  projects: [
    { name: "Browntown",     desc: "Luxury phone case e-commerce site" },
    { name: "Mohera Paper",  desc: "Corporate site for paper manufacturer" },
    { name: "AURUM",         desc: "Dark luxury jewelry store" },
  ],
  skills: ["HTML", "CSS", "JavaScript", "Creative Coding", "AR / Hand Tracking"],
};
// ──────────────────────────────────────

const COMMANDS = {
  help: () => [
    { text: "Available commands:", cls: "cyan" },
    { text: "  about      →  who I am" },
    { text: "  projects   →  things I've built" },
    { text: "  skills     →  what I work with" },
    { text: "  contact    →  get in touch" },
    { text: "  clear      →  clear the terminal" },
  ],

  about: () => [
    { text: `Name     : ${INFO.name}`,     cls: "green" },
    { text: `Location : ${INFO.location}` },
    { text: `Role     : ${INFO.role}` },
    { text: "" },
    { text: INFO.bio },
  ],

  projects: () => [
    { text: "── Projects ──", cls: "cyan" },
    ...INFO.projects.map((p, i) =>
      ({ text: `[${i + 1}] ${p.name.padEnd(18)} ${p.desc}` })
    ),
  ],

  skills: () => [
    { text: "── Skills ──", cls: "cyan" },
    { text: INFO.skills.join("  ·  "), cls: "yellow" },
  ],

  contact: () => [
    { text: "── Contact ──",          cls: "cyan" },
    { text: `Email   : ${INFO.email}` },
    { text: `GitHub  : ${INFO.github}` },
  ],

  clear: () => {
    output.innerHTML = '';
    return [];
  },
};

function print(lines) {
  lines.forEach(({ text = "", cls = "" }) => {
    const span = document.createElement('span');
    span.className = 'line' + (cls ? ` ${cls}` : '');
    span.textContent = text;
    output.appendChild(span);
  });
  window.scrollTo(0, document.body.scrollHeight);
}

function welcome() {
  print([
    { text: "╔══════════════════════════════════╗", cls: "dim" },
    { text: `  Welcome. I'm ${INFO.name}.`,         cls: "green" },
    { text: `  ${INFO.role}` },
    { text: "╚══════════════════════════════════╝", cls: "dim" },
    { text: "" },
    { text: "Type  help  to see what you can do.", cls: "cyan" },
    { text: "" },
  ]);
}

input.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  const cmd = input.value.trim().toLowerCase();
  input.value = '';

  // echo what user typed
  print([{ text: `visitor@your-name:~$ ${cmd}`, cls: "dim" }]);

  if (!cmd) return;

  if (COMMANDS[cmd]) {
    const result = COMMANDS[cmd]();
    if (result.length) print(result);
  } else {
    print([{ text: `command not found: ${cmd}`, cls: "red" }]);
  }

  print([{ text: "" }]);
});

// keep focus on input always
document.addEventListener('click', () => input.focus());

welcome();