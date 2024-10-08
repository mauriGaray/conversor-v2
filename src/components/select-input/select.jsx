import React, { useEffect, useRef, useState } from 'react'

import { Input } from './elementos/input'
import { SelectList } from './elementos/select-list'

import styles from './select.module.css'

const Select = ({ contentList, itemsCollected, emptyMessage, placeHolder, selectItem }) => {
    const [inputValue, setInputValue] = useState('')
    const [listaDisplay, setListaDisplay] = useState("none")
    const selectRef = useRef(null)

    const desplegarLista = () => {
        setListaDisplay('flex')
    }

    useEffect(() => {

        if (itemsCollected === null) {
            setInputValue('')
        }
    }, [itemsCollected])

    useEffect(() => {

        if (itemsCollected && !Array.isArray(itemsCollected)) {
            setInputValue(itemsCollected)
        }

        function clickOut(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setListaDisplay("none");
            }
        }
        document.addEventListener('mousedown', clickOut);
        return () => {
            document.removeEventListener('mousedown', clickOut);
        };
    }, [])


    return (
        <div className={styles.selectInput}>
            <div className={styles.inputWithArrowDiv} >
                <Input
                    inputValue={inputValue}
                    placeHolder={placeHolder}
                    desplegarLista={desplegarLista}
                    setInputValue={setInputValue}
                />
            </div>

            <div className={styles.listaContainer}>
                <SelectList
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    listaDisplay={listaDisplay}
                    setListaDisplay={setListaDisplay}
                    contentList={contentList}
                    selectRef={selectRef}
                    selectItem={selectItem}
                    itemsCollected={itemsCollected}
                    emptyMessage={emptyMessage}
                />
            </div>

        </div>
    )
}

export default Select