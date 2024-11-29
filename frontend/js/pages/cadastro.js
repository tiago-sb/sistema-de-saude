document.addEventListener("DOMContentLoaded", carregarPaises)
document.addEventListener("DOMContentLoaded", carregarEstados)

document.addEventListener("DOMContentLoaded", configuracoesImagem)

document.addEventListener("DOMContentLoaded", carregarDia)
document.addEventListener("DOMContentLoaded", carregarAno)
document.querySelector("#cpf").addEventListener("blur", carregarCpf)
document.getElementById("numero_sus").addEventListener("input", carregarNumeroSUS)

async function carregarPaises() {
  try {
    const lista_paises = await fetch("https://restcountries.com/v3.1/all")
    const paises = await lista_paises.json()

    const lista_paises_ordenados = paises.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    )

    lista_paises_ordenados.forEach((pais) => {
      const opcoes_pais = document.createElement("option")
      opcoes_pais.value = pais.cca2
      opcoes_pais.textContent = pais.name.common
      document.getElementById("pais").appendChild(opcoes_pais)
    })

  } catch (error) {
    console.error("Erro ao carregar países")
  }
}

async function carregarEstados() {
  try {
    const lista_estados = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    const estados = await lista_estados.json()

    
    const lista_estados_ordenados = estados.sort((a, b) =>
      a.nome.localeCompare(b.nome)
    )

    lista_estados_ordenados.forEach((estado) => {
      const opcao_estado = document.createElement("option")
      opcao_estado.value = estado.sigla
      opcao_estado.textContent = estado.nome
      document.getElementById("estado").appendChild(opcao_estado)
    })
  } catch (error) {
    console.error("Erro ao carregar estados")
  }
}

function carregarDia(){
  const dia = document.getElementById("dia")

  for (let dia_mensal = 1; dia_mensal <= 31; dia_mensal++) {
    const opcao_dia = document.createElement("option")
    opcao_dia.value = dia_mensal
    opcao_dia.textContent = String(dia_mensal).padStart(2, "0")
    dia.appendChild(opcao_dia)
  }
}

function carregarAno(){
  const ano = document.getElementById("ano")
  const ano_atual = new Date().getFullYear()
  
  for (let ano_parcial = ano_atual; ano_parcial >= 1900; ano_parcial--) {
    const opcao_ano = document.createElement("option")
    opcao_ano.value = ano_parcial
    opcao_ano.textContent = ano_parcial
    ano.appendChild(opcao_ano)
  }
}


function carregarCpf() {
  if (cpf.value) {
    const cpfFormatado = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ // Verifica se o CPF ja esta no formato correto { XXX.XXX.XXX-XX }
    
    if (!cpfFormatado.test(cpf.value)) {
      cpf.value = cpf.value
        .replace(/\D/g, '') // retira os valores nao numericos
        .match(/.{1,3}/g) // divide o numero em 3 posicoes de um vetor
        .join(".") // une eles com pontos
        .replace(/\.(?=[^.]*$)/, "-") // substiti o ultimo ponto por hifen
    }
  }
}


function carregarNumeroSUS(e) {
  let valor_input_sus = e.target.value
  .replace(/\D/g, "") // remover os caracteres nao numericos do numero
  .slice(0, 15) // limitacao de 15 digitos
  
  const valor_sus_formatado = valor_input_sus
      .replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4") // agrupa os digitos no formato correto com espacos
      .trim() // percorre removendo os espacos extra

  e.target.value = valor_sus_formatado;
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