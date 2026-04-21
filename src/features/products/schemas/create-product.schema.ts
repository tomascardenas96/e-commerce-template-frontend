import z from "zod";

const attributeEntrySchema = z.object({
  key: z
    .string()
    .min(1, "La clave del atributo es obligatoria")
    .max(40, "La clave debe tener menos de 40 caracteres"),
  value: z
    .string()
    .min(1, "El valor del atributo es obligatorio")
    .max(60, "El valor debe tener menos de 60 caracteres"),
});

const variantSchema = z.object({
  price: z
    .number({ message: "El precio es obligatorio" })
    .positive("El precio debe ser mayor a 0")
    .refine(
      (n) => Number.isFinite(n) && Math.round(n * 100) === n * 100,
      "El precio debe tener como máximo 2 decimales",
    ),
  stock: z
    .number({ message: "El stock es obligatorio" })
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo"),
  attributes: z
    .array(attributeEntrySchema)
    .min(1, "Agregá al menos un atributo (ej. color, talle)")
    .refine((entries) => {
      const keys = entries.map((e) => e.key.trim().toLowerCase());
      return new Set(keys).size === keys.length;
    }, "Las claves de atributos no pueden repetirse"),
});

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(120, "El nombre debe tener menos de 120 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .max(2000, "La descripción debe tener menos de 2000 caracteres"),
  categoryId: z
    .string()
    .min(1, "Seleccioná una categoría")
    .uuid("La categoría seleccionada no es válida"),
  isActive: z.boolean(),
  variants: z.array(variantSchema).min(1, "Agregá al menos una variante"),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
export type VariantFormValue = z.infer<typeof variantSchema>;
export type AttributeEntryFormValue = z.infer<typeof attributeEntrySchema>;
