import { Link } from 'react-router-dom';
import { HomeTitle, WrapperHomePage } from './Home.styled';

export default function Home() {
  return (
    <WrapperHomePage>
      
      <HomeTitle style={{ color: 'black' }}>
        Hello, to watch tweets, please click here 
        <Link to="/tweets" > Tweets </Link>
      </HomeTitle>
    </WrapperHomePage>
  );
}
