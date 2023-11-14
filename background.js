chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "send_chat") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: "send_chat",
        chat: request.chat,
      });
    });
  }
});

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


// 이 코드는 트위치 채팅을 모니터링하고, 특정 단어가 일정 횟수 이상 언급되면 그 단어를 다시 채팅에 보내는 기본적인 기능을 수행합니다. 하지만 이 코드는 완전하지 않으며, 실제 트위치 채팅을 모니터링하고 메시지를 보내는 부분은 개발자가 직접 구현해야 합니다.
// 또한 이 코드는 크롬 확장 프로그램의 매니페스트 파일, 팝업 HTML, CSS, 권한 설정 등과 같은 다른 필수 구성 요소를 포함하고 있지 않습니다. 이러한 요소들은 개발자가 직접 추가해야 합니다.
// 마지막으로, 이 코드는 트위치의 서비스 이용 약관을 준수하는지 확인하고, 필요한 경우 트위치에게 승인을 받아야 합니다. 또한 사용자의 개인 정보를 존중하고 보호하는 것이 중요합니다. 이 코드를 사용하여 생성된 데이터는 적절하게 처리되어야 합니다.
