document.addEventListener("DOMContentLoaded", async () => {
  const botao_atualizar = document.querySelector("body > main > section > form > button")

  botao_atualizar.addEventListener("click", async (event) => {
    event.preventDefault()
    const usuario_atual = localStorage.getItem('usuario')
    const usuario_id = JSON.parse(usuario_atual).id
    const usuario = coletarDadosFormulario()
    try {
      await atualizarUsuario(usuario_id, usuario)
      alert('Informações atualizadas com sucesso!')
      window.location.reload()
    } catch (erro) {
      alert('Falha ao atualizar informações!')
    }
  })
})

function coletarDadosFormulario() {
  const nome_completo = document.querySelector("#nome").value
  const email = document.querySelector("#email").value
  const telefone = document.querySelector("#celular").value
  const url_profile = document.querySelector("#file-input").value

  return { nome_completo, email, telefone, url_profile }
}

async function atualizarUsuario(user_id, dados_novos) {
  const resposta = await fetch(`http://127.0.0.1:8000/api/v1/auth/usuarios/${user_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados_novos),
  });

  if (!resposta.ok) throw new Error('Falha ao atualizar informações!')
}