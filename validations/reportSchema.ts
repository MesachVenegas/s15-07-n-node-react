import { z } from "zod";

const periods = ["semanal", "mensual", "trimestral", "semestral"] as const;

export type Periods = (typeof periods)[number];

export const mappedPeriods: { [key in Periods]: string } = {
  semanal: "Semanal",
  mensual: "Mensual",
  trimestral: "Trimestral",
  semestral: "Semestral"
}

export const registerReportSchema = z.object({
  owner: z.string().min(6, {
    message: "Por favor ingrese propietario del reporte"
  }),
  period: z.enum(periods, {
    errorMap: () => ({ message: "Selecciona un periodo" }),
  }),
  outcome: z.number().nonnegative({
    message: "El valor de gastos debe ser un número no negativo"
  }),
  income: z.number().nonnegative({
    message: "El valor de ingresos debe ser un número no negativo"
  }),
  balance: z.number().nonnegative({
    message: "El valor del saldo debe ser un número no negativo"
  })
})
.refine((data) => {
  return data.balance === data.income - data.outcome;
}, {
  message: "El saldo debe ser igual a ingresos menos gastos",
  path: ["balance"]
});

export type RegisterReport = z.infer<typeof registerReportSchema>;

