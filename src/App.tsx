import ProductTable from "./components/Product/Index";
function App() {
  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-10 col-lg-8">
          <header className="my-4 text-center">
            <h2>
              <strong>Tic Tac Toe 🎯</strong>
            </h2>
            <p>
              <i>Play with Bismillah!</i>
            </p>
          </header>
          <section className="border py-4">
            <ProductTable />
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
