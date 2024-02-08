import {Stripe} from "stripe";
import { ExtendedRequest } from "../utils/middleware";
import {Response} from "express"
import User from "../models/User";
import dotenv from "dotenv"

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "")

export const stripeWebhookController = async (req:ExtendedRequest, res:Response) => {
    const sig = req.headers['stripe-signature'];
    let event:any;

    if(!sig)
        return

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET || "");
    } catch (err:any) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }    

    // Handle the payment successful event
    if(event.type === 'checkout.session.completed'){
        const metaData = event.data.object.metadata;
        console.log(metaData);
        const {userId} = metaData
        await User.findByIdAndUpdate(userId, {totalFeesPaid: true, learningTestFeesPaid:true})
    }
    res.send()
}

export const stripeLinkCreateController = async (req: ExtendedRequest, res: Response) => {
    const {amount} = req.body

    const user = await User.findById(req.userId, {isCommercialLicense:1, licenseCategories: 1})
    if(!user)
        return 

    const {isCommercialLicense, licenseCategories} = user
    const total_fees = 300 + (isCommercialLicense ? 500 : 0)  + licenseCategories.length * 300

    if(amount !== total_fees)
        return res.json({error:true, message:"Invalid calculation of fees"})    

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: "Learner's License fees",
            },
            // @ts-ignore
            unit_amount: parseInt(amount) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/dashboard',
      cancel_url: 'http://localhost:3000/dashboard',
      metadata:{
        userId: req.userId || "",
      }
    });
    res.json({ success:true, paymentLink:session.url });
}