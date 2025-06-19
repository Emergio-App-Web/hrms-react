import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Define the navigation items for each main route
const navigationMap: Record<string, string[]> = {
  '/general': ['General', 'Billing Info', 'Department', 'Designation', 'Bands/Grades', 'Business Unit'],
  '/employee': ['Employee', 'Unique Field', 'Skills', 'Configure Employee Search', 'Configure Employee Strength', 'Add New Document Category'],
  '/attendance': ['Shift', 'Configure Attendance', 'Roster Shift', 'Sandwich Policies', 'Regularization Policies', 'Restrict Attendance', 'Over Time', 'Calculations']
};

// Path transformations for navigation
const pathMap: Record<string, string> = {
  'General': 'general',
  'Billing Info': 'billinginfo',
  'Department': 'department',
  'Designation': 'designation',
  'Bands/Grades': 'bands/grades',
  'Business Unit': 'businessunit',
  'Employee': 'employee',
  'Unique Field': 'unique-field',
  'Skills': 'skills',
  'Configure Employee Search': 'configure-employee-search',
  'Configure Employee Strength': 'configure-employee-strength',
  'Add New Document Category': 'add-new-document-category',
  'Shift': 'shift',
  'Configure Attendance': 'configure-attendance',
  'Roster Shift': 'roster-shift',
  'Sandwich Policies': 'sandwich-policies',
  'Regularization Policies': 'regularization-policies',
  'Restrict Attendance': 'restrict-attendance',
  'Over Time': 'over-time',
  'Calculations': 'calculations'
};

interface AdminFooterNavProps {
  className?: string;
}

const AdminFooterNav = ({ className = '' }: AdminFooterNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<string>('');
  
  // Determine the main route path from the current location
  const getMainRoutePath = () => {
    const pathParts = location.pathname.split('/');
    return `/${pathParts[1]}`;
  };

  // Get navigation items based on the current main route
  const getNavigationItems = () => {
    const mainRoute = getMainRoutePath();
    return navigationMap[mainRoute] || [];
  };
  
  // Find the current active item based on the path
  useEffect(() => {
    const currentPath = location.pathname.split('/').pop() || '';
    
    // Find the matching navigation item
    for (const [label, path] of Object.entries(pathMap)) {
      if (path === currentPath || (currentPath === '' && label === getNavigationItems()[0])) {
        setActive(label);
        break;
      }
    }
  }, [location.pathname]);

  const handleNavigate = (item: string): void => {
    setActive(item);
    const mainRoute = getMainRoutePath();
    navigate(`${mainRoute}/${pathMap[item]}`);
  };

  return (
    <ul className={`flex gap-5 flex-wrap font-montserrat font-semibold m-5 ${className}`}>
      {getNavigationItems().map((item, index) => (
        <li
          key={index}
          className={`text-[14px] ${
            active === item ? `bg-[#DDFF8F] text-black` : `bg-black text-white`
          } rounded-2xl px-3 py-1 cursor-pointer`}
          onClick={() => handleNavigate(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default AdminFooterNav;