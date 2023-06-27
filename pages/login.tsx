import Loader from "@/components/Loader";
import useAuth from "@/hooks/useAuth";
import { User } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
  user: User
}

function Login() {
  const [newlog, setNewLog] = useState(false);
  const { signIn, signUp, loading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password}) => {
    await signIn(email, password);
  };

  if (newlog) {
    router.push("/signup");
  }

  return (
    <div className="relative overflow-hidden h-screen w-screen bg-black flex-col flex items-center justify-center sm:bg-transparent">
      <Head>
        <title>Login - Netflix</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <img
        alt=""
        src="https://rb.gy/p2hphi"
        className="-z-10 !hidden h-screen w-screen opacity-60 sm:!inline"
        style={{ objectFit: "cover" }}
      />

      <img
        src="https://rb.gy/ulxxee"
        width={150}
        height={150}
        className="cursor-pointer object-contain absolute left-4 top-4 md:top-6 md:left-10"
      />
      <div className=" absolute rounded bg-black/75 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mt-24 space-y-8  py-6 px-6 md:mt-0 md:max-w-md md:px-14"
        >
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                type="email"
                placeholder="Email"
                className="input"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-xs text-orange-700">
                  Use a valid email address!
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <input
                type="password"
                minLength={4}
                placeholder="Password"
                className="input"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-xs text-orange-700">
                  Password must be at least 4 characters!
                </p>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-[#e50914] py-3 font-semibold"
          >
            Sign In
          </button>
        </form>
        <div className="text-[gray] py-4 px-3 ml-4">
          New to Netflix? {""}
          <button
            className="text-white hover:underline "
            onClick={() => setNewLog(true)}
          >
            Sign up right now!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
