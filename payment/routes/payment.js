import express from "express"
import { createOrder, verifyOrder } from "../controller/payment.js"
export const router = express.Router()

router.post("/",createOrder)
router.post("/verify",verifyOrder)