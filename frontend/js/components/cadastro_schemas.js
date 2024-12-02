document.addEventListener("DOMContentLoaded", () => {
  const botao_avancar = document.querySelector('body > section > div:nth-child(2) > form > div.form-row > button.btn-avancar')
  
  botao_avancar.addEventListener("click", async (event) => {
    event.preventDefault()

    const usuario = coletarDadosUsuario()
    if (!usuario) return
    
    try {
      const id_usuario = await cadastrarUsuario(usuario)
      sessionStorage.setItem("usuario_id", id_usuario)
      const tipo_usuario = document.querySelector('input[name="tipo-usuario"]:checked').value
      
      tipo_usuario === "PostoDeSaude" ? redirecionar('cadastro_posto.html') : redirecionar('cadastro_paciente.html')
    } catch (erro) {
      alert("Erro ao cadastrar usuário!!")
    }
  })
})

document.addEventListener("DOMContentLoaded", async () => {
  const botao_avancar = document.querySelector("body > section > div:nth-child(2) > form > div:nth-child(11) > button.btn-avancar")

  botao_avancar.addEventListener("click", async (event) => {
    event.preventDefault()
    const usuario_id = sessionStorage.getItem("usuario_id")
    const paciente = coletarDadosPaciente(usuario_id)
    
    if (!paciente) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }

    try {
      await cadastrarPaciente(paciente)
      redirecionar('../dashboard/tela_inicio_paciente.html')
    } catch (erro) {
      alert('Erro ao cadastrar paciente.')
    }
  })
})

document.addEventListener("DOMContentLoaded", async () => {
  const botao_avancar = document.querySelector('body > section > div:nth-child(2) > form > div:nth-child(6) > button.btn-avancar')

  botao_avancar.addEventListener("click", async (event) => {
    event.preventDefault()
    const usuario_id = sessionStorage.getItem('usuario_id')
    const posto = coletarDadosPosto(usuario_id)
    
    if (!posto) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }

    try {
      await cadastrarPosto(posto)
      redirecionar("../dashboard/tela_inicio_posto.html")
    } catch (erro) {
      alert('Erro ao cadastrar posto.')
    }
  })
})

async function cadastrarUsuario(usuario) {
  const resposta = await fetch('http://127.0.0.1:8000/api/v1/auth/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  })

  if (!resposta.ok) throw new Error("Falha ao criar novo usuário!")
  
  const dados = await resposta.json()
  return dados.id
}

async function cadastrarPaciente(dadosPaciente) {
  const resposta = await fetch('http://127.0.0.1:8000/api/v1/pacientes/pacientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosPaciente),
  })

  if (!resposta.ok) throw new Error("Falha ao criar novo paciente!")
}

async function cadastrarPosto(dadosPosto) {
  const resposta = await fetch('http://127.0.0.1:8000/api/v1/postos-de-saude/postos-de-saude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosPosto),
  });

  if (!resposta.ok) throw new Error("Falha ao criar novo posto de saúde!")
}

function coletarDadosUsuario() {
  const nome_completo = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value
  const telefone = document.getElementById('celular').value
  const url_profile = document.getElementById('preview-img').src
  const tipo_usuario = document.querySelector('input[name="tipo-usuario"]:checked').value

  if (!nome_completo || !email || !senha || !telefone || !tipo_usuario) {
    alert("Lembre-se de preencher todos os campos obrigatórios!")
    return null
  }

  return { nome_completo, email, senha, telefone, url_profile, tipo_usuario }
}

function coletarDadosPaciente(usuario_id) {
  const cpf = document.getElementById('cpf').value
  const numero_cartao_sus = document.getElementById('numero_sus').value
  const dia = document.getElementById('dia').value
  const mes = document.getElementById('mes').value
  const ano = document.getElementById('ano').value
  const data_nascimento = `${ano}-${mes}-${String(dia).padStart(2, '0')}`
  const tipo_sanguineo = document.getElementById('tipo-sanguineo').value
  const altura = parseFloat(document.getElementById('altura').value)
  const peso = parseFloat(document.getElementById('peso').value)

  return { usuario_id, cpf, numero_cartao_sus, data_nascimento, tipo_sanguineo, altura, peso }
}

function coletarDadosPosto(usuario_id) {
  const cnpj = document.getElementById('cnpj').value
  const bairro = document.getElementById('bairro').value
  const cidade = document.getElementById('cidade').value
  const estado = document.getElementById('estado').value
  const cep =  document.getElementById('cep').value
  const pais = document.getElementById('pais').value
  
  return { usuario_id, cnpj, bairro, cidade, estado, cep, pais }
}

function redirecionar(url) {
  window.location.href = url
}