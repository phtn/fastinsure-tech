import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import { onSuccess } from "@/app/ctx/toasts";
import { Err, toggleState } from "@/utils/helpers";

import {
  type ChangeEvent,
  createContext,
  type MouseEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface AccountCtxValues {
  open: boolean;
  fileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleEditor: VoidFunction;
  imageData: string | undefined;
  save: () => Promise<void>;
  saving: boolean;
  inputFileRef: RefObject<HTMLInputElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  canvasData: string | undefined;
  browseFile: VoidFunction;
  isDragging: boolean;
  handleDragStart: (e: MouseEvent) => void;
  handleDragEnd: (e: MouseEvent) => void;
  pfp: string | null;
}

export const AccountCtx = createContext<AccountCtxValues | null>(null);

export const AccountContext = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [imageData, setImageData] = useState<string>();
  const [pfp, setPfp] = useState<string | null>(null);
  const [canvasData, setCanvasData] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const { vxuser } = useAuthCtx();
  const { files, usr } = useVex();

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const browseFile = useCallback(() => {
    if (inputFileRef.current) {
      setFile(undefined);
      inputFileRef.current.click();
      inputFileRef.current.value = "";
    }
  }, [inputFileRef]);

  const handleDragStart = useCallback((e: MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const drawCanvas = useCallback((e: ProgressEvent<FileReader>) => {
    const img = new Image();
    img.onload = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (!ctx) {
        console.error("Unable to get 2D context");
        return;
      }

      // Calculate new dimensions
      const dw = 200;
      const dh = 200;

      canvas.width = dw;
      canvas.height = dh;

      // Draw resized image
      ctx.drawImage(img, 0, 0, dw, dh);
      ctx.restore();

      const data = ctx.getImageData(0, 0, dw, dh);
      ctx.putImageData(data, 0, 0);

      // console.log(canvas.toDataURL("image/webp"), dh, dw);

      // Set processed images
      const cdata = canvas.toDataURL("image/webp").split(",")[1]!;
      setCanvasData(cdata);
    };

    img.src = e.target?.result as string;
  }, []);

  const fileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const f = e.target.files?.[0];
      if (f) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const result = ev.target?.result;
          setImageData(result as string);
          drawCanvas(ev);
        };

        reader.readAsDataURL(f as Blob);
        setOpen(true);
        setFile(f);
      }
    },
    [drawCanvas],
  );

  const toggleEditor = useCallback(() => toggleState(setOpen), [setOpen]);

  const createUrl = useCallback(async () => {
    if (file) {
      return await files.create(file);
    }
  }, [file, files]);

  const save = useCallback(async () => {
    setSaving(true);
    const pfp_url = await createUrl();

    if (vxuser?.uid && pfp_url) {
      const id = await usr.add.metadata(vxuser.uid, { pfp_url });
      if (id) {
        onSuccess("Photo uploaded.");
        setOpen(false);
      }
      setSaving(false);
    }
  }, [createUrl, usr.add, vxuser?.uid]);

  const getPfp = useCallback(async () => {
    const metadata = vxuser?.metadata?.[0] as { pfp: string };
    setPfp(await files.get(metadata.pfp));
  }, [files, vxuser]);

  useEffect(() => {
    getPfp().catch(Err);
  }, [getPfp]);

  const value = useMemo(
    () => ({
      open,
      fileChange,
      toggleEditor,
      imageData,
      save,
      saving,
      inputFileRef,
      browseFile,
      canvasRef,
      canvasData,
      isDragging,
      handleDragEnd,
      handleDragStart,
      pfp,
    }),
    [
      open,
      fileChange,
      toggleEditor,
      imageData,
      save,
      saving,
      inputFileRef,
      browseFile,
      canvasRef,
      canvasData,
      isDragging,
      handleDragEnd,
      handleDragStart,
      pfp,
    ],
  );

  return <AccountCtx value={value}>{children}</AccountCtx>;
};
