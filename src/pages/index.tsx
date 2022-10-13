import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    Router.push({
      pathname: "/dashboard",
    });
  }, []);
  return <></>;
};

export default Home;
