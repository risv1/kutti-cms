import { numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  session_id: text("session_id").unique().notNull(),
  user_id: text("user_id").notNull().references(()=>users.id),
  expires: timestamp("expires").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
