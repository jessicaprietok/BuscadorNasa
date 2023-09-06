document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");
  
    btnBuscar.addEventListener("click", function () {
      const textoBusqueda = inputBuscar.value;
      if (textoBusqueda.trim() !== "") {
        const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
          textoBusqueda
        )}`;
  
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            contenedor.innerHTML = "";
  
            const items = data.collection.items;
            items.forEach((item) => {
              const imgLink = item.links[0].href;
              const title = item.data[0].title;
              const description = item.data[0].description || "Sin descripción";
              const dateCreated = item.data[0].date_created || "Fecha desconocida";
  
              const imgElement = document.createElement("img");
              imgElement.src = imgLink;
              imgElement.alt = title;
  
              const titleElement = document.createElement("h2");
              titleElement.textContent = title;
  
              const descriptionElement = document.createElement("p");
              descriptionElement.textContent = description;
  
              const dateElement = document.createElement("p");
              dateElement.textContent = `Fecha de creación: ${dateCreated}`;
  
              const resultContainer = document.createElement("div");
              resultContainer.classList.add("result-container", "col-md-4");
              resultContainer.appendChild(imgElement);
              resultContainer.appendChild(titleElement);
              resultContainer.appendChild(descriptionElement);
              resultContainer.appendChild(dateElement);
  
              contenedor.appendChild(resultContainer);
            });
          })
          .catch((error) => {
            console.error("Error al obtener los datos de la API", error);
          });
      }
    });
  });
  