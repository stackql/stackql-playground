import Header from "./header";

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
