import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Plans from "@/components/Plans";
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import useList from "@/hooks/useList";
import useSubscription from "@/hooks/useSubscription";
import payments from "@/lib/strip";
import { movieState } from "@/states/State";
import { Movie } from "@/typings";
import requests from "@/utils/Requests";
import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRecoilValue } from "recoil";

interface props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}: props) => {
  console.log(products)
  const { loading, user } = useAuth();
  const subscription = useSubscription(user)
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)

  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;
  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <Header />

      <main className="pl-4 lg:space-y-24 lg:pl-16 relative pb-24">
        <Banner netflixOriginals={netflixOriginals} />
        <section>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {
            list.length > 0 && <Row title="My List" movies={list}/>
          }
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      <Modal />
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};
