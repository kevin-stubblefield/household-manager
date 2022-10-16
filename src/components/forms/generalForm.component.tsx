import React, { ReactElement, ReactNode, useEffect } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form';
import { inferMutationInput, TMutation, TQuery, trpc } from '../../utils/trpc';

export function GeneralForm<T extends inferMutationInput<TMutation>>({
  children,
  mutation,
  invalidateQuery,
}: {
  children: ReactNode;
  mutation: TMutation;
  invalidateQuery?: TQuery;
}) {
  const methods = useForm<T>();
  const { handleSubmit, formState, reset } = methods;

  const utils = trpc.useContext();
  const { mutate } = trpc.useMutation([mutation], {
    onSuccess() {
      if (invalidateQuery) {
        utils.invalidateQueries([invalidateQuery]);
      }
    },
  });

  const onSubmit: SubmitHandler<T> = (values) => {
    mutate(values);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mb-2">
        {Array.isArray(children)
          ? children.map((child) => {
              return child?.props?.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register: methods.register,
                      key: child.props.name,
                    },
                  })
                : child;
            })
          : children}
      </form>
    </FormProvider>
  );
}

export function TextInput({
  name,
  placeholderText,
  ...rest
}: {
  name: string;
  placeholderText: string;
}) {
  const { register } = useFormContext();

  return (
    <input
      className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
      placeholder={placeholderText}
      {...register(name)}
      {...rest}
    />
  );
}

export function SubmitButton({ text }: { text: string }) {
  return (
    <button
      className="p-2 mb-2 text-slate-100 bg-green-600 rounded shadow-md hover:bg-green-500 transition-all duration-[250ms]"
      type="submit"
    >
      {text}
    </button>
  );
}
