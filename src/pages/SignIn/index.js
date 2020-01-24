import React from 'react';
import logo from '~/assets/logo.svg'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Input} from '@rocketseat/unform'
import * as Yup from 'yup';
import {signInRequest} from '~/store/modules/auth/actions';
const schema = Yup.object().shape({
  email: Yup.string().email('Ensira um email valido').required('O e-mail é obrigatorio'),
  password: Yup.string().required('A senha é obrigatoria')
})
export default function SignIn() {
  const dispath = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  function handleSubmit({ email, password }) {
    dispath(signInRequest(email, password))
  }
  return (
    <>
      <img src={logo}></img>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name= "email" type="email" placeholder="Seu e-mail"/>
        <Input name= "password"  type="password" placeholder="Sua senha secreta"/>
        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
