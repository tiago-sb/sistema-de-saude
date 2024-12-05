import requests
from datetime import datetime, timedelta
import random

# URL do endpoint
URL = "http://localhost:8000/api/v1/postos-de-saude/historico-vacinas"


# Função para gerar dados fictícios
def gerar_dados_vacina():
    nomes_vacinas = [
        "Pfizer-BioNTech",
        "Moderna",
        "AstraZeneca",
        "CoronaVac",
        "Janssen",
        "Sputnik V",
        "Sinopharm",
        "Covaxin",
        "Novavax",
        "CanSino",
    ]
    unidades_saude = [
        "Posto de Saúde Central",
        "UBS São José",
        "Hospital Municipal",
        "Unidade de Vacinação Vila Nova",
        "Centro de Saúde da Família",
    ]

    return {
        "usuario_id": random.randint(1, 10),
        "nome_vacina": random.choice(nomes_vacinas),
        "data_aplicacao": (
            datetime.now() - timedelta(days=random.randint(1, 365))
        ).strftime("%Y-%m-%d"),
        "dose": random.choice(["1ª dose", "2ª dose", "3ª dose", "Refôrço"]),
        "unidade_saude": random.choice(unidades_saude),
    }


# Criar 10 históricos de vacinas
for _ in range(10):
    dados = gerar_dados_vacina()
    response = requests.post(URL, json=dados)
    if response.status_code == 200:
        print(f"Vacina cadastrada com sucesso: {response.json()}")
    else:
        print(f"Erro ao cadastrar vacina: {response.status_code} - {response.text}")
