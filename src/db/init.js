const Database = require("./config");

const initDB = {
  async init() {
    //iniciar a conexão com o bd
    const db = await Database();
    //executar comando no bd
    //comando para criar tabela profile, com os campos descritos abaixo, juntamente com suas propriedades
    await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`);
    //comando para criar tabela jobs, com os campos descritos abaixo, juntamente com suas propriedades
    await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`);
    //comando para inserir dados nas tabelas
    await db.run(`INSERT INTO profile (
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
) VALUES (
    "Danilo Cecci",
    "https://github.com/danilocecci.png",
    3000,
    5,
    5,
    4,
    75
);`);
    //jobs insert
    await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Guloso",
    2,
    1,
    1617514376018
);`);
    await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTwo Projects",
    3,
    47,
    1617514376018
);`);
    //finalizar a conexão com o bd
    await db.close();
  }
};

initDB.init()