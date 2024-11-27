// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch("") // endpoint do back-end
//     const { userType } = await response.json(); // JSON: { userType: "posto" } ou { userType: "pessoa" }

//     if (userType === "posto") { window.location.href = "tela_inicio_posto.html" } 
//     else if (userType === "pessoa") { window.location.href = "tela_inicio_paciente.html" }
//   } catch (error) {
//     alert("Erro ao carregar a página. Tente novamente mais tarde.")
//   }
// })