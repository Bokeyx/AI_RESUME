import { useNavigate } from 'react-router-dom';
import styled, {css} from 'styled-components'

import home from '../../lib/img/icon/Home.png'
import user from '../../lib/img/icon/User.png'
import file from '../../lib/img/icon/File.png'
import award from '../../lib/img/icon/Award.png'

const CategoriesBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  line-height: 2;
  width: 85%;
  margin: 0% auto;
  .icon {
    margin: 0 3%;
  }
  &:hover {
    cursor: pointer;
    color: var(--primary-color);
  }

${props =>
    props.$active && css`
      font-weight: bold;
      background: var(--primary-color);
      color: white;
      border-radius: 5px;
      img {
        filter: invert(100%) sepia(4%) saturate(2069%) hue-rotate(193deg) brightness(113%) contrast(100%);
      }
      &:hover {
        color: white;
      }
  `}
`; 

const categories = [
  {
    'name': 'home',
    'text': 'Home',
    'icon': home,
    'path': '/home'
  }, 
  {
    'name':'resume',
    'text': 'Resume Result',
    'icon': file,
    'path': '/result/resume'
  },
  {
    'name':'cover',
    'text': 'Cover Letter Result',
    'icon': file,
    'path': 'result/coverletter'
  },
  {
    'name':'histoty',
    'text': 'Submission History',
    'icon': award,
    'path': '/history'
  }
]

const Categories = ({ category, onSelect }) => {
  const navigate = useNavigate(); 

  const handleClick = (c) => {
    onSelect(c.name)
    navigate(c.path)
  }
  return (
    <CategoriesBlock>
      {categories.map((c) => 
        <Category key={c.name}
                $active={category === c.name}
                onClick={() => handleClick(c)}>
          <img src={c.icon} alt='icon' className='icon' $active={category === c.name}/>
          {c.text}
        </Category>
      )}
    </CategoriesBlock>
  )
}

export default Categories