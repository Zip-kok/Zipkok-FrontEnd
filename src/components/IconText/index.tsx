import React from 'react'
import styles from './IconText.module.css'

interface IconTextProps{
  img:string;
  text: string;
}

const IconText:React.FC<IconTextProps> = ({img,text}) => {

  return (
    <div className={styles.root}>
      <img src={img}/>
      <p>{text}</p>
    </div>
  )
}

export default IconText;
