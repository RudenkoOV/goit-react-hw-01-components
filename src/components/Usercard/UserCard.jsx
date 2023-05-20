import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import logo from '../../images/Logo.png';
import topCard from '../../images/top_card.png';

import {
  AvatarBox,
  ButtonContainer,
  ButtonFollow,
  ButtonLoadMore,
  Container,
  Followers,
  Header,
  Img,
  Line,
  Logo,
  Picture,
  StyledLink,
  StyledBackLink,
  TextButton,
  Tweets,
  UserBox,
  UserCardContainer,
} from './UserCard.styled';
import { fetchgetUsers } from '../Redux/option';
import { updateUsers } from '../Fetch/updateUsers';

const UserCard = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [followingStatus, setFollowingStatus] = useState({});
  
  
  const loadMoreCards = () => {
    setCurrentIndex(prevIndex => prevIndex + 3);
  };

  useEffect(() => {
    dispatch(fetchgetUsers()).then(response => {
      const fetchedUsers = response.payload;
      setUsers(fetchedUsers);
    });
  }, [dispatch]);

  useEffect(() => {
    const endIndex = currentIndex + 3;
    setDisplayedUsers(users.slice(0, endIndex));
      setHasMore(endIndex < users.length);
  }, [currentIndex, users]);

  useEffect(() => {
    const storedStatus = {};
    users.forEach(user => {
      const storedFollowingStatus = localStorage.getItem(
        `followingStatus_${user.id}`
      );
      if (storedFollowingStatus !== null) {
        storedStatus[user.id] = storedFollowingStatus === 'true';
      }
    });
    setFollowingStatus(storedStatus);
  }, [users]);

    const handleClick = useCallback(
      async (event, userId, following) => {
        const updatedUsers = users.map(user => {
          if (user.id === userId) {
            const updatedFollowers = following
              ? user.followers - 1
              : user.followers + 1;
            updateUsers(user.id, updatedFollowers)
              .then(() => {
                setUsers(prevUsers => {
                  return prevUsers.map(prevUser => {
                    if (prevUser.id === userId) {
                      return {
                        ...prevUser,
                        following: !prevUser.following,
                        followers: updatedFollowers,
                      };
                    }
                    return prevUser;
                  });
                });
                setFollowingStatus(prevStatus => ({
                  ...prevStatus,
                  [userId]: !prevStatus[userId],
                }));
                localStorage.setItem(
                  `followingStatus_${userId}`,
                  (!following).toString()
                );
              })
              .catch(error => {
                console.error('Error updating user:', error);
              });
          }
          return user;
        });
        setUsers(updatedUsers);
      },
      [users]
    );

  return (
    <>
      <Container>
        <Header>
          <StyledLink to="/">Go Home</StyledLink>
        </Header>
        <UserCardContainer>
          {displayedUsers.map(user => (
            <UserBox key={user.id}>
              <Logo>
                <Img src={`${logo}`} alt="logo" />
              </Logo>
              <Picture>
                <Img src={`${topCard}`} alt="card_picture" />
              </Picture>
              <Line></Line>
              <AvatarBox>
                <img
                  src={user.avatar}
                  alt="user_photo"
                  style={{
                    width: '62px',
                    height: '62px',
                    borderRadius: '50%',
                  }}
                />
              </AvatarBox>
              <Tweets>{user.tweets} tweets</Tweets>
              <Followers>
                {user.followers.toLocaleString('en-US')} followers
              </Followers>
              <ButtonFollow
                following={followingStatus[user.id]}
                onClick={event =>
                  handleClick(event, user.id, followingStatus[user.id])
                }
              >
                <TextButton>
                  {followingStatus[user.id] ? 'Following' : 'Follow'}
                </TextButton>
              </ButtonFollow>
              <img src="../../images/top_card.png" alt="" />
            </UserBox>
          ))}
        </UserCardContainer>
        <ButtonContainer>
          {currentIndex > 0 && <StyledBackLink to="/">Go Home</StyledBackLink>}
          {hasMore && (
            <ButtonLoadMore onClick={loadMoreCards}>Load More</ButtonLoadMore>
          )}
        </ButtonContainer>
      </Container>
    </>
  );
};

export default UserCard;
