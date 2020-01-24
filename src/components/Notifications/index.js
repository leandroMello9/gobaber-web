import React,{useState, useEffect, useMemo} from 'react';
import {MdNotifications} from 'react-icons/md'
import { Container, Badge, Scroll, NotificationList, Notification } from './styles';
//ParseISO = Converte uma data inscrita em formate de texto no Date do javascript
//formatDistance = formtação de distanção por exemplo 'Foi a 2 horas'
import {parseISO, formatDistance} from 'date-fns';  
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

export default function Notifications() {

  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const hasUnread = useMemo(
    //!! verifica se o find encontrou algum read == false se sim ele retorna true se não retorna false
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  )

  useEffect(() => {
    async function loadNotification() {
      const response = await api.get('notifications');
      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          //Formatação da data
          parseISO(notification.createdAt),
          //Qual data estou calculando a distancia no caso a data atual
          new Date(),
          //AddSuffix = iria mostrar '3 dias atras' com ele como true fica 'Ha 3 dias atras'
          {addSuffix: true, locale: pt}
        )
      }));
      setNotifications(data);

    }

    loadNotification()
  },[])

  function handleToogleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);
    setNotifications(
      notifications.map(notification => 
        notification._id === id ? {...notification, read: true}  : notification
      )
    )
  }
  return (
    <Container>
      <Badge  onClick={handleToogleVisible} hasUnread={hasUnread}>
      <MdNotifications color="#7159c1" size={20}/>
      </Badge>
      
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (

          <Notification  key={notification._id} unread={!notification.read}>
            <p>{notification.content}</p>
            <time>{notification.timeDistance}</time>
            {notification.read ? null : (
              <button type="button" onClick={() => handleMarkAsRead(notification._id)}>Marcar como lida</button>
            )}
          </Notification>
          ))}
       
        </Scroll>
      </NotificationList>
    </Container>
  );
}
