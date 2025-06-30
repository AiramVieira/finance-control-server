// database/connection.js
import * as mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const connectionOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export const connectDatabase = async () => {
  try {
    console.log("🔄 Conectando ao MongoDB...");

    await mongoose.connect(MONGODB_URI, connectionOptions);

    console.log("✅ Conectado ao MongoDB com sucesso!");

    process.on("SIGINT", async () => {
      console.log("\n🔄 Encerrando conexão com MongoDB...");
      await mongoose.connection.close();
      console.log("✅ Conexão MongoDB encerrada");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar com MongoDB:", error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.log("✅ Desconectado do MongoDB");
  } catch (error) {
    console.error("❌ Erro ao desconectar do MongoDB:", error);
  }
};

// Verificar status da conexão
export const getDatabaseStatus = () => {
  const states: any = {
    0: "desconectado",
    1: "conectado",
    2: "conectando",
    3: "desconectando",
  };

  return {
    status: states[mongoose.connection.readyState],
    name: mongoose.connection.name,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
  };
};
