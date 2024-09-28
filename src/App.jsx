import "./App.css";

function App() {
  console.log(import.meta.env.VITE_SOME_KEY); // "123"
  console.log(import.meta.env.DB_PASSWORD); // undefined
  return (
    <>
      <h1>mimohshukla</h1>
    </>
  );
}

export default App;
