// // Import the required modules
// const express = require("express")
// const router = express.Router()

// const { capturePayment, verifySignature, sendPaymentSuccessEmail } = require("../controller/payments")
// const { auth, isInstructer, isStudent, isAdmin } = require("../middileWare/authorization")

// router.post("/capturePayment", auth, isStudent, capturePayment)
// router.post("/verifyPayment", auth, isStudent, verifySignature)
// router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

// module.exports = router