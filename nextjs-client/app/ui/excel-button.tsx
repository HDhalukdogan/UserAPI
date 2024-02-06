'use client'
import React from 'react'
import { Button } from './button'
import { getAllUserExcelBase64 } from '../actions/authActions'
import { blobHelper } from '../lib/blobHelper'


export default function ExcelButton() {

    const handleClick = async () => {
        const { base64, filename, contentType } = await getAllUserExcelBase64();
        const ct = contentType || 'application/octet-stream';
        const blob = blobHelper.base64toBlob(base64, ct);
        const fn = filename || "users.xlsx"
        blobHelper.blobDownload(blob, fn)
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Excel
            </Button>
        </div>
    )
}

