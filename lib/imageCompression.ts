export class UnsupportedImageError extends Error {
  constructor() {
    super("UNSUPPORTED_IMAGE_FORMAT");
    this.name = "UnsupportedImageError";
  }
}

export class ImageTooLargeError extends Error {
  constructor() {
    super("IMAGE_TOO_LARGE_AFTER_COMPRESSION");
    this.name = "ImageTooLargeError";
  }
}

interface CompressOptions {
  maxDimension?: number;
  quality?: number;
  maxOutputBytes?: number;
  skipIfSmallerThan?: number;
}

/**
 * Downscales/re-encodes an image client-side so large phone-camera photos
 * (often 5-20MB) don't hit storage/network limits or slow mobile uploads.
 * Also normalizes formats browsers can decode but not render inline (e.g. HEIC)
 * to JPEG. Throws UnsupportedImageError if the browser can't decode the file.
 */
export async function compressImage(file: File, options: CompressOptions = {}): Promise<File> {
  const {
    maxDimension = 1920,
    quality = 0.82,
    maxOutputBytes = 5 * 1024 * 1024,
    skipIfSmallerThan = 1.5 * 1024 * 1024,
  } = options;

  const alreadyWebSafe = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp";
  if (alreadyWebSafe && file.size <= skipIfSmallerThan) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new UnsupportedImageError();
  }

  try {
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new UnsupportedImageError();
    ctx.drawImage(bitmap, 0, 0, width, height);

    let q = quality;
    let blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", q));
    while (blob && blob.size > maxOutputBytes && q > 0.4) {
      q -= 0.15;
      blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", q));
    }
    if (!blob) throw new UnsupportedImageError();
    if (blob.size > maxOutputBytes) throw new ImageTooLargeError();

    const newName = file.name.replace(/\.\w+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}
