import React from 'react';
import BottomTeb from '../components/BottomTeb';
import UserLIst from '../components/UserLIst';
import PageHeader from '../components/PageHeader';
import Inner from '../components/Inner';
const About = () => {
  return (
      <>
      <PageHeader title={'유저리스트'}></PageHeader>
      <Inner>
      <UserLIst></UserLIst>
      </Inner>
      <BottomTeb></BottomTeb>
      </>
  );
};

export default About;