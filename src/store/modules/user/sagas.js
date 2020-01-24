import { all, takeLatest, call, put} from 'redux-saga/effects';
import {toast} from 'react-toastify'
import api from '~/services/api';
import {updateProfileSuccess, updateProfileFailure} from './actions';
export function* updateProfile({ payload }) {
  try {
    const {name, email, avatar_id, ...rest} = payload.data;
    //Object.assign = serve pra unir dois objetos;
    const profile = Object.assign(
    {name, email, avatar_id},
      rest.oldPassword ? rest : {}
    )
    //Chamada a api;
    const response = yield call(api.put, 'users', profile );
    //Caso ocorrer tudo bem..
    toast.success('Perfil Atualizado com sucesso!');
    yield put(
      //Reponse.data são os dados do payload que a action vai receber
      updateProfileSuccess(response.data)
      )
    
  }catch(err) {
    toast.error('Erro ao atualizar o perfil, confira os dados !');
    yield put(updateProfileFailure());
  }

}


export default all([
  takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)
])

