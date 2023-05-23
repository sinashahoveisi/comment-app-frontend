import type {FC} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigate} from 'react-router-dom';
import TextInput from '@/components/input/TextInput';
import Button from '@/components/button/Button';
import usePost from '@/hooks/request/usePost';
import {UserFormProps} from '@/types/comment';
import useFetch from '@/hooks/request/useFetch';
import Spinner from '@/components/loading/Spinner';
import Avatar from '@/components/image/Avatar';

const EditUserPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {id} = useParams<{id: string | 'create'}>();

  const validationSchema = yup.object().shape({
    email: yup.string().trim().email('is not valid email').required('is Required'),
    first_name: yup.string().trim().required('is Required'),
    last_name: yup.string().trim().required('is Required')
  });
  const {handleSubmit, control} = useForm<UserFormProps>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const fetchUser = useFetch({
    name: ['users', id],
    url: `users/${id}`,
    enabled: id !== 'create'
  });

  const createUser = usePost({
    url: 'users',
    onSuccess() {
      queryClient.refetchQueries(['users', 'all']);
      navigate('/users', {replace: true});
    }
  });

  const updateUser = usePost({
    url: 'users/{id}',
    method: 'PUT',
    onSuccess() {
      queryClient.refetchQueries(['users', 'all']);
      navigate('/users', {replace: true});
      queryClient.removeQueries(['users', id]);
    }
  });

  const onSubmit = (data: UserFormProps) => {
    id === 'create' ? createUser.post(data) : updateUser.post(data, null, {id});
  };

  if (fetchUser?.isError && id !== 'create') return <Navigate replace to="/users" />;

  if (fetchUser?.isFetching)
    return (
      <div className="mt-10 flex w-full items-center justify-center">
        <Spinner size="!w-7 !h-7" className="ml-2 !p-0" />
      </div>
    );

  return (
    <form className="flex w-full flex-col items-center justify-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-center text-base font-thin">
        {id === 'create' ? 'Create User' : `Update User ${fetchUser?.data?.id}`}
      </h3>
      {id !== 'create' && <Avatar user={fetchUser?.data} className="h-16 w-16" />}
      <TextInput name="email" label="Email" type="email" control={control} defaultValue={fetchUser?.data?.email} />
      <TextInput name="first_name" label="First Name" control={control} defaultValue={fetchUser?.data?.first_name} />
      <TextInput name="last_name" label="Last Name" control={control} defaultValue={fetchUser?.data?.last_name} />
      <Button
        type="submit"
        title={id === 'create' ? 'Add User' : 'Update User'}
        className="!px-6"
        isLoading={createUser?.isLoading || updateUser?.isLoading}
      />
    </form>
  );
};

export default EditUserPage;
