import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useRouter from 'common/utils/useRouter';
import { startSession } from 'slices/auth/action';

import { SignupForm, SignupPolicy } from './components';

export default function Singup() {
  const dispatch = useDispatch();
  const { history } = useRouter();

  const [policy, setPolicy] = useState(false);

  useEffect(() => {
    dispatch(startSession(history));
  }, [dispatch, history]);

  const handleSubmit = () => {
    setPolicy(true);
  };

  return policy ? <SignupPolicy /> : <SignupForm submit={handleSubmit} />;
}
