const botaoNotificacao = document.querySelector(".botao_notificacao");
const contadorNotificacoes = document.getElementById("contadorNotificacoes");
const blocoNotificacao = document.getElementById("blocoNotificacao");
const listaNotificacoes = document.getElementById("listaNotificacoes");

let notificacoes = [
  { titulo: "Projeto A", descricao: "Novo colaborador entrou na equipe...", lida: false },
  { titulo: "Projeto B", descricao: "Seu projeto foi favoritado...", lida: true },
  { titulo: "Projeto C", descricao: "Nova mensagem recebida...", lida: false }
];

let jaAbriu = false;

// Função para renderizar notificações
function renderizarNotificacoes() {
  listaNotificacoes.innerHTML = "";
  notificacoes.forEach(notif => {
    const div = document.createElement("div");
    div.classList.add("notificacao_item", notif.lida ? "lida" : "nao_lida");
    div.innerHTML = `
      <div class="topo_notificacao">
        <span class="titulo">${notif.titulo}</span>
        <span class="status">${notif.lida ? "Lida" : "Não lida"}</span>
      </div>
      <p class="descricao">${notif.descricao}</p>
    `;
    listaNotificacoes.appendChild(div);
  });
  atualizarContador();
}

// Atualiza o contador de notificações não lidas
function atualizarContador() {
  const naoLidas = notificacoes.filter(n => !n.lida).length;
  contadorNotificacoes.textContent = naoLidas;
  contadorNotificacoes.style.display = naoLidas > 0 ? "flex" : "none";

  // animação rápida se houver novas
  contadorNotificacoes.classList.add("nova");
  setTimeout(() => contadorNotificacoes.classList.remove("nova"), 200);
}

// Alterna visibilidade do bloco
botaoNotificacao.addEventListener("click", (e) => {
  e.stopPropagation();
  const visivel = blocoNotificacao.style.display === "flex";
  blocoNotificacao.style.display = visivel ? "none" : "flex";

  if (!visivel) renderizarNotificacoes();
});

// Fecha o bloco e marca notificações como lidas
document.addEventListener("click", (e) => {
  if (blocoNotificacao.style.display === "flex" && !blocoNotificacao.contains(e.target)) {
    blocoNotificacao.style.display = "none";
    notificacoes = notificacoes.map(n => ({ ...n, lida: true }));
    jaAbriu = true;
    atualizarContador();
  }
});

blocoNotificacao.addEventListener("click", (e) => e.stopPropagation());

// Inicializa
renderizarNotificacoes();
