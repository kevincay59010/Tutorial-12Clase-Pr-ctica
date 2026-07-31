module.exports = {
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_8SZyjJ5wmtOD@ep-misty-tooth-ayu4vof6-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=verify-full",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};