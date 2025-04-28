import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Service categories
export const serviceCategoryEnum = pgEnum('service_category', [
  'cosmetology',
  'massage',
  'bodyCorrection',
  'men'
]);

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  category: serviceCategoryEnum("category").notNull(),
  image: text("image").notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

// Complex programs
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
});

export const insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
});

// Promotions
export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  badge: text("badge"),
  price: text("price"),
  buttonText: text("button_text").notNull(),
  expiryDate: timestamp("expiry_date"),
});

export const insertPromotionSchema = createInsertSchema(promotions).omit({
  id: true,
});

// Service effects
export const serviceEffects = pgTable("service_effects", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull(),
  effect: text("effect").notNull(),
});

export const insertServiceEffectSchema = createInsertSchema(serviceEffects).omit({
  id: true,
});

// Types
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;

export type Promotion = typeof promotions.$inferSelect;
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;

export type ServiceEffect = typeof serviceEffects.$inferSelect;
export type InsertServiceEffect = z.infer<typeof insertServiceEffectSchema>;

// Users (keeping it from the base template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
