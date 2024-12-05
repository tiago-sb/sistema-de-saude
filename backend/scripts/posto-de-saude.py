import httpx
import random

# URL do endpoint da API
BASE_URL = "http://localhost:8000/api/v1/postos-de-saude/postos-de-saude"

# Dados fictícios para os postos de saúde
postos = [
    {
        "usuario_id": 1,
        "cnpj": "12345678000101",
        "bairro": "Centro",
        "cidade": "São Paulo",
        "estado": "SP",
        "cep": "01001000",
        "pais": "Brasil",
    },
    {
        "usuario_id": 2,
        "cnpj": "98765432000102",
        "bairro": "Vila Mariana",
        "cidade": "São Paulo",
        "estado": "SP",
        "cep": "04002000",
        "pais": "Brasil",
    },
    {
        "usuario_id": 3,
        "cnpj": "11223344000103",
        "bairro": "Copacabana",
        "cidade": "Rio de Janeiro",
        "estado": "RJ",
        "cep": "22020000",
        "pais": "Brasil",
    },
    {
        "usuario_id": 4,
        "cnpj": "55667788000104",
        "bairro": "Boa Viagem",
        "cidade": "Recife",
        "estado": "PE",
        "cep": "51020010",
        "pais": "Brasil",
    },
    {
        "usuario_id": 5,
        "cnpj": "99887766000105",
        "bairro": "Savassi",
        "cidade": "Belo Horizonte",
        "estado": "MG",
        "cep": "30140071",
        "pais": "Brasil",
    },
]


# Criar os postos de saúde
def criar_postos():
    with httpx.Client() as client:
        for posto in postos:
            try:
                response = client.post(BASE_URL, json=posto)
                if response.status_code == 200:
                    print(f"Posto no bairro {posto['bairro']} criado com sucesso!")
                else:
                    print(
                        f"Erro ao criar posto no bairro {posto['bairro']}: {response.text}"
                    )
            except Exception as e:
                print(f"Erro ao conectar com o servidor: {str(e)}")


if __name__ == "__main__":
    criar_postos()
