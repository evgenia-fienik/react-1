import css from './FriendListItem.module.css'
export default function FriendListItem({avatar, name, isOnline}) {
    return (
        <div>
 <img src={avatar} alt="Avatar" width="48" />
  <p className={css.friendName}>{name}</p>
            <p className={`${css.friendStatus} ${isOnline ? css.online : css.offline}`}>{isOnline ? 'online' : 'offline'}</p>
           
</div>
    )
}