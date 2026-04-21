"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const ACCEPTED_MIME = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 10;

interface ImagePickerProps {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
}

export const ImagePicker = ({ files, onChange, disabled }: ImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [rejections, setRejections] = useState<string[]>([]);

  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files],
  );

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const validate = (incoming: File[]) => {
    const accepted: File[] = [];
    const errors: string[] = [];

    incoming.forEach((file) => {
      if (!ACCEPTED_MIME.includes(file.type)) {
        errors.push(`${file.name}: formato no permitido (usar JPG, PNG o WebP)`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: supera los 5MB`);
        return;
      }
      accepted.push(file);
    });

    return { accepted, errors };
  };

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    const { accepted, errors } = validate(Array.from(incoming));

    const merged = [...files, ...accepted].slice(0, MAX_FILES);
    if (files.length + accepted.length > MAX_FILES) {
      errors.push(`Máximo ${MAX_FILES} imágenes por producto`);
    }

    setRejections(errors);
    onChange(merged);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeAt = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-muted uppercase">
          Imágenes ({files.length}/{MAX_FILES})
        </span>
        <span className="text-[10px] text-muted/70">
          JPG · PNG · WebP · máx 5MB c/u
        </span>
      </div>

      <label
        className={`flex flex-col items-center justify-center gap-2 px-4 py-8 border border-dashed rounded-sm transition-colors ${
          disabled
            ? "border-white/10 opacity-60 cursor-not-allowed"
            : "border-white/15 hover:border-white/30 cursor-pointer bg-card"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_MIME.join(",")}
          multiple
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />
        <ImagePlus size={22} className="text-muted" />
        <span className="text-xs text-muted">
          Hacé click para seleccionar imágenes
        </span>
      </label>

      {rejections.length > 0 && (
        <ul className="space-y-1 text-xs text-red-400">
          {rejections.map((err, i) => (
            <li key={i}>• {err}</li>
          ))}
        </ul>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {previews.map((preview, index) => (
            <div
              key={preview.url}
              className="relative group aspect-square bg-card rounded-sm overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview.url}
                alt={preview.file.name}
                className="w-full h-full object-cover"
              />
              {index === 0 && (
                <span className="absolute top-1 left-1 px-2 py-0.5 bg-black/70 text-[9px] tracking-[0.15em] uppercase text-white rounded-sm">
                  Principal
                </span>
              )}
              <button
                type="button"
                onClick={() => removeAt(index)}
                disabled={disabled}
                className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-black/90 rounded-sm text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
