import { serve } from "inngest/next";
import { functions, inngest } from "@/server/inngest/functions";

export const { GET, POST, PUT } = serve({ client: inngest, functions });
