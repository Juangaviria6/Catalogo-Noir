interface CloudinaryUploadInfo {
  secure_url: string
  public_id: string
  format: string
  width: number
  height: number
  bytes: number
  original_filename: string
}

interface CloudinaryResult {
  event: 'success' | 'queues-end' | 'close' | 'abort'
  info: CloudinaryUploadInfo
}

interface CloudinaryWidget {
  open: () => void
  close: () => void
  destroy: () => void
}

interface CloudinaryWidgetOptions {
  cloudName: string
  uploadPreset: string
  multiple?: boolean
  maxFiles?: number
  folder?: string
  clientAllowedFormats?: string[]
  maxImageFileSize?: number
  cropping?: boolean
  sources?: string[]
  language?: string
  text?: Record<string, unknown>
}

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: CloudinaryWidgetOptions,
        callback: (error: Error | null, result: CloudinaryResult) => void
      ) => CloudinaryWidget
    }
  }
}
