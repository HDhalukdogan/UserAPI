'use client'
import React, { useRef, useState } from 'react'
import { uploadFile } from '../actions/authActions';

export default function UploadButton() {

    const [file, setFile] = useState<FormData | null>(null)
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files || event.target.files.length === 0) {
            console.log('error')
            return;
        }

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("formFile", file)
        formData.append("name", "test")
        setFile(formData)


    }

    async function handleUploadClick() {
        if (!file) {
            console.log('No file selected.');
            return;
        }



        try {
            const response = await uploadFile(file)
            const url = changeUrl(response.path)
            setImageSrc(url)
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            setFile(null);
        } catch (error) {
            console.error('Fetch error:', error);

            if (error instanceof Response) {
                const responseErrorData = await error.json();
                console.error('Response error data:', responseErrorData);
            }
        }
    }

    function changeUrl(filePath: string) {

        const pathWithoutWwwroot = filePath.replace('wwwroot\\', '');
        const pathWithForwardSlashes = pathWithoutWwwroot.replace(/\\/g, '/');



        const newUrl = `http://localhost:5000/${pathWithForwardSlashes}`;
        return newUrl;
    }

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
            />
            <button onClick={handleUploadClick}>Upload</button>
            {
                imageSrc && <img src={imageSrc} alt='test' width='100px' height='100px'/>
            }
        </div>

    );
}
