document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const imageUrl = urlParams.get("url");
  const photographer = urlParams.get("photographer");
  const photographerUrl = urlParams.get("photographer_url");

  const imageElement = document.querySelector(".card-img-top");
  const titleElement = document.querySelector(".card-title");
  const textElement = document.querySelector(".card-text");
  const linkElement = document.querySelector(".btn-primary");

  imageElement.src = imageUrl;
  titleElement.textContent = photographer;
  textElement.textContent = "Photographer: " + photographer;
  linkElement.href = photographerUrl;
});
