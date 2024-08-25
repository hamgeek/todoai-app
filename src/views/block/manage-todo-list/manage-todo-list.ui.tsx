import { ListIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSidebarStore } from '@/entities/sidebar';
import { useTodoListQuery } from '@/entities/todo';
import { AddTodoListModal } from '@/features/todo';

export function ManageTodoListUI() {
  const { data } = useTodoListQuery();
  const { setSidebarOpen } = useSidebarStore();
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-3 px-6 py-3">
      <div className="text-md w-full font-semibold text-gray-700">
        Project List
      </div>
      <div className="w-full px-4">
        <AddTodoListModal />
      </div>
      {Object.keys(data ?? {}).length > 0 &&
        data?.map((todo) => (
          <Link
            onClick={() => setSidebarOpen(false)}
            key={todo.id}
            href={`/workspace/todo/${todo.id}`}
            className="flex w-full flex-col text-gray-700"
          >
            <div
              className={`flex w-full cursor-pointer select-none flex-row items-center gap-3 rounded-lg px-4 py-2 text-medium font-medium hover:bg-gray-200 ${pathname === `/workspace/todo/${todo.id}` ? 'bg-gray-200' : 'bg-transparent'}`}
            >
              <ListIcon size={18} className="flex-shrink-0" />
              <h2>{todo.title}</h2>
            </div>
          </Link>
        ))}
    </div>
  );
}
