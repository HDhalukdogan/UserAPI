'use client'
import React from 'react'
import { Button } from './button'
import { getAllUserExcelBase64 } from '../actions/authActions'
import { blobHelper } from '../lib/blobHelper'


export default function ExcelButton() {

    const handleClick = async () => {
        const base64Result = await getAllUserExcelBase64();
        const blob = blobHelper.base64toBlob(base64Result, 'application/octet-stream');
        blobHelper.blobDownload(blob,"abc.xlsx")
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Excel
            </Button>
        </div>
    )
}

