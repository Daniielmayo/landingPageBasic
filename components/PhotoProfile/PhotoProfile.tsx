import React from 'react'


export const PhotoProfile = () => {
    const photo ="https://www.4life.com/12315890/Home/My4LifeProfilePhoto?width=70&mode=crop&quality=100";
    const nameAlt = "Virginia Martinez" 
    const styleGeneral = "h-8 w-8 rounded-full mr-2"   
    return (
    <img 
    className={styleGeneral}
    src={photo}
    alt={nameAlt}
    />
)
}

// https://www.4life.com/12315890/Home/My4LifeProfilePhoto?width=70&mode=crop&quality=100
// https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80