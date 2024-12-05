const resultados_pesquisa = document.querySelector("#busca-results")
const parametros_busca = new URLSearchParams(window.location.search)
const termo_pesquisa = parametros_busca.get("q")
const botao_busca = document.querySelector("#search-button")

document.addEventListener("DOMContentLoaded", () => {
  botao_busca.addEventListener("click", (e) => {
    e.preventDefault()
    const pesquisa_input = document.getElementById("search-input")
    const termo = pesquisa_input.value.trim()
    
    if (termo) {
      window.location.href = `../pages/busca.html?q=${encodeURIComponent(termo)}`
    } else {
      resultados_pesquisa.innerHTML = "<h3>Nenhum termo de busca foi informado.</h3>"
    }
  })

  if (termo_pesquisa) {
    exibirResultadosBusca(termo_pesquisa)
  }
})

async function exibirResultadosBusca(termo) {
  try {
    resultados_pesquisa.innerHTML = "<h4>Carregando...</h4>"
    const resposta = await fetch(`http://127.0.0.1:8000/api/v1/postos-de-saude/campanhas/busca?titulo=${encodeURIComponent(termo)}`)
    const campanhas = await resposta.json()
    
    if (campanhas.campanhas.length > 0) {
      resultados_pesquisa.innerHTML = `
        <h3>Resultados para: "${termo}"</h3>
        <ul>
          ${campanhas.campanhas.map(campanha => `
            <li>
              <h4>${campanha.titulo} - ID ${campanha.id}</h4>
              <p><strong>Local:</strong> ${campanha.descricao}</p>
              <p><strong>Data Início:</strong> ${formatarData(campanha.data_inicio)}</p>
              <p><strong>Data Fim:</strong> ${formatarData(campanha.data_fim)}</p>
            </li>
            <hr>
          `).join("")}
        </ul>
      `
    } else {
      resultados_pesquisa.innerHTML = `<h3>Nenhuma campanha encontrada para: "${termo}".</h3>`
    }
  } catch (erro) {
    console.error(erro)
    resultados_pesquisa.innerHTML = `<h3>Erro ao buscar campanhas.</h3>`
  }
}

function formatarData(data) {
  const [ano, mes, dia] = data.split("-")
  return `${dia}/${mes}/${ano}`
}