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

export function SignUpModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="md" color="primary" onPress={onOpen}>
        Get Started
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
                      size="md"
                      onPress={() =>
                        signIn('google', { callbackUrl: '/workspace/home' })
                      }
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
                      Sign Up with Google
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
