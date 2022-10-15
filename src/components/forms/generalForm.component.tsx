import React, { ReactElement } from 'react';
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

export function GeneralForm<T extends FieldValues>({
  children,
}: {
  children: ReactElement;
}) {
  const methods = useForm<T>();

  return (
    <FormProvider {...methods}>
      <form>
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
