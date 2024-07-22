import { db } from "@/lib/db"
import { userSubscriptions } from "@/lib/db/schema"
import { stripe } from "@/lib/stripe"
import { auth, currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"


const returnUrl = process.env.NEXT_BASE_URL + '/'

export async function POST(){
    try {
        const { userId } = await auth()
        const user = await currentUser()
        
        if(!userId){
            return NextResponse.json({message:"Unauthorized"},{status:404})
        }

        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }

        const user_subscription = await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId,userId))

        if(user_subscription[0] && user_subscription[0].stripeCustomerId){
             // trying to cancel at the billing portal

            const stripeSession = await stripe.billingPortal.sessions.create({
                return_url: returnUrl,
                customer: user_subscription[0].stripeCustomerId
            })
            return NextResponse.json({url:stripeSession.url},{status:200})
        }

            const stripeSession = await stripe.checkout.sessions.create({
                success_url:returnUrl,
                cancel_url:returnUrl,
                payment_method_types:['card'],
                mode:'subscription',
                billing_address_collection:'auto',
                customer_email: user?.emailAddresses[0].emailAddress,
                line_items:[
                    {
                        price_data:{
                            currency:'USD',
                            product_data:{
                                name:'ChatPDF Pro',
                                description:'Unlimited PDF sessions!'
                            },
                            unit_amount:2000,
                            recurring:{
                                interval:'month'
                            }
                        },
                        quantity:1
                    }
                ],
                metadata:{
                    userId
                }
            })
            return NextResponse.json({url:stripeSession.url},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}