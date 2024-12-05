import httpx
from datetime import datetime
import random

# URL do endpoint da API
BASE_URL = "http://localhost:8000/api/v1/pacientes/pacientes"

# Dados fictícios para os pacientes
pacientes = [
    {
        "usuario_id": 6,
        "cpf": "12345678901",
        "numero_cartao_sus": "123456789012345",
        "data_nascimento": "1990-01-01",
        "tipo_sanguineo": "O+",
        "altura": 1.75,
        "peso": 70.0,
    },
    {
        "usuario_id": 7,
        "cpf": "23456789012",
        "numero_cartao_sus": "234567890123456",
        "data_nascimento": "1985-05-15",
        "tipo_sanguineo": "A+",
        "altura": 1.68,
        "peso": 65.5,
    },
    {
        "usuario_id": 8,
        "cpf": "34567890123",
        "numero_cartao_sus": "345678901234567",
        "data_nascimento": "1993-09-23",
        "tipo_sanguineo": "B-",
        "altura": 1.80,
        "peso": 80.0,
    },
    {
        "usuario_id": 9,
        "cpf": "45678901234",
        "numero_cartao_sus": "456789012345678",
        "data_nascimento": "2000-03-03",
        "tipo_sanguineo": "AB+",
        "altura": 1.65,
        "peso": 55.0,
    },
    {
        "usuario_id": 10,
        "cpf": "56789012345",
        "numero_cartao_sus": "567890123456789",
        "data_nascimento": "1998-11-11",
        "tipo_sanguineo": "O-",
        "altura": 1.70,
        "peso": 60.0,
    },
]


# Criar os pacientes
def criar_pacientes():
    with httpx.Client() as client:
        for paciente in pacientes:
            try:
                response = client.post(BASE_URL, json=paciente)
                if response.status_code == 200:
                    print(f"Paciente com CPF {paciente['cpf']} criado com sucesso!")
                else:
                    print(
                        f"Erro ao criar paciente com CPF {paciente['cpf']}: {response.text}"
                    )
            except Exception as e:
                print(f"Erro ao conectar com o servidor: {str(e)}")


if __name__ == "__main__":
    criar_pacientes()
