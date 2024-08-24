/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

'use client';

import { Edit2Icon, PlusIcon, SparklesIcon, Trash2Icon } from 'lucide-react';

import { TodoList } from './todo-list.ui';

export function TodoUI() {
  return (
    <div className="w-full px-12 py-16">
      <div className="mb-8">
        <div className="flex flex-row items-center gap-6">
          <h1 className="text-3xl font-medium text-gray-600">Completed List</h1>
          <div className="flex flex-row items-center gap-3">
            <Edit2Icon className="flex-shrink-0 text-green-700" size={20} />
            <Trash2Icon className="flex-shrink-0 text-red-700" size={20} />
          </div>
        </div>
      </div>
      <div className="mb-1 flex w-full flex-row gap-4">
        <button
          className="flex w-fit flex-row items-center gap-4 rounded-lg bg-slate-100 px-5 py-4 text-medium text-gray-700 ring-1 ring-gray-400"
          type="button"
          aria-label="button"
        >
          <PlusIcon size={18} className="flex-shrink-0" />{' '}
          <span>Create New Task</span>
        </button>
        <button
          className="flex w-fit flex-row items-center gap-4 rounded-lg bg-indigo-800 px-5 py-4 text-medium text-white ring-1 ring-indigo-400"
          type="button"
          aria-label="button"
        >
          <SparklesIcon size={18} className="flex-shrink-0" />{' '}
          <span>Generate Todo with AI</span>
        </button>
      </div>
      <TodoList />
    </div>
  );
}
