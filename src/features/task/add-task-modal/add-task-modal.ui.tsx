import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  CreateTaskSchema,
  type CreateTaskSchemaType,
  useCreateTask,
} from '@/entities/task';

export function AddTaskModal({ todoId }: { todoId: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isPending, isSuccess, handleCreateTask } = useCreateTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      todoId,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess, onClose, reset]);

  return (
    <>
      <button
        onClick={onOpen}
        className="flex w-fit flex-row items-center gap-4 rounded-lg bg-slate-100 px-4 py-3 text-sm text-gray-700 ring-1 ring-gray-400 md:px-5 md:py-4 md:text-medium"
        type="button"
        aria-label="button"
      >
        <PlusIcon size={18} className="flex-shrink-0" />{' '}
        <span>Create New Task</span>
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => {
            return (
              <>
                <ModalHeader>
                  <h1>Create New Task</h1>
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={handleSubmit(handleCreateTask)}
                    className="flex max-w-lg flex-col gap-6"
                  >
                    <div className="flex w-full flex-col gap-4">
                      <Input type="hidden" {...register('todoId')} />
                      <Input
                        label="Title"
                        size="md"
                        labelPlacement="outside"
                        isRequired
                        placeholder="e.g. learn maths"
                        {...register('title')}
                      />
                      {errors.title && (
                        <label htmlFor="title" className="text-sm text-red-600">
                          {errors?.title?.message}
                        </label>
                      )}
                    </div>
                    <div className="w-full">
                      <Button
                        isLoading={isPending}
                        size="md"
                        type="submit"
                        color="primary"
                      >
                        Create
                      </Button>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter />
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
