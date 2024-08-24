import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function SignOutModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <LogOutIcon
        onClick={onOpen}
        size={17}
        className="cursor-pointer text-red-500"
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>
                  <h1 className="text-lg font-semibold text-gray-800">
                    Confirm Sign Out
                  </h1>
                </ModalHeader>
                <ModalBody>
                  <div className="flex w-full flex-row justify-center">
                    <p>
                      Are you sure you want to sign out? Any unsaved changes
                      will be lost.
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="flex flex-row gap-2">
                    <Button size="md" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      onPress={() => signOut({ callbackUrl: '/' })}
                      size="md"
                      color="danger"
                    >
                      Confirm
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
