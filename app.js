// EduPortal — sistema acadêmico fictício para o laboratório de testes.
// Todos os nomes, matrículas e CPFs são inventados.

const USUARIOS = [
  { login: "ana.souza",     senha: "aluno123", perfil: "aluno",     nome: "Ana Souza",       matricula: "2026101", cpf: "482.915.307-12", email: "ana.souza@eduportal.test" },
  { login: "bruno.lima",    senha: "aluno123", perfil: "aluno",     nome: "Bruno Lima",      matricula: "2026102", cpf: "371.608.254-90", email: "bruno.lima@eduportal.test" },
  { login: "carla.mendes",  senha: "aluno123", perfil: "aluno",     nome: "Carla Mendes",    matricula: "2026103", cpf: "915.243.680-37", email: "carla.mendes@eduportal.test" },
  { login: "diego.alves",   senha: "aluno123", perfil: "aluno",     nome: "Diego Alves",     matricula: "2026104", cpf: "604.127.893-55", email: "diego.alves@eduportal.test" },
  { login: "elisa.rocha",   senha: "aluno123", perfil: "aluno",     nome: "Elisa Rocha",     matricula: "2026105", cpf: "238.574.916-04", email: "elisa.rocha@eduportal.test" },
  { login: "prof.marcos",   senha: "prof2026", perfil: "professor", nome: "Marcos Pereira",  matricula: "P0042",   cpf: "159.360.472-81", email: "marcos.pereira@eduportal.test" },
];

const DISCIPLINAS = ["Testes de Software", "Banco de Dados", "Programação Web"];

const NOTAS_INICIAIS = {
  "2026101": { "Testes de Software": [8.5, 7.0], "Banco de Dados": [9.0, 8.0], "Programação Web": [7.5, 8.5], freq: 92 },
  "2026102": { "Testes de Software": [6.0, 5.5], "Banco de Dados": [7.0, 6.5], "Programação Web": [8.0, 7.0], freq: 78 },
  "2026103": { "Testes de Software": [9.5, 9.0], "Banco de Dados": [8.5, 9.5], "Programação Web": [9.0, 10.0], freq: 98 },
  "2026104": { "Testes de Software": [4.5, 6.0], "Banco de Dados": [5.0, 5.5], "Programação Web": [6.5, 6.0], freq: 71 },
  "2026105": { "Testes de Software": [7.0, 8.0], "Banco de Dados": [6.5, 7.5], "Programação Web": [8.5, 9.0], freq: 88 },
};

// ---------- armazenamento ----------
function lerNotas() {
  try {
    const salvo = localStorage.getItem("eduportal_notas");
    if (salvo) return JSON.parse(salvo);
  } catch (e) {}
  return JSON.parse(JSON.stringify(NOTAS_INICIAIS));
}
function salvarNotas(notas) {
  localStorage.setItem("eduportal_notas", JSON.stringify(notas));
}
function lerSessao() {
  try {
    return JSON.parse(localStorage.getItem("eduportal_sessao"));
  } catch (e) {
    return null;
  }
}
function usuarioDaSessao() {
  const s = lerSessao();
  if (!s) return null;
  return USUARIOS.find((u) => u.login === s.login) || null;
}

// ---------- login ----------
function entrar(login, senha, perfil) {
  const u = USUARIOS.find((x) => x.login === login.trim().toLowerCase());
  if (!u || u.senha !== senha) return { ok: false, msg: "Usuário ou senha inválidos." };
  if (u.perfil !== perfil) return { ok: false, msg: "Este usuário não possui acesso a este perfil." };
  localStorage.setItem("eduportal_sessao", JSON.stringify({ login: u.login, perfil: u.perfil, inicio: Date.now() }));
  return { ok: true, destino: u.perfil === "professor" ? "professor.html" : "aluno.html" };
}

function sair() {
  window.location.href = "index.html";
}

// ---------- utilidades ----------
function media(n) {
  return (n[0] + n[1]) / 2;
}
function situacao(m, freq) {
  if (freq < 75) return { txt: "Reprovado por falta", cls: "ruim" };
  if (m >= 7) return { txt: "Aprovado", cls: "bom" };
  if (m >= 4) return { txt: "Recuperação", cls: "medio" };
  return { txt: "Reprovado", cls: "ruim" };
}
function mascararCpf(cpf) {
  return "***." + cpf.slice(4, 7) + ".***-**";
}
function fmt(n) {
  return n.toFixed(1).replace(".", ",");
}
function esc(t) {
  return String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function preencherCabecalho(u) {
  document.getElementById("usuario-nome").textContent = u.nome;
  document.getElementById("usuario-perfil").textContent = u.perfil === "professor" ? "Professor" : "Aluno";
  document.getElementById("btn-sair").addEventListener("click", sair);
}
