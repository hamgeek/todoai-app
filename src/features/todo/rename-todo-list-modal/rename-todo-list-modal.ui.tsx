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
import { Edit2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  UpdateTodoSchema,
  type UpdateTodoSchemaType,
  useUpdateTodo,
} from '@/entities/todo';

export function RenameTodoListModal({ data }: { data: UpdateTodoSchemaType }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isPending, isSuccess, handleUpdateTodo } = useUpdateTodo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateTodoSchemaType>({
    resolver: zodResolver(UpdateTodoSchema),
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess, onClose, reset]);

  return (
    <>
      <Edit2Icon
        onClick={onOpen}
        className="flex-shrink-0 cursor-pointer text-green-700"
        size={20}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => {
            return (
              <>
                <ModalHeader>
                  <h1>Rename Project Title</h1>
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={handleSubmit(handleUpdateTodo)}
                    className="flex max-w-lg flex-col gap-6"
                  >
                    <div className="flex w-full flex-col gap-4">
                      <Input type="hidden" {...register('id')} />
                      <Input
                        label="Title"
                        size="md"
                        labelPlacement="outside"
                        isRequired
                        placeholder="e.g. my homework list"
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
                        Rename
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
