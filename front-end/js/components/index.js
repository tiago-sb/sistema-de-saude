document.addEventListener("DOMContentLoaded", async () => {
  try {
    const resposta_back_end = await fetch("") // endpoint do back-end
    const { tipo_usuario } = await resposta_back_end.json(); // JSON: { tipo_usuario: "posto" } ou { tipo_usuario: "pessoa" }

    if (tipo_usuario === "posto") { window.location.href = "tela_inicio_posto.html" } 
    else if (tipo_usuario === "pessoa") { window.location.href = "tela_inicio_paciente.html" }
  } catch (error) {
    alert("Erro ao carregar a página. Tente novamente mais tarde.")
  }
})