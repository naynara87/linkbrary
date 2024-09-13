import { AuthProvider } from "./contexts/AuthProvider";
import ToasterProvider from "./contexts/ToasterProvider";
import { LinkProvider } from "./contexts/LinkProvider";

function Providers({ children }) {
  return (
    <LinkProvider>
      <ToasterProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToasterProvider>
    </LinkProvider>
  );
}

function App({ children }) {
  return <Providers>{children}</Providers>;
}

export default App;
