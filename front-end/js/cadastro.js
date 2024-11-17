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
for (let i = ano_atual; i >= 0; i--) {
  const option = document.createElement("option")
  option.value = i
  option.textContent = i
  ano.appendChild(option)
}


