# Фронтенд для кліker-проєкту

React + Vite. Візуальна тема: промисловий прес / механічний лічильник.

## Запуск

```bash
cd front
npm install
npm run dev
```

Відкриється на `http://localhost:5173`.

## Налаштування адреси бекенду

У файлі `.env` лежить:

```
VITE_API_URL=http://localhost:5116
```

**Заміни порт на той, який реально використовує твій ASP.NET-бекенд.**
Подивись у `back/Properties/launchSettings.json` (поле `applicationUrl`) —
там і буде правильний порт (наприклад `http://localhost:5000` або `https://localhost:7xxx`).

## ⚠️ Обов'язково: увімкни CORS на бекенді

Зараз у твоєму `Program.cs` немає CORS-політики, тому браузер заблокує
запити з `localhost:5173` до бекенду. Додай ось так:

```csharp
var builder = WebApplication.CreateBuilder(args);
Stats stats = new Stats();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ↓ додати
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("AllowFrontend"); // ↓ додати, до маппінгу ендпоінтів

app.UseSwagger();
app.UseSwaggerUI();
```

Якщо порт Vite-дева інший (наприклад, при `npm run preview`), онови
`WithOrigins` відповідно.

## Як влаштована логіка автоклікера

Бекенд нічого не знає про "автоматичні" кліки — він просто виконує один
`/Click` на кожен запит. Увесь таймер живе у фронтенді: у `App.jsx` є
константа

```js
const AUTOCLICK_INTERVAL_MS = { 1: 2000, 2: 1000, 3: 500 };
```

Це моє припущення (рівень 1 → клік раз на 2с, рівень 2 → раз на 1с,
рівень 3 → раз на 0.5с). Значення легко поміняти під свій задум.

## Структура

```
front/
  src/
    api.js                 — обгортка над /Stats, /Click, /Upgrades/*
    App.jsx                — стан, автоклік-таймер, обробники
    styles.css              — вся стилізація
    components/
      Gauge.jsx             — лічильник-одометр (кліки/гроші)
      PressButton.jsx       — велика кнопка натискання
      UpgradeLever.jsx      — важіль прокачки з індикацією рівня
```
