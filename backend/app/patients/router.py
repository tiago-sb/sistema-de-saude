from fastapi import APIRouter, HTTPException

from app.database import get_db_connection
from app.patients.schemas import PacienteCadastro

router = APIRouter(tags=["pacientes"])


@router.post("/pacientes")
def criar_paciente(body: PacienteCadastro):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO pacientes (usuario_id, cpf, numero_cartao_sus, data_nascimento, tipo_sanguineo, altura, peso)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                body.usuario_id,
                body.cpf,
                body.numero_cartao_sus,
                body.data_nascimento,
                body.tipo_sanguineo,
                body.altura,
                body.peso,
            ),
        )
        paciente_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao criar paciente: {str(e)}") from e
    finally:
        cursor.close()
        conn.close()

    return {"id": paciente_id, "message": "Paciente criado com sucesso"}
