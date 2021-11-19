const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {

    const resp = await fetch('http://localhost:3000')
        .then(r=>r.json())
    
    resp.url.map( ({ name, url }) => addElement({name, url}) )

}

load()

async function deleteUrl(name, url) {

    const resp = await fetch(`http://localhost:3000?name=${name}&url=${url}&del=true`).then(r=>r.json())

    if ( resp.message ) {
        alert('Deletado com sucesso')
        return
    }

    alert('Erro ao deletar')
    return

}

async function createUrl(name, url) {

    const resp = await fetch(`http://localhost:3000?name=${name}&url=${url}`).then(r=>r.json())

    if ( resp.message ) {
        alert('Adicionado com sucesso')
        return
    }

    alert('Erro ao adicionar')
    return

}

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
    
    let a = el.parentNode.querySelector('a')
    deleteUrl(a.innerText, a.href)

}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })
    let parsedURL = url.endsWith('/') ? url : parsedURL + '/'
    createUrl(name, parsedURL)

    input.value = ""
})