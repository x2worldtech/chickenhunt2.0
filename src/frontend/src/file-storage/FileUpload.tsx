import { useActor } from "@caffeineai/core-infrastructure";
import { useState } from "react";
import { createActor } from "../backend";
import { sanitizeUrl, useInvalidateQueries } from "./FileList";

const CHUNK_SIZE = 2_000_000;

export const useFileUpload = () => {
  const { actor } = useActor(createActor);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = actor as any;
  const [isUploading, setIsUploading] = useState(false);
  const { invalidateFileList } = useInvalidateQueries();

  const uploadFile = async (
    path: string,
    mimeType: string,
    data: Uint8Array,
    onProgress?: (percentage: number) => void,
  ): Promise<void> => {
    if (!a) {
      throw new Error("Backend is not available");
    }

    setIsUploading(true);

    try {
      const totalChunks = Math.ceil(data.length / CHUNK_SIZE);

      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, data.length);
        const chunk = data.slice(start, end);
        const complete = chunkIndex === totalChunks - 1;

        const sanitizedPath = sanitizeUrl(path);
        await a.fileUpload(sanitizedPath, mimeType, chunk, complete);

        const progress = ((chunkIndex + 1) / totalChunks) * 100;
        onProgress?.(progress);
      }
      await invalidateFileList();
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
};
