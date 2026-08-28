import { useEffect, useRef, useState } from 'react'
import { Upload, X, GripVertical, Star } from 'lucide-react'

interface CldWidget {
  open: () => void
  close: () => void
  destroy: () => void
}

interface CldResult {
  event: string
  info: { secure_url: string; public_id: string }
}

type CldWindow = typeof window & {
  cloudinary?: {
    createUploadWidget: (
      options: Record<string, unknown>,
      callback: (error: Error | null, result: CldResult) => void
    ) => CldWidget
  }
}

interface Props {
  value: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const CloudinaryUpload = ({ value, onChange, maxFiles = 5 }: Props) => {
  const widgetRef = useRef<CldWidget | null>(null)
  const [ready, setReady] = useState(false)

  // Ref que siempre tiene el valor más reciente — se actualiza de forma sincrónica
  // tanto desde el prop del padre como desde el propio callback de upload.
  const imagesRef = useRef<string[]>(value)
  useEffect(() => { imagesRef.current = value }, [value])

  // Carga el script de Cloudinary una sola vez
  useEffect(() => {
    const win = window as CldWindow
    if (win.cloudinary) { setReady(true); return }

    const existing = document.getElementById('cld-widget-script')
    if (existing) {
      existing.addEventListener('load', () => setReady(true), { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = 'cld-widget-script'
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js'
    script.async = true
    script.onload = () => setReady(true)
    document.head.appendChild(script)
  }, [])

  // Cleanup al desmontar
  useEffect(() => () => { widgetRef.current?.destroy() }, [])

  // Crea el widget en el momento del click — siempre con closures frescas
  // y actualiza imagesRef de forma SINCRÓNICA para soportar uploads múltiples
  const open = () => {
    const win = window as CldWindow
    if (!ready || !win.cloudinary) return

    // Destruye instancia previa para crear una con la config actualizada
    widgetRef.current?.destroy()

    widgetRef.current = win.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        multiple: maxFiles > 1,
        maxFiles: maxFiles === 1 ? 1 : Math.max(1, maxFiles - imagesRef.current.length),
        folder: 'noir-store/collections',
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
        maxImageFileSize: 8_000_000,
        cropping: false,
        sources: ['local', 'url', 'camera'],
        language: 'es',
      },
      (error: Error | null, result: CldResult) => {
        if (error) { console.error('[Cloudinary upload error]', error); return }

        if (result?.event === 'success' && result.info?.secure_url) {
          // Si maxFiles === 1, se reemplaza la imagen directamente
          const updated = maxFiles === 1
            ? [result.info.secure_url]
            : [...imagesRef.current, result.info.secure_url]
          imagesRef.current = updated
          onChange(updated)
        }
      }
    )

    widgetRef.current.open()
  }

  const remove = (url: string) => onChange(value.filter(u => u !== url))

  const moveFirst = (url: string) => {
    if (value[0] === url) return
    onChange([url, ...value.filter(u => u !== url)])
  }

  return (
    <div className="space-y-3">
      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {value.map((url, i) => (
            <div key={url} className="relative group aspect-square bg-noir-mid overflow-hidden">
              <img src={url} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover" />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                {i !== 0 && maxFiles > 1 && (
                  <button
                    type="button"
                    title="Poner como principal"
                    onClick={() => moveFirst(url)}
                    className="w-6 h-6 bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
                  >
                    <Star size={10} />
                  </button>
                )}
                <button
                  type="button"
                  title="Eliminar"
                  onClick={() => remove(url)}
                  className="w-6 h-6 bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
                >
                  <X size={10} />
                </button>
              </div>

              {i === 0 && maxFiles > 1 && (
                <span className="absolute bottom-0 left-0 right-0 bg-white text-black text-[8px] font-heading font-bold tracking-widest uppercase text-center py-0.5">
                  Principal
                </span>
              )}
              <span className="absolute top-1 left-1 w-4 h-4 bg-black/60 text-white text-[9px] font-heading flex items-center justify-center">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Botón de subida / reemplazo */}
      {(value.length < maxFiles || maxFiles === 1) && (
        <button
          type="button"
          onClick={open}
          disabled={!ready}
          className={[
            'w-full flex items-center justify-center gap-3 border-2 border-dashed py-3.5 px-4',
            'font-heading text-xs tracking-widest uppercase transition-all duration-200',
            ready
              ? 'border-white/20 text-white/70 hover:border-white/50 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer'
              : 'border-white/10 text-white/20 cursor-not-allowed',
          ].join(' ')}
        >
          {!ready ? (
            <>
              <span className="w-3 h-3 border border-white/30 border-t-white/70 rounded-full animate-spin" />
              Cargando Cloudinary...
            </>
          ) : (
            <>
              <Upload size={14} />
              {value.length === 0
                ? 'Subir imagen con Cloudinary'
                : maxFiles === 1
                ? 'Reemplazar imagen con Cloudinary'
                : `Agregar más (${value.length}/${maxFiles})`}
            </>
          )}
        </button>
      )}

      {value.length > 0 && (
        <p className="text-[10px] font-heading text-white/20 tracking-wide flex items-center gap-1">
          <GripVertical size={10} />
          La primera imagen es la principal. Hover para cambiar orden.
        </p>
      )}
    </div>
  )
}

export default CloudinaryUpload
