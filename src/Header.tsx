function Header({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>MOVIEFLIX</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Header;
