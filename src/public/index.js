const form = document.getElementById('productsForm')

form.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(form);
    let prod = {};
    data.forEach((value, key) => prod[key] = value);
    let sendProd = {producto:{...prod}}
    fetch('/api/productos', {
        method:'POST',
        body: data
    }).then(result => result.json()).then(json => console.log(json))
})