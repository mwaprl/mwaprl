const chat = document.getElementById("chat");
const form = document.getElementById("form");
const input = document.getElementById("input");

// super simple "brain" — tweak to your vibe
const rules = [
  { test: /hi|hello|hey/i, reply: () => "Hey! How can I help today? ✨" },
  { test: /name|who are you/i, reply: () => "I’m your tiny web chatbot. Nice to meet you 😎" },
  { test: /help|how to/i, reply: () => "Type anything. I’ll try to answer or tell you bad jokes." },
  { test: /joke/i, reply: () => "Why did the dev go broke? Because they used up all their cache." },
  { test: /love/i, reply: () => "Aww. I ship it. 💞" },
];

// default response if nothing matches
const fallbackReplies = [
  "Hmm… not sure yet. Try asking me to tell a joke?",
  "I’m still learning. Maybe rephrase that?",
  "Spicy. Say more?",
];

function addMsg(text, who = "bot") {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function think(userText) {
  for (const rule of rules) {
    if (rule.test.test(userText)) return rule.reply(userText);
  }
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMsg(text, "user");
  input.value = "";
  // fake typing delay (looks nicer)
  setTimeout(() => addMsg(think(text), "bot"), 300);
});

// greeting
addMsg("Hi! I’m live on GitHub Pages. Ask me something ✨", "bot");

