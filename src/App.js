import { AuthProvider } from "./contexts/AuthProvider";
import ToasterProvider from "./contexts/ToasterProvider";
import { LinkProvider } from "./contexts/LinkProvider";

function Providers({ children }) {
  return (
    <ToasterProvider>
      <LinkProvider>
        <AuthProvider>{children}</AuthProvider>
      </LinkProvider>
    </ToasterProvider>
  );
}

function App({ children }) {
  return <Providers>{children}</Providers>;
}

export default App;
