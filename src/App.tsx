import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wheather from "./pages/Wheather";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App h-dvh w-[590px] mx-auto mt-10">
        <Wheather />
      </div>
    </QueryClientProvider>
  );
}

export default App;
