import { auth } from "@clerk/nextjs/server"
import { db } from "./db"
import { userSubscriptions } from "./db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"


const oneDayMS = 24 * 60 * 60 * 1000 
export const checkSubscription = async() => {
    const { userId } = auth()
    if(!userId){
        return false
    }

    const user_subscription = await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId,userId))

    const userSubscribed = user_subscription[0]
    if(!userSubscribed){
        return false
    }
    const isValid = userSubscribed.stripePriceId && (userSubscribed.stripeCurrentPeroidEnd?.getTime()! + oneDayMS) > Date.now() 

    return !!isValid;
}