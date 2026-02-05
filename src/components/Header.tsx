const Header = () => {
  return (
    <header className="bg-primary py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-card rounded-full border-4 border-foreground flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-full border-2 border-foreground" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground tracking-tight">
            Pokédex
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
