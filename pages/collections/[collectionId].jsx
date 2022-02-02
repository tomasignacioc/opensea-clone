import { useRouter } from 'next/router';
import React from 'react';

const Collection = () => {
    const router = useRouter()

  return <h1>{router.query.collectionId}</h1>;
};

export default Collection;
