import React,{useState, useRef, useEffect} from 'react';
import {useField} from '@rocketseat/unform'
import api from '~/services/api';
import { Container } from './styles';

export default function AvatarInput() {
  //Oq ta vindo la dos profile do initialdata
  const { defaultValue, registerField } = useField('avatar')

  //Estado responsavel por ir la na api e manda o novo avatar, retorna um novo id;
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  //Estado responsavel por carregar o novo avatar do usuario
  const [peview, setPreview] = useState(defaultValue && defaultValue.url);

  //Referencia do input
  const ref = useRef();

  useEffect(() => {
    if(ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref])
  async function handleChange(e) {
    //Form que o multer usa pra recuperar o arquivo
    const data =  new FormData();
    //Pegando o 1 indice do array do e.target.value garente que só vamos pegar a primeira imagem;
    data.append('file', e.target.files[0])
    const response = await api.post('files', data);
    const {id , url} = response.data;
    setFile(id);
    setPreview(url);
  }
  return (
   <Container>
     <label htmlFor="avatar ">
       <img src={peview || 'https://api.adorable.io/avatars/50/abott@adorable.png'} alt=""/>
     </label>
       <input 
       type="file" 
       id="avatar"
       accept="image/*"
       data-file={file} 
       onChange={ handleChange}
       ref={ref}
        
       />
   </Container>
  );
}
