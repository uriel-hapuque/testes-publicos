function renderAppliedJob(appliedJobsArr) {
    const cardsSelectedJobs = document.querySelector(".selected-job")
    cardsSelectedJobs.innerHTML = ""
    const emptyMessage = createEmptyMessage()
    if (appliedVacancies.length <= 0) {
        cardsSelectedJobs.appendChild(emptyMessage)
    }
    else {
        appliedJobsArr.forEach((vacancie) => {
            const vacancies = createAppliedVacanciesCards(vacancie)
            cardsSelectedJobs.appendChild(vacancies)
        })
        removeByTrash()
        hoverTrash()
    }
}

function createAppliedVacanciesCards(dados) {
    let selectedJobCard = document.createElement("section")
    let selectedTitleImg = document.createElement("section")
    let selectedJobTitle = document.createElement("h4")
    let removeTrashBtn = document.createElement("img")
    let selectedLocalCompany = document.createElement("section")
    let selectedJobCompany = document.createElement("span")
    let selectedJobLocal = document.createElement("p")

    selectedJobCard.classList.add("selected-job-card")
    selectedTitleImg.classList.add("selected-title-img")
    selectedJobTitle.classList.add("selected-job-title")
    removeTrashBtn.classList.add("remove-trash-button")
    selectedLocalCompany.classList.add("selected-local-company")
    selectedJobCompany.classList.add("selected-job-company")
    selectedJobLocal.classList.add("selected-job-local")

    selectedJobTitle.innerText = dados.title
    removeTrashBtn.src = "./src/assets/img/trash.svg"
    removeTrashBtn.id = dados.id
    selectedJobCompany.innerText = dados.enterprise
    selectedJobLocal.innerText = dados.location

    selectedJobCard.append(selectedTitleImg, selectedLocalCompany)
    selectedTitleImg.append(selectedJobTitle, removeTrashBtn)
    selectedLocalCompany.append(selectedJobCompany, selectedJobLocal)

    return selectedJobCard
}


function addAndRemoveToApplied() {
    const applyJob = document.querySelectorAll(".apply-job");
    applyJob.forEach(button => button.addEventListener("click", (event) => {
        let button = event.target
        if (button.innerText === "Candidatar") {
            button.classList.remove("apply-job")
            button.classList.add("remove-job")
            button.innerText = "Remover candidatura";
            const foundVacancie = jobsData.find(vacancie => {
                return vacancie.id === Number(button.dataset.id)
            })
            const applyVacancie = {
                ...foundVacancie,
                appliedId: appliedVacancies.length + 1
            }
            appliedVacancies.push(applyVacancie)
            renderAppliedJob(appliedVacancies)
        } else {
            button.classList.toggle("remove-job")
            button.classList.add("apply-job")
            button.innerText = "Candidatar"
            const appliedJob = appliedVacancies.find(vacancie => {
                return vacancie.id === Number(event.target.dataset.id)
            })
            const jobIndex = appliedVacancies.indexOf(appliedJob)
            appliedVacancies.splice(jobIndex, 1)
            renderAppliedJob(appliedVacancies)
        }
    }));
}

function createEmptyMessage() {
    let sectionNotVacancies = document.createElement("section")
    let asideMessage = document.createElement("p")
    let trashImg = document.createElement("img")

    sectionNotVacancies.classList.add("not-vacancies-applied")
    asideMessage.classList.add("aside-message")
    trashImg.classList.add("nothing-img")

    asideMessage.innerText = "Você ainda não aplicou para nenhuma vaga"
    trashImg.src = "./src/assets/img/nothin.svg"

    sectionNotVacancies.append(asideMessage, trashImg)

    return sectionNotVacancies
}

function removeByTrash() {
    const trashs = document.querySelectorAll(".remove-trash-button")
    const buttons = document.querySelectorAll(".remove-job")
    buttons.forEach(button => {
        trashs.forEach(trash => trash.addEventListener("click", (event) => {
            if (button.dataset.id === event.target.id) {
                button.innerText = "Candidatar"
                const appliedJob = appliedVacancies.find(vacancie => {
                    return vacancie.id === Number(event.target.id)
                })
                const jobIndex = appliedVacancies.indexOf(appliedJob)
                appliedVacancies.splice(jobIndex, 1)
                renderAppliedJob(appliedVacancies)
            }
        }))
    })
}

function hoverTrash() {
    const trashBtn = document.querySelectorAll(".remove-trash-button")
    trashBtn.forEach(button => button.addEventListener("mouseenter", (event) => {
        button.src = "./src/assets/img/trash-selected.svg"
    }))
    trashBtn.forEach(button => button.addEventListener("mouseout", (event) => {
        button.src = "./src/assets/img/trash.svg"
    }))
}

addAndRemoveToApplied()