import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  is_deleted: boolean("is_deleted").notNull().default(false)
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull().references(()=>users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  is_deleted: boolean("is_deleted").notNull().default(false)
});

export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull().references(()=>users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("body").notNull(),
  objectURL: text("objectURL").notNull(),
  public: boolean("public").notNull().default(false),
  organization_id: text("organization_id").references(()=>organizations.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  is_deleted: boolean("is_deleted").notNull().default(false)
});

export const organizations = pgTable("organizations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  owner_id: text("owner_id").notNull().references(()=>users.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  is_deleted: boolean("is_deleted").notNull().default(false)
});

export const organization_members = pgTable("organization_members", {
  id: text("id").primaryKey(),
  organization_id: text("corganization_id").notNull().references(()=>organizations.id, { onDelete: "cascade" }),
  user_id: text("user_id").notNull().references(()=>users.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  is_deleted: boolean("is_deleted").notNull().default(false)
});

export const organization_admins = pgTable("organization_admins", {
  id: text("id").primaryKey(),
  organization_id: text("organization_id").notNull().references(()=>organizations.id, { onDelete: "cascade" }),
  user_id: text("user_id").notNull().references(()=>users.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  is_deleted: boolean("is_deleted").notNull().default(false)
});