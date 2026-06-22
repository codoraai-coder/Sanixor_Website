import { useState, useEffect, useRef } from "react";
import { Terminal, Play, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LOG_SEQUENCE = [
  { text: "Initializing agent runtime environment...", type: "info", delay: 800 },
  { text: "Loading model weights (Sanixor-7B)...", type: "info", delay: 1200 },
  { text: "Connecting to vector database...", type: "info", delay: 900 },
  { text: "Vector DB connected. Indexed 4.2M documents.", type: "success", delay: 1500 },
  { text: "Starting autonomous workflow execution...", type: "warning", delay: 1000 },
  { text: "Analyzing input parameters...", type: "info", delay: 1200 },
  { text: "Deploying edge functions to 14 regions...", type: "info", delay: 1800 },
  { text: "Agent deployed successfully. Listening on port 8080.", type: "success", delay: 800 },
];

export function InteractiveConsole({ className }: { className?: string }) {
  const [logs, setLogs] = useState<{ text: string; type: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startSequence = () => {
    if (isRunning) return;
    setLogs([]);
    setIsRunning(true);
    setIsFinished(false);

    let currentDelay = 0;
    
    LOG_SEQUENCE.forEach((log, index) => {
      currentDelay += log.delay;
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        
        if (index === LOG_SEQUENCE.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setIsFinished(true);
          }, 500);
        }
      }, currentDelay);
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-20 md:px-6 md:py-28", className)}>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">Interactive Demo</p>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          See Sanixor AI in action.
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Click the button below to simulate an agent deployment process in real-time.
        </p>
      </div>

      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-primary/20 bg-[#0a0a0a]/80 shadow-2xl backdrop-blur-xl">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-primary-glow/10 blur-3xl" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-muted-foreground">
            <Terminal className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>agent-deploy.sh</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="h-[250px] sm:h-[300px] overflow-y-auto p-4 sm:p-6 font-mono text-xs sm:text-sm"
        >
          <div className="mb-4 text-muted-foreground">
            $ Welcome to Sanixor CLI v2.4.1<br/>
            $ Ready to orchestrate autonomous agents.
          </div>

          {logs.map((log, i) => (
            <div key={i} className="mb-2 flex items-start gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="mt-0.5 shrink-0 text-muted-foreground opacity-70">[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span>
              <span className={cn(
                "leading-relaxed",
                log.type === 'info' && "text-blue-400",
                log.type === 'success' && "text-green-400",
                log.type === 'warning' && "text-yellow-400"
              )}>
                {log.text}
              </span>
            </div>
          ))}
          
          {isRunning && (
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </div>
          )}

          {!isRunning && !isFinished && logs.length === 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={startSequence}
                className="group relative flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-6 py-3 font-sans text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
                Deploy Agent Workflow
              </button>
            </div>
          )}

          {isFinished && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2 rounded-full border border-green-500/50 bg-green-500/10 px-6 py-3 font-sans text-sm font-medium text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Deployment Complete
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
