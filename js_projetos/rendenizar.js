
  let listaProjetos = []; // Lista será preenchida pela API

  // ================================
  // FUNÇÃO PARA RENDERIZAR OS CARDS
  // ================================
  function renderizarProjetos() {
    container.innerHTML = ""; // Limpa o container antes de renderizar

    listaProjetos.forEach(projeto => {
      // Cria card principal
      const card = document.createElement('div');
      card.classList.add('projeto-card');

      // Cabeçalho
      const cabecalho = document.createElement('div');
      cabecalho.classList.add('card-cabecalho');
      const titulo = document.createElement('div');
      titulo.classList.add('card-cabecalho-texto');
      titulo.textContent = projeto.nome;
      cabecalho.appendChild(titulo);

      // Corpo
      const corpo = document.createElement('div');
      corpo.classList.add('card-corpo');
      const descricao = document.createElement('p');
      descricao.textContent = projeto.descricao || "";
      corpo.appendChild(descricao);

      // Rodapé
      const rodape = document.createElement('div');
      rodape.classList.add('card-rodape');
      const statusSpan = document.createElement('span');
      statusSpan.classList.add(projeto.status === "Concluído" ? "status-concluido" : "status-andamento");
      statusSpan.textContent = projeto.status || "Em andamento";

      const botao = document.createElement('button');
      botao.classList.add('botao-ver-mais');
      botao.textContent = 'Ver mais';

      // Toggle expandido
      botao.addEventListener('click', () => {
        card.classList.toggle('expandido');
      });

      rodape.appendChild(statusSpan);
      rodape.appendChild(botao);

      // Monta card completo
      card.appendChild(cabecalho);
      card.appendChild(corpo);
      card.appendChild(rodape);

      // Adiciona ao container
      container.appendChild(card);
    });
  }

  // ================================
  // CARREGAR PROJETOS DA API
  // ================================
  async function carregarProjetos() {
    try {
      const response = await fetch("http://127.0.0.1:8000/projetos");
      const data = await response.json();
      listaProjetos = data.projetos.map(p => ({
        nome: p.nome,
        descricao: p.descricao || "",
        status: p.status
      }));
      renderizarProjetos();
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      container.innerHTML = "<p>Não foi possível carregar os projetos.</p>";
    }
  }

  carregarProjetos(); // Carrega ao abrir a página

  // ================================
  // PESQUISA DE PROJETOS
  // ================================
  const inputPesquisa = document.querySelector('.barra-pesquisa input');

  inputPesquisa.addEventListener('input', () => {
    const termo = inputPesquisa.value.toLowerCase();
    const projetosCards = container.querySelectorAll('.projeto-card');

    projetosCards.forEach(card => {
      const titulo = card.querySelector('.card-cabecalho-texto').textContent.toLowerCase();
      card.style.display = titulo.includes(termo) ? 'flex' : 'none';
    });
  });


