document.addEventListener("DOMContentLoaded", () => {
  const botaoLogin = document.querySelector("body > main > section > div:nth-child(2) > form > button.botao-enviar")

  botaoLogin.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    if (!email || !senha) {
      alert("Lembre-se de preencher todos os campos!");
      return
    }

    try {
      const body = document.querySelector('body')
      body.innerHTML = `<h1 style="text-align: center; margin-top: 10rem; color: #6394FF;">Carregando...</h1>`

      const resposta = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      })

      if (!resposta.ok) throw new Error("Login inválido!! Verifique suas credenciais.")

      const dados = await resposta.json()
      const userId = dados.id
      localStorage.setItem("user_id", userId)
      
      const respostaUsuario = await fetch(`http://127.0.0.1:8000/api/v1/auth/usuarios/${userId}`)
      
      if (!respostaUsuario.ok) {
        throw new Error("Não foi possível carregar as informações do usuário.")
      }

      const usuario = await respostaUsuario.json()
      localStorage.setItem("usuario", JSON.stringify(usuario))

      const { tipo_usuario } = usuario
      console.log(usuario, tipo_usuario)
      if (tipo_usuario === "PostoDeSaude") {
        window.location.href = "../dashboard/tela_inicio_posto.html"
        return
      }

      if (tipo_usuario === "Paciente") {
        window.location.href = "../dashboard/tela_inicio_paciente.html"
        return 
      } 
      
      alert("Usuário desconhecido.")
    } catch (erro) {
      alert(erro.message)
    }
  })
})