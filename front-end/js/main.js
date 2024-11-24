// escolha do usuario referente ao radio (Posto, Paciente)
const botao_avancar = document.querySelector("section div:nth-child(2) form div button:nth-child(2)")
const botao_voltar = document.querySelector("div.form-row .btn-voltar")
const botao_voltar_cadastro = document.querySelector("div.form-row .voltar-cadastro")


botao_avancar.addEventListener("click", () => {
  const escolha = document.querySelector('input[name="tipo-usuario"]:checked');

  if (escolha) {
    escolha.value === "posto" ? window.location.href = "cadastro_posto.html" : window.location.href = "cadastro_paciente.html"
    return
  } else {
    alert("Por favor, escolha um tipo de usuário específico antes de continuar o cadastro!!");
  }
})

botao_voltar.addEventListener("click", () => {
  window.location.href = "index.html"
})

botao_voltar_cadastro.addEventListener("click", () => {
  window.location.href = "cadastro.html"
})