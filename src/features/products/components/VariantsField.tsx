"use client";

import {
  Control,
  FieldErrors,
  UseFieldArrayReturn,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { CreateProductFormValues } from "../schemas/create-product.schema";

interface VariantsFieldProps {
  control: Control<CreateProductFormValues>;
  register: UseFormRegister<CreateProductFormValues>;
  errors: FieldErrors<CreateProductFormValues>;
  variantsArray: UseFieldArrayReturn<CreateProductFormValues, "variants">;
  onAddVariant: () => void;
}

export const VariantsField = ({
  control,
  register,
  errors,
  variantsArray,
  onAddVariant,
}: VariantsFieldProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-muted uppercase">
          Variantes ({variantsArray.fields.length})
        </span>
        <button
          type="button"
          onClick={onAddVariant}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-[0.15em] uppercase bg-card-light text-white hover:bg-white/10 transition-colors rounded-sm"
        >
          <Plus size={14} /> Variante
        </button>
      </div>

      {errors.variants?.root?.message && (
        <p className="text-xs text-red-400">{errors.variants.root.message}</p>
      )}
      {errors.variants?.message && (
        <p className="text-xs text-red-400">{errors.variants.message}</p>
      )}

      <div className="space-y-3">
        {variantsArray.fields.map((variant, variantIndex) => (
          <VariantCard
            key={variant.id}
            variantIndex={variantIndex}
            control={control}
            register={register}
            errors={errors}
            canRemove={variantsArray.fields.length > 1}
            onRemove={() => variantsArray.remove(variantIndex)}
          />
        ))}
      </div>
    </div>
  );
};

interface VariantCardProps {
  variantIndex: number;
  control: Control<CreateProductFormValues>;
  register: UseFormRegister<CreateProductFormValues>;
  errors: FieldErrors<CreateProductFormValues>;
  canRemove: boolean;
  onRemove: () => void;
}

const VariantCard = ({
  variantIndex,
  control,
  register,
  errors,
  canRemove,
  onRemove,
}: VariantCardProps) => {
  const attributesArray = useFieldArray({
    control,
    name: `variants.${variantIndex}.attributes`,
  });

  const variantErrors = errors.variants?.[variantIndex];

  return (
    <div className="p-4 bg-card rounded-sm border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">
          Variante #{variantIndex + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-muted hover:text-red-400 transition-colors"
            aria-label="Eliminar variante"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] tracking-[0.2em] text-muted uppercase mb-2">
            Precio
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register(`variants.${variantIndex}.price`, {
              valueAsNumber: true,
            })}
            className={`w-full bg-card-light text-sm text-white px-3 py-2.5 rounded-sm outline-none border ${
              variantErrors?.price
                ? "border-red-500/70"
                : "border-transparent focus:border-white/20"
            }`}
          />
          {variantErrors?.price && (
            <p className="mt-1 text-xs text-red-400">
              {variantErrors.price.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] text-muted uppercase mb-2">
            Stock
          </label>
          <input
            type="number"
            step="1"
            min="0"
            {...register(`variants.${variantIndex}.stock`, {
              valueAsNumber: true,
            })}
            className={`w-full bg-card-light text-sm text-white px-3 py-2.5 rounded-sm outline-none border ${
              variantErrors?.stock
                ? "border-red-500/70"
                : "border-transparent focus:border-white/20"
            }`}
          />
          {variantErrors?.stock && (
            <p className="mt-1 text-xs text-red-400">
              {variantErrors.stock.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] text-muted uppercase">
            Atributos
          </span>
          <button
            type="button"
            onClick={() => attributesArray.append({ key: "", value: "" })}
            className="text-[10px] tracking-[0.15em] uppercase text-muted hover:text-white transition-colors"
          >
            + Atributo
          </button>
        </div>

        {variantErrors?.attributes?.root?.message && (
          <p className="text-xs text-red-400">
            {variantErrors.attributes.root.message}
          </p>
        )}
        {variantErrors?.attributes?.message &&
          !variantErrors.attributes.root && (
            <p className="text-xs text-red-400">
              {variantErrors.attributes.message}
            </p>
          )}

        <div className="space-y-2">
          {attributesArray.fields.map((attr, attrIndex) => {
            const attrErrors = variantErrors?.attributes?.[attrIndex];
            return (
              <div key={attr.id} className="flex gap-2">
                <input
                  placeholder="Clave (ej. color)"
                  {...register(
                    `variants.${variantIndex}.attributes.${attrIndex}.key`,
                  )}
                  className={`flex-1 bg-card-light text-sm text-white px-3 py-2 rounded-sm outline-none border ${
                    attrErrors?.key
                      ? "border-red-500/70"
                      : "border-transparent focus:border-white/20"
                  }`}
                />
                <input
                  placeholder="Valor (ej. Negro)"
                  {...register(
                    `variants.${variantIndex}.attributes.${attrIndex}.value`,
                  )}
                  className={`flex-1 bg-card-light text-sm text-white px-3 py-2 rounded-sm outline-none border ${
                    attrErrors?.value
                      ? "border-red-500/70"
                      : "border-transparent focus:border-white/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => attributesArray.remove(attrIndex)}
                  disabled={attributesArray.fields.length === 1}
                  className="px-2 text-muted hover:text-red-400 disabled:opacity-30 disabled:hover:text-muted transition-colors"
                  aria-label="Eliminar atributo"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
