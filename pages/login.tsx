import Head from "next/head";
import Image from "next/image";

function Login() {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex-col md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login - Netflix</title>
      </Head>

      <img
        alt=""
        src="https://rb.gy/p2hphi"
        className="-z-10 !hidden opacity-60 sm:!inline object-fill"
        style={{ objectFit: "cover" }}
      />

      <img
        src="https://rb.gy/ulxxee"
        width={100}
        height={100}
        className="cursor-pointer object-contain absolute left-4 top-4 md:top-6 md:left-10"
      />

      <form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-10">
        <h1>Sign In</h1>
        <div>
          <label>
            <input type="email" placeholder="Email" />
          </label>
          <label>
            <input type="password" placeholder="Password" />
          </label>
        </div>
      </form>
    </div>
  );
}

export default Login;
