document.addEventListener("DOMContentLoaded", function () {
  let statusDiv = document.getElementById("status");
  let toggleButton = document.getElementById("toggle");

  chrome.runtime.sendMessage({ message: "get_status" }, function (response) {
    if (response.status === "monitoring") {
      statusDiv.textContent = "Monitoring Twitch Chat...";
      toggleButton.textContent = "Stop Monitoring";
    } else {
      statusDiv.textContent = "Not Monitoring Twitch Chat...";
      toggleButton.textContent = "Start Monitoring";
    }
  });

  toggleButton.addEventListener("click", function () {
    chrome.runtime.sendMessage(
      { message: "toggle_monitoring" },
      function (response) {
        if (response.status === "monitoring") {
          statusDiv.textContent = "Monitoring Twitch Chat...";
          toggleButton.textContent = "Stop Monitoring";
        } else {
          statusDiv.textContent = "Not Monitoring Twitch Chat...";
          toggleButton.textContent = "Start Monitoring";
        }
      }
    );
  });
});
