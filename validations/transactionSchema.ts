import { z } from "zod";

const transactions = ["ingreso", "gasto"] as const;

export type Transactions = (typeof transactions)[number];

export const mappedPeriods: { [key in Transactions]: string } = {
  ingreso: "Ingreso",
  gasto: "Gasto",
}

export const registerTransactionSchema = z.object({
  owner: z.string().min(6, {
    message: "Por favor ingrese propietario del reporte"
  }),
  type: z.enum(transactions, {
    errorMap: () => ({ message: "Selecciona tipo de transacción" }),
  }),
  name: z.string().min(3, { message: "Debes ingresar el nombre de la transacción" }),
  payMethod: z.string().min(1, { message: "El método de pago utilizado es obligatorio." }),
  amount: z.number().min(0, { message: "El monto de la transacción debe ser mayor o igual a cero." }),
  comment: z.string().min(3, { message: "Debes agregar un comentario o nota sobre la transacción" }),
})

export type RegisterTransaction = z.infer<typeof registerTransactionSchema>;