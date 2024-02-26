"use client"

import { newVerification } from '@/actions/auth/new-verification'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from "react-spinners";

const NewVerificationPage = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (success || error) return

        if (!token) {
            setError("Token lost")
            return
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Algo salio mal!")
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <div className='flex items-center justify-center'>
            <Card>
                <CardHeader>
                    {
                        !success && (
                            <p>{error}</p>
                        )
                    }

                    {
                        success && (
                            <p>{success}</p>
                        )
                    }
                </CardHeader>
                <CardContent>
                    {!success && !error && (
                        <BeatLoader />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default NewVerificationPage