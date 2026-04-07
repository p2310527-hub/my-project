const API_KEY = "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";

function addMessage(message, sender) {

const chatBox = document.getElementById("chatBox");
const messageDiv = document.createElement("div");

messageDiv.className = sender;
messageDiv.innerText = message;

chatBox.appendChild(messageDiv);
chatBox.scrollTop = chatBox.scrollHeight;

}

async function sendMessage() {

const input = document.getElementById("userInput");
const message = input.value;

if (!message) return;

addMessage(message, "user");
input.value = "";

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: "You are an AI Stadium Assistant. Help users navigate stadium, find food, avoid crowds, and provide real-time suggestions."
},
{
role: "user",
content: message
}
]
})
});

const data = await response.json();

const reply = data.choices[0].message.content;

addMessage(reply, "bot");

}