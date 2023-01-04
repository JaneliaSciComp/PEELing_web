FROM python:3.10-slim

LABEL maintainer="Xi Peng <pengx@janelia.hhmi.org>"

WORKDIR /build
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app
COPY ./server /app

EXPOSE 8000

CMD ["uvicorn", "--host", "0.0.0.0", "--reload", "main:app"]
