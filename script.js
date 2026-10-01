// Arquivo de configuração e processamento do Partido
const candidatos = [];

async function carregarCandidatos(nomePartido) {
  try {
    // Consulta o arquivo local via Fetch API
    const resposta = await fetch("candidatos.json");
    const dados = await resposta.json();

    // Limpa o array de memória
    candidatos.length = 0;

    // Obtém apenas os registros associados ao seu partido (PDisney)
    if (dados[nomePartido]) {
      dados[nomePartido].forEach((candidato) => {
        // Adiciona os campos de cargo e numero em branco, estruturando o objeto
        candidatos.push({
          nome: candidato.nome,
          foto: candidato.foto,
          cargo: null,
          numero: null,
        });
      });
    }
  } catch (erro) {
    console.error("Erro ao carregar o arquivo candidatos.json:", erro);
  }
}

function validarNumeroCandidato(numero, cargo, numeroPartido) {
  // Regras numéricas com base no número do partido carregado no HTML
  const regexRegras = {
    Presidente: new RegExp(`^${numeroPartido}$`), // XX
    "Governador(a)": new RegExp(`^${numeroPartido}$`), // XX
    "Senador(a)": new RegExp(`^${numeroPartido}\\d{1}$`), // XXn
    "Deputado(a) Federal": new RegExp(`^${numeroPartido}\\d{2}$`), // XXnn
    "Deputado(a) Estadual": new RegExp(`^${numeroPartido}\\d{3}$`), // XXnnn
  };

  if (regexRegras[cargo]) {
    return regexRegras[cargo].test(numero);
  }
  return false;
}
