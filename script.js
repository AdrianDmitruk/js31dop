const container = document.querySelector(".container");
const result = document.querySelector(".result");
const fileInput = document.querySelector(".file-input");
const prevImage = document.querySelector(".prev-image");

function handleFile(e) {
  const file = e.target.files[0];

  if (file && file.type.startsWith("image/") && file.size <= 1048576) {
    const reader = new FileReader();

    reader.onload = function (e) {
      prevImage.src = e.target.result;
      prevImage.style.display = "block";
    };

    reader.readAsDataURL(file);
  } else {
    alert("Изображение до 1 МБ!");
    fileInput.value = "";
    prevImage.style.display = "none";
  }
}

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  container.style.border = "2px dashed #666";
});

container.addEventListener("dragleave", () => {
  container.style.border = "2px dashed #aaa";
});

container.addEventListener("drop", (e) => {
  e.preventDefault();
  container.style.border = "2px dashed #aaa";
  fileInput.files = e.dataTransfer.files;
  handleFile({ target: fileInput });
});

function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function () {
      resolve(reader.result.split(",")[1]);
    };

    reader.readAsDataURL(file);
  });
}

fileInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];

  try {
    const base64String = await fileToBase64(file);
    result.textContent = base64String;
  } catch (error) {
    alert(error);
  }
});
