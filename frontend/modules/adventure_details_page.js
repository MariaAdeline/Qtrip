import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let adventure = new URLSearchParams(search);
  return adventure.get("adventure");
  
  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  // Place holder for functionality to work in the Stubs
  try {
    let api = config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;
    const response = await fetch(api);
    const json = await response.json();
    return json;
  } 
  catch (err) 
  {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
       let name = document.getElementById("adventure-name");
       name.textContent = `${adventure.name}`;
       let subtitle = document.getElementById("adventure-subtitle");
       subtitle.textContent = `${adventure.subtitle}`;
       let div = document.createElement("div")
       for(let i = 0 ; i < adventure.images.length; i++)
       {
           let image = document.createElement("div")
           image.innerHTML =  `<img class="activity-card-image" src="${adventure.images[i]}"/>`
           div.appendChild(image)
       }
       document.getElementById("photo-gallery").appendChild(div)

       let content = document.createElement("p")
       content.textContent = `${adventure.content}`;
       document.getElementById("adventure-content").append(content)
}



//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let get = document.getElementById("photo-gallery")
  get.innerHTML =`<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" id ="newImages">

  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
`

let insert = document.getElementById("newImages")
for(let i = 0 ; i < images.length; i++)
{
   let image = document.createElement("div")
   if(i===0)
    {
     image.className = "carousel-item active"
     image.innerHTML = `<img class="d-block w-100 activity-card-image" src="${images[i]}">`
     }
 else{
     image.className = "carousel-item"
     image.innerHTML = `<img class="d-block w-100 activity-card-image" src="${images[i]}">`
    }
     insert.append(image)
}
}



//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available === true)
  {
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }
  else
  {
    document.getElementById("reservation-panel-available").style.display="none";
    document.getElementById("reservation-panel-sold-out").style.display="block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let people = parseInt(persons);
  let tcost = adventure.costPerHead * people;
  let rprice = document.getElementById("reservation-cost");
  rprice.textContent = tcost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
const form = document.getElementById("myForm");
form.addEventListener("submit", async (event) => {
event.preventDefault();
let url = config.backendEndpoint + "/reservations/new";
let formElements = form.elements;
let bodyString = JSON.stringify({
name: formElements["name"].value,
date: formElements["date"].value,
person: formElements["person"].value,
adventure: adventure.id,
});

try {
    const res = await fetch(url, {
      method: "POST",
      body: bodyString,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Success!");
      window.location.reload();
    } else {
      let data = await res.json();
      alert(`Failed - ${data.message}`);
    }
  } catch (err) {
    console.log(err);
    alert("Failed - fetch call resulted in error");
  }
});

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved === true)
  {
    document.getElementById("reserved-banner").style.display ="block"
  } 
  else
  {
    document.getElementById("reserved-banner").style.display = "none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
