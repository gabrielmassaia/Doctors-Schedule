import { z } from "zod";

export const deactivatePatientSchema = z.object({
  id: z.string().uuid(),
});
