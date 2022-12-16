//PRINCIPAL
const tagMain = document.querySelector("main");
const remuvebut = document.querySelector("removeBut");

function CreateCards(jobsData) {
  const titleMain = document.createElement("h2");
  const tagSection = document.createElement("section");
  const titleSection = document.createElement("h2");
  const subtitleSection = document.createElement("div");
  const school = document.createElement("h3");
  const state = document.createElement("h3");
  const descriptionSection = document.createElement("h3");
  const typeCandidator = document.createElement("div");
  const typeSection = document.createElement("h4");
  const candidatorBut = document.createElement("button");

  titleMain.classList.add("title_main");
  tagSection.classList.add("section_1");
  titleSection.classList.add("title_section");
  subtitleSection.classList.add("subtitle_section");
  school.classList.add("school");
  state.classList.add("state");
  descriptionSection.classList.add("description_section");
  typeCandidator.classList.add("type_candidator");
  typeSection.classList.add("type_section");
  candidatorBut.classList.add("candidator");

  //STYLE BUTTON ADD, REMOVE
  candidatorBut.innerText = "Remover Candidatura";
  candidatorBut.style.width = "220px";

  
  titleSection.innerText = jobsData.title;
  school.innerText = jobsData.enterprise;
  state.innerText = jobsData.location;
  descriptionSection.innerText = jobsData.descrition;
  typeSection.innerText = jobsData.modalities[0];
  candidatorBut.innerText = "Candidatar";
  candidatorBut.id = jobsData.id;

  tagMain.append(titleMain, tagSection);
  tagSection.append(
    titleSection,
    subtitleSection,
    descriptionSection,
    typeCandidator
  );
  subtitleSection.append(school, state);
  typeCandidator.append(typeSection, candidatorBut);

  return tagSection;
}

//FUNÇÃO LIST CARDS
function listarCards(arr) {
  arr.forEach((jobsData) => {
    let CardProd = CreateCards(jobsData);
    tagMain.append(CardProd);
  });
}
listarCards(jobsData);

//-------------------------------------------------------
//ASIDE
const vacancies = document.querySelector(".vacancies");

function createCardsVacancies(jobsData) {
  const sectionAside = document.createElement("section_aside");
  const personDeveloper = document.createElement("person_developer");
  const titlePersonDeveloper = document.createElement("title_person_developer");
  const buttonTrash = document.createElement("button_trash");
  const subtitleAside = document.createElement("subtitle_aside");
  const tagSchool = document.createElement("school");
  const tagState = document.createElement("state");

  sectionAside.classList.add("section_aside");
  personDeveloper.classList.add("person_developer");
  titlePersonDeveloper.classList.add("title_person_developer");
  buttonTrash.classList.add("button_trash");
  buttonTrash.id = jobsData.id;
  subtitleAside.classList.add("subtitle_aside");
  tagSchool.classList.add("school");
  tagState.classList.add("state");

  //REMOVE TRASH
  buttonTrash.addEventListener("click", () => {
    document.getElementById(buttonTrash.id).innerText = "Candidatar";
    sectionAside.remove();
  });

  titlePersonDeveloper.innerText = jobsData.title;
  tagSchool.innerText = jobsData.enterprise;
  tagState.innerText = jobsData.location;
  sectionAside.id = jobsData.id;

  tagMain.append(vacancies);
  vacancies.append(sectionAside);
  sectionAside.append(personDeveloper, subtitleAside);
  personDeveloper.append(titlePersonDeveloper, buttonTrash);
  subtitleAside.append(tagSchool, tagState);

  return sectionAside;
}

// function listarCardsVacancies(arr2){

//     arr2.forEach(jobsData => {
//         let CardProdVacancies = createCardsVacancies(jobsData)
//         vacancies.append(CardProdVacancies)
//     });

// }
// listarCardsVacancies(jobsData)
//----------------------------------------------------------------------

//ADD,REMOVE
function addRemoveEvent() {
  let btn = document.querySelectorAll(".candidator");
  btn.forEach((butt) => {
    if (butt.innerText == "Candidatar") {
      butt.removeEventListener("click", removeId);
      butt.addEventListener("click", filterId);
    } else if (butt.innerText == "Remover Candidatura") {
      butt.removeEventListener("click", filterId);
      butt.addEventListener("click", removeId);
    }
  });

  //LOCAL STORAGE
  localStorage.setItem('vagas selecionadas',JSON.stringify(jobsData))
}


//FILTER ID
function filterId(event) {
  event.target.innerText = "Remover Candidatura";
  document.querySelector(".text-vancacies").innerHTML = "";
  const filtered = jobsData.filter((element) => element.id == event.target.id);
  const asideVacancie = createCardsVacancies(filtered[0]);
  vacancies.appendChild(asideVacancie);
  addRemoveEvent();
}

//REMOVE ID
function removeId(event) {
  event.target.innerText = "Candidatar";
  const sectionAside = document.querySelectorAll(".section_aside");
  sectionAside.forEach((element) => {
    console.log(element);
    if (element.id == event.target.id) {
      element.remove();
    }
  });
  addRemoveEvent();
}
addRemoveEvent();

