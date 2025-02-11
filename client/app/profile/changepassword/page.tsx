'use client';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import Protected from '@/app/hooks/useProtected';
import Heading from '@/app/utils/Heading';
import Header1 from '../Header1';
import { useSelector } from 'react-redux'; // Corrected import (useSelector, not UseSelector)
import { usePathname } from 'next/navigation';
import ChangePassword from '@/app/components/Profile/ChangePassword';


type Props = {};

const Page: FC<Props> = () => { // Corrected component name to start with uppercase
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");


  // Use the useSelector hook to get the user from Redux state
  const { user } = useSelector((state: any) => state.auth);
  const pathname = usePathname();
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name || "User"}'s profile`} // Dynamically setting profile name
          description="It is a good platform"
          keywords="programming,MERN"
        />
        <Header1
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        {/* Pass the `user` prop to the Profile component */}
        <ChangePassword user={user} />
      </Protected>
    </div>
  );
};

export default Page;
