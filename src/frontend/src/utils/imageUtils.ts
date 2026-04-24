// ─── Shared Image Compression Utility ─────────────────────────────────────────
// Max dimension: 1200px on longest side, JPEG at 0.75 quality.
// Compression runs entirely on canvas — no external dependencies.

const MAX_IMG_DIMENSION = 1200;
const IMG_QUALITY = 0.75;

/**
 * Compress an image File to JPEG (max 1200px, 0.75 quality).
 * Returns the compressed Blob and a data-URL preview.
 * Runs silently in the background — callers don't need to show any loading UI.
 */
export async function compressImage(
  file: File,
): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_IMG_DIMENSION || height > MAX_IMG_DIMENSION) {
          const ratio = Math.min(
            MAX_IMG_DIMENSION / width,
            MAX_IMG_DIMENSION / height,
          );
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not available"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", IMG_QUALITY);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Blob conversion failed"));
              return;
            }
            resolve({ blob, dataUrl });
          },
          "image/jpeg",
          IMG_QUALITY,
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
