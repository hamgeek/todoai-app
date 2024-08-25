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
  CreateTodoSchema,
  type CreateTodoSchemaType,
  useCreateTodo,
} from '@/entities/todo';

export function AddTodoListModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isPending, isSuccess, handleCreateTodo } = useCreateTodo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoSchemaType>({
    resolver: zodResolver(CreateTodoSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess, onClose, reset]);

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<PlusIcon size={14} />}
        size="sm"
        variant="bordered"
      >
        Create New Project
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => {
            return (
              <>
                <ModalHeader>
                  <h1>Create New Project</h1>
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={handleSubmit(handleCreateTodo)}
                    className="flex max-w-lg flex-col gap-6"
                  >
                    <div className="flex w-full flex-col gap-4">
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
