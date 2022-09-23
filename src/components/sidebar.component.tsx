import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export const AccountButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn()}>Sign In</button>;
  }

  return (
    <div className="p-2">
      Hi, {session?.user?.name} |{` (${session?.user?.id}) `}
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  const baseStyles =
    'flex flex-col top-0 left-0 h-screen bg-slate-800 text-white';
  const expandedStyles = 'w-64';
  const collapsedStyles = 'w-24';

  const pages = [
    {
      id: 4,
      name: 'Households',
      link: '/households',
      icon: <TasksIcon expanded={expanded} />,
    },
    {
      id: 1,
      name: 'Tasks',
      link: '/tasks',
      icon: <TasksIcon expanded={expanded} />,
    },
    {
      id: 2,
      name: 'Groceries',
      link: '/groceries',
      icon: <GroceriesIcon expanded={expanded} />,
    },
    {
      id: 3,
      name: 'Inventory',
      link: '/inventory',
      icon: <InventoryIcon expanded={expanded} />,
    },
  ];

  return (
    <section
      className={`${baseStyles} ${
        expanded ? expandedStyles : collapsedStyles
      } transition-all duration-300`}
    >
      <header className="flex mb-8 p-2">
        <span className="flex-1">
          <Link href="/">Home Manager</Link>
        </span>
        <button
          className="inline-flex hover:scale-[1.1] duration-150"
          onClick={toggleExpanded}
        >
          <svg
            className={`${
              expanded ? 'rotate-180' : ''
            } transition-all duration-[350ms] delay-[150ms]`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="#ffffff"
          >
            <g id="_01_align_center" data-name="01 align center">
              <path d="M7.412,24,6,22.588l9.881-9.881a1,1,0,0,0,0-1.414L6.017,1.431,7.431.017l9.862,9.862a3,3,0,0,1,0,4.242Z" />
            </g>
          </svg>
        </button>
      </header>
      <div className={`flex-1 ${expanded ? 'divide-y' : ''}`}>
        {pages.map((page) => (
          <Link key={page.id} href={page.link}>
            <div className="w-full p-4 cursor-pointer hover:bg-slate-600">
              {page.icon}
              {expanded && <span className="ml-2">{page.name}</span>}
            </div>
          </Link>
        ))}
      </div>
      <div>
        <AccountButton />
      </div>
    </section>
  );
};

type IconProps = {
  expanded: boolean;
};

export const InventoryIcon = ({ expanded }: IconProps) => {
  return (
    <svg
      className="inline transition-all duration-300"
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width={expanded ? 24 : 48}
      height={expanded ? 24 : 48}
      fill="#fff"
    >
      <path d="M19.5,16c0,.553-.447,1-1,1h-2c-.553,0-1-.447-1-1s.447-1,1-1h2c.553,0,1,.447,1,1Zm4.5-1v5c0,2.206-1.794,4-4,4H4c-2.206,0-4-1.794-4-4v-5c0-2.206,1.794-4,4-4h1V4C5,1.794,6.794,0,9,0h6c2.206,0,4,1.794,4,4v7h1c2.206,0,4,1.794,4,4ZM7,11h10V4c0-1.103-.897-2-2-2h-6c-1.103,0-2,.897-2,2v7Zm-3,11h7V13H4c-1.103,0-2,.897-2,2v5c0,1.103,.897,2,2,2Zm18-7c0-1.103-.897-2-2-2h-7v9h7c1.103,0,2-.897,2-2v-5Zm-14.5,0h-2c-.553,0-1,.447-1,1s.447,1,1,1h2c.553,0,1-.447,1-1s-.447-1-1-1ZM14,5c0-.553-.447-1-1-1h-2c-.553,0-1,.447-1,1s.447,1,1,1h2c.553,0,1-.447,1-1Z" />
    </svg>
  );
};

export const TasksIcon = ({ expanded }: IconProps) => {
  return (
    <svg
      className="inline transition-all duration-300"
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width={expanded ? 24 : 48}
      height={expanded ? 24 : 48}
      fill="#fff"
    >
      <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z" />
      <circle cx="12" cy="15" r="1.5" />
      <circle cx="7" cy="15" r="1.5" />
      <circle cx="17" cy="15" r="1.5" />
    </svg>
  );
};

export const GroceriesIcon = ({ expanded }: IconProps) => {
  return (
    <svg
      className="inline transition-all duration-300"
      id="Layer_1"
      height={expanded ? 24 : 48}
      viewBox="0 0 24 24"
      width={expanded ? 24 : 48}
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      fill="#fff"
    >
      <path d="m4 6a2.982 2.982 0 0 1 -2.122-.879l-1.544-1.374a1 1 0 0 1 1.332-1.494l1.585 1.414a1 1 0 0 0 1.456.04l3.604-3.431a1 1 0 0 1 1.378 1.448l-3.589 3.414a2.964 2.964 0 0 1 -2.1.862zm20-2a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1zm-17.9 9.138 3.589-3.414a1 1 0 1 0 -1.378-1.448l-3.6 3.431a1.023 1.023 0 0 1 -1.414 0l-1.59-1.585a1 1 0 0 0 -1.414 1.414l1.585 1.585a3 3 0 0 0 4.226.017zm17.9-1.138a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1zm-17.9 9.138 3.585-3.414a1 1 0 1 0 -1.378-1.448l-3.6 3.431a1 1 0 0 1 -1.456-.04l-1.585-1.414a1 1 0 0 0 -1.332 1.494l1.544 1.374a3 3 0 0 0 4.226.017zm17.9-1.138a1 1 0 0 0 -1-1h-10a1 1 0 0 0 0 2h10a1 1 0 0 0 1-1z" />
    </svg>
  );
};
