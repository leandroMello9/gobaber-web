import React from 'react';
import logo from '~/assets/logo.svg'
import {Link} from 'react-router-dom'
import {Form, Input} from '@rocketseat/unform'
import {useDispatch} from 'react-redux'
import {singUpRequest} from '~/store/modules/auth/actions';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome completo é obrigatorio'),
  email: Yup.string().email('Ensira um email valido').required('O e-mail é obrigatorio'),
  password: Yup.string().min(6, 'A senha ter no minimo 6 caracteres').required('A senha é obrigatoria')
})
export default function SignUp() {
  const dispath = useDispatch();

  function handleSubmit({name, email, password}) {
    dispath(singUpRequest(name, email, password))
  }
  return (
    <>
      <img src={logo}></img>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name= "name" placeholder="Nome completo"/>
        <Input name="email" type="email" placeholder="Seu e-mail"/>
        <Input name="password" type="password" placeholder="Sua senha secreta"/>
        <button type="submit">Criar conta</button>
        <Link to="/">Ja tenho um login</Link>
      </Form>
    </>
  );
}
