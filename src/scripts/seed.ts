import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");
    await db.delete(schema.courses);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "es.svg",
      },
      {
        id: 2,
        title: "French",
        imageSrc: "fr.svg",
      },
      {
        id: 3,
        title: "Italian",
        imageSrc: "it.svg",
      },
      {
        id: 4,
        title: "Japanese",
        imageSrc: "jp.svg",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
