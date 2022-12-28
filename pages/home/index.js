const asideJobs = []

function createMainList(){
    let jsonData = JSON.parse(localStorage.getItem("appliedJobs")) || []
    const listMain = document.querySelector('.oneCard_ul')
    const asideListFull = document.querySelector('.crd2_ul')   

    jobsData.forEach(job => { 
    const tags = document.createElement('li') 
    const tagTitle = document.createElement('h2') 
    const tagDivOne = document.createElement('div') 
    const tagDiv1 = document.createElement('span') 
    const tagDiv2 = document.createElement('span')  
    const tagP = document.createElement('p') 
    const tagDiv3 = document.createElement('div')
    const tagDiv3Span = document.createElement('span') 
    const tagDiv3Btn = document.createElement('button')
 
   
    tags.classList = 'oneCard_li column'
    tagTitle.classList = 'oneCard_li_title title4' 
    tagDivOne.classList = 'oneCard_li_div flex_row gap-1'
    tagDiv1.classList = 'oneCard_li_div_span-1 text3' 
    tagDiv2.classList = 'oneCard_li_div_span-1 text3'
    tagP.classList = 'oneCard_li_div_p text2'
    tagDiv3.classList = 'section-1_desktop'
    tagDiv3Span.classList = 'oneCard_li_div_span-2 text3'
    tagDiv3Btn.classList = 'oneCard_li_div_button button border_none button_add_card'

    tagTitle.innerText = job.title
    tagDiv1.innerText = job.enterprise
    tagDiv2.innerText = job.location
    tagP.innerText = job.description
    tagDiv3Span.innerText = job.modalities[0]

    if(jsonData.filter(element => element.title == job.title).length > 0){
        tagDiv3Btn.innerText = 'Retirar candidatura'
    }else{
        tagDiv3Btn.innerText = 'Candidatar'
    }
    
    tagDiv3Btn.addEventListener('click', function(){ 
        asideListFull.innerHTML = ''

        if(tagDiv3Btn.innerText == 'Candidatar'){  
            tagDiv3Btn.innerText = 'Retirar candidatura'
            let newObject = {
                id:job.id, 
                title:job.title, 
                enterprise:job.enterprise, 
                location:job.location
            }
            asideJobs.push(newObject)
            localStorage.setItem("appliedJobs", JSON.stringify(asideJobs))
            renderAside(asideJobs) 
        }else{
            tagDiv3Btn.innerText = 'Candidatar' 
            let indexAside = asideJobs.indexOf(job)
            asideJobs.splice(indexAside, 1)
            localStorage.setItem("appliedJobs", JSON.stringify(asideJobs))
            renderAside(asideJobs)
        }
    })

    tagDiv3.append(tagDiv3Span, tagDiv3Btn)
    tagDivOne.append(tagDiv1, tagDiv2)
    tags.append(tagTitle, tagDivOne, tagP, tagDiv3)
    listMain.appendChild(tags)
    });
    return listMain
}

function createAside(asideList){
    const asideListFull = document.querySelector('.crd2_ul')
    const listMain = document.querySelector('.oneCard_ul')
    asideList.forEach(job => {
        const tags = document.createElement('li')
        const tagsDivOne = document.createElement('div')
        const tagsDivOneTitle = document.createElement('h2')
        const tagsDivOneBtn = document.createElement('button')
        const tagsDivOneBtnImg = document.createElement('img')
        const tagsDivTwo = document.createElement('div')
        const tagsDivTwoSpanOne = document.createElement('span')
        const tagsDivTwoSpanTwo = document.createElement('span')

        tags.classList = 'crd2_li column'
        tagsDivOne.classList = 'crd2_div flex_row align_center justify_between'
        tagsDivOneTitle.classList = 'crd2_li_title title5'
        tagsDivOneBtn.classList = 'crd2_li_button'
        tagsDivTwo.classList = 'crd2_div-2 flex_row gap-1'
        tagsDivTwoSpanOne.classList = 'crd2_span text-3'
        tagsDivTwoSpanTwo.classList = 'crd2_span text-3'

        tagsDivOneTitle.innerText = job.title
        tagsDivTwoSpanOne.innerText = job.enterprise
        tagsDivTwoSpanTwo.innerText = job.location
        tagsDivOneBtnImg.src = '../../assets/img/trash.svg'

        tagsDivOneBtn.addEventListener('click', function(){
            asideListFull.innerHTML = ''
            listMain.innerHTML = ''
            let indexAside = asideJobs.indexOf(job)
            asideJobs.splice(indexAside, 1)
            localStorage.setItem("appliedJobs", JSON.stringify(asideJobs))
            renderMainList()
            renderAside(asideJobs)
        })

        tagsDivTwo.append(tagsDivTwoSpanOne, tagsDivTwoSpanTwo)
        tagsDivOneBtn.appendChild(tagsDivOneBtnImg)
        tagsDivOne.append(tagsDivOneTitle, tagsDivOneBtn)
        tags.append(tagsDivOne, tagsDivTwo)
        asideListFull.appendChild(tags)
    })
    return asideListFull
}

function createAsideEmpty(){ 
    const asideListFull = document.querySelector('.crd2_ul')
    const asideEmpty = document.createElement('div') 
    const emptyParagraph = document.createElement('p')

    emptyParagraph.innerText = 'Você ainda não aplicou para nenhuma vaga!'
    asideEmpty.appendChild(emptyParagraph)
    asideListFull.appendChild(asideEmpty)
    return asideListFull
}

function renderMainList(){
    const mainSection = document.querySelector('#sectionOne')
    return mainSection.appendChild(createMainList())
}

function renderAside(list){
    const asideSection = document.querySelector('.crd2')
    if(list.length == 0){
        return asideSection.appendChild(createAsideEmpty())
    }else{
        return asideSection.appendChild(createAside(list))
    }
}

function jsonItem(){
    return JSON.parse(localStorage.getItem("appliedJobs")) || []
}

renderAside(jsonItem())

renderMainList()