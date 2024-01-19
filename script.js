let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
let dropdowns = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelectorAll(".from select");
let toCurr = document.querySelectorAll(".to select");
let msg = document.querySelector("#msg");
let btn = document.querySelector("#exchange-rate");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    changeFlag(event.target);
  });
}

const changeFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const changeURL = async () => {
  let amount = document.querySelectorAll(".amount input");
  let amtVal = amount[0].value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount[0].value = "1";
  }
  let newUrl = `${BASE_URL}/${fromCurr[0].value.toLowerCase()}/${toCurr[0].value.toLowerCase()}.json`;
  let response = await fetch(newUrl);
  let data = await response.json();
  let rate = data[toCurr[0].value.toLowerCase()];

  let finalAmt = amtVal * rate;
  let roundOfAmt = Math.round(finalAmt);

  msg.innerText = `${amtVal} ${fromCurr[0].value} = ${roundOfAmt} ${toCurr[0].value}`;
  
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  changeURL();
});

window.addEventListener("load", () => {
  changeURL();
});






  