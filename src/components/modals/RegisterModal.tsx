'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
// import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/libs/hooks/useLoginModal";
import useRegisterModal from "@/libs/hooks/useRegisterModal";

import Modal from "./Modal";
import InputRegister from "@/components/auth/InputRegister";
import HeadingAuth from "@/components/auth/HeadingAuth";
import ButtonAuth from "@/components/auth/ButtonAuth";

const RegisterModal= () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() => {
      console.log(data)
    //   toast.success('Registered!');
      registerModal.onClose();
      loginModal.onOpen();
    })
    .catch((error) => {
    //   toast.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <HeadingAuth
        title="Welcome to Playpal"
        subtitle="Create an account!"
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
        id="name"
        label="Name"
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
      <hr/>
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
      
      <div 
        className="
          text-neutral-500 
          dark:text-neutral-400
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={onToggle}
            className="
              text-neutral-800
              dark:text-neutral-100
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;