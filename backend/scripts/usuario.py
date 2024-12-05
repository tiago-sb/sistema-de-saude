import httpx
import random

# URL do endpoint da API
BASE_URL = "http://localhost:8000/api/v1/auth/usuarios"

# Dados de exemplo para criar usuários
nomes = [
    "Posto Santa Elena",
    "João Carlos",
    "Maria Clara",
    "Pedro Henrique",
    "Carla Fernanda",
    "Lucas Gabriel",
    "Gabriela Souza",
    "Fernando Silva",
    "Larissa Alves",
    "Rafael Mendes",
]
emails = [
    "posto.santaelena@example.com",
    "joao.carlos@example.com",
    "maria.clara@example.com",
    "pedro.henrique@example.com",
    "carla.fernanda@example.com",
    "lucas.gabriel@example.com",
    "gabriela.souza@example.com",
    "fernando.silva@example.com",
    "larissa.alves@example.com",
    "rafael.mendes@example.com",
]
telefones = [
    "11987654321",
    "21987654321",
    "31987654321",
    "41987654321",
    "51987654321",
    "61987654321",
    "71987654321",
    "81987654321",
    "91987654321",
    "11912345678",
]
tipos_usuarios = ["Paciente", "PostoDeSaude"]


# Função para gerar um corpo de requisição válido
def gerar_usuario(nome, email, telefone):
    return {
        "nome_completo": nome,
        "email": email,
        "senha": "senha123",
        "telefone": telefone,
        "tipo_usuario": random.choice(tipos_usuarios),
        "url_profile": f"https://example.com/profile/{email.split('@')[0]}",
    }


# Criar os usuários
def criar_usuarios():
    with httpx.Client() as client:
        for i in range(10):
            usuario = gerar_usuario(nomes[i], emails[i], telefones[i])
            try:
                response = client.post(BASE_URL, json=usuario)
                if response.status_code == 200:
                    print(f"Usuário {usuario['nome_completo']} criado com sucesso!")
                else:
                    print(
                        f"Erro ao criar usuário {usuario['nome_completo']}: {response.text}"
                    )
            except Exception as e:
                print(f"Erro ao conectar com o servidor: {str(e)}")


if __name__ == "__main__":
    criar_usuarios()
