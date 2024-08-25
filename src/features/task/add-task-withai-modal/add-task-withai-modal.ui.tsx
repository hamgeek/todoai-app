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
import { SparklesIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  CreateTaskWithAISchema,
  type CreateTaskWithAISchemaType,
  useCreateTaskWithAI,
} from '@/entities/task';

export function AddTaskWithAIModal({ todoId }: { todoId: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isPending, isSuccess, handleCreateTaskWithAI } =
    useCreateTaskWithAI();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskWithAISchemaType>({
    resolver: zodResolver(CreateTaskWithAISchema),
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
        className="flex w-fit flex-row items-center gap-4 rounded-lg bg-indigo-800 px-4 py-3 text-sm text-white ring-1 ring-indigo-400 md:px-5 md:py-4 md:text-medium"
        type="button"
        aria-label="button"
      >
        <SparklesIcon size={18} className="flex-shrink-0" />{' '}
        <span>Generate Tasks with AI</span>
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => {
            return (
              <>
                <ModalHeader>
                  <h1>Generate Tasks with AI</h1>
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={handleSubmit(handleCreateTaskWithAI)}
                    className="flex max-w-lg flex-col gap-6"
                  >
                    <div className="flex w-full flex-col gap-4">
                      <Input type="hidden" {...register('todoId')} />
                      <Input
                        label="Prompt"
                        size="md"
                        labelPlacement="outside"
                        isRequired
                        placeholder="e.g. create guide to learn digital marketing"
                        {...register('prompt')}
                      />
                      {errors.prompt && (
                        <label htmlFor="title" className="text-sm text-red-600">
                          {errors?.prompt?.message}
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
