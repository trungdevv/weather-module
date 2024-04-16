import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Weather from "./pages/Weather";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App h-dvh w-[590px] mx-auto mt-10">
        <Weather />
      </div>
    </QueryClientProvider>
  );
}

export default App;
