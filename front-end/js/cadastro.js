document.addEventListener("DOMContentLoaded", carregarPaises)
document.addEventListener("DOMContentLoaded", carregarEstados)
document.addEventListener("DOMContentLoaded", configuracoesImagem)

async function carregarPaises() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const paises = await response.json()

    const paises_ordenados = paises.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    )

    paises_ordenados.forEach((pais) => {
      const option = document.createElement("option")
      option.value = pais.cca2
      option.textContent = pais.name.common
      document.getElementById("pais").appendChild(option)
    })

  } catch (error) {
    console.error("Erro ao carregar países")
  }
}

async function carregarEstados() {
  try {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    const estados = await response.json()

    
    const estados_ordenados = estados.sort((a, b) =>
      a.nome.localeCompare(b.nome)
    )

    estados_ordenados.forEach((estado) => {
      const option = document.createElement("option")
      option.value = estado.sigla
      option.textContent = estado.nome
      document.getElementById("estado").appendChild(option)
    })

    return estado.nome
  } catch (error) {
    console.error("Erro ao carregar estados")
  }
}

// preencher o option dos dias
const dia = document.getElementById("dia")
for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option")
  option.value = i
  option.textContent = String(i).padStart(2, "0")
  dia.appendChild(option)
}

// Preencher o option dos anos (1900 - ano atual)
const ano = document.getElementById("ano")
const ano_atual = new Date().getFullYear()
for (let i = ano_atual; i >= 1900; i--) {
  const option = document.createElement("option")
  option.value = i
  option.textContent = i
  ano.appendChild(option)
}

function configuracoesImagem() {
  const input_arquivo = document.getElementById("file-input")
  const preview_imgagem = document.getElementById("preview-img")
  const nome_documento = document.getElementById("file-name")

  input_arquivo.addEventListener("change", (event) => {
    const file = event.target.files[0]
    if (file) {
      nome_documento.textContent = file.name

      const reader = new FileReader()
      reader.onload = () => {
        preview_imgagem.src = reader.result
        preview_imgagem.style.display = "block"
      }
      reader.readAsDataURL(file)
    }
  })
}