FROM python:3.10.2-alpine3.15

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

COPY . /app

EXPOSE 8080
EXPOSE 5000

# RUN useradd appuser && chown -R appuser /app
# USER appuser

CMD ["python", "main.py"]