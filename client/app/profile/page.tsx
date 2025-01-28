
'use client';
import React, { FC, useState } from 'react';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import { useSelector } from 'react-redux'; // Corrected import (useSelector, not UseSelector)
import Profile from '../components/Profile/Profile';

type Props = {};

const Page: FC<Props> = () => { // Corrected component name to start with uppercase
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  // Use the useSelector hook to get the user from Redux state
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name || "User"}'s profile`} // Dynamically setting profile name
          description="It is a good platform"
          keywords="programming,MERN"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        {/* Pass the `user` prop to the Profile component */}
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;
