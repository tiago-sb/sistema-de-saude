document.addEventListener("DOMContentLoaded", () => {
  const itens_menu = document.querySelectorAll(".menu-item")
  const pagina_atual = document.body.getAttribute("data-page")

  itens_menu.forEach((item) => {
    const page = item.getAttribute("data-page")
    if (page === pagina_atual) {
      item.classList.add("active")
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const menu_configuracoes = document.getElementById("configuracoes");
  const submenu_configuracoes = document.getElementById("submenu");

  menu_configuracoes.addEventListener("click", (e) => {
    e.preventDefault()
    const visivel = submenu_configuracoes.style.display === "block"
    submenu_configuracoes.style.display = visivel ? "none" : "block" // se ta visivel coloca invisivel
  })

  document.addEventListener("click", (e) => {
    if (!menu_configuracoes.contains(e.target) && !submenu_configuracoes.contains(e.target)) {
      submenu_configuracoes.style.display = "none" // uma vez mostrado o menu, caso o usuario clique em algum item ele some novamente
    }
  })

  document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "../pages/index.html"
  })

  document.getElementById("update").addEventListener("click", () => {
    // window.location.href = "personalizar.html"
    alert("clicou em personalizar")
  })
})

function formatarData(data) {
  const [ano, mes, dia] = data.split("-")
  return `${dia}/${mes}/${ano}`
}

document.addEventListener("DOMContentLoaded", () => {
  const usuario_json = localStorage.getItem("usuario")

  if (usuario_json) {
    const usuario = JSON.parse(usuario_json)
    const paciente = usuario.paciente

    const container = document.getElementById("informacoes-paciente")
    const foto_padrao = "../../images/icones/user.png";
    const data_formatada = formatarData(paciente.data_nascimento)

    container.innerHTML = `
      <img src="${paciente.foto || foto_padrao}" alt="Imagem de perfil">
      <h3>${usuario.nome_completo}</h3>
      <p>Data de Nascimento: ${data_formatada}</p>
      <p>Tipo Sanguíneo: ${paciente.tipo_sanguineo}</p>
    `
  } else {
    window.location.href = "../login/login.html";
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const posto = {
    nome: "Nome do Posto",
    localizacao: "Xxxxxxx, Xxxxxxx, Xxxxx",
    foto: ""
  }
  
  const container = document.getElementById("informacoes-posto")
  const foto_padrao = "../../images/icones/user.png"
  
  container.innerHTML = `
    <img src="${posto.foto || foto_padrao}" alt="Imagem de perfil do Posto">
    <h3>${posto.nome}</h3>
    <p>${posto.localizacao}</p>
  `
})

// funcao para recuperar histórico de vacinas do usuario
document.addEventListener("DOMContentLoaded", async () => {
  const modulo_historico_vacinas = document.getElementById("informacoes-paciente-vacina")
  const usuario = localStorage.getItem('usuario')
  const usuario_id = JSON.parse(usuario).id
  
  const renderizarVacinas = async () => {
    if (usuario) {
      try {
        const resposta = await fetch(`http://127.0.0.1:8000/api/v1/postos-de-saude/historico-vacinas/${usuario_id}`, {
          method: "GET"
        });

        if (!resposta.ok) throw new Error("Erro ao buscar o histórico de vacinas.")
        
        const dados_estatisticos = await resposta.json()
        if (dados_estatisticos && Array.isArray(dados_estatisticos.historico_vacinas)) {
          modulo_historico_vacinas.innerHTML = `
            <h3>Histórico de Vacinas</h3>
          `

          const grid_vacina = document.createElement("div")
          grid_vacina.classList.add("vacinas-grid")

          dados_estatisticos.historico_vacinas.forEach((vacina, index) => {
            const card = document.createElement("div");
            card.classList.add("vacina-card");
            const dataformatada = formatarData(vacina.data_aplicacao)
            
            card.innerHTML = `
              <h4>${vacina.nome_vacina}</h4>
              <p>Data: ${dataformatada}</p>
              <p>Dose: ${vacina.dose} mL</p>
              <p>Unidade: ${vacina.unidade_saude}</p>
              <button id="btn-excluir" class="btn-excluir" onclick="excluirVacina(${index})">Excluir</button>
            `;

            grid_vacina.appendChild(card)
          })
          
          modulo_historico_vacinas.appendChild(grid_vacina)
        } else {
          modulo_historico_vacinas.innerHTML = "<h3>Não há vacinas registradas para este paciente</h3>"
        }
      } catch (erro) {
        modulo_historico_vacinas.innerHTML = "<h3>Erro ao carregar o histórico de vacinas.</h3>"
      }
    }
  }

  // Função para excluir vacina
  const excluirVacina = (index) => {
    if (confirm("Tem certeza que deseja excluir esta vacina do seu histórico?")) {
      // Lógica para excluir vacina, que você pode implementar se tiver um endpoint para exclusão
      alert(`Vacina ${index} excluída (essa parte precisa de implementação no backend)`);
      // Re-renderiza as vacinas após exclusão
      renderizarVacinas()
    }
  }

  renderizarVacinas()
})

document.addEventListener("DOMContentLoaded", () => {
  let campanhas = [
    { id: 1, nome: "Campanha X", bairro: "bairro x", cidade: "cidade x", estado: "estado x", vacinas: ["vacina x", 2400]},
    { id: 2, nome: "Campanha Y", bairro: "bairro y", cidade: "cidade y", estado: "estado y", vacinas: ["vacina y", 1200]}
  ]

  const modulo_historico_campanhas = document.getElementById("informacoes-paciente-posto")

  const renderizarCampanhas = () => {
    modulo_historico_campanhas.innerHTML = `
      <h3>Histórico de Campanhas</h3>
    `

    const grid_campanha = document.createElement("div")
    grid_campanha.classList.add("vacinas-grid")

    campanhas.forEach((campanha, index) => {
      const card = document.createElement("div")
      card.classList.add("vacina-card")
       
      card.innerHTML = `
        <h4>${campanha.nome} - ${campanha.id}</h4>
        <p>Endereço: ${campanha.bairro}, ${campanha.cidade}, ${campanha.estado}</p>
        <button id="btn-excluir" class="btn-excluir" onclick="excluirCampanha(${index})">Excluir</button>
      `
      grid_campanha.appendChild(card)
    })

    modulo_historico_campanhas.appendChild(grid_campanha)
  };

  excluirCampanha = (index) => {
    if (confirm("Tem certeza que deseja excluir esta campanha do seu histórico?")) {
      campanhas.splice(index, 1)
      renderizarCampanhas()
    }
  }

  renderizarCampanhas()
})

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = localStorage.getItem('usuario')
  const usuario_id = JSON.parse(usuario).id

  if (usuario) {
    try {
      const resposta = await fetch(`http://127.0.0.1:8000/api/v1/postos-de-saude/historico-vacinas/estatisticas/${usuario_id}`, {
        method: "GET"
      })
  
      if (!resposta.ok) throw new Error("Erro ao buscar as estatísticas de vacinas.")
  
      const dados_estatisticos = await resposta.json()
      console.log(dados_estatisticos, dados_estatisticos.total_vacinas, dados_estatisticos.vacinas_por_mes)
      const container = document.getElementById("informacoes-paciente-dados")
      
      container.innerHTML = `
        <div class="vacinas-total">
          <h3>Total de Vacinas</h3>	
          <p>${dados_estatisticos.total_vacinas}</p>
        </div>
        <div class="grafico-container">
          <canvas id="grafico_mensal"></canvas>
        </div>
      `
      
      const ctx = document.getElementById('grafico_mensal').getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(dados_estatisticos.vacinas_por_mes),
          datasets: [{
            label: 'Vacinas aplicadas', data: Object.values(dados_estatisticos.vacinas_por_mes), backgroundColor: '#6394FF', borderWidth: 1}
          ]
        },
        options: {
          responsive: true, plugins: { legend: { display: false },  tooltip: { enabled: true }
          },
          scales: {
            x: { title: { display: true, text: 'Meses'}},
            y: { title: { display: true, text: 'Vacinas'},beginAtZero: true}
          },
          title: {display: true, text: 'Vacinas Aplicadas', font: { size: 15, family: 'Sansation', weight: 'bold'}
          }
        }
      })
    } catch (erro) {
      console.error("Erro:", erro.message)
    }
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const formulario_container = document.querySelector("#postagem-posto > form")

  formulario_container.addEventListener("click", (event) => { 
    if (event.target.tagName === "IMG") {
      const adicaoContainer = event.target.closest(".form-row-posto")
      event.target.remove()

      adicaoContainer.insertAdjacentHTML(
        "afterend",
        `
        <div class="form-row-posto row">
          <input type="text" name="nome-vacina" required placeholder="Digite o nome da vacina">
          <input type="number" name="quantidade-vacina" required placeholder="Quantidade">
          <img src="../../images/botoes/adicionar.png" alt="Adicionar vacinas" title="Adicionar vacinas">
        </div>
      `
      )
    }
  })
})

// cadastro de novas vacinas ao historico do paciente
document.addEventListener("DOMContentLoaded", async () => {
  const botao_registrar = document.querySelector("body > main > section:nth-child(4) > form > button")
  
  botao_registrar.addEventListener("click", async (event) => {
    event.preventDefault()
    const usuario = localStorage.getItem('usuario')
    const usuario_id = JSON.parse(usuario).id

    const vacina = coletarDadosVacina(usuario_id)
    
    if (!vacina) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }
    
    try {
      await cadastrarVacina(vacina)
      alert('Vacina cadastrada com sucesso!');
      window.location.reload()
    } catch (erro) {
      alert('Erro ao cadastrar vacina.')
    }
  })
})

function coletarDadosVacina(usuario_id) {
  const nome_vacina = document.getElementById('nome_registro_vacina').value
  const data_aplicacao = document.getElementById('data_registro_vacina').value
  const dose = document.getElementById('dose').value
  const unidade_saude = document.getElementById('unidade_medica').value

  return { usuario_id, nome_vacina, data_aplicacao, dose, unidade_saude }
}

async function cadastrarVacina(dadosVacina) {
  const resposta = await fetch('http://127.0.0.1:8000/api/v1/postos-de-saude/historico-vacinas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosVacina),
  })

  if (!resposta.ok) throw new Error("Falha ao criar nova vacina!")
}