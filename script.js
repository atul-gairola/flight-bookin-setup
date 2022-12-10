import { airports } from "./data/indianAirports.js";
import { demoFlightData } from "./data/demoFlight.js";

let flights = [];
let loading = false;
let travelerCount = {
  adult_count: 0,
  child_count: 0,
  infant_count: 0,
};

const fromCity = document.querySelector("#from_city");
const toCity = document.querySelector("#to_city");
const form = document.querySelector("#booking_form");
const counterButtons = document.querySelectorAll(".counterButton");
const adultCount = document.querySelector("#adult_count");
const childCount = document.querySelector("#child_count");
const infantCount = document.querySelector("#infant_count");
const submitButton = document.querySelector("#submit_button");

const updateTravelCountOnDom = () => {
  adultCount.innerText = travelerCount.adult_count;
  childCount.innerText = travelerCount.child_count;
  infantCount.innerText = travelerCount.infant_count;
};

const handleCounterClick = (e) => {
  const { target } = e; // const target = e.target;
  const { name } = target;
  //   adult_count_d
  const splitArr = name.split("_"); // ['adult', 'count', 'd'] ;
  const action = splitArr[splitArr.length - 1];
  const key = splitArr.slice(0, 2).join("_");
  if (action === "i") {
    travelerCount = {
      ...travelerCount,
      [key]: travelerCount[key] + 1,
    };
    updateTravelCountOnDom();
  } else {
    if (travelerCount[key] !== 0) {
      travelerCount = {
        ...travelerCount,
        [key]: travelerCount[key] - 1,
      };
      updateTravelCountOnDom();
    }
  }
};

counterButtons.forEach((cur) =>
  cur.addEventListener("click", handleCounterClick)
);

const handleToggleLoading = (loadingState) => {
  if (!loadingState) {
    loading = true;
    submitButton.innerText = "Loading...";
  } else {
    loading = false;
    submitButton.innerText = "Search flights";
  }
};

const handleShowFlights = (flights) => {
  const listItems = flights.map((cur) => {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");
    const html = `<div class="flight-name">
    <p>${cur.airline.name}</p>
    <p>${cur.airline.iata}</p>
  </div>
  <div class="detail-section">
    <div>
      <label for="">Departure</label>
      <div>
        <p>${cur.departure.iata}</p>
        <p>T${cur.departure.terminal}</p>
        <p>(19:20)</p>
      </div>
      <p>${cur.departure.airport}</p>
    </div>
  </div>
  <div class="detail-section">
    <div>
      <label for="">Arrival</label>
      <div>
      <p>${cur.arrival.iata}</p>
      <p>T${cur.arrival.terminal}</p>
        <p>(19:20)</p>
      </div>
      <p>${cur.arrival.airport}</p>
      </div>
    <div></div>
  </div>
  <div class="payment-container">
    <p class="price">${Math.floor(Math.random() * 10000 + 5000)} Rs</p>
    <button class="book primary-button">Book Now</button>
  </div>`;
    listItem.setHTML(html);
    return listItem;
  });
  const parentNode = document.querySelector(".list-container");

  listItems.map((cur) => {
    parentNode.appendChild(cur);
  });
};

const handleFormSubmit = (e) => {
  if (loading) {
    return;
  }
  e.preventDefault();
  const form = e.target;
  const fromCity = form.from_city.value;
  const toCity = form.to_city.value;
  const departure = form.departure.value;
  const ticketClass = form.ticket_class.value;

  handleToggleLoading(loading);

  setTimeout(() => {
    console.log(demoFlightData);
    handleToggleLoading(loading);
    flights = demoFlightData;
    handleShowFlights(flights);
  }, 500);

  //   fetch req => backend ........ => result => render it on the UI
};

form.addEventListener("submit", handleFormSubmit);

const applyLocationOption = (parentNode) => {
  const locationOptions = airports.map((cur) => {
    const option = document.createElement("option");
    option.value = cur.IATA_code;
    option.innerText = cur.airport_name;
    return option;
  });
  locationOptions.map((cur) => {
    parentNode.appendChild(cur);
  });
};

applyLocationOption(fromCity);
applyLocationOption(toCity);
