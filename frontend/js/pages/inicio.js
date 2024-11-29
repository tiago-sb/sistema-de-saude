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
  const usuario = {
    nome: "Nome do Paciente",
    dataNascimento: "00/00/0000",
    localizacao: "Xxxxxxx, Xxxxxxx, Xxxxx",
    tipoSanguineo: "X+",
    foto: ""
  }

  const container = document.getElementById("informacoes-paciente")
  const foto_padrao = "../../images/icones/user.png"
  
  container.innerHTML = `
    <img src="${usuario.foto || foto_padrao}" alt="Imagem de perfil">
    <h3>${usuario.nome}</h3>
    <p>${usuario.dataNascimento}</p>
    <p>${usuario.localizacao}</p>
    <p>${usuario.tipoSanguineo}</p>
  `
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

document.addEventListener("DOMContentLoaded", () => {
  let vacinas = [
    { nome: "Vacina X", data: "10/08/2024", dose: 0.5, unidade: "Hospital São José" },
    { nome: "Vacina Y", data: "11/05/2024", dose: 1.5, unidade: "HGE" },
    { nome: "Vacina Z", data: "21/03/2024", dose: 1.2, unidade: "Unidade básica de saúde de Vitória da Conquista" }
  ];

  const modulo_historico_vacinas = document.getElementById("informacoes-paciente-vacina");

  const renderizarVacinas = () => {
    modulo_historico_vacinas.innerHTML = `
      <h3>Histórico de Vacinas</h3>
    `

    const grid_vacina = document.createElement("div");
    grid_vacina.classList.add("vacinas-grid");

    vacinas.forEach((vacina, index) => {
      const card = document.createElement("div");
      card.classList.add("vacina-card")
      
      card.innerHTML = `
        <h4>${vacina.nome}</h4>
        <p>Data: ${vacina.data}</p>
        <p>Dose: ${vacina.dose} mL</p>
        <p>Unidade: ${vacina.unidade}</p>
        <button id="btn-excluir" class="btn-excluir" onclick="excluirVacina(${index})">Excluir</button>
      `

      grid_vacina.appendChild(card)
    })

    modulo_historico_vacinas.appendChild(grid_vacina)
  };

  excluirVacina = (index) => {
    if (confirm("Tem certeza que deseja excluir esta vacina do seu histórico?")) {
      vacinas.splice(index, 1)
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

document.addEventListener("DOMContentLoaded", () => {
  const dados_usuario = {
    totalVacina: 3,
    graficoMensal: {
      janeiro: 0, fevereiro: 0, marco: 1, abril: 0, maio: 1, junho: 0, 
      julho: 0, agosto: 1, setembro: 0, outubro: 0, novembro: 0, dezembro: 0
    }
  }

  const container = document.getElementById("informacoes-paciente-dados")

  container.innerHTML = `
    <div class="vacinas-total">
      <h3>Total de Vacinas</h3>	
      <p>${dados_usuario.totalVacina}</p>
    </div>
    <div class="grafico-container">
      <canvas id="grafico_mensal"></canvas>
    </div>
  `

  const ctx = document.getElementById('grafico_mensal').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(dados_usuario.graficoMensal),
      datasets: [{
        label: 'Vacinas aplicadas', data: Object.values(dados_usuario.graficoMensal), backgroundColor: '#6394FF', borderWidth: 1}
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