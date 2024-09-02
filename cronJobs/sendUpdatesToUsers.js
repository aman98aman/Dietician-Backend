const sendWhatsappMessage = require("../Notify/Whatsapp.js")
const Utility = require("../Utility.js")
const Plan = require("../models/plans.model.js")
const Users = require("../models/user.model.js");
const sendSubscriptionAlert = async (user) => {
  const planId = user?.currentPlan;
  if (Utility.isNotEmpty(planId)) {
    const currentPlan = await Plan.findById(user?.currentPlan).exec();
    if (
      Utility.isNotEmpty(user?.planExpiry)
    ) {
      const notifyCount = user?.notifyCount ?? 0;
      const expiry = user?.planExpiry;
      const currentDate = new Date();
      const updateNotifyDate = new Date(
        expiry.getTime() - parseInt(process.env.UPDATE_NOTIFY_RANGE)
      );
      if (
        currentDate > updateNotifyDate &&
        currentDate < expiry &&
        notifyCount < parseInt(process.env.ALLOWED_UPDATES)
      ) {
        const templateParams = [
          user?.firstName,
          currentPlan?.name,
          Utility.formatDate(expiry),
        ];
        await sendWhatsappMessage(
          process.env.GYM_UPDATES,
          user?.phoneNumber,
          user?.firstName,
          templateParams
        );
      }
    }
  }
};

const sendProgressAlert = async (user) => {
  const onBoardingDate = user?.createdDt;
  if (Utility.isNotEmpty(onBoardingDate)) {
    const currentDate = new Date();
    if (
      Math.max(1, Utility.convertToDays(currentDate - onBoardingDate)) %
        parseInt(process.env.ONBOARDING_NOTIFY_DELAY) ==
      0
    ) {
      const templateParams = [user?.firstName];
      await sendWhatsappMessage(
        process.env.PROGRESS_CAMPAIGN,
        user?.phoneNumber,
        user?.firstName,
        templateParams
      );
    }
  }
};

const sendUpdates = async () => {
  const allUsers = await Users.find({}).exec();
  console.log("sending.....")
  allUsers.forEach((user) => {
    sendSubscriptionAlert(user);
    sendProgressAlert(user);
  });
};
module.exports = sendUpdates