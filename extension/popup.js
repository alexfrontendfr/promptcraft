document.addEventListener("DOMContentLoaded", function () {
  const refineButton = document.getElementById("refine");
  const promptInput = document.getElementById("prompt");
  const resultDiv = document.getElementById("result");

  refineButton.addEventListener("click", function () {
    const prompt = promptInput.value;
    fetch("https://alexfrontendfr.github.io/promptcraft/refine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        resultDiv.textContent = data.refinedPrompt;
      })
      .catch((error) => {
        resultDiv.textContent = "Error: " + error.message;
      });
  });
});
