import { useEffect, useId, useMemo, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "../../actions/button";
import { useControllableState } from "../../../shared/use-controllable-state";
import { classNames } from "../../../shared/utils";

export interface CommandPaletteCommand {
  label: ReactNode;
  value: string;
  description?: ReactNode;
  shortcut?: ReactNode;
  disabled?: boolean;
  keywords?: string[];
}

export interface CommandPaletteProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onSelect"> {
  title?: ReactNode;
  triggerLabel?: ReactNode;
  commands?: CommandPaletteCommand[];
  open?: boolean;
  defaultOpen?: boolean;
  placeholder?: string;
  emptyMessage?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  onCommandSelect?: (command: CommandPaletteCommand) => void;
}

export function CommandPalette({
  title = "명령 팔레트 / Command palette",
  triggerLabel = "명령 열기 / Open commands",
  commands = [],
  open,
  defaultOpen = false,
  placeholder = "명령 검색 / Search commands",
  emptyMessage = "명령이 없습니다. / No commands.",
  onOpenChange,
  onCommandSelect,
  className,
  ...props
}: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [query, setQuery] = useState("");
  const [currentOpen, setOpen] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange });
  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commands;
    return commands.filter((command) => [command.value, command.label?.toString(), command.description?.toString(), ...(command.keywords ?? [])].join(" ").toLowerCase().includes(normalizedQuery));
  }, [commands, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (currentOpen && !dialog.open) dialog.showModal();
    if (!currentOpen && dialog.open) dialog.close();
  }, [currentOpen]);

  const selectCommand = (command: CommandPaletteCommand) => {
    if (command.disabled) return;
    onCommandSelect?.(command);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className={classNames("ds-CommandPaletteRoot", className)} {...props}>
      <Button variant="outline" tone="neutral" aria-haspopup="dialog" aria-expanded={currentOpen} onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <dialog className="ds-CommandPalette" data-state={currentOpen ? "open" : "closed"} ref={dialogRef} aria-labelledby={titleId} onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
        <div className="ds-CommandPalette-header">
          <h3 id={titleId}>{title}</h3>
          <button className="ds-CommandPalette-close" type="button" aria-label="닫기 / Close" onClick={() => setOpen(false)}>x</button>
        </div>
        <input className="ds-CommandPalette-input" autoFocus placeholder={placeholder} value={query} onChange={(event) => setQuery(event.currentTarget.value)} />
        <div className="ds-CommandPalette-list" role="listbox">
          {filteredCommands.length > 0 ? filteredCommands.map((command) => (
            <button className="ds-CommandPalette-item" disabled={command.disabled} key={command.value} role="option" type="button" onClick={() => selectCommand(command)}>
              <span className="ds-CommandPalette-itemText">
                <strong>{command.label}</strong>
                {command.description ? <span>{command.description}</span> : null}
              </span>
              {command.shortcut ? <kbd>{command.shortcut}</kbd> : null}
            </button>
          )) : <span className="ds-CommandPalette-empty">{emptyMessage}</span>}
        </div>
      </dialog>
    </div>
  );
}
