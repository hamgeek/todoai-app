import { Button } from '@nextui-org/react';
import { ListIcon, PlusIcon } from 'lucide-react';

export function ManageTodoListUI() {
  return (
    <div className="flex w-full flex-col gap-3 px-6 py-3">
      <div className="text-md w-full font-semibold text-gray-700">
        Todo List
      </div>
      <div className="flex w-full flex-col text-gray-700">
        <div className="flex w-full cursor-pointer select-none flex-row items-center gap-3 rounded-lg bg-transparent px-4 py-2 text-medium font-medium hover:bg-gray-200">
          <ListIcon size={18} className="flex-shrink-0" />
          <h2>Hello</h2>
        </div>
        <div className="flex w-full cursor-pointer select-none flex-row items-center gap-3 rounded-lg bg-transparent px-4 py-2 text-medium font-medium hover:bg-gray-200">
          <ListIcon size={18} className="flex-shrink-0" />
          <h2 className="truncate">Completed with Codepen Analytics</h2>
        </div>
      </div>
      <div className="w-full px-4">
        <Button
          startContent={<PlusIcon size={14} />}
          size="sm"
          variant="bordered"
        >
          Create New List
        </Button>
      </div>
    </div>
  );
}
