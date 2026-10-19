import { createFileRoute } from "@tanstack/react-router";
import { SystemApp } from "@/components/system/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SystemApp />;
}
