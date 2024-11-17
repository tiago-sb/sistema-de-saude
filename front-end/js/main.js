// escolha do usuario referente ao radio (Posto, Paciente)
const botaoAvancar = document.querySelector("section div:nth-child(2) form button")

botaoAvancar.addEventListener("click", () => {
  const escolha = document.querySelector('input[name="tipo-usuario"]:checked');

  if (escolha) {
    escolha.value === "posto" ? window.location.href = "cadastro_posto.html" : window.location.href = "cadastro_paciente.html"
    return
  } else {
    alert("Por favor, escolha um tipo de usuário específico antes de continuar o cadastro!!");
  }
})