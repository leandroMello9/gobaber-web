import React from 'react';
import {Form, Input} from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';
import {updateProfileRequest} from '~/store/modules/user/actions';
import {logoutUser} from '~/store/modules/auth/actions';
import AvatarInput from './AvatarInput';
export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
 
  function handleSubmit(data) {
    dispatch(updateProfileRequest(data))
    
  }
  function userLogout() {
    dispatch(logoutUser());
  }
  return (
    <Container>
      
      <Form initialData={ profile } onSubmit={ handleSubmit }>
        <AvatarInput name="avatar_id"/>
      
        <Input  name="name" placeholder="Nome completo"></Input>
        <Input name="email" placeholder="Seu endereço de e-mail"></Input>
        <hr/> 

        <Input type="password" name="oldPassword" placeholder="Sua senha atual"></Input>
        <Input type="password" name="password" placeholder="Nova senha"></Input>
        <Input type="password" name="confirmPassword" placeholder="Confirmação da nova senha"></Input>
        <button type="submit">Atualizar perfil </button>
      </Form>
      <button type="button" onClick={userLogout}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
