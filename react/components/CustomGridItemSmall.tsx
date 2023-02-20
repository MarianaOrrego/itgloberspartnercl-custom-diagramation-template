import React, { ReactNode } from 'react'

import styles from './styles.css'

type Props = {
    elementOne: ReactNode,
    elementTwo: ReactNode
}
const CustomGridItemSmall = ({ elementOne, elementTwo }: Props) => {
    return (
        <div className={styles.grid__itemSmall}>
            {elementOne}
            {elementTwo}
        </div>
    )
}

export default CustomGridItemSmall
