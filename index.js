document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.querySelector(".album .container .row");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  function createCard(photo) {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4", "my-3");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-4", "shadow-sm");

    const imgElement = document.createElement("img");
    imgElement.src = photo.src.medium;
    imgElement.classList.add("bd-placeholder-img", "card-img-top");
    imgElement.setAttribute("data-photo", JSON.stringify(photo));

    imgElement.setAttribute(
      "data-photo",
      JSON.stringify({
        url: photo.src.medium,
        photographer: photo.photographer,
        photographer_url: photo.photographer_url,
      })
    );

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    const titleElement = document.createElement("h5");
    titleElement.classList.add("card-title");
    titleElement.textContent = photo.photographer;
    titleElement.setAttribute("data-photo", JSON.stringify(photo));

    const pElement = document.createElement("p");
    pElement.classList.add("card-text");
    pElement.textContent =
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    ("Cumque quos placeat ex quas incidunt perspiciatis labore");
    ("aspernatur. Iusto laudantium velit repudiandae architecto");
    ("illum reprehenderit perferendis, quos aliquam maxime harum?");
    ("Repudiandae!");

    const buttonGroupDiv = document.createElement("div");
    buttonGroupDiv.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    const viewButton = document.createElement("button");
    viewButton.setAttribute("type", "button");
    viewButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
    viewButton.textContent = "View";

    const hideButton = document.createElement("button");
    hideButton.setAttribute("type", "button");
    hideButton.classList.add(
      "btn",
      "btn-sm",
      "btn-outline-secondary",
      "hide-button"
    );
    hideButton.textContent = "Hide";

    btnGroup.appendChild(viewButton);
    btnGroup.appendChild(hideButton);

    buttonGroupDiv.appendChild(btnGroup);
    buttonGroupDiv.innerHTML += `<small class="text-muted">${photo.id}</small>`;

    cardBodyDiv.appendChild(titleElement);
    cardBodyDiv.appendChild(pElement);
    cardBodyDiv.appendChild(buttonGroupDiv);

    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardBodyDiv);

    colDiv.appendChild(cardDiv);

    imageContainer.appendChild(colDiv);
  }

  function loadImages(query) {
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}`;
    const apiKey = "shJVjbTxXV5jaVg0fqGvf80fDr8DY2PaZT1FRVZuJpHnEiFA9YlYnm7A"; // Assicurati di inserire la tua chiave API qui

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella richiesta API");
        }
        return response.json();
      })
      .then((data) => {
        // Rimuovi le immagini precedenti, se presenti
        imageContainer.innerHTML = "";

        // Itera attraverso i risultati e crea elementi immagine per ogni immagine
        data.photos.forEach((photo) => {
          createCard(photo);
        });

        // Aggiungi il gestore di eventi per il pulsante "Hide" a tutte le card caricate
        const hideButtons = document.querySelectorAll(".hide-button");
        hideButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const card = button.closest(".card");
            card.style.display = "none";
          });
        });

        // Aggiungi gestore evento click a tutte le immagini e i titoli
        const imageElements = document.querySelectorAll(
          ".card-img-top, .card-title"
        );
        imageElements.forEach((element) => {
          element.addEventListener("click", function () {
            const photoData = JSON.parse(element.getAttribute("data-photo"));
            goToDetailPage(photoData);
          });
        });
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
      });
  }

  function goToDetailPage(photoData) {
    const queryString = new URLSearchParams(photoData).toString();
    window.location.href = "detail.html?" + queryString;
  }
  // Gestore dell'evento click sul bottone di ricerca
  searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      loadImages(searchTerm);
    } else {
      alert("Please enter a search term.");
    }
  });

  // Carica le immagini primarie
  const loadPrimaryImagesLink = document.querySelector("#load-images");
  loadPrimaryImagesLink.addEventListener("click", function (event) {
    event.preventDefault(); // Evita il comportamento predefinito del link
    loadImages("images");
  });

  // Carica le immagini secondarie
  const loadSecondaryImagesLink = document.querySelector(".btn-secondary");
  loadSecondaryImagesLink.addEventListener("click", function (event) {
    event.preventDefault(); // Evita il comportamento predefinito del link
    loadImages("cats");
  });
});
