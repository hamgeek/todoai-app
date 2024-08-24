import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export function SignInModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} size="md" variant="bordered">
        Sign In to Account
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => {
            return (
              <>
                <ModalHeader />
                <ModalBody>
                  <div className="flex w-full flex-row justify-center">
                    <Button
                      onPress={() =>
                        signIn('google', { callbackUrl: '/workspace/home' })
                      }
                      size="md"
                      variant="ghost"
                      startContent={
                        <Image
                          className="mr-1"
                          src="/google-icon.svg"
                          alt="google-icon"
                          width={16}
                          height={16}
                        />
                      }
                    >
                      Sign In with Google
                    </Button>
                  </div>
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
