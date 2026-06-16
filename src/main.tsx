import "lenis/dist/lenis.css";
import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/sanixor/ThemeProvider";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./routes/contact";
import Index from "./routes/index";
import Privacy from "./routes/privacy";
import Products from "./routes/products";
import Team from "./routes/team";
import Terms from "./routes/terms";
import Training from "./routes/training";
import "./styles.css";

function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SmoothScrollProvider>
        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/training" element={<Training />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SmoothScrollProvider>
    </ThemeProvider>
  </StrictMode>,
);
