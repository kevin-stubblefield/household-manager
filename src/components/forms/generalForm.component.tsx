import React, { ReactElement, ReactNode, useEffect } from 'react';
import {
  DefaultValues,
  FormProvider,
  RegisterOptions,
  SubmitHandler,
  useForm,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { inferMutationInput, TMutation, TQuery, trpc } from '../../utils/trpc';

export function GeneralForm<T extends inferMutationInput<TMutation>>({
  children,
  mutation,
  invalidateQuery,
  defaultValues,
}: {
  children: ReactNode;
  mutation: TMutation;
  invalidateQuery?: TQuery;
  defaultValues?: DefaultValues<T>;
}) {
  const methods = useForm<T>({ defaultValues });
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

export function Input({
  type,
  name,
  labelText,
  placeholderText,
  registerOptions,
  value,
  ...rest
}: {
  type?: string;
  name: string;
  labelText?: string;
  placeholderText: string;
  registerOptions?: RegisterOptions;
  value?: string;
}) {
  const { register } = useFormContext();
  const { errors } = useFormState();

  return (
    <>
      {labelText && (
        <label className="font-semibold text-sm mt-2 mb-0" htmlFor={name}>
          {labelText}
        </label>
      )}
      <input
        id={name}
        type={type || 'text'}
        className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
        placeholder={placeholderText}
        {...register(
          name,
          registerOptions || {
            required: 'Field is required',
            minLength: {
              value: 2,
              message: 'Field must be at least 2 characters',
            },
          }
        )}
        {...rest}
      />
      {errors[name] && (
        <span className="text-red-500 block">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
}

export function TextArea({
  name,
  labelText,
  placeholderText,
  registerOptions,
  ...rest
}: {
  name: string;
  labelText?: string;
  placeholderText: string;
  registerOptions?: RegisterOptions;
}) {
  const { register } = useFormContext();
  const { errors } = useFormState();

  return (
    <>
      {labelText && (
        <label className="font-semibold text-sm mt-2 mb-0" htmlFor={name}>
          {labelText}
        </label>
      )}
      <textarea
        id={name}
        className="p-2 border-solid block border-slate-200 focus:border-slate-500 outline-none border-2 rounded transition-all duration-[200ms]"
        placeholder={placeholderText}
        {...register(
          name,
          registerOptions || {
            required: 'Field is required',
          }
        )}
        {...rest}
      />
      {errors[name] && (
        <span className="text-red-500 block">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
}

export function SubmitButton({ text }: { text: string }) {
  return (
    <button
      className="p-2 mb-2 text-slate-100 bg-green-600 rounded block shadow-md hover:bg-green-500 transition-all duration-[250ms]"
      type="submit"
    >
      {text}
    </button>
  );
}
