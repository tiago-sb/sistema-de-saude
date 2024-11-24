from fastapi import APIRouter, HTTPException

from app.database import get_db_connection
from app.notifications.schemas import CriarNotificacao

router = APIRouter(tags=["notificacoes"])


@router.post("/notificacoes")
def criar_notificacao(body: CriarNotificacao):
    """
    Envia uma nova notificação para um usuário.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO notificacoes (usuario_id, titulo, mensagem)
            VALUES (%s, %s, %s)
            RETURNING id;
            """,
            (body.usuario_id, body.titulo, body.mensagem),
        )
        notificacao_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao criar notificação: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": notificacao_id, "message": "Notificação enviada com sucesso"}


@router.get("/notificacoes")
def listar_notificacoes(usuario_id: int):
    """
    Lista todas as notificações de um usuário.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT id, titulo, mensagem, data_criacao, lida
            FROM notificacoes
            WHERE usuario_id = %s
            ORDER BY data_criacao DESC;
            """,
            (usuario_id,),
        )
        notificacoes = cursor.fetchall()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao listar notificações: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"notificacoes": notificacoes}


@router.put("/notificacoes/{id}/lida")
def marcar_notificacao_como_lida(id: int):
    """
    Marca uma notificação como lida.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            UPDATE notificacoes
            SET lida = TRUE
            WHERE id = %s
            RETURNING id;
            """,
            (id,),
        )
        notificacao_id = cursor.fetchone()
        if not notificacao_id:
            raise HTTPException(status_code=404, detail="Notificação não encontrada")
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao marcar notificação como lida: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": id, "message": "Notificação marcada como lida"}


@router.delete("/notificacoes/{id}")
def deletar_notificacao(id: int):
    """
    Deleta uma notificação.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            DELETE FROM notificacoes
            WHERE id = %s
            RETURNING id;
            """,
            (id,),
        )
        notificacao_id = cursor.fetchone()
        if not notificacao_id:
            raise HTTPException(status_code=404, detail="Notificação não encontrada")
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao deletar notificação: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": id, "message": "Notificação excluída com sucesso"}


@router.get("/notificacoes/busca")
def buscar_notificacoes(
    usuario_id: int,
    titulo: str = None,
    mensagem: str = None,
    data_inicio: str = None,
    data_fim: str = None,
    lida: bool = None
):
    """
    Busca notificações com filtros opcionais.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # Construir a query dinâmica
    query = """
        SELECT id, titulo, mensagem, data_criacao, lida
        FROM notificacoes
        WHERE usuario_id = %s
    """
    params = [usuario_id]

    if titulo:
        query += " AND titulo ILIKE %s"
        params.append(f"%{titulo}%")

    if mensagem:
        query += " AND mensagem ILIKE %s"
        params.append(f"%{mensagem}%")

    if data_inicio:
        query += " AND data_criacao >= %s"
        params.append(data_inicio)

    if data_fim:
        query += " AND data_criacao <= %s"
        params.append(data_fim)

    if lida is not None:
        query += " AND lida = %s"
        params.append(lida)

    query += " ORDER BY data_criacao DESC"

    try:
        cursor.execute(query, params)
        notificacoes = cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar notificações: {str(e)}")
    finally:
        cursor.close()
        conn.close()

    return {"notificacoes": notificacoes}
