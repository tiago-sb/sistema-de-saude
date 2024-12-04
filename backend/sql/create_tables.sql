-- Tabela principal para usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    senha_hash TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    url_profile TEXT,
    telefone VARCHAR(20),
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('Paciente', 'PostoDeSaude')),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    cpf VARCHAR(20) UNIQUE NOT NULL,
    numero_cartao_sus VARCHAR(20) UNIQUE,
    data_nascimento DATE,
    tipo_sanguineo VARCHAR(5),
    altura Float,
    peso Float,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela para postos de saúde
CREATE TABLE IF NOT EXISTS postos_de_saude (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    cnpj VARCHAR(20) UNIQUE NOT NULL,
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    pais VARCHAR(100),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE IF NOT EXISTS historico_vacinas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome_vacina VARCHAR(255) NOT NULL,
    data_aplicacao DATE NOT NULL,
    dose VARCHAR(50) NOT NULL,
    unidade_saude VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE IF NOT EXISTS campanhas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    owner_id INT NOT NULL,
    publico_alvo TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

   FOREIGN KEY (owner_id) REFERENCES usuarios(id)
);

-- Se for necessário associar campanhas a vacinas específicas:
CREATE TABLE IF NOT EXISTS campanhas_vacinas (
    id SERIAL PRIMARY KEY,
    campanha_id INT NOT NULL,
    vacina_nome VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    FOREIGN KEY (campanha_id) REFERENCES campanhas(id),
    FOREIGN KEY (owner_id) REFERENCES usuarios(id)
);


CREATE TABLE IF NOT EXISTS notificacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
