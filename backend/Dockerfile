FROM python:3.11-slim

ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH=/app
EXPOSE 8000

WORKDIR /app

COPY --chown=app:app ./requirements.txt /app/
COPY --chown=app:app ./src /app/src/

RUN pip install -r /app/requirements.txt

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
