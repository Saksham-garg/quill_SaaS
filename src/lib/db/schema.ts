import { pgEnum, pgTable,serial, text, timestamp, varchar , integer} from 'drizzle-orm/pg-core'

export const userSystemEnum = pgEnum("user_system_enum",['user','system'])

export const chats = pgTable("chats",{
    id: serial("id").primaryKey(),
    pdfName: text("pdf_name").notNull(),
    pdfUrl : text("pdf_url").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    userId : varchar("user_id",{length:256}).notNull(),
    fileKey: text("file_key").notNull()  
})

export type DrizzleChats = typeof chats.$inferSelect

export const messages = pgTable("messages",{
    id : serial("id").primaryKey(),
    chatId: integer('chat_id').references(() => chats.id).notNull(),
    content: text("content").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    role: userSystemEnum("role").notNull()
})

export const userSubscriptions = pgTable('user_subscriptions',{
    id: serial("id").notNull().primaryKey(),
    userId: varchar('user_id',{ length:256 }).notNull().unique(),
    stripeCustomerId: varchar('stripe_customer_id',{length:256}).notNull().unique(),
    stripeSubscriptionId: varchar("stripe_subscription_id",{ length:256 }).unique(),
    stripePriceId: varchar("stripe_price_id",{ length: 256 }),
    stripeCurrentPeroidEnd : timestamp("stripe_current_peroid_end")
})
