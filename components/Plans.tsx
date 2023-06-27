import useAuth from "@/hooks/useAuth";
import { Product } from "@stripe/firestore-stripe-payments";
import Head from "next/head";
import Link from "next/link";
import { MdCheckCircleOutline } from "react-icons/md";
import Table from "./Table";
import { useState } from "react";
import Loader from "./Loader";
import { loadCheckout } from "@/lib/strip";
import { useRouter } from "next/router";

interface props {
  products: Product[];
}

function Plans({ products }: props) {
  const { logOut, user } = useAuth();

  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  const [billingLoading, setBillingLoading] = useState(false);
  const router = useRouter()

  const subscriptionCheckout = () => {
    if (!user) return

    loadCheckout(selectedPlan?.prices[0].id!)
    setBillingLoading(true)
    
  }

  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <div className="flex justify-center">
        <header className="max-w-6xl border-b-2 bg-[#141414] border-white/10">
          <Link href="/">
            <img
              src="https://rb.gy/ulxxee"
              width={100}
              height={100}
              className="cursor-pointer object-contain"
            />
          </Link>

          <button
            onClick={logOut}
            className="text-lg font-medium hover:underline cursor-pointer"
          >
            Sign Out
          </button>
        </header>
      </div>

      <main className="pt-28 px-4 md:px-40 max-w-4xl md:max-w-full pb-12">
        <h1 className="mb-4 font-bold">
          Choose the plan that's right for you!
        </h1>

        <ul>
          <li className="listStyle">
            <MdCheckCircleOutline className="iconStyle" /> Watch all you want.
            Ad-free.
          </li>
          <li className="listStyle">
            <MdCheckCircleOutline className="iconStyle" /> Recommendations just
            for you.
          </li>
          <li className="listStyle">
            <MdCheckCircleOutline className="iconStyle" /> Change or cancel your
            plan anytime.
          </li>
        </ul>

        <div className="flex flex-col mt-4 space-y-4 ">
          <div className="flex w-full items-center self-end md:w-3/5 ">
            {products.map((product) => (
              <div
                key={product.id}
                className={`planBox cursor-pointer ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>
          <Table products={products} selectedPlan={selectedPlan} />
            <button
            disabled={!selectedPlan || billingLoading}
            onClick={subscriptionCheckout}
              className={`btn inline-block 2xl:left-[50px] transition-all duration-700 2xl:w-1/5 2xl:self-end ${
                selectedPlan?.id === products[1].id
                  ? "2xl:-translate-x-[100%]"
                  : "translate-x-0"
              } ${
                selectedPlan?.id === products[0].id
                  ? "2xl:-translate-x-[200%]"
                  : "translate-x-0"
              }`}
            >
              {billingLoading ? <Loader color="dark:fill-white" /> : 'Subscribe'}
            </button>
        </div>
      </main>
    </>
  );
}

export default Plans;
//
