import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';

import { useDeleteTodo } from '@/entities/todo';

export function DeleteTodoModal({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange, onClose: closeModal } = useDisclosure();
  const { isSuccess, isPending, handleDeleteTodo } = useDeleteTodo();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <>
      <Trash2Icon
        onClick={onOpen}
        className="flex-shrink-0 cursor-pointer text-red-700"
        size={20}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>
                  <h1 className="text-lg font-semibold text-gray-800">
                    Confirm Delete
                  </h1>
                </ModalHeader>
                <ModalBody>
                  <div className="flex w-full flex-row justify-start">
                    <p>Are you sure you want to delete this task?</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="flex flex-row gap-2">
                    <Button size="md" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      onPress={() => handleDeleteTodo(id)}
                      size="md"
                      color="danger"
                      isLoading={isPending}
                    >
                      Delete
                    </Button>
                  </div>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
