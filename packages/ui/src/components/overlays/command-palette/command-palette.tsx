import { useEffect, useId, useMemo, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "../../actions/button";
import { Icon } from "../../actions/icon";
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
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [currentOpen, setOpen] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange });
  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commands;
    return commands.filter((command) => [command.value, command.label?.toString(), command.description?.toString(), ...(command.keywords ?? [])].join(" ").toLowerCase().includes(normalizedQuery));
  }, [commands, query]);
  const activeCommand = highlightedIndex >= 0 ? filteredCommands[highlightedIndex] : undefined;
  const activeCommandId = activeCommand ? `${listId}-${highlightedIndex}` : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (currentOpen && !dialog.open) {
      lastActiveRef.current ??= document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    }
    if (!currentOpen && dialog.open) dialog.close();
  }, [currentOpen]);

  useEffect(() => {
    const firstEnabledIndex = filteredCommands.findIndex((command) => !command.disabled);
    setHighlightedIndex(firstEnabledIndex);
  }, [filteredCommands]);

  useEffect(() => {
    if (currentOpen || !lastActiveRef.current) return;
    const lastActive = lastActiveRef.current;
    lastActiveRef.current = null;
    window.setTimeout(() => lastActive.focus(), 0);
  }, [currentOpen]);

  const openPalette = () => {
    lastActiveRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  };
  const closePalette = () => {
    setOpen(false);
    setQuery("");
  };
  const selectCommand = (command: CommandPaletteCommand) => {
    if (command.disabled) return;
    onCommandSelect?.(command);
    closePalette();
  };
  const moveHighlight = (offset: number) => {
    if (filteredCommands.length === 0) return;
    let nextIndex = highlightedIndex;
    for (let attempt = 0; attempt < filteredCommands.length; attempt += 1) {
      nextIndex = (nextIndex + offset + filteredCommands.length) % filteredCommands.length;
      if (!filteredCommands[nextIndex]?.disabled) {
        setHighlightedIndex(nextIndex);
        return;
      }
    }
  };
  const onPaletteKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveHighlight(1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveHighlight(-1);
    }
    if (event.key === "Enter" && activeCommand) {
      event.preventDefault();
      selectCommand(activeCommand);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
    }
  };

  return (
    <div className={classNames("ds-CommandPaletteRoot", className)} {...props}>
      <Button variant="outline" tone="neutral" aria-haspopup="dialog" aria-expanded={currentOpen} onClick={openPalette}>{triggerLabel}</Button>
      <dialog className="ds-CommandPalette" data-state={currentOpen ? "open" : "closed"} ref={dialogRef} aria-labelledby={titleId} onCancel={closePalette} onClose={() => setOpen(false)}>
        <div className="ds-CommandPalette-header">
          <h3 id={titleId}>{title}</h3>
          <button className="ds-CommandPalette-close" type="button" aria-label="닫기 / Close" onClick={closePalette}>
            <Icon name="x" />
          </button>
        </div>
        <input
          className="ds-CommandPalette-input"
          aria-activedescendant={activeCommandId}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={currentOpen}
          autoFocus
          placeholder={placeholder}
          role="combobox"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          onKeyDown={onPaletteKeyDown}
        />
        <div className="ds-CommandPalette-list" id={listId} role="listbox">
          {filteredCommands.length > 0 ? filteredCommands.map((command, index) => (
            <button
              aria-selected={index === highlightedIndex}
              className="ds-CommandPalette-item"
              data-highlighted={index === highlightedIndex ? "true" : undefined}
              disabled={command.disabled}
              id={`${listId}-${index}`}
              key={command.value}
              role="option"
              type="button"
              onClick={() => selectCommand(command)}
              onMouseEnter={() => {
                if (!command.disabled) setHighlightedIndex(index);
              }}
            >
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
