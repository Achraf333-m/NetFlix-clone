import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthProps {
  children: React.ReactNode;
}

interface IAuth {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const[initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(true)
        router.push('/login')
      }
      setInitialLoading(false)
    })
  },[auth])

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        setUser(userCreds.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        setUser(userCreds.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const logOut = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memo = useMemo(() => (
    {user, loading, error, signIn, signUp, logOut}
  ), [user, loading, error])

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext)
}