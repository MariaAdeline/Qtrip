import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });np
}

//Implementation of fetch call

async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let api=config.backendEndpoint + '/cities';
  const response = await fetch(api);
    const json = await response.json();
    // console.log(json);
    return json;
  }
  catch(err){
    return null;
}
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let div = document.createElement("div");
      div.setAttribute("class","col-lg-3 col-6 mb-3");
      div.innerHTML = `
                       <a href="pages/adventures/?city=${id}" id="${id}">
                         <div class="tile">
                              <div class="tile-text text-center">
                                <h5>${city}</h5>
                                <p>${description}</p>
                              </div>
                          <img class="img-responsive" src="${image}" />
                      </div>
                    </a> 
                    `;
   document.getElementById("data").appendChild(div);
}



export { init, fetchCities, addCityToDOM };
