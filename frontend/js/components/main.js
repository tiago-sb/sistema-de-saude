// escolha do usuario referente ao radio (Posto, Paciente)
const botao_voltar = document.querySelector("body > section > div:nth-child(2) > form > div.form-row > button.btn-voltar")
const botao_voltar_cadastro = document.querySelector("div.form-row .voltar-cadastro")

botao_voltar.addEventListener("click", () => {
  window.location.href = "../pages/index.html"
})
botao_voltar_cadastro.addEventListener("click", () => {
  window.location.href = "cadastro.html"
})