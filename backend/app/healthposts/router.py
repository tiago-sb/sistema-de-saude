from fastapi import APIRouter, HTTPException

from app.database import get_db_connection
from app.healthposts.schemas import PostoDeSaudeCadastro

router = APIRouter(tags=["postos-de-saude"])


@router.post("/postos-de-saude")
def criar_posto_de_saude(body: PostoDeSaudeCadastro):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO postos_de_saude (usuario_id, cnpj, bairro, cidade, estado, cep, pais)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                body.usuario_id,
                body.cnpj,
                body.bairro,
                body.cidade,
                body.estado,
                body.cep,
                body.pais,
            ),
        )
        posto_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao criar posto de saúde: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": posto_id, "message": "Posto de saúde criado com sucesso"}


@router.get("/postos-de-saude")
def listar_postos_de_saude():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM postos_de_saude;")
        postos = cursor.fetchall()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao listar postos de saúde: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return postos
