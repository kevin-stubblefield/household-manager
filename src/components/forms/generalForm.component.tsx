import React, { ReactElement } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { inferMutationInput, TMutation, TQuery, trpc } from '../../utils/trpc';

export function GeneralForm<T extends inferMutationInput<TMutation>>({
  children,
  mutation,
  invalidateQuery,
}: {
  children: ReactElement;
  mutation: TMutation;
  invalidateQuery?: TQuery;
}) {
  const methods = useForm<T>();
  const { handleSubmit } = methods;

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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
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
  register,
  name,
  ...rest
}: {
  register: UseFormRegister<FieldValues>;
  name: string;
}) {
  return <input {...register(name)} {...rest} />;
}
