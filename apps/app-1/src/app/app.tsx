import './app.module.less';
import '../styles.less';
import { useGetUsersCountQuery } from './features/api';
import { useState } from 'react';

export function App() {
  const [skip, setSkip]= useState(true);
  const { data, isFetching, refetch } = useGetUsersCountQuery(undefined, { skip });

  const onClick = () => {
    if (skip) {
      setSkip(false)
      return;
    };
    refetch();
  };

  return (
    <div className='container'>
      <button onClick={onClick} disabled={isFetching} >Get users count</button>
      <input value={skip && !isFetching && !data ? '' : (isFetching ? 'loading...' : data?.NUMBER ?? '')}  readOnly />
    </div>
  );
}

export default App;
