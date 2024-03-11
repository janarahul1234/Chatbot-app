const api_url = "./backend/api_chatbot.php";

const chatButton = document.querySelector("#chat-button");
const closeButton = document.querySelector("#close-button");

const homeSection = document.querySelector(".hero-section");
const chatScreen = document.querySelector(".chat-screen");

const messageArea = document.querySelector("#message-area");
const messageBox = document.querySelector("#message-box");

const isEmpty = (value) => value.trim().length === 0;

const scrollMessage = () => messageArea.scrollTop = messageArea.scrollHeight;

const appentMessage = (value) => {
  const msg = document.createElement("div");
  msg.classList.add("message", `message--${value.type}`);
  msg.innerHTML = `<p class="message__text">${value.message}</p>`;
  messageArea.appendChild(msg);
};

const sendMessage = async (value) => {
  try {
    let response = await fetch(api_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });

    if ( ! response.ok) throw Error(response.statusText);

    return await response.json();
  } catch (err) {
    return err;
  }
};

chatButton.addEventListener("click", () => {
  chatScreen.style.display = "flex";
  homeSection.style.display = "none";
});

closeButton.addEventListener("click", () => {
  chatScreen.style.display = "none";
  homeSection.style.display = "flex";
});

messageBox.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = e.target[0].value;

  if (isEmpty(message)) {
    return console.log("Please enter a message!");
  }

  const data = {
    type: "user",
    message: message
  };

  appentMessage(data);
  e.target[0].value = '';
  
  const res = await sendMessage(data);
  appentMessage(res);
  scrollMessage();
});