/* eslint-disable react-refresh/only-export-components */
import "lenis/dist/lenis.css";
import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/sanixor/ThemeProvider";
import { Toaster } from "./components/ui/sonner";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./routes/contact";
import Hiring from "./routes/hiring";
import Index from "./routes/index";
import Privacy from "./routes/privacy";
import Products from "./routes/products";
import Team from "./routes/team";
import Terms from "./routes/terms";
import Training from "./routes/training";
import HackEval from "./routes/hackeval";
import BitBench from "./routes/bitbench";
import SanixorStudio from "./routes/sanixor-studio";
import LexAI from "./routes/lexai";
import AgentAsAService from "./routes/agent-as-a-service";
import CustomAgentDev from "./routes/custom-agent-dev";
import APIIntegration from "./routes/api-integration";
import EventAutomation from "./routes/event-automation";
import AutoDash from "./routes/autodash";
import About from "./routes/about";
import NyayAi from "./routes/nyayai";
import SocioAi from "./routes/socioai";
import ConversationalUX from "./routes/conversational-ux";
import AIArchitecture from "./routes/ai-architecture";
import Achievements from "./routes/achievements";
import "./styles.css";

import StandardScrollToTop from "./components/sanixor/StandardScrollToTop";
import { InitialLoader } from "./components/sanixor/InitialLoader";

function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return (
    <>
      {children}
      <StandardScrollToTop />
    </>
  );
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
      <BrowserRouter>
        <SmoothScrollProvider>
          <InitialLoader>
            <ScrollToTop />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/training" element={<Training />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/hiring" element={<Hiring />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/hackeval" element={<HackEval />} />
              <Route path="/bitbench" element={<BitBench />} />
              <Route path="/sanixor-studio" element={<SanixorStudio />} />
              <Route path="/lexai" element={<LexAI />} />
              <Route path="/autodash" element={<AutoDash />} />
              <Route path="/about" element={<About />} />
              <Route path="/agent-as-a-service" element={<AgentAsAService />} />
              <Route path="/custom-agent-dev" element={<CustomAgentDev />} />
              <Route path="/api-integration" element={<APIIntegration />} />
              <Route path="/event-automation" element={<EventAutomation />} />
              <Route path="/nyayai" element={<NyayAi />} />
              <Route path="/socioai" element={<SocioAi />} />
              <Route path="/conversational-ux" element={<ConversationalUX />} />
              <Route path="/ai-architecture" element={<AIArchitecture />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </InitialLoader>
          <Toaster position="top-center" theme="dark" richColors closeButton />
        </SmoothScrollProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
