import { EllipsisVertical, Trash } from "lucide-react";
import { Button } from "../../../../shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../shared/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../shared/ui/tooltip";

interface Props {
  title: string;
  isSelected: boolean;
  threadId: string;
  selectThread: (threadId: string) => void;
  deleteThread: (threadId: string) => void;
}

export const PrevChatItem = ({
  title,
  threadId,
  isSelected,
  selectThread,
  deleteThread,
}: Props) => {
  return (
    <div className="flex items-center justify-between pl-3">
      <div
        onClick={() => selectThread(threadId)}
        className={`w-full flex justify-between items-center rounded-md p-1 pl-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-muted hover:scale-[1.01] ${
          isSelected ? "bg-muted" : ""
        }`}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate whitespace-nowrap max-w-[200px] overflow-hidden block">
                {title}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs wrap-break-word">
              {title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => deleteThread(threadId)}
            >
              <Trash className="w-4 h-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
