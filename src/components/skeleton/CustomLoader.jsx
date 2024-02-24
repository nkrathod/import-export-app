import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const CustomLoader = () => {
    return <>
        <Skeleton variant="rounded" width={450} height={100} />
    </>
}

export default CustomLoader;