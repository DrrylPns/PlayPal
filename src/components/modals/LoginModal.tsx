'use client';

import { useCallback, useState } from "react";
// import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/libs/hooks/useRegisterModal";
import useLoginModal from "@/libs/hooks/useLoginModal";

import Modal from "./Modal";
import InputRegister from "../auth/InputRegister";
import Heading from "../auth/HeadingAuth";
import ButtonAuth from "../auth/ButtonAuth";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    setIsLoading(true);
    console.log(data)
    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        // toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
      
      if (callback?.error) {
        // toast.error(callback.error);
      }
    });
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />
      <InputRegister
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
      />
      <InputRegister
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      
      <div className="flex flex-col gap-2 md:px-[32px]">
        <ButtonAuth 
          outline 
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn('google')} 
        />
        <ButtonAuth 
          outline 
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => signIn('github')}
        />
      </div>

      <div className="
        text-neutral-500
        dark:text-neutral-400
        text-center 
        mt-4
        font-light">
        <p>First time using Playpal?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              dark:text-neutral-100
              cursor-pointer 
              hover:underline
            "
            > Create an account</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;