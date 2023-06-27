import useAuth from "@/hooks/useAuth";
import useSubscription from "@/hooks/useSubscription";
import { useState } from "react";
import Loader from "./Loader";
import { goToBillingPortal } from "@/lib/strip";

function Membership() {
  const { user } = useAuth();
  const subscription = useSubscription(user);
  const [billingLoading, setBillingLoading] = useState(false);

  const manageSubscription = () => {
    setBillingLoading(true);
    goToBillingPortal();
  };

  return (
    <div className="gridLayout">
      <div className="space-y-4">
        <h4 className="text-lg text-[gray]">Membership & Billing</h4>
        <button
          disabled={billingLoading || !subscription}
          className="h-10 w-3/5 max-w-xs rounded-lg whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
          onClick={manageSubscription}
        >
          {billingLoading ? (
            <Loader color="dark:fill-[#e50914]" />
          ) : (
            "Cancel Membership"
          )}
        </button>
      </div>

      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b-white/10 border-b py-4 md:flex-row">
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-[gray]">Password: ********</p>
          </div>
          <div className="md:text-right">
            <p className="accountButton" onClick={() => alert('this feature has not been implemented yet!')}>Change email</p>
            <p className="accountButton" onClick={() => alert('this feature has not been implemented yet!')}>Change Password</p>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex flex-col justify-between py-4 md:flex-row md:pb-0">
            <p>
              {subscription?.cancel_at_period_end
                ? "Your membership will end on"
                : "Your next billing date is on"}{" "}
              {subscription?.current_period_end}
            </p>
            <div className="md:text-right">
            <p className="accountButton" onClick={() => alert('this feature has not been implemented yet!')}>Manage card info</p>
            <p className="accountButton" onClick={() => alert('this feature has not been implemented yet!')}>Change billing day</p>
            <p className="accountButton" onClick={() => alert('this feature has not been implemented yet!')}>Add backup payment method</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
