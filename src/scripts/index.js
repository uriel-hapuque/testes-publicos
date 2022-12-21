function renderCards(database) {
  const jobSection = document.querySelector(".job-section")
  database.forEach(datas => {
    const card = createVacancieCard(datas)
    jobSection.append(card)
  })
}
function createVacancieCard(data) {
  let cardsDiv = document.createElement("div");
  let jobInfo = document.createElement("section");
  let jobTitle = document.createElement("h4");
  let jobLocal = document.createElement("section");
  let jobCompany = document.createElement("p");
  let jobCity = document.createElement("p");
  let jobDescription = document.createElement("p");
  let sectionModalityBtn = document.createElement("section");
  let sectionModalities = document.createElement("section")
  let jobModality = document.createElement("span");
  let jobModality2 = document.createElement("span")
  let applyBtn = document.createElement("button");

  cardsDiv.classList.add("cards");
  jobInfo.classList.add("job-info");
  jobTitle.classList.add("job-title");
  jobLocal.classList.add("job-local");
  jobCompany.classList.add("job-company");
  jobCity.classList.add("job-city");
  jobDescription.classList.add("job-description");
  sectionModalityBtn.classList.add("section-modality-btn");
  sectionModalities.classList.add("section-modalities")
  jobModality.classList.add("job-modality");
  jobModality2.classList.add("job-modality")
  applyBtn.classList.add("apply-job");

  jobTitle.innerText = data.title
  jobCompany.innerText = data.enterprise
  jobCity.innerText = data.location
  jobDescription.innerText = data.descrition
  modalitiesArr = data.modalities
  modality = data.modalities
  jobModality.innerText = modality[0]
  jobModality2.innerText = modality[1]
  applyBtn.innerText = "Candidatar"
  applyBtn.dataset.id = data.id

  cardsDiv.append(jobInfo, jobDescription, sectionModalityBtn)
  jobInfo.append(jobTitle, jobLocal)
  jobLocal.append(jobCompany, jobCity)

  sectionModalityBtn.append(sectionModalities, applyBtn)
  sectionModalities.append(jobModality, jobModality2)

  return cardsDiv
}

renderCards(jobsData)

















