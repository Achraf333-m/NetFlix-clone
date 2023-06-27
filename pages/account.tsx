import Loader from "@/components/Loader";
import Membership from "@/components/Membership";
import useAuth from "@/hooks/useAuth";
import useSubscription from "@/hooks/useSubscription";
import payments from "@/lib/strip";
import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

interface props {
  products: Product[];
}

function Account({ products }: props) {
  const { user, loading, logOut } = useAuth();

  const subscription = useSubscription(user);
  return (
    <>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <div className="flex justify-center items-center">
        <header className={`max-w-6xl bg-[#141414]`}>
          <Link href="/">
            <img
              src="https://rb.gy/ulxxee"
              width={120}
              height={120}
              className="cursor-pointer object-contain"
            />
          </Link>
          <Link href="/account">
            <img
              src="https://rb.gy/g1pwyx"
              alt=""
              className="cursor-pointer rounded"
            />
          </Link>
        </header>
      </div>

      <main className="max-w-5xl scrollbar-hide mx-auto px-5 md:px-10 transition-all">
        <div className="flex flex-col mb-2 gap-y-2 md:flex-row md:items-center pt-24 gap-x-4">
          <h1 className="md:text-xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>

        <Membership />
        <div className="gridLayout">
          <h4>Plan Details</h4>
          {/* current plan */}
          <div className="col-span-2 font-medium">
            {null ? (
              <Loader color="dark:fill-[#e50914]" />
            ) : (
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            )}
          </div>
          <p
            className="accountButton md:text-right"
            onClick={() => alert("this feature has not been implemented yet!")}
          >
            Change Plan
          </p>
        </div>

        <div className="gridLayout">
          <h4>Settings</h4>
          <p onClick={() => logOut()} className="accountButton md:text-left">
            {loading ? (
              <Loader color="dark:fill-white" />
            ) : (
              "Logout of all devices"
            )}
          </p>
        </div>
      </main>
    </>
  );
}

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
