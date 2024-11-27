document.addEventListener("DOMContentLoaded", () => {
  const input_pesquisa = document.querySelector("#search-input")
  const botao_pesquisa = document.querySelector("#search-button")
  
  botao_pesquisa.addEventListener("click", (e) => {
    e.preventDefault()
    const query = input_pesquisa.value.trim()
    if (query) {
      window.location.href = `../pages/busca.html?q=${encodeURIComponent(query)}`
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const resultados_pesquisa = document.querySelector("#busca-results") 
  const params = new URLSearchParams(window.location.search)
  const query = params.get("q")
  
  if (query) {
    resultados_pesquisa.innerHTML = `
      <h3>Resultados para: "${query}"</h3>
      <ul>
        <li>Resultado 1 relacionado a "${query}"</li>
      </ul>
    `
  } else {
    resultados_pesquisa.innerHTML = "<h3>Nenhum termo de busca foi informado.</h3>"
  }
});
