// content.js
let chatMap = new Map();

function processChat(chat) {
  if (chatMap.has(chat)) {
    chatMap.set(chat, chatMap.get(chat) + 1);
  } else {
    chatMap.set(chat, 1);
  }

  let maxChat = Array.from(chatMap.entries()).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  if (chatMap.get(maxChat) > 10) {
    // 10회 이상 언급되면 채팅을 보냅니다.
    chrome.runtime.sendMessage({ message: "send_chat", chat: maxChat });
    chatMap.clear();
  }
}

// Twitch 채팅을 모니터링하는 코드를 여기에 추가해야 합니다.
// 채팅이 수신되면 processChat 함수를 호출해야 합니다.

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "send_chat") {
    // Twitch 채팅에 메시지를 보내는 코드를 여기에 추가해야 합니다.
  }
});
