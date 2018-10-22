import React from 'react';

const wrappedData = (WrappedComponent, className) => {
    return (props) => (
        <div className={className}>
            <WrappedComponent {...props }/>
        </div>
    )
}

export default wrappedData;