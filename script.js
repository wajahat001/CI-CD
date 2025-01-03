let bios= document.getElementsByClassName("bio")
let contents = document.getElementsByClassName("content")
// let actlink = document.getElementsByClassName("act-link")

function opentab(tabname){
    for(const bio of bios){
        bio.classList.remove("act-link")
    }
    for(const content of contents){
        content.classList.remove("act-content")
    }
    event.currentTarget.classList.add("act-link")
    document.getElementById(tabname).classList.add("act-content")
}

document.getElementById("home").addEventListener("click", function() {
    window.scrollTo({
        top: 50,
        behavior: "smooth"
    })
})

document.getElementById("about").addEventListener("click", function() {
    window.scrollTo({
        top: 550,
        behavior: "smooth"
    })
})

document.getElementById("portfolio").addEventListener("click", function() {
    window.scrollTo({
        top: 1100,
        behavior: "smooth"
    })
})

document.getElementById("contact").addEventListener("click", function() {
    window.scrollTo({
        top: 1500,
        behavior: "smooth"
    })
})