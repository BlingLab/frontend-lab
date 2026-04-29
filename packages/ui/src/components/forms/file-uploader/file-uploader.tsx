import { useId, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { Field, type FieldProps } from "../field";
import { useControllableState } from "../../../shared/use-controllable-state";
import { classNames } from "../../../shared/utils";

export interface FileUploaderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "defaultValue" | "onChange" | "type" | "value"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  helperText?: ReactNode;
  files?: File[];
  defaultFiles?: File[];
  maxFiles?: number;
  fieldProps?: Omit<FieldProps, "children" | "controlId" | "label" | "description" | "error" | "required" | "disabled">;
  onFilesChange?: (files: File[]) => void;
}

export function FileUploader({
  label = "파일 업로드 / Upload files",
  description,
  error,
  helperText = "파일을 선택하거나 여기에 끌어오세요. / Choose files or drag them here.",
  files,
  defaultFiles = [],
  maxFiles,
  multiple = true,
  disabled,
  required,
  fieldProps,
  className,
  onFilesChange,
  ...props
}: FileUploaderProps) {
  const fallbackId = useId();
  const controlId = `file-uploader-${fallbackId}`;
  const [selectedFiles, setSelectedFiles] = useControllableState({
    value: files,
    defaultValue: defaultFiles,
    onChange: onFilesChange
  });

  const updateFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.currentTarget.files ?? []);
    setSelectedFiles(typeof maxFiles === "number" ? nextFiles.slice(0, maxFiles) : nextFiles);
  };

  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} controlId={controlId} width="full" className={className} {...fieldProps}>
      <label className={classNames("ds-FileUploader", Boolean(error) && "ds-FileUploader-invalid")} data-disabled={disabled ? "true" : undefined} htmlFor={controlId}>
        <span className="ds-FileUploader-icon" aria-hidden="true">+</span>
        <span className="ds-FileUploader-copy">{helperText}</span>
        <input className="ds-FileUploader-input" disabled={disabled} id={controlId} multiple={multiple} required={required} type="file" onChange={updateFiles} {...props} />
      </label>
      {selectedFiles.length > 0 ? (
        <ul className="ds-FileUploader-list">
          {selectedFiles.map((file, index) => <li key={`${file.name}-${index}`}>{file.name}</li>)}
        </ul>
      ) : null}
    </Field>
  );
}
