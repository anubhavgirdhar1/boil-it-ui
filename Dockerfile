FROM python:3.11-slim

WORKDIR /app

# ---------- System deps ----------
RUN apt-get update && \
    apt-get install -y curl supervisor && \
    rm -rf /var/lib/apt/lists/*

# ---------- Backend ----------
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

COPY backend/app ./backend/app

# ---------- Frontend ----------
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .

# ---------- Supervisor ----------
WORKDIR /app
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 3000 5173

CMD ["supervisord", "-n"]
