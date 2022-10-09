import { QueryContextProvider } from "../../contexts/queryContext/queryContext";
import Header from "./header";

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <QueryContextProvider>
      <div className="w-screen h-screen flex flex-col" key={Math.random()}>
        <Header />
        {children}
      </div>
    </QueryContextProvider>
  );
};

export default Layout;
