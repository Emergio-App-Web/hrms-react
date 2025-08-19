import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const navigationMap: Record<string, string[]> = {
  '/home': ['Profile', 'Digital Business Card', 'Details', 'Skills', 'Documents', 'Bank', 'Job History', 'Seperation Request', 'Education', 'Certification', 'Family', 'Emergency', 'Disciplinary', 'Change Password', 'Reference'],
};

const pathMap: Record<string, string> = {
  'Profile': 'profile',
  'Digital Business Card': 'digitalbusinesscard',
  'Details': 'details',
  'Skills': 'skills',
  'Documents': 'documents',
  'Bank': 'bank',
  'Job History': 'jobhistory',
  'Seperation Request': 'seperationrequest',
  'Education': 'education',
  'Certification': 'certification',
  'Family': 'family',
  'Emergency': 'emergency',
  'Disciplinary': 'disciplinary',
  'Change Password': 'changepassword',
  'Reference': 'reference'
};

interface EmployeeFooterNavProps {
  className?: string;
}
const EmployeeFooter = ({ className = '' }: EmployeeFooterNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<string>('');


  const getMainRoutePath = () => {
    const pathParts = location.pathname.split('/');
    return `/${pathParts[1]}`;
  }
  const getNavigationItems = () => {
    const mainRoute = getMainRoutePath();
    return navigationMap[mainRoute] || [];
  };

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop() || '';
    for (const [label, path] of Object.entries(pathMap)) {
      if (path === currentPath || (currentPath === '' && label === getNavigationItems()[0])) {
        setActive(label);
        break;
      }
    }
  }, [location.pathname]);

  const handleNavigate = (item: string) => {
    setActive(item);
    const mainRoute = getMainRoutePath();
    navigate(`${mainRoute}/${pathMap[item]}`);
  }
  return (
    <ul className={`flex gap-5 flex-wrap font-montserrat font-semibold m-5 ${className}`}>
      {getNavigationItems().map((item, index) => (
        <li key={index}
        className={`text-[14px] ${active === item ? `bg-[#DDFF8F]` : `bg-black text-white`}  rounded-2xl px-3 py-1 cursor-pointer`}
        onClick={()=>{handleNavigate(item)}}
        >
        {item}
       </li>
      ))}
    </ul>
  )
}

export default EmployeeFooter