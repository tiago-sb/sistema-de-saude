document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#search-input")
  const botaoForm = document.querySelector("#search-button")
  
  botaoForm.addEventListener("click", (e) => {
    e.preventDefault()
    const query = searchForm.value.trim()
    if (query) {
      window.location.href = `busca.html?q=${encodeURIComponent(query)}`
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.querySelector("#busca-results") 
  const params = new URLSearchParams(window.location.search)
  const query = params.get("q")
  
  if (query) {
    resultsContainer.innerHTML = `
      <h2>Resultados para: "${query}"</h2>
      <ul>
        <li>Resultado 1 relacionado a "${query}"</li>
      </ul>
    `
  } else {
    resultsContainer.innerHTML = "<h2>Nenhum termo de busca foi informado.</h2>"
  }
});
