-- Tabela principal para usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    senha_hash TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
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
    altura DECIMAL(3, 2),
    peso DECIMAL(5, 2),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
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
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
