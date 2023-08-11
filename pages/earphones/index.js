import Head from "next/head";
import { db, storage } from "../../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import Categories from "../../components/Categories";
import About from "../../components/About";
import ProductCard from "../../components/ProductCard";

export default function Earphones({ earphones, images }) {
  return (
    <>
      <Head>
        <title>Earphones</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* main children container */}
      <div className="relative h-[105px] lg:h-[246px] bg-[#191919]">
          {/* "earphopnes title" */}
          <h1 className="absolute left-1/2 bottom-7 lg:bottom-0 lg:top-[40%] lg:left-[50%] transform -translate-x-1/2 -transform-y-1/2 text-center text-white text-h4 lg:text-h2 font-bold px-8 uppercase">
            earphones
          </h1>
        </div>
      <main className="relative lg:flex lg:justify-center lg:items-center overflow-x-hidden">
        <div className="relative max-w-[1200px]">
          
          {/* content body */}
          <div className="px-6 md:px-9 lg:px-0">
            {/* product cards go here */}
            <section className="mb-40">
              {earphones.map((item, index) => {
                if ((index + 1) % 2 == 0) {
                  return <ProductCard type={"earphones"} order={"first"} key={item.slug}>{item}</ProductCard>
                }
                return <ProductCard type={"earphones"} order={"none"} key={item.slug}>{item}</ProductCard>;
              })}
            </section>
            <div className="mt-24 md:mt-32">
              <Categories />
              <About />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const earphones = [];

  const q = query(collection(db, "earphones"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((val) => {
    earphones.push(val.data());
  });

  return {
    props: {
      earphones: earphones,
    },
  };
}
