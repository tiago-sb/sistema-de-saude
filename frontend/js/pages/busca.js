document.addEventListener("DOMContentLoaded", () => {
  const pesquisa_input = document.querySelector("#search-input")
  const botao_pesquisa = document.querySelector("#search-button")
  
  botao_pesquisa.addEventListener("click", (e) => {
    e.preventDefault()
    const busca_input = pesquisa_input.value.trim()
    if (busca_input) {
      window.location.href = `../pages/busca.html?q=${encodeURIComponent(busca_input)}`
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const resultados_pesquisa = document.querySelector("#busca-results") 
  const parametros_busca = new URLSearchParams(window.location.search)
  const resultados_busca_input = parametros_busca.get("q")
  
  if (resultados_busca_input) {
    resultados_pesquisa.innerHTML = `
      <h3>Resultados para: "${resultados_busca_input}"</h3>
      <ul>
        <li>Resultado 1 relacionado a "${resultados_busca_input}"</li>
      </ul>
    `
  } else {
    resultados_pesquisa.innerHTML = "<h3>Nenhum termo de busca foi informado.</h3>"
  }
});
