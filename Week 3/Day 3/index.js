let myLead = []
let oldLead = []
const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")
const saveEl = document.getElementById("save-btn")
const deleteEl = document.getElementById("delete-btn")
const leadFromLocalStorage = JSON.parse( localStorage.getItem("myLead"))
const saveBtn = document.getElementById("save-tab")

if (leadFromLocalStorage) {
    myLead = leadFromLocalStorage
    render(myLead)
}


saveBtn.addEventListener("click", function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        myLead.push(tabs[0].url)
        localStorage.setItem("myLead", JSON.stringify(myLead) )
        render(myLead)
    })

})


function render(lead) {    
    let listItems = ""

    for (let i =0; i < lead.length; i++) {

        //listItems += "<li> <a target='_blank' href='" + myLead[i] + "'>"  + myLead[i] + "</li> </a>"
        listItems += `<li>
         <a target='_blank' href='${lead[i]}'>
         
        ${lead[i]}
         
         </li> </a>`

    }

    ulEl.innerHTML = listItems
}

deleteEl.addEventListener("dblclick", function() {
        localStorage.clear()
        myLead = []
        render(myLead)
})


saveEl.addEventListener("click", function() {
        myLead.push(inputEl.value)
        inputEl.value = "";

        localStorage.setItem("myLead", JSON.stringify(myLead))
        render(myLead)

        console.log ( localStorage.getItem("myLead"))
})





